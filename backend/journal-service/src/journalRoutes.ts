import express from "express";
import {
  createJournal,
  getJournal,
  updateJournal,
  deleteJournal,
} from "./journalController.js";

const router = express.Router();

router.post("/", createJournal);
router.get("/:id", getJournal);
router.put("/:id", updateJournal);
router.delete("/:id", deleteJournal);

export default router;
