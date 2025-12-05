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

export async function getNotes(options?: { archived?: boolean; categoryId?: number }) {
  const { archived, categoryId } = options || {};

  return prisma.note.findMany({
    where: {
      ...(archived === undefined ? {} : { archived }),
      ...(categoryId
        ? {
            categories: {
              some: { categoryId },
            },
          }
        : {}),
    },
    orderBy: { id: "desc" },
    include: {
      categories: {
        include: { category: true },
      },
    },
  });
}

export async function getNoteById(id: number) {
  return prisma.note.findUnique({
    where: { id },
    include: {
      categories: {
        include: { category: true },
      },
    },
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
  // 1) Primero borrar las categorías asociadas a la nota
  await prisma.noteCategory.deleteMany({
    where: { noteId: id },
  });

  // 2) Después borrar la nota
  return prisma.note.delete({
    where: { id },
  });
}


export async function addCategoryToNote(noteId: number, categoryId: number) {
  return prisma.noteCategory.create({
    data: {
      noteId,
      categoryId,
    },
  });
}

export async function removeCategoryFromNote(noteId: number, categoryId: number) {
  return prisma.noteCategory.deleteMany({
    where: {
      noteId,
      categoryId,
    },
  });
}
