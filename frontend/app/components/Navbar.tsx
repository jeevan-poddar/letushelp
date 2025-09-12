import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "~/contexts/AuthContext";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-20 bg-[var(--background-color)]/90 backdrop-blur supports-backdrop-blur:bg-[var(--background-color)] border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-9 rounded-md text-[var(--text-color)] hover:bg-[var(--accent-color)] focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
        >
          <span className="material-symbols-outlined text-[22px]">
            arrow_back
          </span>
        </button>

        <Link
          to="/"
          className="text-lg font-bold text-[var(--text-color)] hover:opacity-80"
        >
          LetUsHelp
        </Link>

        {user ? (
          <Link
            to="/dashboard"
            className="text-sm font-medium text-[var(--text-color)] hover:opacity-80"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            to="/auth"
            className="text-sm font-medium text-[var(--text-color)] hover:opacity-80"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
