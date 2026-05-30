"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import styles from "./Navigation.module.css";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Blog", path: "/blog" },
  { label: "Projects", path: "/projects" },
  { label: "Publications", path: "/publications" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={`${styles.navContainer} content-container`}>
        <Link href="/" className={styles.logo}>
          JG<span className={styles.logoDot}>.</span>
        </Link>
        
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
