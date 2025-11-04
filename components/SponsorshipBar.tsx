"use client";

import { motion } from "framer-motion";

export default function SponsorshipBar() {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black text-white text-center py-2 px-4"
      style={{ backgroundColor: '#000000' }}
    >
      <p className="text-xs font-light tracking-wider uppercase text-white">
        Paid Sponsorship
      </p>
    </motion.div>
  );
}

