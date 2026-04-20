import { ImageResponse } from 'next/og';

export const revalidate = false;

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: '64px',
        background:
          'radial-gradient(circle at top left, rgba(59, 130, 246, 0.35), transparent 32%), linear-gradient(135deg, #07111f 0%, #0f172a 52%, #111827 100%)',
        color: '#f8fafc',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '72px',
              height: '72px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
              color: '#eff6ff',
              fontSize: '34px',
              fontWeight: 800,
            }}
          >
            V
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '34px', fontWeight: 800 }}>Vayu UI</span>
            <span style={{ fontSize: '18px', color: '#cbd5e1' }}>
              AI-native toolkit for developers
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '900px' }}>
          <span
            style={{
              display: 'flex',
              width: 'fit-content',
              borderRadius: '999px',
              border: '1px solid rgba(148, 163, 184, 0.28)',
              background: 'rgba(15, 23, 42, 0.68)',
              padding: '10px 18px',
              fontSize: '20px',
              color: '#bfdbfe',
            }}
          >
            Free and open source
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '78px', lineHeight: 1.02, fontWeight: 900 }}>
              AI Native UI Toolkit
            </span>
            <span style={{ fontSize: '30px', lineHeight: 1.3, color: '#cbd5e1' }}>
              Accessible React components, CLI scaffolding, docs, and MCP tooling for faster vibe
              coding.
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['50+ Components', '35+ Hooks', 'Tailwind CSS v4', 'CLI + MCP'].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '999px',
                border: '1px solid rgba(148, 163, 184, 0.22)',
                background: 'rgba(15, 23, 42, 0.78)',
                padding: '12px 20px',
                fontSize: '20px',
                color: '#e2e8f0',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
