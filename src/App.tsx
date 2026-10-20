import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Manifesto from "./sections/Manifesto";
import Company from "./sections/Company";
import Focus from "./sections/Focus";
import Venture from "./sections/Venture";
import Independence from "./sections/Independence";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main" tabIndex={-1}>
        <Hero />
        <Manifesto />
        <Company />
        <Focus />
        <Venture />
        <Independence />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
