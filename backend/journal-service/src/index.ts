import express from "express";
import { pino } from "pino";
import journalRoutes from "./journalRoutes.js";

const PORT = 4006;
const REGISTRY_URL = "http://registry:3000";

const log = pino({ transport: { target: "pino-pretty" } });
const app = express();
app.use(express.json());
app.use("/journal", journalRoutes);

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
      log.warn(`Failed to register (attempt ${i + 1}): ${(err as Error).message}`);
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  log.error("Could not register with registry. Exiting.");
  process.exit(1);
}

app.listen(PORT, () => {
  log.info(`Journal Service running on port ${PORT}`);
  registerWithRetry("journal-service", `http://journal-service:${PORT}`);
});
