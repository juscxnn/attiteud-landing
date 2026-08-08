import { useEffect } from "react";
import { useLang } from "../hooks/useLang";

function detectBrowserLang(): "en" | "cn" | "fr" {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("zh")) return "cn";
  if (browserLang.startsWith("fr")) return "fr";
  return "en";
}

export default function LanguageRouter() {
  const { lang } = useLang();

  useEffect(() => {
    const segments = window.location.pathname.split("/").filter(Boolean);
    const validLangs = ["en", "cn", "fr"];
    const hasLangPrefix = segments.length > 0 && validLangs.includes(segments[0]);

    if (!hasLangPrefix) {
      const browserLang = detectBrowserLang();
      const rest = segments.length > 0 ? "/" + segments.join("/") : "";
      const newPath = `/${browserLang}${rest}`;
      window.history.replaceState(null, "", newPath);
    }
  }, []);

  useEffect(() => {
    const segments = window.location.pathname.split("/").filter(Boolean);
    const validLangs = ["en", "cn", "fr"];
    const hasLangPrefix = segments.length > 0 && validLangs.includes(segments[0]);

    if (hasLangPrefix && segments[0] !== lang) {
      const rest = segments.length > 1 ? "/" + segments.slice(1).join("/") : "";
      const newPath = `/${lang}${rest}`;
      window.history.replaceState(null, "", newPath);
    } else if (!hasLangPrefix) {
      const rest = segments.length > 0 ? "/" + segments.join("/") : "";
      const newPath = `/${lang}${rest}`;
      window.history.replaceState(null, "", newPath);
    }
  }, [lang]);

  return null;
}
