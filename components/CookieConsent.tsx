"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Cookie, Shield, BarChart3, Megaphone } from "lucide-react";
import Link from "next/link";

type CookieCategory = "essential" | "analytics" | "marketing";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CATEGORIES = {
  essential: {
    name: "Essential Cookies",
    description: "These cookies are necessary for the website to function properly. They cannot be disabled.",
    required: true,
    icon: Shield,
  },
  analytics: {
    name: "Analytics Cookies",
    description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
    required: false,
    icon: BarChart3,
  },
  marketing: {
    name: "Marketing Cookies",
    description: "These cookies are used to track visitors across websites to display relevant advertisements.",
    required: false,
    icon: Megaphone,
  },
};

const COOKIE_STORAGE_KEY = "davidoff_cookie_consent";
const COOKIE_PREFERENCES_KEY = "davidoff_cookie_preferences";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    // Check if user has already consented
    const consent = localStorage.getItem(COOKIE_STORAGE_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

    if (!consent) {
      setShowBanner(true);
    } else if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
      } catch (e) {
        console.error("Error parsing cookie preferences:", e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
    setShowBanner(false);
  };

  const handleAcceptEssential = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(essentialOnly);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(COOKIE_STORAGE_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    
    // Apply cookie preferences
    applyCookiePreferences(prefs);
    
    // Dispatch event for other components to listen to
    window.dispatchEvent(new CustomEvent("cookiePreferencesUpdated", { detail: prefs }));
  };

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Essential cookies are always enabled
    if (prefs.analytics) {
      // Enable analytics tracking
      // This is where you would initialize analytics if needed
      console.log("Analytics cookies enabled");
    } else {
      // Disable analytics tracking
      console.log("Analytics cookies disabled");
    }

    if (prefs.marketing) {
      // Enable marketing tracking
      console.log("Marketing cookies enabled");
    } else {
      // Disable marketing tracking
      console.log("Marketing cookies disabled");
    }
  };

  const togglePreference = (category: CookieCategory) => {
    if (category === "essential") return; // Essential cookies cannot be disabled
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const openSettings = () => {
    setShowSettings(true);
    setShowBanner(false);
  };

  const closeSettings = () => {
    setShowSettings(false);
    // If preferences were never saved, show banner again
    if (typeof window === 'undefined') return;
    const consent = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  };

  if (!showBanner && !showSettings) {
    // Show settings button if user has already consented
    // Only check in browser environment
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (consent) {
        return (
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={() => setShowSettings(true)}
              className="bg-davidoff-black text-white px-4 py-2 rounded-sm shadow-lg hover:bg-stone-800 transition-colors flex items-center gap-2 text-sm font-light"
              aria-label="Cookie Settings"
            >
              <Settings className="w-4 h-4" />
              Cookie Settings
            </button>
          </div>
        );
      }
    }
    return null;
  }

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <Cookie className="w-6 h-6 text-davidoff-gold flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-davidoff-black mb-2">
                        We Value Your Privacy
                      </h4>
                      <p className="text-sm text-stone-700 leading-relaxed font-light">
                        We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                        By clicking &quot;Accept All&quot;, you consent to our use of cookies. You can also choose to accept only 
                        essential cookies or customize your preferences.{" "}
                        <Link href="/privacy-policy" className="text-davidoff-gold hover:text-davidoff-gold-dark underline underline-offset-2" aria-label="Read our Privacy Policy for cookie and data usage information">
                          Learn more
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <button
                    onClick={openSettings}
                    className="px-6 py-2.5 border-2 border-stone-600 text-stone-700 hover:bg-stone-50 rounded-sm transition-colors text-sm font-light whitespace-nowrap"
                  >
                    Customize
                  </button>
                  <button
                    onClick={handleAcceptEssential}
                    className="px-6 py-2.5 border-2 border-stone-600 text-stone-700 hover:bg-stone-50 rounded-sm transition-colors text-sm font-light whitespace-nowrap"
                  >
                    Essential Only
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-2.5 bg-davidoff-gold text-davidoff-black hover:bg-davidoff-gold-dark rounded-sm transition-colors text-sm font-semibold whitespace-nowrap border-2 border-davidoff-gold-dark"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSettings}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-semibold text-davidoff-black">
                    Cookie Preferences
                  </h3>
                  <button
                    onClick={closeSettings}
                    className="text-stone-700 hover:text-stone-900 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <p className="text-sm text-stone-700 leading-relaxed font-light">
                    We use cookies to improve your experience on our website. You can choose which types of cookies you&apos;re comfortable with. 
                    Essential cookies are required for the website to function properly and cannot be disabled.{" "}
                    <Link href="/privacy-policy" className="text-davidoff-gold hover:text-davidoff-gold-dark underline underline-offset-2" aria-label="Read our Privacy Policy for cookie and data usage information">
                      Read our Privacy Policy
                    </Link>
                  </p>

                  <div className="space-y-4">
                    {(Object.keys(COOKIE_CATEGORIES) as CookieCategory[]).map((category) => {
                      const categoryInfo = COOKIE_CATEGORIES[category];
                      const Icon = categoryInfo.icon;
                      const isEnabled = preferences[category];

                      return (
                        <div
                          key={category}
                          className={`border rounded-lg p-4 ${
                            categoryInfo.required
                              ? "bg-stone-50 border-stone-300"
                              : "border-stone-200"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Icon className="w-5 h-5 text-davidoff-gold" />
                                <h4 className="font-serif font-semibold text-davidoff-black">
                                  {categoryInfo.name}
                                  {categoryInfo.required && (
                                    <span className="ml-2 text-xs text-stone-700 font-normal">
                                      (Required)
                                    </span>
                                  )}
                                </h4>
                              </div>
                              <p className="text-sm text-stone-700 leading-relaxed font-light">
                                {categoryInfo.description}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isEnabled}
                                onChange={() => togglePreference(category)}
                                disabled={categoryInfo.required}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-davidoff-gold/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-davidoff-gold peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row gap-3 justify-end">
                    <button
                      onClick={closeSettings}
                      className="px-6 py-2.5 border-2 border-stone-600 text-stone-700 hover:bg-stone-50 rounded-sm transition-colors text-sm font-light"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSavePreferences}
                      className="px-6 py-2.5 bg-davidoff-gold text-davidoff-black hover:bg-davidoff-gold-dark rounded-sm transition-colors text-sm font-semibold"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

