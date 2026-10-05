import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { serif } from "../theme";

const links = [
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/photography", label: "Photography" },
];

export default function Header({ theme, onToggle, isDark }) {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        maxWidth: 680,
        width: "100%",
        margin: "0 auto",
        padding: "32px 24px 0",
        fontFamily: serif,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <Link to="/" aria-label="Timothy Bernardo, home" style={{ fontWeight: 500, fontSize: 20, letterSpacing: "-0.3px" }}
          onClick={() => setMenuOpen(false)}>
          Timothy Bernardo
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="desktop-nav" style={{ display: "flex", gap: 22, alignItems: "baseline" }}>
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              aria-current={pathname.startsWith(path) ? "page" : undefined}
              style={{
                fontSize: 16,
                color: pathname.startsWith(path) ? theme.text : theme.muted,
                paddingBottom: 2,
                borderBottom:
                  pathname.startsWith(path)
                    ? `1.5px solid ${theme.text}`
                    : "1.5px solid transparent",
              }}
            >
              {label}
            </Link>
          ))}
          <button
            type="button"
            onClick={onToggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              fontFamily: serif,
              fontSize: 15,
              cursor: "pointer",
              padding: "4px 12px",
              borderRadius: 14,
              background: theme.toggle,
              color: theme.toggleTxt,
              marginLeft: 6,
              userSelect: "none",
            }}
          >
            {isDark ? "Light" : "Dark"}
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            fontSize: 24,
            cursor: "pointer",
            color: theme.text,
            userSelect: "none",
            display: "none",
            padding: "0 4px",
          }}
        >
          <span aria-hidden="true">{menuOpen ? "×" : "≡"}</span>
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="mobile-nav"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 18,
            paddingTop: 24,
            paddingBottom: 8,
          }}
        >
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              aria-current={pathname.startsWith(path) ? "page" : undefined}
              style={{
                fontSize: 20,
                color: pathname.startsWith(path) ? theme.text : theme.muted,
              }}
            >
              {label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => { onToggle(); setMenuOpen(false); }}
            style={{
              fontSize: 18,
              cursor: "pointer",
              color: theme.muted,
              textAlign: "left",
              fontFamily: serif,
            }}
          >
            {isDark ? "Switch to Light" : "Switch to Dark"}
          </button>
        </nav>
      )}
    </header>
  );
}