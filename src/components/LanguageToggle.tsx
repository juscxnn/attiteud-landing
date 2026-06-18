import { useLang } from "../hooks/useLang";

const flags: Record<string, string> = {
  en: "🇬🇧",
  cn: "🇨🇳",
  fr: "🇫🇷",
};

export default function LanguageToggle() {
  const { lang, setLang, t } = useLang();
  const langs = ["en", "cn", "fr"] as const;

  return (
    <div
      className="font-mono"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        fontSize: 11,
        letterSpacing: "0.06em",
      }}
    >
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            background: lang === l ? "rgba(196, 92, 38, 0.15)" : "transparent",
            color: lang === l ? "#c45c26" : "#7a746d",
            border: "1px solid",
            borderColor: lang === l ? "rgba(196, 92, 38, 0.3)" : "transparent",
            padding: "4px 10px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: "inherit",
            fontSize: "inherit",
            letterSpacing: "inherit",
          }}
          onMouseEnter={(e) => {
            if (lang !== l) {
              e.currentTarget.style.color = "#e8e4dc";
            }
          }}
          onMouseLeave={(e) => {
            if (lang !== l) {
              e.currentTarget.style.color = "#7a746d";
            }
          }}
        >
          {flags[l]} {t(`lang_${l}`)}
        </button>
      ))}
    </div>
  );
}
