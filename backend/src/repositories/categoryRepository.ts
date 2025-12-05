import prisma from "../prisma";

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function createCategory(name: string) {
  return prisma.category.create({
    data: { name },
  });
}

export async function getCategoryById(id: number) {
  return prisma.category.findUnique({
    where: { id },
  });
}
