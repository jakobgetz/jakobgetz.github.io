"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Determine active theme on mount
    const root = document.documentElement;
    const initialTheme = root.getAttribute("data-theme") as "light" | "dark" | null;
    
    if (initialTheme) {
      setTheme(initialTheme);
    } else {
      const fallbackTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(fallbackTheme);
    }
    
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    
    const root = document.documentElement;
    root.setAttribute("data-theme", nextTheme);
    root.style.colorScheme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  };

  // Avoid hydration mismatch by rendering a placeholder of identical size
  if (!mounted) {
    return <div className={styles.placeholder} aria-hidden="true" />;
  }

  return (
    <button
      className={styles.toggleBtn}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className={styles.toggleIconContainer}>
        {theme === "light" ? (
          // Sun Icon (light mode)
          <svg
            className={styles.sunIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        ) : (
          // Moon Icon (dark mode)
          <svg
            className={styles.moonIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </div>
      <span className={styles.toggleText}>
        {theme === "light" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
