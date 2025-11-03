"use client";

import { motion } from "framer-motion";
import { ChevronDown, Gift } from "lucide-react";

export default function Hero() {
  const scrollToSweepstakes = () => {
    const sweepsSection = document.getElementById('sweepstakes');
    if (sweepsSection) {
      sweepsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] max-h-[900px] w-full overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif font-light text-white text-center mb-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tight"
        >
          Davidoff Accessories
          <br />
          Sweepstakes
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif font-light text-stone-200 text-xl sm:text-2xl md:text-3xl text-center mb-6 max-w-3xl"
        >
          To celebrate craftsmanship and time beautifully filled, Davidoff has partnered with Cigar Aficionado to present an exclusive sweepstakes.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif font-light text-stone-300 text-lg sm:text-xl text-center mb-8 max-w-2xl"
        >
          You now have the chance to win one of five refined Davidoff accessories, each designed to elevate your every cigar moment.
        </motion.p>

        {/* Mobile CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={scrollToSweepstakes}
          className="md:hidden bg-gold hover:bg-gold/90 text-stone-900 px-6 py-3 rounded-lg font-bold text-base shadow-2xl hover:shadow-gold/50 transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2 mb-4"
        >
          <Gift className="w-5 h-5" />
          Enter Now
        </motion.button>

        {/* Animated Chevron */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="w-10 h-10 text-stone-200" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
