import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LogInPage } from "./screens/LogInPage";
import { Dashboard } from "./screens/Dashboard";
import { SessionHistory } from "./screens/SessionHistory";
import { Session } from "./screens/Session";
import { Profile } from "./screens/Profile";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/session-history" element={<SessionHistory />} />
        <Route path="/session" element={<Session />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
