import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { serif } from "../theme";
import photos from "../data/photos";
import PhotoCard from "../components/PhotoCard";

const categories = ["All", ...new Set(photos.map((p) => p.cat))];

function Gallery({ theme }) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? photos : photos.filter((p) => p.cat === filter);

  return (
    <div style={{ marginTop: 56, fontFamily: serif }}>
      <h2 style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.3px", marginBottom: 4 }}>
        Photography
      </h2>
      <p style={{ fontSize: 18, color: theme.muted, marginBottom: 28, fontStyle: "italic" }}>
        Shot on Konica C35 AF · 35mm film
      </p>
      <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <span
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              fontFamily: serif,
              fontSize: 14,
              cursor: "pointer",
              padding: "5px 14px",
              borderRadius: 20,
              background: filter === cat ? theme.pill : "transparent",
              color: filter === cat ? theme.pillT : theme.muted,
              border: filter === cat ? "none" : `1px solid ${theme.pillB}`,
            }}
          >
            {cat}
          </span>
        ))}
      </div>
      <div style={{ columnCount: 2, columnGap: 20 }}>
        {filtered.map((p) => (
          <PhotoCard key={p.id} photo={p} theme={theme} />
        ))}
      </div>
    </div>
  );
}

function PhotoDetail({ theme }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const photo = photos.find((p) => p.id === parseInt(id));

  if (!photo) return <p>Photo not found.</p>;

  return (
    <div style={{ marginTop: 56, fontFamily: serif }}>
      <span
        onClick={() => navigate("/photography")}
        style={{ fontSize: 15, color: theme.muted, cursor: "pointer", display: "inline-block", marginBottom: 24 }}
      >
        ← Back
      </span>
      <img
        src={photo.img}
        alt={photo.title}
        style={{
          width: "100%",
          borderRadius: 3,
          display: "block",
          marginBottom: 28,
        }}
      />
      <h2 style={{ fontSize: 26, fontWeight: 500, marginBottom: 4 }}>{photo.title}</h2>
      <p style={{ fontSize: 15, color: theme.muted, marginBottom: 4 }}>{photo.cat}</p>
      {photo.desc && (
        <p style={{ fontSize: 18, color: theme.sub, lineHeight: 1.8, marginTop: 20 }}>
          {photo.desc}
        </p>
      )}
    </div>
  );
}

export default function Photography({ theme }) {
  const { id } = useParams();
  return id ? <PhotoDetail theme={theme} /> : <Gallery theme={theme} />;
}