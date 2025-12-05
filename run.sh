#!/bin/bash

echo "🚀 Starting Ensolvers Notes App setup..."

# Navigate to backend
echo "📦 Installing backend dependencies..."
cd backend || exit
npm install

echo "🗄️ Running database migrations..."
npx prisma migrate dev --name init

echo "🔐 Starting backend..."
npm run dev &
BACKEND_PID=$!

# Navigate to frontend
echo "📦 Installing frontend dependencies..."
cd ../frontend || exit
npm install

echo "🎨 Starting frontend..."
npm run dev &

echo ""
echo "✨ Setup complete! App running on:"
echo "➡️ Backend: http://localhost:4000"
echo "➡️ Frontend: http://localhost:5173"
echo ""
echo "🔐 Default Login:"
echo "   Email: admin@example.com"
echo "   Password: admin123"
echo ""

wait $BACKEND_PID
