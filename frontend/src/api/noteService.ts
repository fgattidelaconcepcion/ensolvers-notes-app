import api from "./api";
import type { Note } from "../types/note";


export const getNotes = (archived: boolean = false) =>
  api.get<Note[]>(`/notes?archived=${archived}`);

export const getNote = (id: number) =>
  api.get<Note>(`/notes/${id}`);

export const createNote = (data: { title: string; content: string }) =>
  api.post<Note>("/notes", data);

export const updateNote = (id: number, data: { title: string; content: string }) =>
  api.put<Note>(`/notes/${id}`, data);

export const deleteNote = (id: number) =>
  api.delete(`/notes/${id}`);

export const archiveNote = (id: number) =>
  api.patch(`/notes/${id}/archive`);

export const unarchiveNote = (id: number) =>
  api.patch(`/notes/${id}/unarchive`);
