/* Refined light-theme product illustrations for items without a usable photo. */

type Props = { kind: "phone-notch" | "phone-punch" | "laptop" | "glass" | "case" | "cable" | "earbuds"; tone?: string; id: string };

export function DeviceArt({ kind, tone = "#3f4c63", id }: Props) {
  if (kind === "laptop") {
    return (
      <svg viewBox="0 0 300 190" className="h-32 w-auto" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-s`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={tone} />
            <stop offset="1" stopColor="#14161c" />
          </linearGradient>
        </defs>
        <rect x="52" y="10" width="196" height="128" rx="9" fill="#e7e5e4" />
        <rect x="52" y="10" width="196" height="128" rx="9" fill="none" stroke="#d6d3d1" />
        <rect x="60" y="18" width="180" height="112" rx="5" fill={`url(#${id}-s)`} />
        <path d="M168 18h72v34l-60 78h-52Z" fill="#fff" opacity=".07" />
        <path d="M26 142h248l14 15a7 7 0 0 1-6 11H18a7 7 0 0 1-6-11Z" fill="#e7e5e4" stroke="#d6d3d1" />
        <rect x="122" y="146" width="56" height="7" rx="3.5" fill="#c9c5c2" />
      </svg>
    );
  }
  if (kind === "glass") {
    return (
      <svg viewBox="0 0 150 240" className="h-32 w-auto" aria-hidden="true">
        <rect x="20" y="8" width="110" height="224" rx="20" fill="#eef2f7" stroke="#cbd5e1" strokeWidth="2" opacity=".9" />
        <rect x="30" y="18" width="90" height="204" rx="13" fill="#e2e8f0" opacity=".55" />
        <path d="M52 8 130 86v40L92 8Z" fill="#fff" opacity=".65" />
        <circle cx="75" cy="26" r="4" fill="#cbd5e1" />
        <path d="m62 118 10 10 20-22" fill="none" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "earbuds") {
    return (
      <svg viewBox="0 0 240 200" className="h-32 w-auto" aria-hidden="true">
        <rect x="55" y="70" width="130" height="96" rx="26" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="2" />
        <rect x="55" y="70" width="130" height="20" rx="10" fill="#e7e5e4" />
        <ellipse cx="97" cy="122" rx="17" ry="21" fill="#ffffff" stroke="#d6d3d1" strokeWidth="2" />
        <ellipse cx="143" cy="122" rx="17" ry="21" fill="#ffffff" stroke="#d6d3d1" strokeWidth="2" />
        <circle cx="97" cy="116" r="6" fill="#1c1917" opacity=".75" />
        <circle cx="143" cy="116" r="6" fill="#1c1917" opacity=".75" />
        <circle cx="120" cy="78" r="3" fill="#a8a29e" />
        <path d="M78 40c10-16 74-16 84 0" fill="none" stroke="#d6d3d1" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "cable") {
    return (
      <svg viewBox="0 0 240 200" className="h-32 w-auto" aria-hidden="true">
        <rect x="96" y="18" width="48" height="64" rx="10" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="2" />
        <rect x="110" y="8" width="20" height="14" rx="4" fill="#c9c5c2" />
        <path d="M120 82v22c0 34-52 22-52 54s58 20 58 44" fill="none" stroke="#d6d3d1" strokeWidth="7" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "case") {
    return (
      <svg viewBox="0 0 150 240" className="h-32 w-auto" aria-hidden="true">
        <rect x="18" y="8" width="114" height="224" rx="24" fill="#292524" />
        <rect x="26" y="16" width="98" height="208" rx="18" fill="#1c1917" />
        <rect x="36" y="24" width="34" height="52" rx="12" fill="#292524" stroke="#44403c" strokeWidth="2" />
        <circle cx="47" cy="38" r="7" fill="#57534e" />
        <circle cx="47" cy="60" r="7" fill="#57534e" />
        <circle cx="61" cy="49" r="5" fill="#57534e" />
      </svg>
    );
  }
  // phone-notch | phone-punch
  const punch = kind === "phone-punch";
  return (
    <svg viewBox="0 0 150 290" className="h-36 w-auto" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tone} />
          <stop offset="1" stopColor="#131720" />
        </linearGradient>
      </defs>
      <rect x="8" y="6" width="134" height="278" rx="30" fill="#e7e5e4" />
      <rect x="8" y="6" width="134" height="278" rx="30" fill="none" stroke="#d6d3d1" strokeWidth="2" />
      <rect x="15" y="13" width="120" height="264" rx="24" fill={`url(#${id}-s)`} />
      <path d="M88 13h47v66L52 277H15v-30Z" fill="#fff" opacity=".08" />
      {punch ? (
        <circle cx="75" cy="28" r="5.5" fill="#0c0e13" />
      ) : (
        <rect x="47" y="13" width="56" height="18" rx="9" fill="#0c0e13" />
      )}
      <rect x="60" y="266" width="30" height="4" rx="2" fill="#fff" opacity=".5" />
    </svg>
  );
}
