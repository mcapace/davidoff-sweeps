"use client";

export default function SponsorshipBar() {
  return (
    <div
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: '#000000',
        textAlign: 'center',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <span 
        style={{ 
          color: '#FFFFFF',
          fontSize: '0.75rem',
          fontWeight: 300,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          margin: 0,
          lineHeight: 1
        }}
      >
        Paid Sponsorship
      </span>
    </div>
  );
}

