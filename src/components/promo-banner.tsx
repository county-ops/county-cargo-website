'use client';

import storesData from '@/lib/stores.json';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Store {
  storeName: string;
  country: 'UK' | 'US';
  category: string;
  websiteUrl: string;
  logoUrl?: string;
  isActive: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const allStores: Store[] = storesData as Store[];
const ukStores = allStores.filter((s) => s.isActive && s.country === 'UK');
const usStores = allStores.filter((s) => s.isActive && s.country === 'US');

// Duplicate for seamless infinite loop
const ukLoop = [...ukStores, ...ukStores, ...ukStores];
const usLoop = [...usStores, ...usStores, ...usStores];

// ─── Promo text repeated for seamless scroll ─────────────────────────────────
const promoText =
  '✈️  Shop from your favourite UK and US stores and ship with County Cargo.  •  📦  Fast, affordable international shipping from the UK & US to Nigeria and worldwide.  •  🚀  Get a free UK & US shipping address — ship anything, anywhere.  •  ';
const promoLoop = promoText.repeat(6);

// ─── Store Pill ───────────────────────────────────────────────────────────────
function StorePill({ store }: { store: Store }) {
  const flag = store.country === 'UK' ? '🇬🇧' : '🇺🇸';
  return (
    <a
      href={store.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="store-pill"
      title={`Shop ${store.storeName} and ship with County Cargo`}
    >
      <span className="store-pill__flag">{flag}</span>
      {store.storeName}
    </a>
  );
}

// ─── Marquee Row ─────────────────────────────────────────────────────────────
function MarqueeRow({
  direction = 'left',
  speed = 40,
  children,
}: {
  direction?: 'left' | 'right';
  speed?: number;
  children: React.ReactNode;
}) {
  const animClass =
    direction === 'left' ? 'promo-marquee--left' : 'promo-marquee--right';
  return (
    <div className="promo-marquee-wrap">
      <div
        className={`promo-marquee ${animClass}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

// ─── Main Banner ─────────────────────────────────────────────────────────────
export function PromoBanner() {
  return (
    <div className="promo-banner" aria-label="Promotional store banner">
      {/* Row 1 — promo text, right-to-left */}
      <div className="promo-banner__row promo-banner__row--text">
        <MarqueeRow direction="left" speed={55}>
          <span className="promo-text-content">{promoLoop}</span>
        </MarqueeRow>
      </div>

      {/* Row 2 — UK stores, left-to-right */}
      <div className="promo-banner__row promo-banner__row--stores">
        <span className="promo-label">🇬🇧 UK</span>
        <MarqueeRow direction="right" speed={38}>
          {ukLoop.map((store, i) => (
            <StorePill key={`uk-${i}`} store={store} />
          ))}
        </MarqueeRow>
      </div>

      {/* Row 3 — US stores, right-to-left */}
      <div className="promo-banner__row promo-banner__row--stores">
        <span className="promo-label">🇺🇸 US</span>
        <MarqueeRow direction="left" speed={34}>
          {usLoop.map((store, i) => (
            <StorePill key={`us-${i}`} store={store} />
          ))}
        </MarqueeRow>
      </div>
    </div>
  );
}

// ─── Helper: split an array into N roughly-equal chunks ─────────────────────
function chunkArray<T>(arr: T[], chunks: number): T[][] {
  const result: T[][] = [];
  const size = Math.ceil(arr.length / chunks);
  for (let i = 0; i < chunks; i++) {
    result.push(arr.slice(i * size, (i + 1) * size));
  }
  return result;
}

// Pre-split stores into 3 groups for the multi-row banners
const ukGroups = chunkArray(ukStores, 3);
const usGroups = chunkArray(usStores, 3);

// Loop each group for seamless marquee
const ukGroupLoops = ukGroups.map((g) => [...g, ...g, ...g]);
const usGroupLoops = usGroups.map((g) => [...g, ...g, ...g]);

const rowConfigs: { direction: 'left' | 'right'; speed: number }[] = [
  { direction: 'right', speed: 80 },
  { direction: 'left', speed: 90 },
  { direction: 'right', speed: 85 },
];

export function UkStoreBanner() {
  return (
    <div className="promo-banner" aria-label="UK stores banner">
      {ukGroupLoops.map((group, idx) => (
        <div key={idx} className="promo-banner__row promo-banner__row--stores">
          {idx === 0 && <span className="promo-label">🇬🇧 UK</span>}
          <MarqueeRow direction={rowConfigs[idx].direction} speed={rowConfigs[idx].speed}>
            {group.map((store, i) => (
              <StorePill key={`uk-${idx}-${i}`} store={store} />
            ))}
          </MarqueeRow>
        </div>
      ))}
    </div>
  );
}

export function UsStoreBanner() {
  return (
    <div className="promo-banner" aria-label="US stores banner">
      {usGroupLoops.map((group, idx) => (
        <div key={idx} className="promo-banner__row promo-banner__row--stores">
          {idx === 0 && <span className="promo-label">🇺🇸 US</span>}
          <MarqueeRow direction={rowConfigs[idx].direction} speed={rowConfigs[idx].speed}>
            {group.map((store, i) => (
              <StorePill key={`us-${idx}-${i}`} store={store} />
            ))}
          </MarqueeRow>
        </div>
      ))}
    </div>
  );
}
