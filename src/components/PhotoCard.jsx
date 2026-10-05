import { useState } from "react";
import { Link } from "react-router-dom";
import { serif } from "../theme";

export default function PhotoCard({ photo, theme }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      to={`/photography/${photo.id}`}
      aria-label={`${photo.title}, ${photo.cat}. View photo`}
      style={{ display: "block", breakInside: "avoid", marginBottom: 24 }}
    >
      <img
        src={photo.thumb}
        alt={`${photo.title} — film photograph, ${photo.cat}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          borderRadius: 3,
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = loaded ? "1" : "0")}
      />
      <p style={{ margin: "10px 0 2px", fontFamily: serif, fontSize: 16, fontWeight: 500 }}>
        {photo.title}
      </p>
      <p style={{ margin: 0, fontFamily: serif, fontSize: 14, color: theme.muted }}>
        {photo.cat}
      </p>
    </Link>
  );
}