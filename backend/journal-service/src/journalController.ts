import { Request, Response } from "express";

const journalEntries = new Map<string, string>();

export const createJournal = (req: Request, res: Response): void => {
  const { id, content } = req.body;
  if (!id || !content) {
    res.status(400).json({ error: "Missing 'id' or 'content'" });
    return;
  }
  journalEntries.set(id, content);
  res.status(201).json({ id, content });
};

export const getJournal = (req: Request, res: Response): void => {
  const entry = journalEntries.get(req.params.id);
  if (entry) {
    res.json({ id: req.params.id, content: entry });
  } else {
    res.status(404).json({ error: "Not found" });
  }
};

export const updateJournal = (req: Request, res: Response): void => {
  const { content } = req.body;
  if (!content) {
    res.status(400).json({ error: "Missing 'content'" });
    return;
  }

  if (journalEntries.has(req.params.id)) {
    journalEntries.set(req.params.id, content);
    res.json({ id: req.params.id, content });
  } else {
    res.status(404).json({ error: "Not found" });
  }
};

export const deleteJournal = (req: Request, res: Response): void => {
  if (journalEntries.has(req.params.id)) {
    journalEntries.delete(req.params.id);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Not found" });
  }
};
