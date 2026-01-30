import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Page-specific style configurations
const pageStyles: Record<string, {
  background: string;
  accentColor: string;
  tagline?: string;
}> = {
  home: {
    background: 'radial-gradient(circle at 25% 25%, rgba(255, 128, 16, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(138, 145, 85, 0.15) 0%, transparent 50%)',
    accentColor: '#ff8010',
  },
  summit: {
    background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 128, 16, 0.3) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(255, 69, 0, 0.2) 0%, transparent 50%)',
    accentColor: '#ff8010',
    tagline: 'UNDERMINING THE STATUS QUO',
  },
  grants: {
    background: 'radial-gradient(circle at 30% 70%, rgba(138, 145, 85, 0.25) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 128, 16, 0.15) 0%, transparent 50%)',
    accentColor: '#8a9155',
  },
  education: {
    background: 'radial-gradient(circle at 50% 50%, rgba(255, 128, 16, 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(138, 145, 85, 0.2) 0%, transparent 40%)',
    accentColor: '#ff8010',
  },
  mission: {
    background: 'radial-gradient(circle at 20% 80%, rgba(255, 128, 16, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 128, 16, 0.15) 0%, transparent 50%)',
    accentColor: '#ff8010',
  },
  forum: {
    background: 'radial-gradient(circle at 50% 50%, rgba(138, 145, 85, 0.2) 0%, transparent 60%)',
    accentColor: '#8a9155',
  },
};

// Dynamic Summit OG based on event status
function getSummitStatus(): { subtitle: string; status: 'pre' | 'during' | 'post' } {
  const now = new Date();
  const eventStart = new Date('2026-02-27T00:00:00-07:00');
  const eventEnd = new Date('2026-02-28T23:59:59-07:00');

  if (now < eventStart) {
    return { subtitle: 'FEB 27-28, 2026 • REQUEST INVITATION', status: 'pre' };
  } else if (now >= eventStart && now <= eventEnd) {
    return { subtitle: 'HAPPENING NOW • DENVER, CO', status: 'during' };
  } else {
    return { subtitle: 'SUMMIT 2026 COMPLETE • WATCH RECAP', status: 'post' };
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Hashrate Heatpunks';
  let subtitle = searchParams.get('subtitle') || 'Bringing hashrate back home';
  const page = searchParams.get('page') || 'home';

  // Get page-specific styles
  const style = pageStyles[page] || pageStyles.home;

  // For summit page, use dynamic subtitle based on event status
  if (page === 'summit' && !searchParams.get('subtitle')) {
    const summitStatus = getSummitStatus();
    subtitle = summitStatus.subtitle;
  }

  // Determine if this is a summit-style (event poster) layout
  const isSummitStyle = page === 'summit';

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
          backgroundImage: style.background,
          position: 'relative',
        }}
      >
        {/* Noise texture overlay effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            opacity: 0.03,
          }}
        />

        {/* Summit-style tagline at top */}
        {isSummitStyle && style.tagline && (
          <div
            style={{
              position: 'absolute',
              top: 40,
              display: 'flex',
              fontSize: 14,
              letterSpacing: '0.2em',
              color: '#6b7280',
            }}
          >
            {`// ${style.tagline}`}
          </div>
        )}

        {/* Logo - flame icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: isSummitStyle ? 30 : 40,
          }}
        >
          <svg
            width={isSummitStyle ? 100 : 80}
            height={isSummitStyle ? 100 : 80}
            viewBox="0 0 24 24"
            fill={style.accentColor}
          >
            <path d="M12 23c-3.866 0-7-3.134-7-7 0-2.577 1.37-4.91 3.543-6.189.33-.194.757-.05.897.303.14.352-.003.754-.337.965C7.23 12.368 6 14.086 6 16c0 3.308 2.692 6 6 6s6-2.692 6-6c0-3.314-2.684-6-5.999-6.001-.33 0-.638-.159-.832-.427-.194-.268-.242-.614-.127-.925C12.47 5.642 14 3.354 14 1c0-.552.448-1 1-1s1 .448 1 1c0 2.034-.802 3.939-2.191 5.358C17.058 7.766 19 10.651 19 14c0 4.97-4.03 9-9 9zm-1-7c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2z" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: isSummitStyle ? 72 : 60,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            padding: '0 40px',
            lineHeight: 1.1,
            maxWidth: '90%',
            letterSpacing: isSummitStyle ? '0.05em' : '0',
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: isSummitStyle ? 24 : 30,
            color: isSummitStyle ? style.accentColor : '#9ca3af',
            marginTop: isSummitStyle ? 24 : 20,
            textAlign: 'center',
            padding: '0 40px',
            letterSpacing: isSummitStyle ? '0.15em' : '0',
            fontWeight: isSummitStyle ? 500 : 400,
          }}
        >
          {subtitle}
        </div>

        {/* Branding at bottom */}
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
