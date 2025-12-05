import type { Category } from "./category";

export interface NoteCategory {
  id: number;
  category: Category;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  archived: boolean;
  createdAt: string;
  categories: NoteCategory[];
}
