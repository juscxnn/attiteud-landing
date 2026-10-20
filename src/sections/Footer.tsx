import Wordmark from "../components/Wordmark";

const links = [
  { label: "Company", href: "#company" },
  { label: "Ventures", href: "#ventures" },
  { label: "Contact", href: "#contact" },
  { label: "Gatekeep", href: "https://gatekeep.vc", external: true },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Wordmark className="footer-wordmark" />
          <nav className="footer-nav" aria-label="Footer">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <span>Independent technology company.</span>
          <span>© 2026 Attiteud.</span>
        </div>
      </div>
    </footer>
  );
}
