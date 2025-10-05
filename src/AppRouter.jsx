import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import UploadPage from "./UploadPage";
import BotPage from './BotPage';
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/bot" element={<BotPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}