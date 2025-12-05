import { Request, Response } from "express";
import { login } from "../services/authService";

export async function loginHandler(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const result = await login(email, password);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid credentials" });
  }
}
