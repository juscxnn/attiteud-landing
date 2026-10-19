import Wordmark from "../components/Wordmark";

const links = [
  { label: "Company", href: "#company" },
  { label: "Ventures", href: "#ventures" },
  { label: "Contact", href: "#contact" },
  { label: "Gatekeep", href: "https://gatekeep.vc", external: true },
];

export default function Footer() {
  return (
    <footer className="site-footer" data-tone="dark">
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
          <p>© {new Date().getFullYear()} Attiteud.</p>
          <p>Independent technology company.</p>
          <a href="#top" className="back-to-top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
