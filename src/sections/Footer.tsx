import Wordmark from "../components/Wordmark";

const links = [
  { label: "Systems", href: "#systems" },
  { label: "Venture", href: "#venture" },
  { label: "Company", href: "#company" },
  { label: "Contact", href: "#contact" },
  { label: "Gatekeep", href: "https://gatekeep.vc", external: true },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Wordmark className="footer-wordmark" />
            <p>Software that acts.</p>
          </div>

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
          <a href="#top" className="footer-top-link">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
