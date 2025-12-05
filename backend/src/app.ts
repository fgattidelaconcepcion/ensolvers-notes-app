import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import authRoutes from "./routes/authRoutes";
import { requireAuth } from "./middlewares/authMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

//  Rutas de auth (NO protegidas)
app.use("/api/auth", authRoutes);

//  Rutas protegidas (requieren token)
app.use("/api/notes", requireAuth, noteRoutes);
app.use("/api/categories", requireAuth, categoryRoutes);

export default app;
