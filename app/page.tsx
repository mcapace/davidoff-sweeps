import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import PrizesSection from "@/components/PrizesSection";
import SweepstakesSection from "@/components/SweepstakesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IntroSection />
        <PrizesSection />
        <SweepstakesSection />
        <Footer />
      </main>
    </>
  );
}
