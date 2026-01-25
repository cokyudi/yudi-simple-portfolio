import { ImageResponse } from "next/og";

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          padding: '80px',
          background: '#020617',
          color: 'white',
          alignItems: 'center',
          gap: '48px'
        }}
      >
        <img
          src='https://yudidputra.com/logo.png'
          width={280}
          height={280}
          style={{ borderRadius: '24px' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.1 }}>
            Yudi Dharma Putra
          </h1>
          <p style={{ fontSize: 70, opacity: 0.8 }}>
            Blog
          </p>
        </div>
      </div>
    ),
    {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      }, 
      width: 1200, 
      height: 630 
    },
  );
}