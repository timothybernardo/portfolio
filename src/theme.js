export const serif = "'EB Garamond', Georgia, 'Times New Roman', serif";

// All text colors meet WCAG AA (4.5:1) against their theme's background.
// Light (bg #fafaf8): text 18.1, sub 9.3, muted 6.7, faint 5.1
// Dark  (bg #131313): text 14.1, sub 8.8, muted 6.2, faint 5.1
// pillB (outlines on inactive filter buttons) meets 3:1 for UI components.
export const themes = {
  light: {
    bg: "#fafaf8",
    text: "#111111",
    sub: "#444444",
    muted: "#595959",
    faint: "#6b6b6b",
    border: "#ece9e5",
    pill: "#111111",
    pillT: "#ffffff",
    pillB: "#8a8a8a",
    badge: "rgba(255,255,255,0.3)",
    toggle: "#eeeeee",
    toggleTxt: "#444444",
    focus: "#0b57d0",
  },
  dark: {
    bg: "#131313",
    text: "#e4e0da",
    sub: "#b8b2ab",
    muted: "#9a948d",
    faint: "#8a857e",
    border: "#282624",
    pill: "#e4e0da",
    pillT: "#131313",
    pillB: "#6f6a63",
    badge: "rgba(255,255,255,0.18)",
    toggle: "#282624",
    toggleTxt: "#b8b2ab",
    focus: "#8ab4f8",
  },
};
