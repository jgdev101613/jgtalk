import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";

// Import Pages
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
// Import Components
import PageLoader from "./components/PageLoader";
// Import Zustand Store
import { useAuthStore } from "./store/useAuthStore";
// Toast
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-slate-900">
      <Toaster />
      {/* DECORATION - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f720_1px,transparent_1px),linear-gradient(to_bottom,#a855f720_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />
      <div className="absolute top-0 -left-4 size-96 bg-purple-500 opacity-30 blur-[150px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-amber-400 opacity-30 blur-[150px]" />
      <Routes>
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
