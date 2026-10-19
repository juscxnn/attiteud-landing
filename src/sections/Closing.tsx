import Asterisk from "../components/Asterisk";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";

export default function Closing() {
  return (
    <section id="contact" className="section closing" aria-labelledby="closing-title">
      <Asterisk className="closing-asterisk" />

      <div className="container">
        <Reveal>
          <SectionLabel index="04">Contact</SectionLabel>
        </Reveal>

        <div className="closing-grid">
          <Reveal>
            <h2 id="closing-title" className="closing-title">
              The future is built deliberately<span className="accent">.</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="closing-copy">
              <p>For partnerships, investment, and general enquiries.</p>
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
