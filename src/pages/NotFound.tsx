import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-[#F9F6E5] px-4 text-center">
      <svg
        width="160"
        height="140"
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-8"
        aria-hidden
      >
        <rect
          x="30"
          y="30"
          width="60"
          height="75"
          rx="4"
          fill="white"
          stroke="#c8b99a"
          strokeWidth="1.5"
          transform="rotate(-12 30 30)"
        />
        <line
          x1="42"
          y1="55"
          x2="72"
          y2="47"
          stroke="#d4c4a8"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform="rotate(-12 30 30)"
        />
        <line
          x1="42"
          y1="64"
          x2="68"
          y2="56"
          stroke="#d4c4a8"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform="rotate(-12 30 30)"
        />
        <line
          x1="42"
          y1="73"
          x2="60"
          y2="65"
          stroke="#d4c4a8"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform="rotate(-12 30 30)"
        />
        <rect
          x="50"
          y="18"
          width="68"
          height="88"
          rx="5"
          fill="white"
          stroke="#c8b99a"
          strokeWidth="1.5"
        />
        <line
          x1="64"
          y1="42"
          x2="104"
          y2="42"
          stroke="#e0d2bc"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="64"
          y1="54"
          x2="104"
          y2="54"
          stroke="#e0d2bc"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="64"
          y1="66"
          x2="92"
          y2="66"
          stroke="#e0d2bc"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <text
          x="84"
          y="95"
          textAnchor="middle"
          fontSize="28"
          fontWeight="800"
          fill="#c8a97a"
          fontFamily="Georgia, serif"
        >
          ?
        </text>
        <circle cx="128" cy="22" r="3" fill="#c8b99a" />
        <circle cx="138" cy="35" r="2" fill="#d4c4a8" />
        <circle cx="30" cy="110" r="2.5" fill="#c8b99a" />
        <circle cx="18" cy="95" r="1.8" fill="#d4c4a8" />
      </svg>

      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">
        Error
      </p>

      <h1
        className="select-none font-black tabular-nums leading-none text-primary"
        style={{
          fontSize: "clamp(5.5rem, 22vw, 8rem)",
          textShadow:
            "0 10px 0 rgba(107,76,30,0.12), 0 14px 32px rgba(107,76,30,0.13)",
        }}
        aria-label="404"
      >
        404
      </h1>

      <div className="mx-auto my-6 flex w-44 items-center gap-2">
        <div className="h-px flex-1 bg-stone-300/70" />
        <div className="h-1 w-1 rounded-full bg-stone-400/60" />
        <div className="h-px flex-1 bg-stone-300/70" />
      </div>

      <p className="mb-10 max-w-xs text-base leading-relaxed text-stone-500">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="group relative inline-flex min-w-50 items-center justify-center gap-2 overflow-hidden rounded-xl bg-btn-bg px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F6E5]"
      >
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        <svg
          className="relative h-5 w-5 shrink-0 opacity-90"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="relative">Back to home</span>
      </Link>
    </div>
  );
}
