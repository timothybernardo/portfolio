import { serif } from "../theme";

const links = [
  { label: "Email", href: "mailto:bernardo.t@northeastern.edu" },
  { label: "GitHub", href: "https://github.com/timothybernardo" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/timothybernardo/" },
  { label: "Discogs", href: "https://www.discogs.com/user/timrthy" },
];

export default function Home({ theme }) {
  return (
    <div style={{ marginTop: 100, fontFamily: serif }}>
      <h1
        style={{
          fontSize: 44,
          fontWeight: 500,
          lineHeight: 1.25,
          letterSpacing: "-0.5px",
          marginBottom: 24,
        }}
      >
        I build things, take photos,
        <br />
        and stay curious.
      </h1>
      <p style={{ fontSize: 20, color: theme.sub, lineHeight: 1.75, maxWidth: 480, marginBottom: 10 }}>
        Computer Science student at Northeastern University's Khoury College. From Jersey City, now in Boston.
      </p>
      <p style={{ fontSize: 20, color: theme.sub, lineHeight: 1.75, maxWidth: 480, marginBottom: 44 }}>
        Passionate about AI, software design, and shooting film photography.
      </p>
      <div style={{ display: "flex", gap: 24 }}>
        {links.map(({ label, href }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 16, color: theme.muted, transition: "color 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = theme.text)}
            onMouseLeave={(e) => (e.currentTarget.style.color = theme.muted)}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}