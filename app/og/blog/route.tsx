/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { loadGoogleFont } from '../_font';

export const runtime = 'edge';

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
          width: '100%',
          height: '100%',
          padding: '80px',
          background: '#faf6ec',
          color: '#141414',
          alignItems: 'center',
          gap: '56px',
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

        <img
          src='https://yudidputra.com/logo.png'
          alt='Yudi Dharma Putra logo'
          width={260}
          height={260}
          style={{
            borderRadius: '24px',
            background: '#fefcf7',
            border: '4px solid #141414',
            boxShadow: '10px 10px 0 0 #141414',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
              marginBottom: 22,
            }}
          >
            Yudi Dharma Putra
          </div>

          <h1 style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05, margin: 0 }}>
            Blog
          </h1>

          <p style={{ fontSize: 30, fontWeight: 500, color: '#3a3a3a', marginTop: 20 }}>
            Notes on engineering &amp; the web
          </p>
        </div>
      </div>
    ),
    {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Space Grotesk', data: grotesk, weight: 500, style: 'normal' },
        { name: 'Space Grotesk', data: groteskBold, weight: 700, style: 'normal' },
      ],
    },
  );
}
