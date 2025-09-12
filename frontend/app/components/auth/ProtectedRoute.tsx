import React from "react";
import { useAuth } from "~/contexts/AuthContext";
import { AuthPage } from "./AuthPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: "user" | "provider";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireRole,
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  if (requireRole && user.role !== requireRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-4">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-500">
            Required role: {requireRole} | Your role: {user.role}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
