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
        <Link to="/" style={{ fontWeight: 500, fontSize: 20, letterSpacing: "-0.3px" }}
          onClick={() => setMenuOpen(false)}>
          Timothy Bernardo
        </Link>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ display: "flex", gap: 22, alignItems: "baseline" }}>
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              style={{
                fontSize: 16,
                color: pathname === path ? theme.text : theme.muted,
                paddingBottom: 2,
                borderBottom:
                  pathname === path
                    ? `1.5px solid ${theme.text}`
                    : "1.5px solid transparent",
              }}
            >
              {label}
            </Link>
          ))}
          <span
            onClick={onToggle}
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
          </span>
        </nav>

        {/* Mobile menu button */}
        <span
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            fontSize: 24,
            cursor: "pointer",
            color: theme.text,
            userSelect: "none",
            display: "none",
          }}
        >
          {menuOpen ? "×" : "≡"}
        </span>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <nav
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
              style={{
                fontSize: 20,
                color: pathname === path ? theme.text : theme.muted,
              }}
            >
              {label}
            </Link>
          ))}
          <span
            onClick={() => { onToggle(); setMenuOpen(false); }}
            style={{
              fontSize: 18,
              cursor: "pointer",
              color: theme.muted,
            }}
          >
            {isDark ? "Switch to Light" : "Switch to Dark"}
          </span>
        </nav>
      )}
    </header>
  );
}