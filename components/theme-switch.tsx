"use client";

import { useTheme } from "@/context/theme-context";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-20 right-20 bg-white w-10 h-10 bg-opacity-80 backdrop-blur-md border-white border shadow-2xl rounded-full flex items-center justify-center"
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </button>
  );
}
