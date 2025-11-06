import React from 'react';

interface CigarIconProps {
  className?: string;
  strokeWidth?: number;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function CigarIcon({ className = "w-5 h-5", strokeWidth = 1.5, 'aria-hidden': ariaHidden }: CigarIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : "Cigar icon"}
      aria-hidden={ariaHidden}
    >
      {!ariaHidden && <title>Cigar icon</title>}
      {/* Cigar body - elongated rounded rectangle */}
      <rect x="3" y="9" width="16" height="6" rx="3" />
      {/* Cigar band - decorative wrapper */}
      <rect x="8" y="8.5" width="6" height="7" rx="1" fill="currentColor" opacity="0.3" />
      <line x1="8" y1="12" x2="14" y2="12" stroke="currentColor" />
      {/* Subtle smoke wisps */}
      <path d="M19 12 Q20.5 10.5 21 9" opacity="0.4" />
      <path d="M19 12 Q20.5 13.5 21 15" opacity="0.4" />
    </svg>
  );
}
