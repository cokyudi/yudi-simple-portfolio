import { ImageResponse } from "next/og";

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

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: '64px',
          background: '#020617',
          color: 'white',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img
            src='https://yudidputra.com/logo.png'
            width={72}
            height={72}
          />
          <span style={{ fontSize: 28, fontWeight: 600 }}>
            Yudi Dharma Putra
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
        >
          <h1 style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.2 }}>
            {title}
          </h1>
          {date && (
            <p style={{ fontSize: 24, opacity: 0.6, marginTop: 16 }}>
              {new Date(date).toLocaleDateString(
                'en-US',
                dateOptions
              )}
            </p>
          )}
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