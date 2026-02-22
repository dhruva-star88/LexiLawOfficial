import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import UploadPage from "./Pages/UploadPage";
import BotPage from "./Pages/BotPage";
import AnalyzePage from "./Pages/AnalyzePage";
import BookLawyerSection from "./Pages/BookLawyerSection";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

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

      </Routes>
    </BrowserRouter>
  );
}