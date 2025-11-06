"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [logoError, setLogoError] = useState(false);

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
            {/* Davidoff Logo */}
            {!logoError ? (
              <Image
                src="/images/logos/davidoff-logo-white.png"
                alt="Davidoff - Time Beautifully Filled"
                width={360}
                height={108}
                className="h-16 sm:h-20 w-auto opacity-95"
                onError={() => setLogoError(true)}
                unoptimized
              />
            ) : (
              <div className="text-davidoff-gold font-serif text-2xl font-light tracking-wider">
                DAVIDOFF
              </div>
            )}
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
            <p className="text-stone-300 text-xs font-light tracking-wide">
              © {new Date().getFullYear()} Davidoff. All rights reserved.
            </p>
            <p className="text-stone-300 text-xs font-light">
              In partnership with Cigar Aficionado
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-stone-800">
              <a
                href="/privacy-policy"
                className="text-stone-300 hover:text-davidoff-gold text-xs font-light underline underline-offset-2 transition-colors"
                aria-label="View Privacy Policy"
              >
                Privacy Policy
              </a>
              <span className="text-stone-400">•</span>
              <a
                href="/official-rules"
                className="text-stone-300 hover:text-davidoff-gold text-xs font-light underline underline-offset-2 transition-colors"
                aria-label="View Official Sweepstakes Rules"
              >
                Official Rules
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
