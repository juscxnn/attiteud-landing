import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";

export default function Contact() {
  return (
    <section
      id="contact"
      className="section contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <Reveal>
          <SectionLabel number="05" label="Contact" />
        </Reveal>

        <div className="contact-grid">
          <Reveal>
            <h2 id="contact-title" className="contact-title">
              Start a conversation<span className="accent">.</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="contact-copy">
              <p>For partnerships, investment, and exceptional people.</p>
              <a
                className="email-link"
                href="mailto:justin@attiteud.com?subject=Attiteud%20enquiry"
              >
                justin@attiteud.com <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
