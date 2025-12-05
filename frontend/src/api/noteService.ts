import api from "./api";
import type { Note } from "../types/note";

type GetNotesParams = {
  archived?: boolean;
  categoryId?: number;
};

export const getNotes = async (archived?: boolean, categoryId?: number) => {
  const params: GetNotesParams = {};

  if (archived !== undefined) {
    params.archived = archived;
  }

  if (categoryId !== undefined) {
    params.categoryId = categoryId;
  }

  const response = await api.get<Note[]>("/notes", { params });
  return response; // en NotesPage usás res.data
};

export const getNote = (id: number) =>
  api.get<Note>(`/notes/${id}`);

export const createNote = (data: { title: string; content: string }) =>
  api.post<Note>("/notes", data);

export const updateNote = (
  id: number,
  data: { title?: string; content?: string }
) => api.put<Note>(`/notes/${id}`, data);

export const deleteNote = (id: number) =>
  api.delete<void>(`/notes/${id}`);

export const archiveNote = (id: number) =>
  api.patch<Note>(`/notes/${id}/archive`);

export const unarchiveNote = (id: number) =>
  api.patch<Note>(`/notes/${id}/unarchive`);

export const addCategoryToNote = (noteId: number, categoryId: number) =>
  api.post(`/notes/${noteId}/categories/${categoryId}`);

export const removeCategoryFromNote = (noteId: number, categoryId: number) =>
  api.delete(`/notes/${noteId}/categories/${categoryId}`);
