import { useNavigate } from "react-router-dom";
import { serif } from "../theme";

export default function PhotoCard({ photo, theme }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/photography/${photo.id}`)}
      style={{ breakInside: "avoid", marginBottom: 24, cursor: "pointer" }}
    >
      <img
        src={photo.thumb}
        alt={photo.title}
        loading="lazy"
        style={{
          width: "100%",
          borderRadius: 3,
          display: "block",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      />
      <p style={{ margin: "10px 0 2px", fontFamily: serif, fontSize: 16, fontWeight: 500 }}>
        {photo.title}
      </p>
      <p style={{ margin: 0, fontFamily: serif, fontSize: 14, color: theme.muted }}>
        {photo.cat}
      </p>
    </div>
  );
}