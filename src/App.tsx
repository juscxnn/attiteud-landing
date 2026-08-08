import { useEffect, useCallback, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { LangProvider } from "./hooks/useLang";
import LanguageRouter from "./components/LanguageRouter";
import AsciiCanvas from "./components/AsciiCanvas";
import LoadingScreen from "./components/LoadingScreen";
import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import SocialProof from "./sections/SocialProof";
import Partnership from "./sections/Partnership";
import Capabilities from "./sections/Capabilities";
import UseCases from "./sections/UseCases";
import TechMarquee from "./components/TechMarquee";
import Research from "./sections/Research";
import Approach from "./sections/Approach";
import Pricing from "./sections/Pricing";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

gsap.registerPlugin(ScrollTrigger);

function AppInner() {
  const lenisRef = useRef<Lenis | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    lenis.stop();

    return () => { lenis.destroy(); };
  }, []);

  useEffect(() => {
    if (loaded && lenisRef.current) {
      lenisRef.current.start();
    }
  }, [loaded]);

  const handleScrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0 });
    } else if (el) {
      el.scrollIntoView();
    }
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <LanguageRouter />
      <LoadingScreen onComplete={handleLoadComplete} />
      <AsciiCanvas />
      <Navigation onScrollTo={handleScrollTo} />
      <main>
        <Hero onScrollTo={handleScrollTo} loaded={loaded} />
        <SocialProof onScrollTo={handleScrollTo} />
        <Partnership onScrollTo={handleScrollTo} />
        <Capabilities onScrollTo={handleScrollTo} />
        <UseCases onScrollTo={handleScrollTo} />
        <TechMarquee />
        <Research onScrollTo={handleScrollTo} />
        <Approach onScrollTo={handleScrollTo} />
        <Pricing onScrollTo={handleScrollTo} />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}

export default App;
