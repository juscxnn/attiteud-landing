import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import Company from "./sections/Company";
import Focus from "./sections/Focus";
import Ventures from "./sections/Ventures";
import Closing from "./sections/Closing";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Company />
        <Focus />
        <Ventures />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
