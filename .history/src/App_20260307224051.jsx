import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { themes, serif } from "./theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Photography from "./pages/Photography";

export default function App() {
  const [dark, setDark] = useState(false);
const theme = dark ? themes.dark : themes.light;
document.body.style.background = theme.bg;

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
      <Header theme={theme} isDark={dark} onToggle={() => setDark(!dark)} />

      <main style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: "0 24px 100px", flex: 1 }}>
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