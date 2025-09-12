import { Link } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import { LogOut, User } from "lucide-react";

export default function Hero() {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background-color)] shadow-soft">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-colors cursor-pointer"
        >
          Let Us Help
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors"
          >
            Home
          </Link>
          <a
            className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors"
            href="#services"
          >
            Services
          </a>
          <a
            className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors"
            href="#how-it-works"
          >
            How It Works
          </a>
          {user && (
            <Link
              to="/dashboard"
              className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--primary-color)]"></div>
          ) : user ? (
            // Authenticated user
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-[var(--text-color)]">
                  {user.first_name} {user.last_name}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                  {user.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-[var(--secondary-color)] font-semibold hover:text-[var(--primary-color)] transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            // Unauthenticated user
            <>
              <Link
                to="/auth"
                className="text-[var(--secondary-color)] font-semibold hover:text-[var(--primary-color)] transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/auth"
                className="bg-[var(--primary-color)] text-white font-semibold px-4 py-2 rounded-lg shadow-soft hover:opacity-90 transition-opacity"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-[var(--secondary-color)]">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
