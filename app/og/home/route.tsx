/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { loadGoogleFont } from '../_font';

export const runtime = 'edge';

const profileImageSrc = 'https://www.yudidputra.com/yudi-draw.jpg?v=2026-04-05-draw';

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
          padding: '72px 80px',
          background: '#faf6ec',
          color: '#141414',
          alignItems: 'center',
          gap: '60px',
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
          src={profileImageSrc}
          alt='Yudi Dharma Putra profile photo'
          width={300}
          height={300}
          style={{
            borderRadius: '24px',
            objectFit: 'cover',
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
              marginBottom: 26,
            }}
          >
            Full-stack Engineer
          </div>

          <h1 style={{ fontSize: 82, fontWeight: 700, lineHeight: 1.05, margin: 0 }}>
            Yudi Dharma Putra
          </h1>

          <p style={{ fontSize: 30, fontWeight: 500, color: '#3a3a3a', marginTop: 22 }}>
            Next.js · React · modern web — based in Japan
          </p>
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
