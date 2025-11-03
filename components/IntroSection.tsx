"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 text-center mb-8">
            Time Beautifully Filled
          </h2>
          
          <p className="text-lg text-stone-700 leading-relaxed text-center">
            Davidoff accessories transform every stage of the cigar ritual into a moment of refinement. 
            From the careful selection of a cigar to its perfect cut, from the first draw to the preservation 
            of its character, each accessory is crafted to enhance your experience.
          </p>

          <p className="text-lg text-stone-700 leading-relaxed text-center">
            Protect your cigars in humidors that safeguard aroma and flavour until the perfect moment of 
            enjoyment. Add refinement to every pause with ashtrays that bring elegance and order to the setting. 
            Protect your favourites on the go with travel cases that ensure your ritual continues wherever time 
            may take you.
          </p>

          <p className="text-lg text-stone-700 leading-relaxed text-center font-medium">
            With precision and timeless design, Davidoff accessories elevate every stage of the experience 
            and make each moment beautifully filled.
          </p>

          <div className="pt-8 text-center">
            <p className="text-base text-stone-600">
              For more information on Davidoff accessories and cigars, please visit{' '}
              <a 
                href="https://www.davidoffgeneva.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-davidoff-black hover:underline font-medium"
              >
                davidoffgeneva.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

