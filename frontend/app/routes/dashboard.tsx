import React from "react";
import { useAuth } from "~/contexts/AuthContext";
import { Header } from "~/components/Header";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";
import { UserDashboard } from "~/components/dashboard/UserDashboard";
import { ProviderDashboard } from "~/components/dashboard/ProviderDashboard";
export function meta() {
  return [
    { title: "Dashboard - LetUsHelp" },
    {
      name: "description",
      content: "Your personal dashboard",
    },
  ];
}

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.first_name}!
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.role === "provider"
                  ? "Manage your services and connect with customers"
                  : "Find and book services from trusted providers"}
              </p>
            </div>

            {user?.role === "provider" ? (
              <ProviderDashboard />
            ) : (
              <UserDashboard />
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
