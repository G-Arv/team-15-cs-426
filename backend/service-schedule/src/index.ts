import express from "express";
import { pino } from "pino";
import { Request, Response } from "express";

const PORT = 3000;
const REGISTRY_URL = "http://registry:3000";

const log = pino({ transport: { target: "pino-pretty" } });

const app = express();
app.use(express.json());

// Retry logic for registry
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

/// The GET request for the user’s data to Postgres
app.get("/schedule/getUser", async (req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM Medicine'; // to be filled in with values
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    log.error(`Error contacting database: ${(err as Error).message}`);
    res.status(500).send("Error with schedule contacting database");
  }
 });
 
 
 // The POST request for the user's data to Postgres
 app.post("/schedule/postUser", async (req: Request, res: Response) => {
  try {
    const { name, amount, foodAndPills, dateRange, timeRange, weekDays, type} = req.body;
    const query = 'INSERT INTO Medicine (name, amount, foodAndPills, dateRange, timeRange, weekDays, type) VALUES ($1, $2, $3, $4, $5, $6, $7)'; // to be filled in
    const values = [name, amount, foodAndPills, dateRange, timeRange, weekDays, type];
    const result = await db.query(query, values); // to change with actual database
    res.json(result.rows[0]);
  } catch (err) {
    log.error(`Error contacting database: ${(err as Error).message}`);
    res.status(500).send("Error with schedule updating database");
  }
 });
 
 
 
 app.listen(PORT, () => {
  log.info(`Service Schedule listening on port ${PORT}`);
  registerWithRetry("service-schedule", `http://service-schedule:${PORT}`);
 });
 