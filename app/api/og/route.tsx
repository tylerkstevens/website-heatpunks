import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Hashrate Heatpunks';
  const subtitle = searchParams.get('subtitle') || 'Bringing hashrate back home';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0d0d0d',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255, 128, 16, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(138, 145, 85, 0.15) 0%, transparent 50%)',
        }}
      >
        {/* Logo placeholder - flame icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="#ff8010"
          >
            <path d="M12 23c-3.866 0-7-3.134-7-7 0-2.577 1.37-4.91 3.543-6.189.33-.194.757-.05.897.303.14.352-.003.754-.337.965C7.23 12.368 6 14.086 6 16c0 3.308 2.692 6 6 6s6-2.692 6-6c0-3.314-2.684-6-5.999-6.001-.33 0-.638-.159-.832-.427-.194-.268-.242-.614-.127-.925C12.47 5.642 14 3.354 14 1c0-.552.448-1 1-1s1 .448 1 1c0 2.034-.802 3.939-2.191 5.358C17.058 7.766 19 10.651 19 14c0 4.97-4.03 9-9 9zm-1-7c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2z" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: 60,
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            padding: '0 40px',
            lineHeight: 1.2,
            maxWidth: '90%',
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            color: '#9ca3af',
            marginTop: 20,
            textAlign: 'center',
            padding: '0 40px',
          }}
        >
          {subtitle}
        </div>

        {/* Branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            bottom: 40,
            color: '#6b7280',
            fontSize: 20,
          }}
        >
          heatpunks.org
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
