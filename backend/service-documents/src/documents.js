import * as db from "../../db/db.ts";

export async function getDocuments(req, res, next) {
    try {
      const userid = req.user.userid;
      const tasksData = await db.query(
        "SELECT * FROM documents WHERE userid=$1",
        [userid]
      );
      return res.status(200).send({ status: "ok", data: tasksData.rows });
    } catch (err) {
      res
        .status(500)
        .json({ status: "error", message: `Internal server error: ${err}` });
      return err;
    }
}

export async function updateDocuments(req, res, next) {
    try {
      const { userId, name } = req.body;
      const result = await db.query(
        "UPDATE document SET name = $1 WHERE userid=$2 RETURNING id",
        [name, userId]
      );
      return res.status(200).send({ status: "ok", data: result.rows });
    } catch (err) {
      res
        .status(500)
        .json({ status: "error", message: `Internal server error: ${err}` });
      return err;
    }
}

export async function deleteDocuments(req, res, next) {
    try {
      const { userId, name } = req.body;
      const result = await db.query(
        "DELETE FROM document WHERE name=$1 AND userid=$2 RETURNING id",
        [name, userId]
      );
      return res.status(200).send({ status: "ok", data: result.rows });
    } catch (err) {
      res
        .status(500)
        .json({ status: "error", message: `Internal server error: ${err}` });
      return err;
    }
}