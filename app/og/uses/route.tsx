import { ImageResponse } from 'next/og';
import { loadGoogleFont } from '../_font';

export const runtime = 'edge';

const chips = ['Editor', 'Languages', 'Hardware', 'Apps'];

export async function GET() {
  const [grotesk, groteskBold] = await Promise.all([
    loadGoogleFont('Space Grotesk', 500),
    loadGoogleFont('Space Grotesk', 700),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '72px 80px',
          background: '#faf6ec',
          color: '#141414',
          fontFamily: 'Space Grotesk',
          position: 'relative',
        }}
      >
        {/* RetroUI accent stripe */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 18,
            background: '#f59e0b',
            borderTop: '4px solid #141414',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            background: '#0f766e',
            color: '#ffffff',
            border: '3px solid #141414',
            borderRadius: '9999px',
            padding: '8px 22px',
            fontSize: 26,
            fontWeight: 700,
            boxShadow: '4px 4px 0 0 #141414',
            marginBottom: 26,
          }}
        >
          Tools &amp; Setup
        </div>

        <h1 style={{ fontSize: 96, fontWeight: 700, lineHeight: 1, margin: 0 }}>Uses</h1>

        <p style={{ fontSize: 32, fontWeight: 500, color: '#3a3a3a', marginTop: 20 }}>
          The tools, apps, and gear I use day to day — Yudi Dharma Putra
        </p>

        <div style={{ display: 'flex', gap: 16, marginTop: 44 }}>
          {chips.map((chip) => (
            <div
              key={chip}
              style={{
                display: 'flex',
                background: '#fefcf7',
                border: '3px solid #141414',
                borderRadius: 12,
                padding: '10px 22px',
                fontSize: 26,
                fontWeight: 700,
                boxShadow: '4px 4px 0 0 #141414',
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Space Grotesk', data: grotesk, weight: 500, style: 'normal' },
        { name: 'Space Grotesk', data: groteskBold, weight: 700, style: 'normal' },
      ],
    },
  );
}
