import express from "express";
import { pino } from "pino";
import { Request, Response } from "express";
import * as db from "./db/db.ts";

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

// The GET request for the user’s data to Postgres
app.get("/profile/getUser", async (req: Request, res: Response) => {
  try {
    const query = 'SELECT';
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    log.error(`Error contacting database: ${(err as Error).message}`);
    res.status(500).send("Error with profile contacting database");
  }
});

// The PUT request for updating the user's data to Postgres
app.put("/profile/updateUser", async (req: Request, res: Response) => {
  try {
    const { userId, firstName, lastName, email, phoneNumber, gender, age, userName } = req.body;
    const query = `
      UPDATE users
      SET 
        firstName = $1,
        lastName = $2,
        email = $3,
        phoneNumber = $4,
        gender = $5,
        age = $6,
        userName = $7
      WHERE userId = $8
      RETURNING *;
    `;
    const values = [firstName, lastName, email, phoneNumber, gender, age, userName, userId];
    const result = await db.query(query, values);

    res.json(result.rows[0]);
  } catch (err) {
    log.error(`Error contacting database: ${(err as Error).message}`);
    res.status(500).send("Error with updating profile");
  }
});

app.listen(PORT, () => {
  log.info(`Service Schedule listening on port ${PORT}`);
  registerWithRetry("service-schedule", `http://service-schedule:${PORT}`);
});