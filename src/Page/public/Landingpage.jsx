import Navbar from "../../Components/Navbar";
import Hero from "../../Components/Hero";
import About from "../../Components/About";
import Footer from "../../Components/Footer";
import Services from "../../Components/Service";
import Consul from "../../Components/Consul";
import CTA from "../../Components/Cta";

export default function Landingpage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Consul />
      <CTA />
      <Footer />
    </>
  );
}
