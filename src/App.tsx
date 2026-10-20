import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Thesis from "./sections/Thesis";
import Systems from "./sections/Systems";
import Venture from "./sections/Venture";
import Company from "./sections/Company";
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
        <Thesis />
        <Systems />
        <Venture />
        <Company />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
