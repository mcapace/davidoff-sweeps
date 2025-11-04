import React from 'react';

interface CigarIconProps {
  className?: string;
  strokeWidth?: number;
}

export function CigarIcon({ className = "w-5 h-5", strokeWidth = 1.5 }: CigarIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Cigar body */}
      <rect x="2" y="10" width="18" height="4" rx="2" />
      {/* Cigar band */}
      <rect x="8" y="9" width="6" height="6" rx="1" />
      {/* Smoke/vapors */}
      <path d="M20 12 Q22 10 22 8" />
      <path d="M20 12 Q22 14 22 16" />
    </svg>
  );
}

