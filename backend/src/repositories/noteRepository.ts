import prisma from "../prisma";

export interface NoteCreateInput {
  title: string;
  content: string;
}

export interface NoteUpdateInput {
  title?: string;
  content?: string;
  archived?: boolean;
}

export async function getNotes(options?: { archived?: boolean }) {
  const { archived } = options || {};

  return prisma.note.findMany({
    where: archived === undefined ? {} : { archived },
    orderBy: { createdAt: "desc" },
  });
}

export async function getNoteById(id: number) {
  return prisma.note.findUnique({
    where: { id },
  });
}

export async function createNote(data: NoteCreateInput) {
  return prisma.note.create({
    data,
  });
}

export async function updateNote(id: number, data: NoteUpdateInput) {
  return prisma.note.update({
    where: { id },
    data,
  });
}

export async function deleteNote(id: number) {
  return prisma.note.delete({
    where: { id },
  });
}
