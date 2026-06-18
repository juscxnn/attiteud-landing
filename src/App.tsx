import { useEffect, useCallback, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { LangProvider } from "./hooks/useLang";
import AsciiCanvas from "./components/AsciiCanvas";
import LoadingScreen from "./components/LoadingScreen";
import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import Capabilities from "./sections/Capabilities";
import Pricing from "./sections/Pricing";
import Research from "./sections/Research";
import Approach from "./sections/Approach";
import UseCases from "./sections/UseCases";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import SocialProof from "./sections/SocialProof";

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

    // Stop scroll during loading
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
      <LoadingScreen onComplete={handleLoadComplete} />
      <AsciiCanvas />
      <Navigation onScrollTo={handleScrollTo} />
      <main>
        <Hero onScrollTo={handleScrollTo} loaded={loaded} />
        <Capabilities onScrollTo={handleScrollTo} />
        <Pricing onScrollTo={handleScrollTo} />
        <Research onScrollTo={handleScrollTo} />
        <SocialProof onScrollTo={handleScrollTo} />
        <Approach onScrollTo={handleScrollTo} />
        <UseCases onScrollTo={handleScrollTo} />
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
