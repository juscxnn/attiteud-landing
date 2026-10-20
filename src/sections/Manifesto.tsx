import Reveal from "../components/Reveal";

export default function Manifesto() {
  return (
    <section className="manifesto" aria-label="Manifesto">
      <div className="container">
        <Reveal>
          <blockquote className="manifesto-quote">
            attiteud is a small thing that makes a big difference
            <span className="accent">.</span>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
