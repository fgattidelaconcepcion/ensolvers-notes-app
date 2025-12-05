import { Request, Response } from "express";
import * as categoryService from "../services/categoryService";

export async function listCategories(_req: Request, res: Response) {
  try {
    const categories = await categoryService.listCategories();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error listing categories" });
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const category = await categoryService.createCategory(name);
    res.status(201).json(category);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ message: err.message || "Error creating category" });
  }
}
