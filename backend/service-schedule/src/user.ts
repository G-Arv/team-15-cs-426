import * as db from "../../db/db.ts";

// The GET request for the user’s data to Postgres
export async function getUser(_req: any, res: any) {
    try {
        const query = 'SELECT * FROM Medicine';
        const result = await db.query(query, [], null);
        res.json(result.rows);
      } catch (err) {
        console.error(`Error contacting database: ${(err as Error).message}`);
        res.status(500).send("Error with schedule contacting database");
      }
}

// The POST request for the user's data to Postgres
export async function addUser(req: any, res: any) {
    try {
        const { name, amount, foodAndPills, dateRange, timeRange, weekDays, type} = req.body;
        const query = 'INSERT INTO Medicine (name, amount, foodandpills, daterange, timerange, weekdays, type) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        const values = [name, amount, foodAndPills, dateRange, timeRange, weekDays, type];
        const result = await db.query(query, values, null); 
        res.json(result.rows[0]);
      } catch (err) {
        console.error(`Error contacting database: ${(err as Error).message}`);
        res.status(500).send("Error with schedule updating database");
      }
}

