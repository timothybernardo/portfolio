import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { serif } from "../theme";
import photos from "../data/photos";
import PhotoCard from "../components/PhotoCard";

const categories = ["All", ...[...new Set(photos.map((p) => p.cat))].sort()];
const PER_PAGE = 12;

function Gallery({ theme }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("filter") || "All");
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const filtered = filter === "All" ? photos : photos.filter((p) => p.cat === filter);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    const params = {};
    if (filter !== "All") params.filter = filter;
    if (page > 1) params.page = String(page);
    setSearchParams(params, { replace: true });
  }, [filter, page, setSearchParams]);

  const changeFilter = (cat) => {
    setFilter(cat);
    setPage(1);
  };

  return (
    <div style={{ marginTop: 56, fontFamily: serif }}>
      <h2 style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.3px", marginBottom: 4 }}>
        Photography
      </h2>
      <p style={{ fontSize: 18, color: theme.muted, marginBottom: 0, fontStyle: "italic" }}>
        Shot on Konica C35 AF, Minolta AF Tele, and Konica Minolta Zoom 160c Date.
      </p>
      <p style={{ fontSize: 18, color: theme.muted, marginBottom: 28, fontStyle: "italic" }}>
         Film Stocks include Portra 400, Fuji 200, Ultramax 400.
      </p>
      <div role="group" aria-label="Filter photos by location" style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => changeFilter(cat)}
            aria-pressed={filter === cat}
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
          </button>
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {filtered.length} {filter === "All" ? "" : `${filter} `}photos, page {page} of {totalPages}.
      </p>

      <div style={{ columnCount: 2, columnGap: 20 }}>
        {visible.map((p) => (
          <PhotoCard key={p.id} photo={p} theme={theme} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav aria-label="Photo pages" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24, marginTop: 40 }}>
          <button
            type="button"
            onClick={() => { setPage(page - 1); window.scrollTo(0, 0); }}
            disabled={page <= 1}
            aria-label="Previous page"
            style={{
              fontSize: 16,
              padding: "8px 16px",
              color: page > 1 ? theme.text : theme.faint,
              cursor: page > 1 ? "pointer" : "default",
            }}
          >
            <span aria-hidden="true">← </span>Prev
          </button>

          {editing ? (
            <input
              autoFocus
              type="number"
              aria-label={`Go to page, 1 to ${totalPages}`}
              inputMode="numeric"
              pattern="[0-9]*"
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
                  e.target.blur();
                }
                if (e.key === "Escape") { setEditing(false); e.target.blur(); }
              }}
              onBlur={() => {
                const num = parseInt(inputVal);
                if (num >= 1 && num <= totalPages) {
                  setPage(num);
                  window.scrollTo(0, 0);
                }
                setEditing(false);
              }}
              style={{
                width: 48,
                textAlign: "center",
                fontSize: 16,
                fontFamily: serif,
                color: theme.text,
                background: theme.toggle,
                border: "none",
                borderRadius: 6,
                padding: "6px 4px",
                outline: "none",
                appearance: "none",
                MozAppearance: "textfield",
              }}
            />
          ) : (
            <button
              type="button"
              onClick={() => { setEditing(true); setInputVal(String(page)); }}
              aria-label={`Page ${page} of ${totalPages}. Activate to jump to a page`}
              style={{ fontSize: 15, color: theme.muted, cursor: "pointer" }}
            >
              {page}
            </button>
          )}
          <span aria-hidden="true" style={{ fontSize: 15, color: theme.muted }}>
            of {totalPages}
          </span>

          <button
            type="button"
            onClick={() => { setPage(page + 1); window.scrollTo(0, 0); }}
            disabled={page >= totalPages}
            aria-label="Next page"
            style={{
              fontSize: 16,
              padding: "8px 16px",
              color: page < totalPages ? theme.text : theme.faint,
              cursor: page < totalPages ? "pointer" : "default",
            }}
          >
            Next<span aria-hidden="true"> →</span>
          </button>
        </nav>
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
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Back to gallery"
        style={{ fontSize: 15, color: theme.muted, cursor: "pointer", display: "inline-block", marginBottom: 24, fontFamily: serif }}
      >
        <span aria-hidden="true">← </span>Back
      </button>
      <img
        src={photo.full}
        alt={`${photo.title} — film photograph, ${photo.cat}`}
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