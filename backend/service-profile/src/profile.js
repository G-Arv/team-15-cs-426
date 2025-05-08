import * as db from "../../db/src/db.ts";

export async function getUser(req, res, next) {
    try {
      const userid = req.user.userid;
      const tasksData = await db.query(
        "SELECT * FROM users WHERE userid=$1",
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

export async function updateProfile(req, res, next) {
    try {
      const { userId, firstName, lastName, email, phoneNumber, gender, age, userName } = req.body;
      const result = await db.query(
        "UPDATE user SET firstName = $1, lastName = $2, email = $3, phoneNumber = $4, gender = $5, age = $6, userName = $7 WHERE userid=$8 RETURNING id",
        [firstName, lastName, email, phoneNumber, gender, age, userName, userId]
      );
      return res.status(200).send({ status: "ok", data: result.rows });
    } catch (err) {
      res
        .status(500)
        .json({ status: "error", message: `Internal server error: ${err}` });
      return err;
    }
}