import fs from "fs";
import express from "express";
import { pino } from "pino";
import { Request, Response } from "express";

// Create log directory if it doesn't exist
fs.mkdirSync("./logs", { recursive: true });

const PORT = 3000;
const log = pino({
  transport: {
    targets: [
      { target: "pino-pretty", level: "info" },
      {
        target: "pino/file",
        options: { destination: "./logs/registry.log" },
        level: "info",
      },
    ],
  },
});

const app = express();
app.use(express.json());

// In-memory service registry
const services: Record<string, string> = {};

// POST /register { name, url }
app.post("/register", (req: Request, res: Response) => {
  const { name, url } = req.body;

  if (!name || !url) {
    log.warn("Bad register request", req.body);
    return res.status(400).json({ error: "Missing name or url" });
  }

  services[name] = url;
  log.info(`Registered service: ${name} at ${url}`);
  res.json({ status: "ok" });
});

// GET /lookup?name=service-name
app.get("/lookup", (req: Request, res: Response) => {
  const name = req.query.name as string;

  if (!name) {
    return res.status(400).json({ error: "Missing service name" });
  }

  const url = services[name];
  if (!url) {
    return res.status(404).json({ error: "Service not found" });
  }

  res.json({ url });
});

app.listen(PORT, () => {
  log.info(`Registry service listening on port ${PORT}`);
});
