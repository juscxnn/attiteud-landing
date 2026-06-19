import { useLang } from "../hooks/useLang";

const langOrder = ["en", "cn", "fr"] as const;
const langLabels: Record<string, string> = {
  en: "EN",
  cn: "中",
  fr: "FR",
};

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  const cycleLang = () => {
    const currentIndex = langOrder.indexOf(lang);
    const nextIndex = (currentIndex + 1) % langOrder.length;
    setLang(langOrder[nextIndex]);
  };

  return (
    <button
      onClick={cycleLang}
      className="font-mono"
      style={{
        background: "transparent",
        color: "#7a746d",
        border: "1px solid rgba(122, 118, 109, 0.2)",
        padding: "4px 10px",
        cursor: "pointer",
        fontSize: 11,
        letterSpacing: "0.06em",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#e8e4dc";
        e.currentTarget.style.borderColor = "rgba(232, 228, 220, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#7a746d";
        e.currentTarget.style.borderColor = "rgba(122, 118, 109, 0.2)";
      }}
    >
      {langLabels[lang]}
    </button>
  );
}
