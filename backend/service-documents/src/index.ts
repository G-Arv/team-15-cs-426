import express from "express";
import { pino } from "pino";
import { Request, Response } from "express";
import { getDocuments, updateDocuments, deleteDocuments } from "../src/documents.js";

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

app.get("/profile/getDocuments", getDocuments);
app.post("/profile/getDocuments", updateDocuments);
app.delete("profile/getDocuments", deleteDocuments);
// // The GET request for the user’s documents to Postgres
// app.get("/profile/getDocument", async (req: Request, res: Response) => {
//     try {
//       const query = 'SELECT * FROM document WHERE userId = $1;';
//       const { userId } = req.body;
//       const result = await db.query(query, userId);
//       res.json(result.rows);
//     } catch (err) {
//       log.error(`Error contacting database: ${(err as Error).message}`);
//       res.status(500).send("Error with profile contacting database");
//     }
// });

// // The PUT request for uploading the user's document to Postgres
// app.put("/profile/updateDocument", async (req: Request, res: Response) => {
//     try {
//       const { name, file, userId } = req.body;
//       const query = `
//         UPDATE document
//         INSERT VALUES (
//           name = $1,
//           file = $2,
//           userId = $3
//           )
//         RETURNING *;
//       `;
//       const values = [name, file, userId];
//       const result = await db.query(query, values);
  
//       res.json(result);
//     } catch (err) {
//       log.error(`Error contacting database: ${(err as Error).message}`);
//       res.status(500).send("Error with updating profile");
//     }
// });

// // The DELETE request for the user’s document to Postgres
// app.delete("/profile/deleteDocument", async (req: Request, res: Response) => {
//     try {
//       const query = 'DELETE FROM documents WHERE userId = $1 AND name = $2;';
//       const { userId, name } = req.body;
//       const values = [userId, name]
//       const result = await db.query(query, values);
//       res.json(result);
//     } catch (err) {
//       log.error(`Error contacting database: ${(err as Error).message}`);
//       res.status(500).send("Error with profile contacting database");
//     }
// });