"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <button className="p-2 relative text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 transition-all duration-300 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:bg-zinc-800/30 backdrop-blur-md rounded-xl shadow-sm border border-white/40 dark:border-white/5 w-10 h-10 flex items-center justify-center">
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 relative text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-all duration-300 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 hover:bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-800/30 dark:hover:bg-zinc-800 backdrop-blur-md rounded-xl shadow-sm hover:shadow-md border border-white/40 dark:border-white/5 w-10 h-10 flex items-center justify-center"
      title="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
