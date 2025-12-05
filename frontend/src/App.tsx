import { useState } from "react";
import NotesPage from "./pages/NotesPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("auth_token");
  });

  const handleLoggedIn = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLoggedIn={handleLoggedIn} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold">Ensolvers Notes</h1>
        <button
          className="text-sm text-red-600 underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <NotesPage />
    </div>
  );
}

export default App;
