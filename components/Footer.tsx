"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [logoError, setLogoError] = useState(false);
  const [partnerLogoError, setPartnerLogoError] = useState(false);

  return (
    <footer ref={ref} className="bg-davidoff-black text-white">
      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="py-12 border-b border-stone-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-6">
            {/* Partnership Logos */}
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              {/* Davidoff Logo */}
              {!logoError ? (
                <Image
                  src="/images/logos/davidoff-logo.png"
                  alt="Davidoff"
                  width={240}
                  height={72}
                  className="h-14 sm:h-16 w-auto opacity-95"
                  onError={() => setLogoError(true)}
                  unoptimized
                />
              ) : (
                <div className="text-davidoff-gold font-serif text-2xl font-light tracking-wider">
                  DAVIDOFF
                </div>
              )}

              {/* Partnership "x" */}
              <span className="text-davidoff-gold text-xl sm:text-2xl font-light mx-2">×</span>

              {/* Cigar Aficionado Logo */}
              {!partnerLogoError ? (
                <Image
                  src="/images/logos/cigar-aficionado-logo.png"
                  alt="Cigar Aficionado"
                  width={180}
                  height={54}
                  className="h-12 sm:h-14 w-auto opacity-95"
                  onError={() => setPartnerLogoError(true)}
                  unoptimized
                />
              ) : (
                <div className="text-white font-sans text-lg sm:text-xl font-light">
                  Cigar Aficionado
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2">
            <p className="text-stone-400 text-xs font-light tracking-wide">
              © {new Date().getFullYear()} Davidoff. All rights reserved.
            </p>
            <p className="text-stone-500 text-xs font-light">
              In partnership with Cigar Aficionado
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
