/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { loadGoogleFont } from '../_font';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'Blog Post';
  const date = searchParams.get('date') ?? '';
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const [grotesk, groteskBold, notoJP] = await Promise.all([
    loadGoogleFont('Space Grotesk', 500),
    loadGoogleFont('Space Grotesk', 700),
    // Subset CJK fallback to just the title's glyphs to keep payload small.
    loadGoogleFont('Noto Sans JP', 700, title),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: '64px 72px',
          background: '#faf6ec',
          color: '#141414',
          justifyContent: 'space-between',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <img
            src='https://yudidputra.com/logo.png'
            alt='Yudi Dharma Putra logo'
            width={72}
            height={72}
            style={{
              borderRadius: '14px',
              background: '#fefcf7',
              border: '3px solid #141414',
              boxShadow: '4px 4px 0 0 #141414',
            }}
          />
          <span style={{ fontSize: 28, fontWeight: 700 }}>Yudi Dharma Putra</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.15,
              margin: 0,
              display: 'flex',
            }}
          >
            {title}
          </h1>
          {date && (
            <span
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                background: '#0f766e',
                color: '#ffffff',
                border: '3px solid #141414',
                borderRadius: '9999px',
                padding: '6px 20px',
                fontSize: 24,
                fontWeight: 700,
                boxShadow: '4px 4px 0 0 #141414',
              }}
            >
              {new Date(date).toLocaleDateString('en-US', dateOptions)}
            </span>
          )}
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
        { name: 'Noto Sans JP', data: notoJP, weight: 700, style: 'normal' },
      ],
    },
  );
}
