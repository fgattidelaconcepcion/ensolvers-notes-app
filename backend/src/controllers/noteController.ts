import { Request, Response } from "express";
import * as noteService from "../services/noteService";

export async function listNotes(req: Request, res: Response) {
  try {
    const archivedParam = req.query.archived as string | undefined;
    const archived =
      archivedParam === undefined ? undefined : archivedParam === "true";

    const notes = await noteService.listNotes({ archived });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error listing notes" });
  }
}

export async function getNote(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const note = await noteService.getNote(id);
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Note not found" });
  }
}

export async function createNote(req: Request, res: Response) {
  try {
    const { title, content } = req.body;
    const note = await noteService.createNote({ title, content });
    res.status(201).json(note);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ message: err.message || "Error creating note" });
  }
}

export async function updateNote(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body;
    const note = await noteService.updateNote(id, { title, content });
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error updating note" });
  }
}

export async function deleteNote(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await noteService.deleteNote(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error deleting note" });
  }
}

export async function archiveNote(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const note = await noteService.archiveNote(id);
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error archiving note" });
  }
}

export async function unarchiveNote(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const note = await noteService.unarchiveNote(id);
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error unarchiving note" });
  }
}
