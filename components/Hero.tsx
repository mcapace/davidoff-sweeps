"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { CigarIcon } from "./CigarIcon";
import { useState, useRef, useEffect } from "react";

export default function Hero() {
  const [logoError, setLogoError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure video plays and loops
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Set up error handling
      const handleError = (e: Event) => {
        console.error("Video error:", e, video.error);
        setVideoError(true);
      };

      const handleLoadStart = () => {
        console.log("Video loading started");
      };

      video.addEventListener('error', handleError);
      video.addEventListener('loadstart', handleLoadStart);

      // Try to load and play the video
      video.load(); // Explicitly load the video
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Video autoplay failed:", error);
          // Don't set error state for autoplay failures - video might still load
        });
      }

      return () => {
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadstart', handleLoadStart);
      };
    }
  }, []);

  const scrollToSweepstakes = () => {
    const sweepsSection = document.getElementById('sweepstakes');
    if (sweepsSection) {
      sweepsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative h-[90vh] min-h-[700px] max-h-[1000px] w-full overflow-hidden bg-gradient-to-br from-davidoff-black via-davidoff-black-soft to-charcoal">
      {/* Video Background */}
      <div className="absolute inset-0">
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectFit: 'cover',
              opacity: 0.4,
            }}
            onError={(e) => {
              console.error("Video error:", e);
              const video = videoRef.current;
              if (video && video.error) {
                console.error("Video error code:", video.error.code, "Message:", video.error.message);
              }
              setVideoError(true);
            }}
            onLoadedData={() => {
              console.log("Video data loaded successfully");
            }}
            onCanPlay={() => {
              console.log("Video can play");
            }}
            onLoadedMetadata={() => {
              console.log("Video metadata loaded");
            }}
          >
            <source src="/images/davacc_humtravl_buss_vdo_1920x1080px.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-davidoff-black via-davidoff-black-soft to-charcoal" />
        )}
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        {/* Elegant Background Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.03)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        </div>

        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40 40 0 1 1 80 0a40 40 0 1 1 -80 0' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Davidoff Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 flex items-center justify-center"
        >
          {!logoError ? (
            <Image
              src="/images/logos/davidoff-logo-white.png"
              alt="Davidoff"
              width={360}
              height={108}
              className="h-24 sm:h-28 md:h-32 w-auto opacity-95"
              priority
              onError={() => setLogoError(true)}
              unoptimized
            />
          ) : (
            <div className="text-davidoff-gold font-serif text-4xl sm:text-5xl tracking-wider font-light">
              DAVIDOFF
            </div>
          )}
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif font-light text-white text-center mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] tracking-tight"
        >
          <span className="block text-white">Accessories</span>
          <span className="block text-davidoff-gold font-normal mt-2">Sweepstakes</span>
        </motion.h1>

        {/* Elegant Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-davidoff-gold to-transparent mb-8"
        />

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif font-light text-stone-200 text-lg sm:text-xl md:text-2xl text-center mb-4 max-w-3xl leading-relaxed"
        >
          To celebrate craftsmanship and time beautifully filled
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-serif font-light text-stone-300 text-base sm:text-lg text-center mb-10 max-w-2xl leading-relaxed"
        >
          Five refined accessories, each designed to elevate your every cigar moment
        </motion.p>

        {/* Mobile CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          onClick={scrollToSweepstakes}
          className="md:hidden bg-davidoff-gold hover:bg-davidoff-gold-dark text-davidoff-black px-8 py-3 rounded-sm font-light text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 mb-4"
        >
          <CigarIcon className="w-4 h-4" />
          Enter Now
        </motion.button>

        {/* Animated Chevron */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="w-8 h-8 text-davidoff-gold/60" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
