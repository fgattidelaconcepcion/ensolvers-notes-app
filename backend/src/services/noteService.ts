import * as noteRepository from "../repositories/noteRepository";

export async function listNotes(params: { archived?: boolean }) {
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
