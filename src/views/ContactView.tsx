import Asterisk from "../components/Asterisk";

interface ContactViewProps {
  active: boolean;
}

export default function ContactView({ active }: ContactViewProps) {
  return (
    <section
      id="contact"
      className={`view contact-view${active ? " is-active" : ""}`}
      aria-hidden={!active}
      inert={!active}
    >
      <Asterisk className="contact-asterisk" />

      <div className="view-inner">
        <div className="contact-grid">
          <h2 className="contact-title" data-view-heading tabIndex={-1}>
            The future is built deliberately
            <span className="accent">.</span>
          </h2>

          <div className="contact-copy">
            <p>For partnerships, investment, and general enquiries.</p>
            <a
              className="contact-email"
              href="mailto:justin@attiteud.com?subject=Attiteud%20enquiry"
            >
              justin@attiteud.com <span aria-hidden="true">↗</span>
            </a>
            <p className="contact-alt">
              See also{" "}
              <a
                href="https://gatekeep.vc"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gatekeep <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
