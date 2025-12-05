import * as noteRepository from "../repositories/noteRepository";
import * as categoryRepository from "../repositories/categoryRepository";

export async function listNotes(params: { archived?: boolean; categoryId?: number }) {
  return noteRepository.getNotes(params);
}

export async function getNote(id: number) {
  const note = await noteRepository.getNoteById(id);
  if (!note) {
    throw new Error("Note not found");
  }
  return note;
}

export async function createNote(data: { title: string; content: string }) {
  if (!data.title || !data.content) {
    throw new Error("Title and content are required");
  }
  return noteRepository.createNote(data);
}

export async function updateNote(id: number, data: { title?: string; content?: string }) {
  await getNote(id);
  return noteRepository.updateNote(id, data);
}

export async function deleteNote(id: number) {
  await getNote(id);
  return noteRepository.deleteNote(id);
}

export async function archiveNote(id: number) {
  await getNote(id);
  return noteRepository.updateNote(id, { archived: true });
}

export async function unarchiveNote(id: number) {
  await getNote(id);
  return noteRepository.updateNote(id, { archived: false });
}

export async function addCategoryToNote(noteId: number, categoryId: number) {
  const note = await getNote(noteId);
  const category = await categoryRepository.getCategoryById(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }
  await noteRepository.addCategoryToNote(note.id, category.id);
  return getNote(noteId);
}

export async function removeCategoryFromNote(noteId: number, categoryId: number) {
  await getNote(noteId);
  await noteRepository.removeCategoryFromNote(noteId, categoryId);
  return getNote(noteId);
}
