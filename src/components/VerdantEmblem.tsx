import React from 'react';

interface VerdantEmblemProps {
  className?: string;
  variant?: 'metallic' | 'editorial';
}

/**
 * Faithfully renders the VERDANT MARKET shopping-cart & fresh-produce emblem
 * (metallic gold-silver frame, speed fins, emerald lattice basket with leaf,
 * red apple, crisp lettuce, purple grapes, and orange carrots).
 */
export const VerdantCartEmblem: React.FC<VerdantEmblemProps> = ({
  className = 'w-12 h-12',
  variant = 'editorial',
}) => {
  const isMetallic = variant === 'metallic';

  return (
    <svg
      viewBox="0 0 220 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vmGoldSilver" x1="20" y1="30" x2="185" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={isMetallic ? '#FFF7DC' : '#E7D59C'} />
          <stop offset="40%" stopColor={isMetallic ? '#E2C97D' : '#173D32'} />
          <stop offset="75%" stopColor={isMetallic ? '#B89B4C' : '#173D32'} />
          <stop offset="100%" stopColor={isMetallic ? '#F5E7B8' : '#265849'} />
        </linearGradient>
        <linearGradient id="vmSpeedGold" x1="12" y1="80" x2="72" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D7B24A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#F4DC8B" />
        </linearGradient>
        <linearGradient id="vmBasketGreen" x1="80" y1="62" x2="170" y2="122" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1D5C3E" />
          <stop offset="100%" stopColor="#0E2E20" />
        </linearGradient>
        <linearGradient id="vmLeafGrad" x1="122" y1="74" x2="160" y2="122" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8DE04C" />
          <stop offset="55%" stopColor="#3DA33E" />
          <stop offset="100%" stopColor="#174D28" />
        </linearGradient>
        <radialGradient id="vmAppleGrad" cx="0.35" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#FF6B5B" />
          <stop offset="55%" stopColor="#D92121" />
          <stop offset="100%" stopColor="#7C0B0E" />
        </radialGradient>
        <linearGradient id="vmCarrotGrad" x1="145" y1="35" x2="182" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF8E3C" />
          <stop offset="100%" stopColor="#C94B12" />
        </linearGradient>
      </defs>

      {/* Speed fins on left */}
      <g opacity={isMetallic ? 0.96 : 0.72}>
        <polygon points="24,52 72,56 75,61 36,56" fill="url(#vmSpeedGold)" />
        <polygon points="14,66 76,69 78,74 28,70" fill="url(#vmSpeedGold)" />
        <polygon points="10,80 80,82 82,87 22,84" fill="url(#vmSpeedGold)" />
        <polygon points="16,94 84,94 85,99 30,98" fill="url(#vmSpeedGold)" />
        <polygon points="26,108 88,106 89,111 40,111" fill="url(#vmSpeedGold)" />
      </g>

      {/* Crisp lettuce leaves inside cart */}
      <path
        d="M84 58 C78 40, 92 26, 108 32 C116 20, 134 22, 140 36 C152 30, 166 42, 160 58 Z"
        fill="#62B446"
      />
      <path
        d="M92 60 C88 45, 102 36, 114 42 C122 30, 138 34, 142 48 C148 44, 156 52, 152 62 Z"
        fill="#84D15A"
      />

      {/* Carrots with leafy tops */}
      <g>
        <path d="M162 28 C168 16, 178 14, 182 22 C188 16, 195 22, 188 32 C194 34, 192 42, 180 40 Z" fill="#3B9B3F" />
        <path d="M150 26 C152 14, 160 12, 164 20 C168 18, 172 24, 164 32 Z" fill="#52BA4D" />
        <path d="M154 70 L166 36 C168 32, 175 34, 173 39 L161 72 Z" fill="url(#vmCarrotGrad)" />
        <path d="M164 72 L180 42 C183 38, 190 42, 186 47 L170 74 Z" fill="url(#vmCarrotGrad)" />
      </g>

      {/* Glossy red apple */}
      <circle cx="114" cy="54" r="18" fill="url(#vmAppleGrad)" />
      <ellipse cx="107" cy="47" rx="4" ry="2.5" transform="rotate(-30 107 47)" fill="#FFB3AC" opacity="0.7" />
      <path d="M114 37 C114 31, 118 28, 121 29" stroke="#5A3921" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M115 34 C121 28, 129 30, 128 36 C123 39, 117 38, 115 34 Z" fill="#6CC44A" />

      {/* Purple grapes cluster */}
      <g>
        <circle cx="138" cy="56" r="5.5" fill="#5E2B7A" />
        <circle cx="147" cy="57" r="5.5" fill="#733994" />
        <circle cx="134" cy="65" r="5.5" fill="#4C2066" />
        <circle cx="143" cy="65" r="5.5" fill="#6B328A" />
        <circle cx="152" cy="65" r="5.5" fill="#542470" />
        <circle cx="139" cy="73" r="5.2" fill="#461B5E" />
        <circle cx="147" cy="73" r="5.2" fill="#5F2C7C" />
      </g>

      {/* Shopping cart basket body */}
      <path
        d="M78 58 L184 68 L166 114 L92 114 Z"
        fill="url(#vmBasketGreen)"
        stroke="url(#vmGoldSilver)"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* Basket lattice grid */}
      <g stroke={isMetallic ? '#C9B370' : '#A8B99A'} strokeWidth="2" opacity="0.75">
        <line x1="85" y1="77" x2="177" y2="83" />
        <line x1="89" y1="96" x2="171" y2="99" />
        <line x1="104" y1="61" x2="112" y2="114" />
        <line x1="126" y1="63" x2="131" y2="114" />
        <line x1="148" y1="65" x2="149" y2="114" />
        <line x1="168" y1="67" x2="162" y2="114" />
      </g>

      {/* Cart handle and structural frame */}
      <path
        d="M52 36 L70 36 L94 124 L168 124"
        stroke="url(#vmGoldSilver)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Signature glossy green leaf on basket */}
      <path
        d="M128 118 C126 95, 144 78, 165 78 C163 99, 148 116, 128 118 Z"
        fill="url(#vmLeafGrad)"
        stroke={isMetallic ? '#E8F7B2' : '#F8F6EF'}
        strokeWidth="1.5"
      />
      <path
        d="M130 116 C140 103, 150 92, 161 82"
        stroke="#D4F59B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Cart wheels */}
      <g>
        <circle cx="104" cy="138" r="11" fill={isMetallic ? '#11251D' : '#F8F6EF'} stroke="url(#vmGoldSilver)" strokeWidth="4.5" />
        <circle cx="104" cy="138" r="3" fill={isMetallic ? '#F5E7B8' : '#173D32'} />
        <circle cx="158" cy="138" r="11" fill={isMetallic ? '#11251D' : '#F8F6EF'} stroke="url(#vmGoldSilver)" strokeWidth="4.5" />
        <circle cx="158" cy="138" r="3" fill={isMetallic ? '#F5E7B8' : '#173D32'} />
      </g>
    </svg>
  );
};

interface VerdantFullLockupProps {
  className?: string;
}

/**
 * Full metallic dark-stage brand lockup used in Scene 3 & 4 of the cinematic intro,
 * preserving the leaf-sprouting V, metallic VERDANT, emerald MARKET with golden flanking
 * rules, and tagline.
 */
export const VerdantFullLockup: React.FC<VerdantFullLockupProps> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* VERDANT wordmark with sprouting leaf on V */}
      <div className="relative inline-flex items-baseline justify-center">
        <span
          className="relative font-display font-bold tracking-[0.14em] text-4xl sm:text-6xl md:text-7xl bg-gradient-to-b from-[#FFFFFF] via-[#EAE5D3] to-[#B9AD87] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(120,220,140,0.3)]"
        >
          <span className="relative inline-block">
            V
            <svg
              viewBox="0 0 36 32"
              className="absolute -top-2.5 -right-2 w-6 h-6 sm:w-8 sm:h-8 pointer-events-none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="vLeaf" x1="0" y1="28" x2="32" y2="2" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#1B5E2E" />
                  <stop offset="60%" stopColor="#5CCB49" />
                  <stop offset="100%" stopColor="#BCEF74" />
                </linearGradient>
              </defs>
              <path
                d="M4 28 C4 14, 16 4, 32 3 C29 18, 18 27, 4 28 Z"
                fill="url(#vLeaf)"
                stroke="#E8F9C5"
                strokeWidth="1"
              />
              <path d="M6 26 C14 18, 22 11, 29 5" stroke="#EEFFC9" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
          ERDANT
        </span>
      </div>

      {/* MARKET with flanking gold bars */}
      <div className="mt-1.5 flex items-center justify-center gap-3 sm:gap-4 w-full max-w-md">
        <span className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#D8B659] to-[#F4DF95]" />
        <span className="font-sans font-semibold tracking-[0.38em] text-base sm:text-xl md:text-2xl text-[#6CE46C] drop-shadow-[0_0_16px_rgba(88,230,112,0.5)]">
          MARKET
        </span>
        <span className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-[#D8B659] to-[#F4DF95]" />
      </div>

      {/* Tagline */}
      <p className="mt-2.5 text-sm sm:text-base italic tracking-wide text-[#F8F6EF]/90">
        Freshness, thoughtfully delivered.
      </p>

      {/* Subtle glowing curved underline */}
      <div className="mt-3 w-48 sm:w-64 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#72E882] to-transparent shadow-[0_0_14px_rgba(114,232,130,0.75)]" />
    </div>
  );
};
