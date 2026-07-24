import React from 'react';

export default function DevFlowLogo({ size = 32 }) {
  return (
    <div 
      className="logo-squircle" 
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9px',
        background: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
        border: '1.2px solid rgba(16, 185, 129, 0.25)',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
        flexShrink: 0
      }}
    >
      <svg
        width="82%"
        height="82%"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Infinity Loop Path */}
        <path
          d="M 16 16 
             C 12.5 11, 7.5 11, 7.5 16 
             C 7.5 21, 12.5 21, 16 16 
             C 19.5 11, 24.5 11, 24.5 16 
             C 24.5 21, 19.5 21, 16 16 Z"
          stroke="url(#logoGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#logoGlow)"
        />

        {/* Center Connecting Dot */}
        <circle cx="16" cy="16" r="2" fill="#34d399" />

        {/* Brackets */}
        {/* Left bracket: < */}
        <path
          d="M 12 13.5 L 9.5 16 L 12 18.5"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right bracket: > */}
        <path
          d="M 20 13.5 L 22.5 16 L 20 18.5"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
