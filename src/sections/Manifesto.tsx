import HorizonMark from "../components/HorizonMark";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";

export default function Manifesto() {
  return (
    <section
      className="manifesto paper"
      data-header-theme="light"
      aria-labelledby="manifesto-title"
    >
      <div className="container">
        <Reveal>
          <SectionLabel number="00" label="Manifesto" />
        </Reveal>

        <Reveal delay={80}>
          <h2 id="manifesto-title" className="manifesto-quote">
            attiteud is a small thing that makes a big difference
            <span className="accent">.</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <div className="manifesto-foot">
            <HorizonMark className="manifesto-mark" />
            <span>The long horizon</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
