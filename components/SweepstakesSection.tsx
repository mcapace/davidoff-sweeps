"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { CigarIcon } from "./CigarIcon";

// US States list
const US_STATES = [
  { code: '', name: 'Select State' },
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
  { code: 'DC', name: 'District of Columbia' },
];

export default function SweepstakesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    agreeToRules: false,
    agreeToEmails: false,
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/sweepstakes-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage("Almost there! Check your email to verify your address. Once verified, you'll get your sweepstakes confirmation!");
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          agreeToRules: false,
          agreeToEmails: false,
        });
        
        // Scroll to success message
        setTimeout(() => {
          const successEl = document.getElementById('success-message');
          if (successEl) {
            successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      } else {
        throw new Error(data.message || data.error || 'Failed to submit entry');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="sweepstakes" ref={ref} className="bg-gradient-to-br from-white via-cream to-ivory py-20 sm:py-24 lg:py-32">
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
              <CigarIcon className="w-12 h-12 text-davidoff-gold mx-auto mb-4" strokeWidth={1.5} aria-hidden={true} />
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-davidoff-gold to-transparent mx-auto" />
            </motion.div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-davidoff-black mb-4 tracking-tight">
              Enter to Win
            </h2>
            <p className="text-lg sm:text-xl text-stone-700 max-w-2xl mx-auto mb-6 font-light">
              Your chance to win one of five refined Davidoff accessories
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-5 py-2 bg-davidoff-gold-light border-2 border-davidoff-gold-dark rounded-sm">
              <Sparkles className="w-4 h-4 text-davidoff-gold" aria-hidden="true" />
              <span className="text-xs font-light tracking-wider uppercase text-davidoff-black">NO PURCHASE NECESSARY</span>
            </div>
          </div>

          {/* Main Container */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Left Column - Prize Summary */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Prize Summary Card */}
              <div className="bg-white rounded-sm shadow-sm p-8 border-2 border-stone-600">
                <h3 className="font-serif text-2xl font-light text-davidoff-black mb-6 flex items-center gap-3">
                  <CigarIcon className="w-5 h-5 text-davidoff-gold" aria-hidden={true} />
                  Five Exceptional Prizes
                </h3>
                <p className="text-stone-700 mb-6 font-light leading-relaxed">
                  Take this opportunity to enter to win one of five exceptional prizes showcasing the artistry and expertise for which Davidoff is renowned.
                </p>
                <ul className="space-y-3 text-stone-800 text-sm mb-6 font-light">
                  <li className="flex items-start gap-3">
                    <span className="text-stone-700 font-medium mt-0.5 text-xs tracking-wider w-10 text-right flex-shrink-0">1ST</span>
                    <span className="font-light text-stone-800">Davidoff Air de Famille Ambassador Humidor Ziricote</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-stone-700 font-medium mt-0.5 text-xs tracking-wider w-10 text-right flex-shrink-0">2ND</span>
                    <span className="font-light text-stone-800">Davidoff Travel Humidor Business</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-stone-700 font-medium mt-0.5 text-xs tracking-wider w-10 text-right flex-shrink-0">3RD</span>
                    <span className="font-light text-stone-800">Davidoff Porcelain Ashtray</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-stone-700 font-medium mt-0.5 text-xs tracking-wider w-10 text-right flex-shrink-0">4TH</span>
                    <span className="font-light text-stone-800">Davidoff Winston Churchill Spirit Glass Set</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-stone-700 font-medium mt-0.5 text-xs tracking-wider w-10 text-right flex-shrink-0">5TH</span>
                    <span className="font-light text-stone-800">Davidoff Cigar Case Iconic XL-2</span>
                  </li>
                </ul>
                <div className="pt-6 border-t border-stone-200">
                  <Link
                    href="#prizes"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('prizes')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-davidoff-black hover:text-davidoff-gold transition-colors font-light text-sm tracking-wide uppercase underline underline-offset-4"
                    aria-label="View all five sweepstakes prize details and descriptions"
                  >
                    View all prize details
                    <span aria-hidden="true"> →</span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Entry Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Success Message */}
              {status === 'success' && (
                <div id="success-message" className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-6 animate-fadeInUp">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <h4 className="text-lg font-semibold text-green-900 mb-2">Check Your Email!</h4>
                      <p className="text-green-800 text-sm leading-relaxed">{message}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-6 animate-fadeInUp">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <h4 className="text-lg font-semibold text-red-900 mb-2">Entry Failed</h4>
                      <p className="text-red-800 text-sm">{message}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Entry Form */}
              <div className="bg-white rounded-sm shadow-sm p-8 sm:p-10 border-2 border-stone-600">
                <h3 className="font-serif text-3xl font-light text-davidoff-black mb-8 text-center tracking-tight">
                  Complete Your Entry
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-sans font-medium tracking-wider uppercase text-stone-700 mb-2">
                        First Name <span className="text-stone-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        autoComplete="given-name"
                        className="w-full px-4 py-3 border-2 border-stone-600 rounded-sm focus:border-davidoff-gold focus:ring-2 focus:ring-davidoff-gold/20 transition-all outline-none bg-white font-light"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs font-sans font-medium tracking-wider uppercase text-stone-700 mb-2">
                        Last Name <span className="text-stone-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        autoComplete="family-name"
                        className="w-full px-4 py-3 border-2 border-stone-600 rounded-sm focus:border-davidoff-gold focus:ring-2 focus:ring-davidoff-gold/20 transition-all outline-none bg-white font-light"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-sans font-medium tracking-wider uppercase text-stone-700 mb-2">
                      Email Address <span className="text-stone-700">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 border-2 border-stone-600 rounded-sm focus:border-davidoff-gold focus:ring-2 focus:ring-davidoff-gold/20 transition-all outline-none bg-white font-light"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone & DOB Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-sans font-medium tracking-wider uppercase text-stone-700 mb-2">
                        Phone Number <span className="text-stone-700">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        autoComplete="tel"
                        className="w-full px-4 py-3 border-2 border-stone-600 rounded-sm focus:border-davidoff-gold focus:ring-2 focus:ring-davidoff-gold/20 transition-all outline-none bg-white font-light"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="dateOfBirth" className="block text-xs font-sans font-medium tracking-wider uppercase text-stone-700 mb-2">
                        Date of Birth <span className="text-stone-700">*</span>
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        autoComplete="bday"
                        className="w-full px-4 py-3 border-2 border-stone-600 rounded-sm focus:border-davidoff-gold focus:ring-2 focus:ring-davidoff-gold/20 transition-all outline-none bg-white font-light"
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 21)).toISOString().split('T')[0]}
                      />
                      <p className="text-xs text-stone-700 mt-1 font-light">Must be 21+ to enter</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="block text-xs font-sans font-medium tracking-wider uppercase text-stone-700 mb-2">
                      Street Address <span className="text-stone-700">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      autoComplete="street-address"
                      className="w-full px-4 py-3 border-2 border-stone-600 rounded-sm focus:border-davidoff-gold focus:ring-2 focus:ring-davidoff-gold/20 transition-all outline-none bg-white font-light"
                      placeholder="123 Main Street"
                    />
                  </div>

                  {/* City, State, Zip Row */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <label htmlFor="city" className="block text-xs font-sans font-medium tracking-wider uppercase text-stone-700 mb-2">
                        City <span className="text-stone-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        autoComplete="address-level2"
                        className="w-full px-4 py-3 border-2 border-stone-600 rounded-sm focus:border-davidoff-gold focus:ring-2 focus:ring-davidoff-gold/20 transition-all outline-none bg-white font-light"
                        placeholder="San Francisco"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-xs font-sans font-medium tracking-wider uppercase text-stone-700 mb-2">
                        State <span className="text-stone-700">*</span>
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        autoComplete="address-level1"
                        className="w-full px-4 py-3 border-2 border-stone-600 rounded-sm focus:border-davidoff-gold focus:ring-2 focus:ring-davidoff-gold/20 transition-all outline-none bg-white font-light"
                      >
                        {US_STATES.map(state => (
                          <option key={state.code} value={state.code}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-xs font-sans font-medium tracking-wider uppercase text-stone-700 mb-2">
                        Zip Code <span className="text-stone-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{5}"
                        autoComplete="postal-code"
                        className="w-full px-4 py-3 border-2 border-stone-600 rounded-sm focus:border-davidoff-gold focus:ring-2 focus:ring-davidoff-gold/20 transition-all outline-none bg-white font-light"
                        placeholder="94102"
                      />
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4 pt-4">
                    <label htmlFor="agreeToRules" className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        id="agreeToRules"
                        name="agreeToRules"
                        checked={formData.agreeToRules}
                        onChange={handleInputChange}
                        required
                        className="w-5 h-5 text-davidoff-gold border-2 border-stone-600 rounded-sm focus:ring-2 focus:ring-davidoff-gold/50 mt-0.5 cursor-pointer"
                      />
                      <span className="text-sm text-stone-700 group-hover:text-stone-900 transition-colors font-light">
                        I agree to the{' '}
                        <Link href="/official-rules" className="text-davidoff-black hover:text-davidoff-gold font-light underline underline-offset-2" target="_blank" rel="noopener noreferrer" aria-label="View Official Sweepstakes Rules (opens in new window)">
                          Official Rules
                        </Link>{' '}
                        and confirm I am 21+ years of age. <span className="text-stone-700">*</span>
                      </span>
                    </label>

                    <label htmlFor="agreeToEmails" className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        id="agreeToEmails"
                        name="agreeToEmails"
                        checked={formData.agreeToEmails}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-davidoff-gold border-2 border-stone-600 rounded-sm focus:ring-2 focus:ring-davidoff-gold/50 mt-0.5 cursor-pointer"
                      />
                      <span className="text-sm text-stone-700 group-hover:text-stone-900 transition-colors font-light">
                        I agree to receive newsletters and marketing emails from Davidoff <span className="text-stone-700 text-xs">(optional)</span>
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full bg-davidoff-black text-white py-4 px-6 rounded-sm font-light text-sm tracking-wider uppercase border-2 border-davidoff-black shadow-md hover:shadow-lg hover:bg-charcoal hover:border-charcoal active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === 'submitting' ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="img" aria-label="Loading spinner">
                            <title>Loading spinner</title>
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting Entry...
                        </>
                      ) : (
                        <>
                              <CigarIcon className="w-5 h-5" aria-hidden={true} />
                              Enter to Win
                        </>
                      )}
                    </button>
                  </div>

                  {/* Legal Text */}
                  <p className="text-xs text-stone-700 text-center leading-relaxed pt-4 border-t border-stone-200 font-light">
                    NO PURCHASE NECESSARY. Open to legal US residents, 21+. Void where prohibited.
                    See{' '}
                    <Link href="/official-rules" className="text-davidoff-black hover:text-davidoff-gold transition-colors underline underline-offset-2" target="_blank" rel="noopener noreferrer" aria-label="View complete Official Sweepstakes Rules (opens in new window)">
                      complete rules
                    </Link>
                    .
                  </p>
                </form>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

