import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { serif } from "../theme";
import photos from "../data/photos";
import PhotoCard from "../components/PhotoCard";

const categories = ["All", ...new Set(photos.map((p) => p.cat))];
const PER_PAGE = 12;

function Gallery({ theme }) {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = filter === "All" ? photos : photos.filter((p) => p.cat === filter);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <div style={{ marginTop: 56, fontFamily: serif }}>
      <h2 style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.3px", marginBottom: 4 }}>
        Photography
      </h2>
      <p style={{ fontSize: 18, color: theme.muted, marginBottom: 0, fontStyle: "italic" }}>
        Shot on Konica C35 AF & Minolta AF Tele. 
      </p>
      <p style={{ fontSize: 18, color: theme.muted, marginBottom: 28, fontStyle: "italic" }}>
         Film Stocks include Portra 400 and Ultramax 400.
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
        {visible.map((p) => (
          <PhotoCard key={p.id} photo={p} theme={theme} />
        ))}
      </div>

      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 40 }}>
          <span
            onClick={() => { if (page > 1) { setPage(page - 1); window.scrollTo(0, 0); } }}
            style={{
              fontSize: 15,
              color: page > 1 ? theme.text : theme.faint,
              cursor: page > 1 ? "pointer" : "default",
            }}
          >
            ← Prev
          </span>

          <div style={{ display: "flex", gap: 8 }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <span
                key={n}
                onClick={() => { setPage(n); window.scrollTo(0, 0); }}
                style={{
                  fontSize: 15,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  cursor: "pointer",
                  background: page === n ? theme.pill : "transparent",
                  color: page === n ? theme.pillT : theme.muted,
                }}
              >
                {n}
              </span>
            ))}
          </div>

          <span
            onClick={() => { if (page < totalPages) { setPage(page + 1); window.scrollTo(0, 0); } }}
            style={{
              fontSize: 15,
              color: page < totalPages ? theme.text : theme.faint,
              cursor: page < totalPages ? "pointer" : "default",
            }}
          >
            Next →
          </span>
        </div>
      )}
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
        src={photo.full}
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
    </div>
  );
}

export default function Photography({ theme }) {
  const { id } = useParams();
  return id ? <PhotoDetail theme={theme} /> : <Gallery theme={theme} />;
}