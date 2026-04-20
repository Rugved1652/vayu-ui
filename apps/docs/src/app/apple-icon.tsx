import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1a2e05 55%, #111827 100%)',
        borderRadius: 40,
      }}
    >
      <svg
        width="180"
        height="180"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="50" cy="50" rx="35" ry="12" stroke="#A3E635" strokeWidth="4.5" />
        <ellipse
          cx="50"
          cy="50"
          rx="35"
          ry="12"
          stroke="#A3E635"
          strokeWidth="4.5"
          transform="rotate(60 50 50)"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="35"
          ry="12"
          stroke="#A3E635"
          strokeWidth="4.5"
          transform="rotate(-60 50 50)"
        />
        <circle cx="85" cy="50" r="6.5" fill="#D9F99D" />
        <circle cx="32.5" cy="19.7" r="6.5" fill="#D9F99D" />
        <circle cx="32.5" cy="80.3" r="6.5" fill="#D9F99D" />
        <circle cx="50" cy="50" r="19" fill="#84CC16" />
        <path
          d="M44 44 L50 56 L56 44"
          stroke="#EFF6FF"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    {
      width: 180,
      height: 180,
    },
  );
}
