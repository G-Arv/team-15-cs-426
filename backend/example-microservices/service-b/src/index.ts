import express from "express";
import { pino } from "pino";
import { Request, Response } from "express";

const PORT = 3000;
const REGISTRY_URL = "http://registry:3000";

const log = pino({ transport: { target: "pino-pretty" } });

const app = express();
app.use(express.json());

// Retry registry registration
async function registerWithRetry(name: string, url: string, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(`${REGISTRY_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, url }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      log.info("Registered with registry");
      return;
    } catch (err) {
      log.warn(
        `Failed to register (attempt ${i + 1}): ${(err as Error).message}`,
      );
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  log.error("Could not register with registry. Exiting.");
  process.exit(1);
}

async function lookupService(name: string): Promise<string | null> {
  try {
    const res = await fetch(`${REGISTRY_URL}/lookup?name=${name}`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { url } = await res.json();
    return url;
  } catch (err) {
    log.error(`Lookup failed for ${name}: ${(err as Error).message}`);
    return null;
  }
}

app.post("/", async (req: Request, res: Response) => {
  const cUrl = await lookupService("service-c");
  const dUrl = await lookupService("service-d");

  if (!cUrl || !dUrl) {
    const response = {
      from: "service-b",
      serviceBResult: "Could not resolve service-c or service-d",
      timestamp: new Date().toISOString(),
    };

    return res.status(502).send(response);
  }

  try {
    // Step 1: Call service-c
    const cResponse = await fetch(cUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "service-b", message: req.body.message }),
    });
    const cData = await cResponse.json();

    // Step 2: Forward to service-d
    const dResponse = await fetch(dUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "service-b", enrichedData: cData }),
    });
    const dData = await dResponse.json();

    // Final response to api-gateway
    const response = {
      from: "service-b",
      serviceCResult: cData,
      serviceDResult: dData,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (err) {
    log.error(
      `Error forwarding to service-c or service-d: ${(err as Error).message}`,
    );
    res.status(500).send("Error forwarding to downstream services");
  }
});

app.listen(PORT, () => {
  log.info(`Service B listening on port ${PORT}`);
  registerWithRetry("service-b", `http://service-b:${PORT}`);
});
