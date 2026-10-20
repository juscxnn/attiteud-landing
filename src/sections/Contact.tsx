import Reveal from "../components/Reveal";
import SectionIndex from "../components/SectionIndex";

export default function Contact() {
  return (
    <section
      id="contact"
      className="section section-signal contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <Reveal>
          <SectionIndex number="05" label="Contact" />
        </Reveal>

        <div className="contact-grid">
          <Reveal>
            <h2 id="contact-title" className="contact-title">
              Build something that acts
              <span className="contact-period">.</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="contact-copy">
              <p>
                For partnerships, investment, and exceptional people.
              </p>
              <a
                className="contact-email"
                href="mailto:justin@attiteud.com?subject=Attiteud%20enquiry"
              >
                justin@attiteud.com
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
