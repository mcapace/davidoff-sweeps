"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg py-3"
            : "bg-white/95 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <span className="font-serif text-2xl font-semibold text-davidoff-black">Davidoff</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-stone-700 hover:text-davidoff-black transition-colors duration-200 font-sans font-medium text-sm tracking-wide"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("sweepstakes")}
                className="bg-davidoff-black text-white px-6 py-2.5 rounded-md hover:bg-stone-800 transition-all duration-300 font-sans font-semibold text-sm shadow-md hover:shadow-lg"
              >
                Enter Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-davidoff-black transition-colors"
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
            className="fixed top-[104px] left-0 right-0 z-30 bg-white shadow-lg md:hidden overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-4 py-3 text-stone-700 hover:bg-stone-50 hover:text-davidoff-black transition-colors rounded-md font-sans font-medium text-sm"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("sweepstakes")}
                className="w-full bg-davidoff-black text-white px-6 py-3 rounded-md hover:bg-stone-800 transition-all duration-300 font-sans font-semibold text-sm"
              >
                Enter Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-[104px]" />
    </>
  );
}
