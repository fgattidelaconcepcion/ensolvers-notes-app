import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export interface LoginResult {
  token: string;
  email: string;
}

export async function login(email: string, password: string): Promise<LoginResult> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, email: user.email };
}

export async function ensureDefaultAdminUser() {
  const DEFAULT_EMAIL = "admin@example.com";
  const DEFAULT_PASSWORD = "admin123";

  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);

  // upsert: si existe lo actualiza con esta password, si no existe lo crea
  await prisma.user.upsert({
    where: { email: DEFAULT_EMAIL },
    update: { passwordHash },
    create: {
      email: DEFAULT_EMAIL,
      passwordHash,
    },
  });

  console.log(
    `Default admin user ensured -> email: ${DEFAULT_EMAIL} / password: ${DEFAULT_PASSWORD}`
  );
}
