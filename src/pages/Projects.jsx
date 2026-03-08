import { serif } from "../theme";
import projects from "../data/projects";

export default function Projects({ theme }) {
  return (
    <div style={{ marginTop: 56, fontFamily: serif }}>
      <h2 style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.3px", marginBottom: 8 }}>
        Projects
      </h2>
      <p style={{ fontSize: 18, color: theme.muted, marginBottom: 44, fontStyle: "italic" }}>
        Things I've built.
      </p>
      {projects.map((p, i) => (
        <div
          key={i}
          style={{
            marginBottom: 40,
            paddingBottom: 40,
            borderBottom: i < projects.length - 1 ? `1px solid ${theme.border}` : "none",
          }}
        >
         <div style={{ marginBottom: 10 }}>
            <h3 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: theme.text }}
              >
                {p.title}
              </a>
            </h3>
          </div>
          <p style={{ fontSize: 17, color: theme.sub, lineHeight: 1.75, margin: "0 0 14px" }}>
            {p.desc}
          </p>
          <span style={{ fontSize: 15, color: theme.faint }}>{p.tags.join("  ·  ")}</span>
        </div>
      ))}
    </div>
  );
}