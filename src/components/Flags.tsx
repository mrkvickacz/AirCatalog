import React from 'react';

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

export const USFlag: React.FC = () => (
  <svg viewBox="0 0 19 10" className="w-5 h-3.5 rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none">
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

export const CanadaFlag: React.FC = () => (
  <svg viewBox="0 0 20 10" className="w-5 h-3.5 rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none">
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

export const UKFlag: React.FC = () => (
  <svg viewBox="0 0 50 30" className="w-5 h-3.5 rounded-[2px] shadow-sm border border-white/10 shrink-0 select-none">
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

