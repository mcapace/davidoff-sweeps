"use client";

import { motion } from "framer-motion";

export default function SponsorshipBar() {
  return (
    <div
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: '#000000',
        color: '#ffffff',
        textAlign: 'center',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}
    >
      <p 
        style={{ 
          color: '#ffffff',
          fontSize: '0.75rem',
          fontWeight: 300,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          margin: 0
        }}
      >
        Paid Sponsorship
      </p>
    </div>
  );
}

