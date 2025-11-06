"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-gradient-to-b from-cream via-ivory to-cream py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-sm p-8 sm:p-10 lg:p-12"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-davidoff-gold to-transparent mx-auto mb-4" />
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-davidoff-black tracking-tight mb-4">
                Time Beautifully Filled
              </h2>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-davidoff-gold to-transparent mx-auto" />
            </motion.div>
          </div>
          
          <div className="space-y-5 text-stone-700 leading-relaxed">
            <p className="text-lg sm:text-xl text-center font-light">
              Davidoff accessories transform every stage of the cigar ritual into a moment of refinement. 
              From the careful selection of a cigar to its perfect cut, from the first draw to the preservation 
              of its character, each accessory is crafted to enhance your experience.
            </p>

            <p className="text-lg sm:text-xl text-center font-light">
              Protect your cigars in humidors that safeguard aroma and flavour until the perfect moment of 
              enjoyment. Add refinement to every pause with ashtrays that bring elegance and order to the setting. 
              Protect your favourites on the go with travel cases that ensure your ritual continues wherever time 
              may take you.
            </p>

            <p className="text-xl sm:text-2xl text-center font-light text-davidoff-black mt-6 font-medium">
              With precision and timeless design, Davidoff accessories elevate every stage of the experience 
              and make each moment beautifully filled.
            </p>
          </div>

          <div className="pt-8 text-center border-t border-stone-200 mt-8">
            <p className="text-base sm:text-lg text-stone-700 font-light tracking-wide">
              For more information on Davidoff accessories and cigars, please visit davidoffgeneva.com
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
