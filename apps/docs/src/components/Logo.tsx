import React from 'react';

interface VayuUILogoProps {
  size?: number;
  className?: string;
}

export const VayuUILogo: React.FC<VayuUILogoProps> = ({ size = 48, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Electron orbit 1 - horizontal */}
        <ellipse
          cx="50"
          cy="50"
          rx="35"
          ry="12"
          className="stroke-brand"
          strokeWidth="2"
          fill="none"
        />

        {/* Electron orbit 2 - rotated 60deg */}
        <ellipse
          cx="50"
          cy="50"
          rx="35"
          ry="12"
          className="stroke-brand"
          strokeWidth="2"
          fill="none"
          transform="rotate(60 50 50)"
        />

        {/* Electron orbit 3 - rotated -60deg */}
        <ellipse
          cx="50"
          cy="50"
          rx="35"
          ry="12"
          className="stroke-brand"
          strokeWidth="2"
          fill="none"
          transform="rotate(-60 50 50)"
        />

        {/* Electrons on orbits - positioned at orbit edges */}
        {/* Electron on horizontal orbit (right side) */}
        <circle cx="85" cy="50" r="4" className="fill-brand" />
        {/* Electron on 60deg rotated orbit */}
        <circle cx="32.5" cy="19.7" r="4" className="fill-brand" />
        {/* Electron on -60deg rotated orbit */}
        <circle cx="32.5" cy="80.3" r="4" className="fill-brand" />

        {/* Center nucleus with V */}
        <circle cx="50" cy="50" r="14" className="fill-brand" />
        <path
          d="M44 44 L50 56 L56 44"
          className="stroke-brand-content"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* Text Logo */}
      <div className="flex items-baseline gap-1">
        <span className="font-secondary font-bold text-canvas-content" style={{ fontSize: size * 0.5 }}>
          Vayu
        </span>
        <span
          className="font-secondary font-bold text-brand"
          style={{ fontSize: size * 0.5 }}
        >
          UI
        </span>
      </div>
    </div>
  );
};

// Icon only version
export const VayuUIIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Electron orbit 1 - horizontal */}
      <ellipse
        cx="50"
        cy="50"
        rx="35"
        ry="12"
        className="stroke-brand"
        strokeWidth="2"
        fill="none"
      />

      {/* Electron orbit 2 - rotated 60deg */}
      <ellipse
        cx="50"
        cy="50"
        rx="35"
        ry="12"
        className="stroke-brand"
        strokeWidth="2"
        fill="none"
        transform="rotate(60 50 50)"
      />

      {/* Electron orbit 3 - rotated -60deg */}
      <ellipse
        cx="50"
        cy="50"
        rx="35"
        ry="12"
        className="stroke-brand"
        strokeWidth="2"
        fill="none"
        transform="rotate(-60 50 50)"
      />

      {/* Electrons on orbits - positioned at orbit edges */}
      <circle cx="85" cy="50" r="4" className="fill-brand" />
      <circle cx="32.5" cy="19.7" r="4" className="fill-brand" />
      <circle cx="32.5" cy="80.3" r="4" className="fill-brand" />

      {/* Center nucleus with V */}
      <circle cx="50" cy="50" r="14" className="fill-brand" />
      <path
        d="M44 44 L50 56 L56 44"
        className="stroke-brand-content"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default VayuUILogo;
