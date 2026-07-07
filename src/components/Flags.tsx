import React from 'react';
import smartwingsLogoUrl from '../assets/images/smartwings_logo_1782819627544.jpg';
import deltaLogoUrl from '../assets/images/delta_logo_1782820160000.jpg';
import lufthansaLogoUrl from '../assets/images/lufthansa_logo_1782820171499.jpg';
import ryanairLogoUrl from '../assets/images/ryanair_logo_1782820182908.jpg';
import britishAirwaysLogoUrl from '../assets/images/british_airways_logo_1782820196850.jpg';
import klmLogoUrl from '../assets/images/klm_logo_1782821258212.jpg';
import qatarLogoUrl from '../assets/images/qatar_logo_1782821273163.jpg';
import wizzLogoUrl from '../assets/images/wizz_logo_1782821285582.jpg';
import singaporeLogoUrl from '../assets/images/singapore_logo_1782821295146.jpg';
import tapLogoUrl from '../assets/images/tap_logo_1782821306987.jpg';
import airCanadaLogoUrl from '../assets/images/air_canada_logo_1782821324619.jpg';
import finnairLogoUrl from '../assets/images/finnair_logo_1782821337617.jpg';
import unitedLogoUrl from '../assets/images/united_logo_1782821348551.jpg';
import americanLogoUrl from '../assets/images/american_logo_1782821358563.jpg';
import turkishLogoUrl from '../assets/images/turkish_logo_1782847700186.jpg';
import anaLogoUrl from '../assets/images/ana_logo_1782847715996.jpg';
import emiratesLogoUrl from '../assets/images/emirates_logo_1782847728811.jpg';
import qantasLogoUrl from '../assets/images/qantas_logo_1782847861598.jpg';
import koreanLogoUrl from '../assets/images/korean_logo_1782847880759.jpg';
import vuelingLogoUrl from '../assets/images/vueling_logo_1782847893889.jpg';
import cathayLogoUrl from '../assets/images/cathay_logo_1782847909553.jpg';

import airFranceLogoUrl from '../assets/images/air_france_logo_1783406002366.jpg';
import iberiaLogoUrl from '../assets/images/iberia_logo_1783406018289.jpg';
import sasLogoUrl from '../assets/images/sas_logo_1783406028219.jpg';
import brusselsLogoUrl from '../assets/images/brussels_logo_1783406038020.jpg';
import lotLogoUrl from '../assets/images/lot_logo_1783406051276.jpg';
import austrianLogoUrl from '../assets/images/austrian_logo_1783406062124.jpg';
import swissLogoUrl from '../assets/images/swiss_logo_1783406071673.jpg';
import etihadLogoUrl from '../assets/images/etihad_logo_1783406081434.jpg';
import jalLogoUrl from '../assets/images/jal_logo_1783406091347.jpg';

export const EUFlag: React.FC = () => (
  <svg viewBox="0 0 12 8" className="w-5 h-3.5 rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none">
    <rect width="12" height="8" fill="#003399"/>
    <g transform="translate(6,4)">
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const r = 2.2;
        const x = r * Math.sin(angle);
        const y = -r * Math.cos(angle);
        return (
          <path
            key={i}
            d="M 0,-0.4 L 0.1,-0.1 L 0.4,-0.1 L 0.15,0.1 L 0.25,0.4 L 0,0.2 L -0.25,0.4 L -0.15,0.1 L -0.4,-0.1 L -0.1,-0.1 Z"
            fill="#FFCC00"
            transform={`translate(${x},${y}) scale(0.6)`}
          />
        );
      })}
    </g>
  </svg>
);

export const USFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 19 10" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    {/* 13 Stripes */}
    {[...Array(13)].map((_, i) => (
      <rect
        key={i}
        y={i * (10 / 13)}
        width="19"
        height={10 / 13}
        fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
      />
    ))}
    {/* Blue canton */}
    <rect width="7.6" height={7 * (10 / 13)} fill="#3C3B6E" />
    {/* Star grid */}
    <g fill="#FFFFFF">
      {[...Array(5)].map((_, r) => (
        <g key={`r-odd-${r}`} transform={`translate(0, ${0.4 + r * 1.1})`}>
          {[...Array(6)].map((_, c) => (
            <circle key={`c-odd-${c}`} cx={0.6 + c * 1.28} cy="0" r="0.16" />
          ))}
        </g>
      ))}
      {[...Array(4)].map((_, r) => (
        <g key={`r-even-${r}`} transform={`translate(0, ${0.95 + r * 1.1})`}>
          {[...Array(5)].map((_, c) => (
            <circle key={`c-even-${c}`} cx={1.24 + c * 1.28} cy="0" r="0.16" />
          ))}
        </g>
      ))}
    </g>
  </svg>
);

export const CanadaFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 20 10" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    <rect width="5" height="10" fill="#D80621"/>
    <rect x="5" width="10" height="10" fill="#FFFFFF"/>
    <rect x="15" width="5" height="10" fill="#D80621"/>
    {/* Stylized Maple Leaf */}
    <path
      d="M 10,2 L 10.5,3.5 L 12,3.2 L 11.5,4.5 L 13.5,4.8 L 12.3,5.8 L 13.1,7.5 L 11.2,7.1 L 10.3,8.7 L 9.7,8.7 L 8.8,7.1 L 6.9,7.5 L 7.7,5.8 L 6.5,4.8 L 8.5,4.5 L 8,3.2 L 9.5,3.5 Z M 9.8,7.5 L 9.8,9.2 L 10.2,9.2 L 10.2,7.5 Z"
      fill="#D80621"
    />
  </svg>
);

export const EUCanadaFlag: React.FC = () => (
  <div className="w-5 h-3.5 rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none overflow-hidden flex">
    {/* Left half: EU Flag */}
    <div className="w-1/2 h-full overflow-hidden relative">
      <svg viewBox="0 0 12 8" className="absolute left-0 top-0 h-full w-[200%] max-w-none">
        <rect width="12" height="8" fill="#003399"/>
        <g transform="translate(6,4)">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const r = 2.2;
            const x = r * Math.sin(angle);
            const y = -r * Math.cos(angle);
            return (
              <path
                key={i}
                d="M 0,-0.4 L 0.1,-0.1 L 0.4,-0.1 L 0.15,0.1 L 0.25,0.4 L 0,0.2 L -0.25,0.4 L -0.15,0.1 L -0.4,-0.1 L -0.1,-0.1 Z"
                fill="#FFCC00"
                transform={`translate(${x},${y}) scale(0.6)`}
              />
            );
          })}
        </g>
      </svg>
    </div>
    {/* Right half: Canada Flag */}
    <div className="w-1/2 h-full overflow-hidden relative">
      <svg viewBox="0 0 20 10" className="absolute right-0 top-0 h-full w-[200%] max-w-none">
        <rect width="5" height="10" fill="#D80621"/>
        <rect x="5" width="10" height="10" fill="#FFFFFF"/>
        <rect x="15" width="5" height="10" fill="#D80621"/>
        <path
          d="M 10,2 L 10.5,3.5 L 12,3.2 L 11.5,4.5 L 13.5,4.8 L 12.3,5.8 L 13.1,7.5 L 11.2,7.1 L 10.3,8.7 L 9.7,8.7 L 8.8,7.1 L 6.9,7.5 L 7.7,5.8 L 6.5,4.8 L 8.5,4.5 L 8,3.2 L 9.5,3.5 Z M 9.8,7.5 L 9.8,9.2 L 10.2,9.2 L 10.2,7.5 Z"
          fill="#D80621"
        />
      </svg>
    </div>
  </div>
);

export const UKFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 50 30" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    <rect width="50" height="30" fill="#012169" />
    <path d="M0,0 L50,30 M50,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
    <path d="M0,0 L50,30" stroke="#C8102E" strokeWidth="2" />
    <path d="M50,0 L0,30" stroke="#C8102E" strokeWidth="2" />
    <path d="M25,0 L25,30 M0,15 L50,15" stroke="#FFFFFF" strokeWidth="10" />
    <path d="M25,0 L25,30 M0,15 L50,15" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

export const CZFlag: React.FC = () => (
  <svg viewBox="0 0 12 8" className="w-5 h-3.5 rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none">
    <rect width="12" height="4" fill="#FFFFFF" />
    <rect y="4" width="12" height="4" fill="#D7141A" />
    <polygon points="0,0 6,4 0,8" fill="#11457E" />
  </svg>
);

export const BrazilFlag: React.FC = () => (
  <svg viewBox="0 0 100 70" className="w-5 h-3.5 rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none">
    <rect width="100" height="70" fill="#009c3b" />
    <polygon points="50,8 92,35 50,62 8,35" fill="#ffdf00" />
    <circle cx="50" cy="35" r="17.5" fill="#002171" />
    <path d="M 32.8,37.5 Q 50,32 67.2,28 L 67.2,30 Q 50,34 32.8,39 Z" fill="#ffffff" />
  </svg>
);

export const GermanyFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 5 3" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    <rect width="5" height="1" y="0" fill="#000000" />
    <rect width="5" height="1" y="1" fill="#FF0000" />
    <rect width="5" height="1" y="2" fill="#FFCC00" />
  </svg>
);

export const IEFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 12 8" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    <rect width="4" height="8" fill="#169B62" />
    <rect x="4" width="4" height="8" fill="#FFFFFF" />
    <rect x="8" width="4" height="8" fill="#FF883E" />
  </svg>
);

export const NLFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 12 8" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    <rect width="12" height="2.67" y="0" fill="#AE1C28" />
    <rect width="12" height="2.67" y="2.67" fill="#FFFFFF" />
    <rect width="12" height="2.67" y="5.34" fill="#21468B" />
  </svg>
);

export const QAFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 28 11" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    <rect width="28" height="11" fill="#8D1B3D" />
    <polygon points="0,0 8,0 8,11 0,11" fill="#FFFFFF" />
    <polygon points="8,0 9.5,0.61 8,1.22 9.5,1.83 8,2.44 9.5,3.05 8,3.66 9.5,4.27 8,4.88 9.5,5.49 8,6.10 9.5,6.71 8,7.32 9.5,7.93 8,8.54 9.5,9.15 8,9.76 9.5,10.37 8,11" fill="#FFFFFF" />
  </svg>
);

export const HUFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 12 8" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    <rect width="12" height="2.67" y="0" fill="#CD2A3E" />
    <rect width="12" height="2.67" y="2.67" fill="#FFFFFF" />
    <rect width="12" height="2.67" y="5.34" fill="#436F4D" />
  </svg>
);

export const SGFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 15 10" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    {/* Red top half */}
    <rect width="15" height="5" fill="#DE2910" />
    {/* White bottom half */}
    <rect width="15" height="5" y="5" fill="#FFFFFF" />
    {/* Crescent Moon in canton */}
    <path d="M 2.2 1.3 A 1.45 1.45 0 1 0 3.65 3.9 A 1.45 1.45 0 1 1 2.2 1.3 Z" fill="#FFFFFF" />
    {/* 5 stars in a circle/pentagon */}
    <circle cx="4.0" cy="2.0" r="0.22" fill="#FFFFFF" />
    <circle cx="4.6" cy="2.5" r="0.22" fill="#FFFFFF" />
    <circle cx="4.4" cy="3.1" r="0.22" fill="#FFFFFF" />
    <circle cx="3.6" cy="3.1" r="0.22" fill="#FFFFFF" />
    <circle cx="3.4" cy="2.5" r="0.22" fill="#FFFFFF" />
  </svg>
);

export const PTFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 15 10" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    {/* Green part */}
    <rect width="6" height="10" fill="#00662F" />
    {/* Red part */}
    <rect x="6" width="9" height="10" fill="#DA291C" />
    {/* Coat of arms sphere */}
    <circle cx="6" cy="5" r="1.8" fill="#FFC72C" />
    {/* Simplified shield */}
    <rect x="5.4" y="4.2" width="1.2" height="1.4" fill="#DA291C" rx="0.1" />
    <rect x="5.6" y="4.4" width="0.8" height="1.0" fill="#FFFFFF" rx="0.05" />
    <rect x="5.7" y="4.5" width="0.6" height="0.8" fill="#041E42" />
  </svg>
);

export const FIFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 18 11" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    <rect width="18" height="11" fill="#FFFFFF" />
    {/* Horizontal blue bar */}
    <rect y="4" width="18" height="3" fill="#002F6C" />
    {/* Vertical blue bar */}
    <rect x="5" width="3" height="11" fill="#002F6C" />
  </svg>
);

export const TRFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 15 10" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    {/* Red Background */}
    <rect width="15" height="10" fill="#E30A17" />
    {/* Crescent - Outer White Circle */}
    <circle cx="5.5" cy="5" r="2.5" fill="#FFFFFF" />
    {/* Crescent - Inner Red Circle to subtract */}
    <circle cx="6.2" cy="5" r="2.0" fill="#E30A17" />
    {/* Star - Simplified 5-point star polygon */}
    <polygon points="8.5,5 9.1,5.2 9.4,4.6 9.7,5.2 10.3,5 9.9,5.5 10.2,6.1 9.6,5.8 9.3,6.3 9.2,5.7" fill="#FFFFFF" />
  </svg>
);

export const JPFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 15 10" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    {/* White Background */}
    <rect width="15" height="10" fill="#FFFFFF" />
    {/* Red Sun Disc */}
    <circle cx="7.5" cy="5" r="3" fill="#BC002D" />
  </svg>
);

export const AEFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 20 10" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    {/* Left vertical red stripe */}
    <rect width="5" height="10" fill="#DE2910" />
    {/* Green top horizontal */}
    <rect x="5" width="15" height="3.33" fill="#00732F" />
    {/* White middle horizontal */}
    <rect x="5" y="3.33" width="15" height="3.33" fill="#FFFFFF" />
    {/* Black bottom horizontal */}
    <rect x="5" y="6.66" width="15" height="3.34" fill="#000000" />
  </svg>
);

export const AUFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 20 10" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    <rect width="20" height="10" fill="#000080" />
    {/* Canton (Union Jack) */}
    <rect width="10" height="5" fill="#000080" />
    <path d="M0,0 L10,5 M0,5 L10,0" stroke="#FFFFFF" strokeWidth="1" />
    <path d="M0,0 L10,5 M0,5 L10,0" stroke="#CC0000" strokeWidth="0.6" />
    <path d="M5,0 L5,5 M0,2.5 L10,2.5" stroke="#FFFFFF" strokeWidth="1.6" />
    <path d="M5,0 L5,5 M0,2.5 L10,2.5" stroke="#CC0000" strokeWidth="1" />
    {/* Large Commonwealth star under Canton */}
    <polygon points="5,7.8 5.2,7.2 5.8,7.2 5.3,6.8 5.5,6.2 5.0,6.6 4.5,6.2 4.7,6.8 4.2,7.2 4.8,7.2" fill="#FFFFFF" />
    {/* Southern Cross stars on right side */}
    <circle cx="15" cy="2" r="0.4" fill="#FFFFFF" />
    <circle cx="17.5" cy="4" r="0.4" fill="#FFFFFF" />
    <circle cx="15" cy="7.5" r="0.4" fill="#FFFFFF" />
    <circle cx="12.5" cy="5" r="0.4" fill="#FFFFFF" />
    <circle cx="16" cy="5.8" r="0.2" fill="#FFFFFF" />
  </svg>
);

export const KRFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 15 10" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    <rect width="15" height="10" fill="#FFFFFF" />
    {/* Taegeuk */}
    <circle cx="7.5" cy="5" r="2" fill="#0047A0" />
    <path d="M 5.5,5 A 1,1 0 0,1 7.5,5 A 1,1 0 0,0 9.5,5 A 2,2 0 0,0 5.5,5" fill="#CD2E3A" />
    {/* Trigrams in corners */}
    <g transform="translate(3.3, 2.3) rotate(33)">
      <rect x="-0.8" y="-0.5" width="1.6" height="0.15" fill="#000000" />
      <rect x="-0.8" y="-0.15" width="1.6" height="0.15" fill="#000000" />
      <rect x="-0.8" y="0.2" width="1.6" height="0.15" fill="#000000" />
    </g>
    <g transform="translate(11.7, 7.7) rotate(33)">
      <rect x="-0.8" y="-0.5" width="0.7" height="0.15" fill="#000000" /><rect x="0.1" y="-0.5" width="0.7" height="0.15" fill="#000000" />
      <rect x="-0.8" y="-0.15" width="0.7" height="0.15" fill="#000000" /><rect x="0.1" y="-0.15" width="0.7" height="0.15" fill="#000000" />
      <rect x="-0.8" y="0.2" width="0.7" height="0.15" fill="#000000" /><rect x="0.1" y="0.2" width="0.7" height="0.15" fill="#000000" />
    </g>
    <g transform="translate(11.7, 2.3) rotate(-33)">
      <rect x="-0.8" y="-0.5" width="1.6" height="0.15" fill="#000000" />
      <rect x="-0.8" y="-0.15" width="0.7" height="0.15" fill="#000000" /><rect x="0.1" y="-0.15" width="0.7" height="0.15" fill="#000000" />
      <rect x="-0.8" y="0.2" width="1.6" height="0.15" fill="#000000" />
    </g>
    <g transform="translate(3.3, 7.7) rotate(-33)">
      <rect x="-0.8" y="-0.5" width="0.7" height="0.15" fill="#000000" /><rect x="0.1" y="-0.5" width="0.7" height="0.15" fill="#000000" />
      <rect x="-0.8" y="-0.15" width="1.6" height="0.15" fill="#000000" />
      <rect x="-0.8" y="0.2" width="0.7" height="0.15" fill="#000000" /><rect x="0.1" y="0.2" width="0.7" height="0.15" fill="#000000" />
    </g>
  </svg>
);

export const ESFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 15 10" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    <rect width="15" height="2.5" fill="#C1272D" />
    <rect y="2.5" width="15" height="5" fill="#F6B426" />
    <rect y="7.5" width="15" height="2.5" fill="#C1272D" />
    {/* Simplified coat of arms */}
    <rect x="3" y="3.8" width="1.2" height="1.8" fill="#C1272D" rx="0.1" />
    <rect x="3.2" y="4.0" width="0.8" height="1.4" fill="#F6B426" rx="0.05" />
    <circle cx="3.6" cy="3.4" r="0.3" fill="#F6B426" />
  </svg>
);

export const HKFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 15 10" className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none`}>
    <rect width="15" height="10" fill="#DE2910" />
    {/* Outer white star/flower structure */}
    <circle cx="7.5" cy="5" r="1.6" fill="#FFFFFF" />
    <circle cx="7.5" cy="5" r="0.6" fill="#DE2910" />
    <path d="M7.5,2.6 L7.9,4 L7.1,4 Z" fill="#FFFFFF" />
    <path d="M9.6,4.0 L8.4,4.5 L8.6,3.8 Z" fill="#FFFFFF" />
    <path d="M8.8,6.8 L8.1,5.7 L8.6,5.4 Z" fill="#FFFFFF" />
    <path d="M6.2,6.8 L6.9,5.7 L6.4,5.4 Z" fill="#FFFFFF" />
    <path d="M5.4,4.0 L6.6,4.5 L6.4,3.8 Z" fill="#FFFFFF" />
  </svg>
);

export const SmartwingsLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={smartwingsLogoUrl} 
    alt="Smartwings Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const DeltaLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={deltaLogoUrl} 
    alt="Delta Air Lines Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const LufthansaLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={lufthansaLogoUrl} 
    alt="Lufthansa Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const RyanairLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={ryanairLogoUrl} 
    alt="Ryanair Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const BritishAirwaysLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={britishAirwaysLogoUrl} 
    alt="British Airways Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const KLMLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={klmLogoUrl} 
    alt="KLM Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const QatarLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={qatarLogoUrl} 
    alt="Qatar Airways Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const WizzLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={wizzLogoUrl} 
    alt="Wizz Air Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const SingaporeLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={singaporeLogoUrl} 
    alt="Singapore Airlines Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const TapLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={tapLogoUrl} 
    alt="TAP Air Portugal Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const AirCanadaLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={airCanadaLogoUrl} 
    alt="Air Canada Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const FinnairLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={finnairLogoUrl} 
    alt="Finnair Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const UnitedLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={unitedLogoUrl} 
    alt="United Airlines Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const AmericanLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={americanLogoUrl} 
    alt="American Airlines Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const TurkishLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={turkishLogoUrl} 
    alt="Turkish Airlines Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const ANALogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={anaLogoUrl} 
    alt="All Nippon Airways Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const EmiratesLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={emiratesLogoUrl} 
    alt="Emirates Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const QantasLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={qantasLogoUrl} 
    alt="Qantas Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const KoreanLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={koreanLogoUrl} 
    alt="Korean Air Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const VuelingLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={vuelingLogoUrl} 
    alt="Vueling Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const CathayLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={cathayLogoUrl} 
    alt="Cathay Pacific Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const AirFranceLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={airFranceLogoUrl} 
    alt="Air France Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const IberiaLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={iberiaLogoUrl} 
    alt="Iberia Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const SASLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={sasLogoUrl} 
    alt="SAS Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const BrusselsAirlinesLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={brusselsLogoUrl} 
    alt="Brussels Airlines Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const LOTLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={lotLogoUrl} 
    alt="LOT Polish Airlines Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const AustrianAirlinesLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={austrianLogoUrl} 
    alt="Austrian Airlines Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const SwissLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={swissLogoUrl} 
    alt="Swiss International Air Lines Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const EtihadLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={etihadLogoUrl} 
    alt="Etihad Airways Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);

export const JALLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <img 
    src={jalLogoUrl} 
    alt="Japan Airlines Logo" 
    className={`${className} rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none bg-white object-contain`}
    referrerPolicy="no-referrer"
  />
);





