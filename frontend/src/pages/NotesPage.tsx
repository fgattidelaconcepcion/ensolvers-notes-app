import { useEffect, useState, useCallback } from "react";
import type { Note } from "../types/note";
import {
  getNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
  createNote,
  updateNote,
} from "../api/noteService";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showArchived, setShowArchived] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const loadNotes = useCallback(async () => {
    const res = await getNotes(showArchived);
    setNotes(res.data);
  }, [showArchived]);

  useEffect(() => {
    void loadNotes();
  }, [loadNotes]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingNote(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    if (editingNote) {
      // Editar nota existente
      await updateNote(editingNote.id, { title, content });
    } else {
      // Crear nueva nota
      await createNote({ title, content });
    }

    resetForm();
    await loadNotes();
  };

  const handleEditClick = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    await loadNotes();
  };

  const handleArchiveToggle = async (note: Note) => {
    if (note.archived) {
      await unarchiveNote(note.id);
    } else {
      await archiveNote(note.id);
    }
    await loadNotes();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Notes</h1>

        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setShowArchived(!showArchived)}
        >
          {showArchived ? "Show Active" : "Show Archived"}
        </button>
      </header>

      {/* FORMULARIO CREAR / EDITAR */}
      <section className="mb-8 bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">
            {editingNote ? "Edit note" : "New note"}
          </h2>

          {editingNote && (
            <button
              className="text-sm text-gray-500 underline"
              type="button"
              onClick={resetForm}
            >
              Cancel edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full border rounded px-3 py-2 min-h-[80px]"
            placeholder="Content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {editingNote ? "Save changes" : "Create note"}
          </button>
        </form>
      </section>

      {/* LISTA DE NOTAS */}
      <ul className="space-y-3">
        {notes.map((n) => (
          <li
            key={n.id}
            className="bg-white p-3 shadow rounded flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{n.title}</h2>
              <p className="text-gray-600 text-sm">{n.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                {n.archived ? "Archived" : "Active"}
              </p>
            </div>

            <div className="flex flex-col gap-2 items-end">
              <div className="flex gap-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(n.id)}
                >
                  Delete
                </button>

                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEditClick(n)}
                >
                  Edit
                </button>

                <button
                  className={`text-white px-2 py-1 rounded ${
                    n.archived ? "bg-blue-500" : "bg-green-500"
                  }`}
                  onClick={() => handleArchiveToggle(n)}
                >
                  {n.archived ? "Unarchive" : "Archive"}
                </button>
              </div>
            </div>
          </li>
        ))}

        {notes.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            No notes {showArchived ? "archived" : "yet"}.
          </p>
        )}
      </ul>
    </div>
  );
}
