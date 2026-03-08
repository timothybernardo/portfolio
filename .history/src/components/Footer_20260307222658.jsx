import Clock from "./Clock";
import { serif } from "../theme";

export default function Footer({ theme }) {
  return (
    <footer
      style={{
        maxWidth: 680,
        width: "100%",
        margin: "0 auto",
        padding: "20px 24px 28px",
        fontSize: 15,
        color: theme.faint,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: serif,
      }}
    >
      <span>&copy; 2026</span>
      <Clock color={theme.faint} />
    </footer>
  );
}