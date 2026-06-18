import { useLang } from "../hooks/useLang";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer
      style={{
        backgroundColor: "rgba(10, 10, 10, 0.88)",
        borderTop: "1px solid rgba(232, 228, 220, 0.06)",
        padding: "32px clamp(24px, 4vw, 64px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        className="flex flex-col sm:flex-row items-center justify-between"
        style={{ maxWidth: 1100, margin: "0 auto", gap: 12 }}
      >
        <span
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: 15,
            color: "#7a746d",
            letterSpacing: "0.02em",
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          <span style={{ fontSize: 16, lineHeight: 1, marginRight: 1 }}>✽</span>
          <span>Attiteud</span>
          <span style={{ opacity: 0.5 }}>.</span>
        </span>
        <div className="flex items-center" style={{ gap: 24 }}>
          <span className="font-sans" style={{ fontSize: 13, color: "#5a544f" }}>
            {t("footer_privacy")}
          </span>
          <span className="font-sans" style={{ fontSize: 13, color: "#5a544f" }}>
            {t("footer_terms")}
          </span>
        </div>
      </div>
    </footer>
  );
}
