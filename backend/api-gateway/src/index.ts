import express from "express";
import { pino } from "pino";

const PORT = 3000;
const REGISTRY_URL = "http://registry:3000";

const log = pino({ transport: { target: "pino-pretty" } });

const app = express();

app.use(express.json());

// Retry logic for registering with the registry
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

// Proxy handler for forwarding requests
async function handleProxy(
  serviceName: string,
  req: express.Request,
  res: express.Response,
) {
  const url = await lookupService(serviceName);
  if (!url) return res.status(502).send(`Could not resolve ${serviceName}`);
  try {
    const response = await fetch(url, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const result = await response.json();
    res.status(response.status).json(result);
  } catch (err) {
    log.error(`Error forwarding to ${serviceName}: ${(err as Error).message}`);
    res.status(500).send(`Error communicating with ${serviceName}`);
  }
}

// Routes
app.post("/a", (req, res) => handleProxy("service-a", req, res));
app.post("/b", (req, res) => handleProxy("service-b", req, res));
app.post("/18", (req, res) => handleProxy("service-18", req, res));


app.listen(PORT, () => {
  log.info(`API Gateway listening on port ${PORT}`);
  registerWithRetry("api-gateway", `http://api-gateway:${PORT}`);
});
