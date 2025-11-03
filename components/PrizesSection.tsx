"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Award } from "lucide-react";

const prizes = [
  {
    rank: "1st Prize",
    title: "Davidoff Air de Famille Ambassador Humidor Ziricote",
    description: "One grand prize winner will receive the Davidoff Air de Famille Ambassador Humidor Ziricote that combines modern interior design with traditional humidor design. Crafted from rare Ziricote and mahogany sapele wood, this elegant humidor preserves 70 to 80 cigars in optimal condition thanks to its Davidoff Slim regulator that keeps relative humidity between 70 and 72%. A removable tray with two handles and a divider allows for easy sorting.",
    details: "Handmade in France, the humidor's refined design and its glossy finish make it a stylish masterpiece for the connoisseur's collection.",
    dimensions: "5.15 x 9.44 x 5.62 inches | 38.5 x 24 x 14.3 cm",
    image: "/images/giveaway/prize-1.jpg",
  },
  {
    rank: "2nd Prize",
    title: "Davidoff Travel Humidor Business",
    description: "Our second prize combines practicality with style for aficionados on the move. The Davidoff Travel Humidor Business with its smart tray keeps up to eight cigars of any format secure and perfectly humidified on every journey. Sleek, functional, lightweight and luxurious, it is the ideal companion for business or leisure travel.",
    details: "Two pockets on the inside offer space for a lighter and a cutter, and a hidden pocket for business cards add to the convenience aspect of the stylish piece. Made in Italy – bound for the world.",
    dimensions: "12.4 x 11.42\" | 31.5 x 29 cm",
    image: "/images/giveaway/prize-2.jpg",
  },
  {
    rank: "3rd Prize",
    title: "Davidoff Ashtray",
    description: "One winner will enjoy the timeless simplicity of the Davidoff Porcelain Ashtray. The recently launched elegant and functional accessory turns every cigar ritual into a statement of style and refinement.",
    details: "Handmade in France, the rectangular ashtray features two angled cigar notches, delicate, hand-applied golden lines, and a golden Davidoff logo – for a sophisticated enjoyment.",
    dimensions: "7.84 x 6.29 x 1.29\" | 20 x 16 x 3.3 cm",
    image: "/images/giveaway/prize-3.jpg",
  },
  {
    rank: "4th Prize",
    title: "Davidoff Winston Churchill Spirit Glass Set",
    description: "The fourth prize pays tribute to one of history's greatest statesmen. The Davidoff Winston Churchill Spirit Glass Set offers you the perfect place to rest your cigar in style. With two notches, this hefty cigar liquor glass will be the spotlight of every room.",
    details: "The set of two glasses is the perfect gift for every cigar aficionado and Winston Churchill fan. His silhouette is elegantly sandblasted at the bottom of the glass that was handmade in Europe by an expert company with 120 years of history of glass blowing.",
    dimensions: "3.14 x 3.14 x 3.54\" | 8 x 8 x 9 cm",
    image: "/images/giveaway/prize-4.jpg",
  },
  {
    rank: "5th Prize",
    title: "Davidoff Cigar Case Iconic XL-2",
    description: "Our fifth prize is a discreet yet refined travel companion crafted from finest cowhide and lamb chamois leather. The recently launched Davidoff Cigar Case Iconic is designed to protect your two most cherished cigars.",
    details: "Whatever the size or format, they are safely and stylishly carried in a superbly crafted leather companion that reflects your personal elegance. Crafted by the most skilled leather artisans in Spain, blending time-honoured tradition with contemporary sophistication.",
    dimensions: "Adjustable in length to accommodate two cigars of any format",
    image: "/images/giveaway/prize-5.jpg",
  },
];

function PrizeImage({ src, alt, rank }: { src: string; alt: string; rank: string }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-stone-100 to-stone-200">
      {!imageError ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 768px) 100vw, 40vw"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            unoptimized
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-100">
              <div className="text-center p-8">
                <div className="text-4xl font-serif font-light text-davidoff-gold mb-2">
                  {rank.split(' ')[0]}
                </div>
                <div className="text-sm text-stone-600 font-light tracking-wider uppercase">
                  {rank.split(' ')[1]}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-4xl font-serif font-light text-davidoff-gold mb-2">
              {rank.split(' ')[0]}
            </div>
            <div className="text-sm text-stone-600 font-light tracking-wider uppercase">
              {rank.split(' ')[1]}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PrizesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="prizes" className="bg-gradient-to-br from-cream via-ivory to-cream py-20 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-davidoff-gold to-transparent mx-auto mb-4" />
              <Award className="w-12 h-12 text-davidoff-gold mx-auto mb-4" strokeWidth={1.5} />
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-davidoff-gold to-transparent mx-auto" />
            </motion.div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-davidoff-black mb-4 tracking-tight">
              Sweepstake Prizes
            </h2>
            <p className="text-lg sm:text-xl text-stone-700 max-w-2xl mx-auto font-light">
              Five exceptional prizes showcasing the artistry and expertise for which Davidoff is renowned
            </p>
          </div>

          {/* Prizes Grid */}
          <div className="space-y-12">
            {prizes.map((prize, index) => (
              <motion.div
                key={prize.rank}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-sm shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Image Column */}
                  <div className="md:col-span-2 relative aspect-square md:aspect-auto md:h-full min-h-[300px]">
                    <PrizeImage src={prize.image} alt={prize.title} rank={prize.rank} />
                  </div>

                  {/* Content Column */}
                  <div className="md:col-span-3 p-8 sm:p-10">
                    <div className="mb-4">
                      <span className="inline-block text-xs font-light tracking-widest uppercase text-davidoff-gold bg-davidoff-gold-light px-3 py-1 mb-4">
                        {prize.rank}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-davidoff-black mb-4 leading-tight">
                      {prize.title}
                    </h3>
                    <p className="text-stone-700 leading-relaxed mb-4 font-light">
                      {prize.description}
                    </p>
                    <p className="text-stone-600 italic leading-relaxed mb-6 font-light">
                      {prize.details}
                    </p>
                    <div className="pt-6 border-t border-stone-200">
                      <p className="text-xs text-stone-500 font-light tracking-wide">
                        <span className="text-stone-700">Dimensions:</span> {prize.dimensions}
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
            className="text-center mt-16 pt-12 border-t border-stone-300"
          >
            <p className="text-2xl sm:text-3xl font-serif font-light text-davidoff-black tracking-tight">
              Time Beautifully Filled. Enter Today.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
