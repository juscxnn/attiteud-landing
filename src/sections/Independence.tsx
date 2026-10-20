import Reveal from "../components/Reveal";

export default function Independence() {
  return (
    <section
      id="independence"
      className="section independence"
      aria-labelledby="independence-title"
    >
      <div className="container independence-grid">
        <Reveal>
          <h2 id="independence-title" className="display independence-title">
            Independent by design.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="independence-copy">
            <p>
              Attiteud is privately held and built for the long term. We don't
              sell time. We build, own, and operate the systems we choose.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
