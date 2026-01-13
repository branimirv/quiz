import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container max-w-5xl mx-auto px-4 py-4">
          <Link to="/">
            <h1 className="text-2xl font-bold text-slate-800">
              Quiz Maker 4 Rejd
            </h1>
            <p className="text-sm text-slate-500">Create and manage quizzes</p>
          </Link>
        </div>
      </header>
      <main>
        <div className="container max-w-5xl mx-auto px-4 py-8 flex-1">
          {children}
        </div>
      </main>
      <footer className="border-t border-slate-200 mt-auto">
        <div className="container max-w-5xl mx-auto px-4 py-4 text-right text-sm text-slate-500">
          by Branimir
        </div>
      </footer>
    </div>
  );
}
