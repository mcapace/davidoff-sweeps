"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gift, Award } from "lucide-react";

const prizes = [
  {
    rank: "1st Prize",
    title: "Davidoff Air de Famille Ambassador Humidor Ziricote",
    description: "One grand prize winner will receive the Davidoff Air de Famille Ambassador Humidor Ziricote that combines modern interior design with traditional humidor design. Crafted from rare Ziricote and mahogany sapele wood, this elegant humidor preserves 70 to 80 cigars in optimal condition thanks to its Davidoff Slim regulator that keeps relative humidity between 70 and 72%. A removable tray with two handles and a divider allows for easy sorting.",
    details: "Handmade in France, the humidor's refined design and its glossy finish make it a stylish masterpiece for the connoisseur's collection.",
    dimensions: "5.15 x 9.44 x 5.62 inches | 38.5 x 24 x 14.3 cm",
  },
  {
    rank: "2nd Prize",
    title: "Davidoff Travel Humidor Business",
    description: "Our second prize combines practicality with style for aficionados on the move. The Davidoff Travel Humidor Business with its smart tray keeps up to eight cigars of any format secure and perfectly humidified on every journey. Sleek, functional, lightweight and luxurious, it is the ideal companion for business or leisure travel.",
    details: "Two pockets on the inside offer space for a lighter and a cutter, and a hidden pocket for business cards add to the convenience aspect of the stylish piece. Made in Italy – bound for the world.",
    dimensions: "12.4 x 11.42\" | 31.5 x 29 cm",
  },
  {
    rank: "3rd Prize",
    title: "Davidoff Ashtray",
    description: "One winner will enjoy the timeless simplicity of the Davidoff Porcelain Ashtray. The recently launched elegant and functional accessory turns every cigar ritual into a statement of style and refinement.",
    details: "Handmade in France, the rectangular ashtray features two angled cigar notches, delicate, hand-applied golden lines, and a golden Davidoff logo – for a sophisticated enjoyment.",
    dimensions: "7.84 x 6.29 x 1.29\" | 20 x 16 x 3.3 cm",
  },
  {
    rank: "4th Prize",
    title: "Davidoff Winston Churchill Spirit Glass Set",
    description: "The fourth prize pays tribute to one of history's greatest statesmen. The Davidoff Winston Churchill Spirit Glass Set offers you the perfect place to rest your cigar in style. With two notches, this hefty cigar liquor glass will be the spotlight of every room.",
    details: "The set of two glasses is the perfect gift for every cigar aficionado and Winston Churchill fan. His silhouette is elegantly sandblasted at the bottom of the glass that was handmade in Europe by an expert company with 120 years of history of glass blowing.",
    dimensions: "3.14 x 3.14 x 3.54\" | 8 x 8 x 9 cm",
  },
  {
    rank: "5th Prize",
    title: "Davidoff Cigar Case Iconic XL-2",
    description: "Our fifth prize is a discreet yet refined travel companion crafted from finest cowhide and lamb chamois leather. The recently launched Davidoff Cigar Case Iconic is designed to protect your two most cherished cigars.",
    details: "Whatever the size or format, they are safely and stylishly carried in a superbly crafted leather companion that reflects your personal elegance. Crafted by the most skilled leather artisans in Spain, blending time-honoured tradition with contemporary sophistication.",
    dimensions: "Adjustable in length to accommodate two cigars of any format",
  },
];

export default function PrizesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="prizes" className="bg-gradient-to-br from-stone-50 via-white to-stone-50/20 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-4"
            >
              <Award className="w-16 h-16 text-davidoff-black mx-auto" strokeWidth={1.5} />
            </motion.div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-stone-900 mb-4 tracking-tight">
              Sweepstake Prizes
            </h2>
            <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto">
              Five exceptional prizes showcasing the artistry and expertise for which Davidoff is renowned
            </p>
          </div>

          {/* Prizes Grid */}
          <div className="space-y-8">
            {prizes.map((prize, index) => (
              <motion.div
                key={prize.rank}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-stone-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <Gift className="w-8 h-8 text-davidoff-black" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-gold bg-gold-light px-3 py-1 rounded-full">
                        {prize.rank}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 mb-3">
                      {prize.title}
                    </h3>
                    <p className="text-stone-700 leading-relaxed mb-3">
                      {prize.description}
                    </p>
                    <p className="text-stone-600 italic leading-relaxed mb-4">
                      {prize.details}
                    </p>
                    <div className="pt-4 border-t border-stone-200">
                      <p className="text-sm text-stone-600">
                        <strong className="text-stone-900">Dimensions:</strong> {prize.dimensions}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <p className="text-xl font-serif font-light text-stone-900 mb-4">
              Time Beautifully Filled. Enter Today.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

