# 📒 Ensolvers Notes App — Full Stack Implementation Exercise

This project is a full-stack notes management SPA that allows users to create, edit, delete, archive, and categorize notes. It was developed as part of the **Ensolvers Hiring Technical Challenge**.

The app consists of a **React frontend**, and a **Node.js + Express + Prisma backend**, with **SQLite persistence** and **JWT authentication**.

---

##  Features

### ✔ Phase 1 (Required)
- Create notes
- Edit notes
- Delete notes
- Archive / Unarchive notes
- List active notes
- List archived notes

###  Phase 2 (Extra Points)
- Add / remove categories to notes
- Filter notes by category

###  Additional Features
- Login screen with authentication
- JWT-protected note & category endpoints
- Password encryption with bcrypt
- Relational DB using Prisma ORM (no mock or in-memory DB)

---

##  Technologies Used

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + TypeScript |
| Backend | Node.js + Express + TypeScript |
| ORM | Prisma |
| Database | SQLite |
| Auth | JWT + bcrypt |

---

##  Requirements

| Tool | Version |
|------|--------|
| Node.js | 18.x or higher |
| npm | 9.x or higher |
| Bash/Zsh | Required for running the startup script |
| SQLite | Installed automatically via Prisma |

---

##  Default Login Credentials

| Field | Value |
|-------|-------|
| **Email** | `admin@example.com` |
| **Password** | `admin123` |

These are automatically created on server startup.

---
##  Quick Start (Linux/macOS)

The entire application (backend + frontend + DB setup) can be started with **one command**.

###  Run the setup script

```bash
chmod +x run.sh
./run.sh

Running Manually 
Backend
cd backend
npm install
npx prisma migrate dev
npm run dev

Frontend
cd frontend
npm install
npm run dev

API Authentication

All note and category endpoints are protected via JWT.
Requests must include the token in the header:

Authorization: Bearer <token>
