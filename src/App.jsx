import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { themes, serif } from "./theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Photography from "./pages/Photography";

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") return true;
  if (saved === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function App() {
  const [dark, setDark] = useState(getInitialTheme);
  const theme = dark ? themes.dark : themes.light;
  document.documentElement.style.background = theme.bg;
  document.body.style.background = theme.bg;

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Expose theme-dependent colors to CSS (focus ring, skip link)
  document.documentElement.style.setProperty("--focus", theme.focus);
  document.documentElement.style.setProperty("--skip-bg", theme.text);
  document.documentElement.style.setProperty("--skip-fg", theme.bg);

  // On route change: update the page title and move focus to <main> so
  // screen readers announce the new page instead of staying on the old link.
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const firstRender = useRef(true);
  useEffect(() => {
    const names = { "/": "Home", "/about": "About", "/projects": "Projects" };
    const name = pathname.startsWith("/photography")
      ? pathname === "/photography" ? "Photography" : "Photo"
      : names[pathname] || "Page not found";
    document.title = name === "Home" ? "Timothy Bernardo" : `${name} — Timothy Bernardo`;
    if (firstRender.current) { firstRender.current = false; return; }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div
      style={{
        fontFamily: serif,
        color: theme.text,
        minHeight: "100vh",
        background: theme.bg,
        display: "flex",
        flexDirection: "column",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header theme={theme} isDark={dark} onToggle={() => setDark(!dark)} />

      <main id="main" ref={mainRef} tabIndex={-1} style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: "0 24px 100px", flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/about" element={<About theme={theme} />} />
          <Route path="/projects" element={<Projects theme={theme} />} />
          <Route path="/photography" element={<Photography theme={theme} />} />
          <Route path="/photography/:id" element={<Photography theme={theme} />} />
        </Routes>
      </main>

      <Footer theme={theme} />
    </div>
  );
}