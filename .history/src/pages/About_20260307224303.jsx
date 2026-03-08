import { serif } from "../theme";
import { experience, education, skills, courses } from "../data/experience";

export default function About({ theme }) {
  return (
    <div style={{ marginTop: 56, fontFamily: serif }}>
      <h2 style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.3px", marginBottom: 20 }}>
        About
      </h2>
      <p style={{ fontSize: 19, color: theme.sub, lineHeight: 1.85, maxWidth: 560, marginBottom: 12 }}>
        I'm a Computer Science student at Northeastern's Khoury College from Jersey City, New Jersey.
        I care about artificial intelligence, software design, and the ethical side of AI in the real world.
      </p>
      <p style={{ fontSize: 19, color: theme.sub, lineHeight: 1.85, maxWidth: 560, marginBottom: 56 }}>
        Outside of code, I shoot film. I also boulder,
        collect vinyl records, read fiction, and thrift second-hand clothing.
      </p>

      {/* Experience */}
      <h3 style={{ fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: "2px", color: theme.faint, marginBottom: 28 }}>
        Experience
      </h3>
      {experience.map((e, i) => (
        <div key={i} style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 19, fontWeight: 500 }}>{e.role}</span>
            <span style={{ fontSize: 15, color: theme.faint }}>{e.period}</span>
          </div>
          <span style={{ fontSize: 16, color: theme.muted }}>{e.place}</span>
          <p style={{ fontSize: 17, color: theme.sub, lineHeight: 1.75, margin: "8px 0 0" }}>
            {e.desc}
          </p>
        </div>
      ))}

      {/* Education */}
      <h3 style={{ fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: "2px", color: theme.faint, marginBottom: 28, marginTop: 52 }}>
        Education
      </h3>
      {education.map((ed, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 19, fontWeight: 500 }}>{ed.school}</span>
            <span style={{ fontSize: 15, color: theme.faint }}>{ed.period}</span>
          </div>
          <span style={{ fontSize: 17, color: theme.sub, display: "block", marginTop: 2 }}>{ed.degree}</span>
          {ed.detail && (
            <span style={{ fontSize: 16, color: theme.muted, display: "block", marginTop: 4 }}>{ed.detail}</span>
          )}
        </div>
      ))}

      {/* Coursework */}
      <h3 style={{ fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: "2px", color: theme.faint, marginBottom: 16, marginTop: 52 }}>
        Relevant Coursework
      </h3>
      <p style={{ fontSize: 17, color: theme.sub, lineHeight: 2 }}>
        {courses.join("  ·  ")}
      </p>

      {/* Skills */}
      <h3 style={{ fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: "2px", color: theme.faint, marginBottom: 16, marginTop: 52 }}>
        Skills
      </h3>
      <p style={{ fontSize: 17, color: theme.sub, lineHeight: 2 }}>
        {skills.join("  ·  ")}
      </p>
    </div>
  );
}