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
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState("");

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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24, marginTop: 40 }}>
          <span
            onClick={() => { if (page > 1) { setPage(page - 1); window.scrollTo(0, 0); } }}
            style={{
              fontSize: 16,
              padding: "8px 16px",
              color: page > 1 ? theme.text : theme.faint,
              cursor: page > 1 ? "pointer" : "default",
            }}
          >
            ← Prev
          </span>

          {editing ? (
            <input
              autoFocus
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const num = parseInt(inputVal);
                  if (num >= 1 && num <= totalPages) {
                    setPage(num);
                    window.scrollTo(0, 0);
                  }
                  setEditing(false);
                }
                if (e.key === "Escape") setEditing(false);
              }}
              onBlur={() => setEditing(false)}
              style={{
                width: 40,
                textAlign: "center",
                fontSize: 15,
                fontFamily: serif,
                color: theme.text,
                background: theme.toggle,
                border: "none",
                borderRadius: 4,
                padding: "2px 4px",
                outline: "none",
              }}
            />
          ) : (
            <span
              onClick={() => { setEditing(true); setInputVal(String(page)); }}
              style={{ fontSize: 15, color: theme.muted, cursor: "pointer" }}
            >
              {page}
            </span>
          )}
          <span style={{ fontSize: 15, color: theme.muted }}>
            of {totalPages}
          </span>

          <span
            onClick={() => { if (page < totalPages) { setPage(page + 1); window.scrollTo(0, 0); } }}
            style={{
              fontSize: 16,
              padding: "8px 16px",
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