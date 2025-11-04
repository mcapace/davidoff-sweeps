"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Prizes", id: "prizes" },
    { label: "Enter Sweepstakes", id: "sweepstakes" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/98 backdrop-blur-md shadow-sm py-3 border-b border-stone-200"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              {!logoError ? (
                <Image
                  src="/images/logos/davidoff-logo.png"
                  alt="Davidoff"
                  width={180}
                  height={54}
                  className="h-10 sm:h-12 w-auto"
                  priority
                  onError={() => setLogoError(true)}
                  unoptimized
                />
              ) : (
                <span className={`font-serif text-xl font-light tracking-wider ${isScrolled ? 'text-davidoff-black' : 'text-davidoff-gold'}`}>
                  DAVIDOFF
                </span>
              )}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`transition-colors duration-200 font-sans font-light text-sm tracking-wider uppercase ${
                    isScrolled 
                      ? 'text-stone-900 hover:text-davidoff-black font-medium' 
                      : 'text-white hover:text-davidoff-gold font-medium'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("sweepstakes")}
                className={`px-6 py-2.5 rounded-sm transition-all duration-300 font-sans font-light text-sm tracking-wider uppercase ${
                  isScrolled
                    ? 'bg-davidoff-black text-white hover:bg-charcoal'
                    : 'bg-davidoff-gold text-davidoff-black hover:bg-davidoff-gold-dark'
                } shadow-md hover:shadow-lg`}
              >
                Enter Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${
                isScrolled ? 'text-stone-900 hover:text-davidoff-black' : 'text-white hover:text-davidoff-gold'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 right-0 z-30 bg-white/98 backdrop-blur-md shadow-lg md:hidden overflow-hidden border-b border-stone-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-4 py-3 text-stone-700 hover:bg-stone-50 hover:text-davidoff-black transition-colors rounded-sm font-sans font-light text-sm tracking-wider uppercase"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("sweepstakes")}
                className="w-full bg-davidoff-black text-white px-6 py-3 rounded-sm hover:bg-charcoal transition-all duration-300 font-sans font-light text-sm tracking-wider uppercase"
              >
                Enter Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className={isScrolled ? "h-[72px]" : "h-[96px]"} />
    </>
  );
}
