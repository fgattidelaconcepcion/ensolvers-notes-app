import * as categoryRepository from "../repositories/categoryRepository";

export async function listCategories() {
  return categoryRepository.getCategories();
}

export async function createCategory(name: string) {
  if (!name.trim()) {
    throw new Error("Name is required");
  }
  return categoryRepository.createCategory(name.trim());
}
