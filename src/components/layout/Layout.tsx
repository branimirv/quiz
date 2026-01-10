import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-slate-800">
            Quiz Maker 4 Rejd
          </h1>
          <p className="text-sm text-slate-500">Create and manage quizzes</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="border-t border-slate-200 mt-auto">
        <div className="container mx-auto px-4 py-4 text-right text-sm text-slate-500">
          by Branimir
        </div>
      </footer>
    </div>
  );
}
