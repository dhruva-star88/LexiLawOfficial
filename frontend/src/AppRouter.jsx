import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import UploadPage from "./Pages/UploadPage";
import NotFound from "./Pages/NotFound";
import BotPage from "./Pages/BotPage";
import AnalyzePage from "./Pages/AnalyzePage";
import BookLawyerSection from "./Pages/BookLawyerSection";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/ProfilePage/Profile";
import Settings from "./components/ProfilePage/Settings";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bot"
          element={
            <ProtectedRoute>
              <BotPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analyze"
          element={
            <ProtectedRoute>
              <AnalyzePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <BookLawyerSection />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}