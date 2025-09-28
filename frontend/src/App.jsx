import React from "react";
import { Route, Routes } from "react-router";

// Import Pages
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
// Import Zustand Store
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { authUser, isLoading, login } = useAuthStore();

  console.log("Auth User: ", authUser);
  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-slate-900">
      {/* DECORATION - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f720_1px,transparent_1px),linear-gradient(to_bottom,#a855f720_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />
      <div className="absolute top-0 -left-4 size-96 bg-purple-500 opacity-30 blur-[150px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-amber-400 opacity-30 blur-[150px]" />
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
};

export default App;
