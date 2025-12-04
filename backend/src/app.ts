import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Rutas de notas
app.use("/api/notes", noteRoutes);

export default app;
