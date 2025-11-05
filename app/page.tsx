import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import PrizesSection from "@/components/PrizesSection";
import SweepstakesSection from "@/components/SweepstakesSection";
import Footer from "@/components/Footer";
import SponsorshipBar from "@/components/SponsorshipBar";

export default function Home() {
  return (
    <>
      <SponsorshipBar />
      <Navbar />
      <main id="main-content">
        <Hero />
        <IntroSection />
        <PrizesSection />
        <SweepstakesSection />
        <Footer />
      </main>
    </>
  );
}
