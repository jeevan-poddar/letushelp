import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users away from auth page
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Don't render if user is authenticated (prevents flash)
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {isLogin ? (
          <LoginForm onToggleForm={toggleForm} />
        ) : (
          <RegisterForm onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};
