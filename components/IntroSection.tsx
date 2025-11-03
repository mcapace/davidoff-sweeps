"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-ivory py-20 sm:py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-davidoff-gold to-transparent mx-auto mb-4" />
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-davidoff-black tracking-tight mb-4">
                Time Beautifully Filled
              </h2>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-davidoff-gold to-transparent mx-auto" />
            </motion.div>
          </div>
          
          <div className="space-y-6 text-stone-700 leading-relaxed">
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

            <p className="text-xl sm:text-2xl text-center font-light text-davidoff-black mt-8">
              With precision and timeless design, Davidoff accessories elevate every stage of the experience 
              and make each moment beautifully filled.
            </p>
          </div>

          <div className="pt-12 text-center">
            <div className="inline-block border-t border-stone-300 pt-6">
              <p className="text-sm text-stone-600 font-light tracking-wide">
                For more information on Davidoff accessories and cigars, please visit{' '}
                <a 
                  href="https://www.davidoffgeneva.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-davidoff-black hover:text-davidoff-gold transition-colors font-normal underline underline-offset-4"
                >
                  davidoffgeneva.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
