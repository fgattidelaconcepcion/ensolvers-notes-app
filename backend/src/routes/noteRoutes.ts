import { Router } from "express";
import * as noteController from "../controllers/noteController";

const router = Router();

// GET /api/notes?archived=true|false
router.get("/", noteController.listNotes);

// GET /api/notes/:id
router.get("/:id", noteController.getNote);

// POST /api/notes
router.post("/", noteController.createNote);

// PUT /api/notes/:id
router.put("/:id", noteController.updateNote);

// DELETE /api/notes/:id
router.delete("/:id", noteController.deleteNote);

// PATCH /api/notes/:id/archive
router.patch("/:id/archive", noteController.archiveNote);

// PATCH /api/notes/:id/unarchive
router.patch("/:id/unarchive", noteController.unarchiveNote);

export default router;
