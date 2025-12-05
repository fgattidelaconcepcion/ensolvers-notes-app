import { Router } from "express";
import * as categoryController from "../controllers/categoryController";

const router = Router();

// GET /api/categories
router.get("/", categoryController.listCategories);

// POST /api/categories
router.post("/", categoryController.createCategory);

export default router;
