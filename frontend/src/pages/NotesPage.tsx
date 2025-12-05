// frontend/src/pages/NotesPage.tsx
import { useEffect, useState, useCallback } from "react";
import type { FormEvent } from "react";
import type { Note } from "../types/note";
import type { Category } from "../types/category";
import {
  getNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
  createNote,
  updateNote,
  addCategoryToNote,
  removeCategoryFromNote,
} from "../api/noteService";
import { getCategories, createCategory } from "../api/categoryService";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showArchived, setShowArchived] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);

  const loadCategories = useCallback(async () => {
    const res = await getCategories();
    setCategories(res.data);
  }, []);

  const loadNotes = useCallback(async () => {
    const res = await getNotes(showArchived, selectedCategoryId);
    setNotes(res.data);
  }, [showArchived, selectedCategoryId]);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    void loadNotes();
  }, [loadNotes]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingNote(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editingNote) {
      await updateNote(editingNote.id, { title, content });
    } else {
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

  const handleCreateCategory = async (e: FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    await createCategory(newCategoryName.trim());
    setNewCategoryName("");
    await loadCategories();
  };

  const handleAddCategoryToNote = async (noteId: number, categoryId: number) => {
    await addCategoryToNote(noteId, categoryId);
    await loadNotes();
  };

  const handleRemoveCategoryFromNote = async (noteId: number, categoryId: number) => {
    await removeCategoryFromNote(noteId, categoryId);
    await loadNotes();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notes App</h1>

        <div className="flex gap-3 items-center">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => setShowArchived(!showArchived)}
          >
            {showArchived ? "Show Active" : "Show Archived"}
          </button>

          <select
            className="border rounded px-2 py-1"
            value={selectedCategoryId ?? ""}
            onChange={(e) =>
              setSelectedCategoryId(e.target.value ? Number(e.target.value) : undefined)
            }
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Note form */}
        <div className="md:col-span-2 bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">
              {editingNote ? "Edit note" : "New note"}
            </h2>
            {editingNote && (
              <button
                type="button"
                className="text-sm text-gray-500 underline"
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
        </div>

        {/* Category form */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Categories</h2>

          <form onSubmit={handleCreateCategory} className="flex gap-2 mb-4">
            <input
              className="flex-1 border rounded px-2 py-1"
              placeholder="New category..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </form>

          <ul className="space-y-1 text-sm">
            {categories.map((c) => (
              <li key={c.id} className="text-gray-700">
                • {c.name}
              </li>
            ))}
            {categories.length === 0 && (
              <p className="text-gray-400 text-sm">No categories yet.</p>
            )}
          </ul>
        </div>
      </section>

      {/* Notes list */}
      <section>
        <ul className="space-y-3">
          {notes.map((n) => (
            <li
              key={n.id}
              className="bg-white p-3 shadow rounded flex justify-between gap-4"
            >
              <div className="flex-1">
                <h2 className="font-semibold">{n.title}</h2>
                <p className="text-gray-600 text-sm">{n.content}</p>

                <div className="mt-2 flex flex-wrap gap-2 items-center">
                  {n.categories.map((nc) => (
                    <span
                      key={nc.id}
                      className="flex items-center gap-1 bg-gray-200 text-xs px-2 py-1 rounded-full"
                    >
                      {nc.category.name}
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() =>
                          handleRemoveCategoryFromNote(n.id, nc.category.id)
                        }
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  <select
                    className="border rounded px-2 py-1 text-xs"
                    defaultValue=""
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value) {
                        void handleAddCategoryToNote(n.id, Number(value));
                        e.target.value = "";
                      }
                    }}
                  >
                    <option value="">+ Add category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {n.archived ? "Archived" : "Active"}
                </p>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <div className="flex gap-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    onClick={() => handleDelete(n.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                    onClick={() => handleEditClick(n)}
                  >
                    Edit
                  </button>
                  <button
                    className={`text-white px-2 py-1 rounded text-sm ${
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
      </section>
    </div>
  );
}
