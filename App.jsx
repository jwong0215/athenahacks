// App.jsx
import { useState, useEffect } from "react";
import AuthPage from "./components/auth/AuthPage";
import ProfilePage from "./components/profile/ProfilePage";
import Dashboard from "./components/dashboard/Dashboard";
import StudyRoom from "./components/studyroom/StudyRoom";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [currentPage, setCurrentPage] = useState("dashboard"); // dashboard | profile | studyroom
  const [currentSession, setCurrentSession] = useState(null);   // Store session data when entering study room

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("studySyncUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.isLoggedIn) {
        setIsLoggedIn(true);
        setUsername(user.username);
      }
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("studySyncUser");
    setIsLoggedIn(false);
    setUsername("");
    setCurrentPage("dashboard");
    setCurrentSession(null);
  };

  const handleJoinSession = (session) => {
    setCurrentSession(session);
    setCurrentPage("studyroom");
  };

  const handleExitStudyRoom = () => {
    setCurrentPage("dashboard");
    setCurrentSession(null);
  };

  // Show Auth Page if not logged in
  if (!isLoggedIn) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen">
      {/* Global Navigation Bar */}
      {currentPage !== "studyroom" && (
        <nav className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-10">
              <div 
                onClick={() => setCurrentPage("dashboard")}
                className={`cursor-pointer font-medium text-lg transition-colors ${
                  currentPage === "dashboard" ? "text-indigo-600" : "text-stone-500 hover:text-stone-700"
                }`}
              >
                Dashboard
              </div>
              <div 
                onClick={() => setCurrentPage("profile")}
                className={`cursor-pointer font-medium text-lg transition-colors ${
                  currentPage === "profile" ? "text-indigo-600" : "text-stone-500 hover:text-stone-700"
                }`}
              >
                Profile
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-stone-600">Hi, {username}</span>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Page Rendering */}
      {currentPage === "dashboard" && (
        <Dashboard onJoinSession={handleJoinSession} />
      )}

      {currentPage === "profile" && (
        <ProfilePage username={username} onLogout={handleLogout} />
      )}

      {currentPage === "studyroom" && currentSession && (
        <StudyRoom 
          session={currentSession} 
          onExit={handleExitStudyRoom} 
        />
      )}
    </div>
  );
}