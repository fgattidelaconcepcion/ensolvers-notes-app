import app from "./app";
import { ensureDefaultAdminUser } from "./services/authService";

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    // Crea el usuario admin por defecto si no existe
    await ensureDefaultAdminUser();

    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

void start();
