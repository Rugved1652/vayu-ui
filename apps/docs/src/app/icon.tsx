import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon({ params }: { params: { size?: string } }) {
  const requestedSize = Number(params?.size || 32);
  const dimension = Number.isFinite(requestedSize) && requestedSize > 0 ? requestedSize : 32;
  const orbitStroke = Math.max(4, dimension * 0.045);
  const electronRadius = Math.max(5, dimension * 0.075);
  const nucleusRadius = dimension * 0.19;
  const vStroke = Math.max(4, dimension * 0.055);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1a2e05 55%, #111827 100%)',
        borderRadius: dimension * 0.22,
      }}
    >
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="50" cy="50" rx="35" ry="12" stroke="#A3E635" strokeWidth={orbitStroke} />
        <ellipse
          cx="50"
          cy="50"
          rx="35"
          ry="12"
          stroke="#A3E635"
          strokeWidth={orbitStroke}
          transform="rotate(60 50 50)"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="35"
          ry="12"
          stroke="#A3E635"
          strokeWidth={orbitStroke}
          transform="rotate(-60 50 50)"
        />

        <circle cx="85" cy="50" r={electronRadius} fill="#D9F99D" />
        <circle cx="32.5" cy="19.7" r={electronRadius} fill="#D9F99D" />
        <circle cx="32.5" cy="80.3" r={electronRadius} fill="#D9F99D" />

        <circle cx="50" cy="50" r={nucleusRadius} fill="#84CC16" />
        <path
          d="M44 44 L50 56 L56 44"
          stroke="#EFF6FF"
          strokeWidth={vStroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    {
      width: dimension,
      height: dimension,
    },
  );
}
