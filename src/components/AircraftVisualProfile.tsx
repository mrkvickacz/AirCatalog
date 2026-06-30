import React from 'react';
import { Aircraft } from '../types';

interface AircraftVisualProfileProps {
  aircraft: Aircraft;
  lang?: 'CZ' | 'EN';
  theme?: 'light' | 'dark';
}

/**
 * Builds parametric SVG paths representing the side-view shape of an aircraft
 */
export function getSideViewPaths(specs: Aircraft['specs'], id: string, scale: number) {
  const isConcorde = id.toLowerCase().includes('concorde');
  const isDreamlifter = id.toLowerCase().includes('lcf') || id.toLowerCase().includes('dreamlifter');
  const is747 = id.toLowerCase().includes('747') && !isDreamlifter;
  const isA380 = id.toLowerCase().includes('a380');

  const dpL = specs.lengthM * scale;
  const dpH = specs.heightM * scale;
  const dpW = specs.fuselageWidthM * scale;
  const dpG = Math.max(8, 0.13 * dpH); // Landing gear height
  
  const X_nose = 30;
  const Y_ground = 220;
  const Y_f_bottom = Y_ground - dpG;
  const Y_f_top = Y_f_bottom - dpW;
  const Y_f_center = Y_f_bottom - dpW / 2;

  let sideFuselagePath = '';

  if (isConcorde) {
    // Concorde: Needle nose, delta wing style fuselage joining
    sideFuselagePath = `
      M ${X_nose} ${Y_f_center + 1}
      C ${X_nose + 0.12 * dpL} ${Y_f_center - 1}, ${X_nose + 0.18 * dpL} ${Y_f_top + 1.5}, ${X_nose + 0.25 * dpL} ${Y_f_top + 0.5}
      L ${X_nose + 0.82 * dpL} ${Y_f_top + 0.5}
      C ${X_nose + 0.88 * dpL} ${Y_f_top + 1}, ${X_nose + 0.94 * dpL} ${Y_f_center - 1}, ${X_nose + 0.99 * dpL} ${Y_f_center}
      L ${X_nose + dpL} ${Y_f_center + 1}
      L ${X_nose + 0.97 * dpL} ${Y_f_center + 3}
      L ${X_nose + 0.82 * dpL} ${Y_f_bottom - 0.5}
      L ${X_nose + 0.25 * dpL} ${Y_f_bottom - 0.5}
      C ${X_nose + 0.18 * dpL} ${Y_f_bottom - 0.5}, ${X_nose + 0.08 * dpL} ${Y_f_center + 3}, ${X_nose} ${Y_f_center + 1}
      Z
    `.trim();
  } else if (isDreamlifter) {
    // Boeing 747-400LCF Dreamlifter: Giant, cargo-bulged bulbous fuselage spanning most of the length
    sideFuselagePath = `
      M ${X_nose} ${Y_f_center}
      C ${X_nose + 0.02 * dpL} ${Y_f_center - 4}, ${X_nose + 0.04 * dpL} ${Y_f_top - 0.82 * dpW}, ${X_nose + 0.08 * dpL} ${Y_f_top - 0.82 * dpW}
      L ${X_nose + 0.80 * dpL} ${Y_f_top - 0.82 * dpW}
      C ${X_nose + 0.84 * dpL} ${Y_f_top - 0.82 * dpW}, ${X_nose + 0.88 * dpL} ${Y_f_top}, ${X_nose + 0.92 * dpL} ${Y_f_top}
      C ${X_nose + 0.95 * dpL} ${Y_f_top}, ${X_nose + 0.98 * dpL} ${Y_f_center - 1}, ${X_nose + 0.99 * dpL} ${Y_f_center}
      L ${X_nose + dpL} ${Y_f_center + 2}
      L ${X_nose + 0.98 * dpL} ${Y_f_center + 5}
      L ${X_nose + 0.76 * dpL} ${Y_f_bottom}
      L ${X_nose + 0.12 * dpL} ${Y_f_bottom}
      C ${X_nose + 0.03 * dpL} ${Y_f_bottom}, ${X_nose} ${Y_f_center + 3}, ${X_nose} ${Y_f_center}
      Z
    `.trim();
  } else if (is747) {
    // Boeing 747: Distinctive upper deck hump
    sideFuselagePath = `
      M ${X_nose} ${Y_f_center}
      C ${X_nose + 0.02 * dpL} ${Y_f_center - 4}, ${X_nose + 0.04 * dpL} ${Y_f_top - 0.38 * dpW}, ${X_nose + 0.08 * dpL} ${Y_f_top - 0.38 * dpW}
      L ${X_nose + 0.30 * dpL} ${Y_f_top - 0.38 * dpW}
      C ${X_nose + 0.33 * dpL} ${Y_f_top - 0.38 * dpW}, ${X_nose + 0.36 * dpL} ${Y_f_top}, ${X_nose + 0.40 * dpL} ${Y_f_top}
      L ${X_nose + 0.78 * dpL} ${Y_f_top}
      C ${X_nose + 0.84 * dpL} ${Y_f_top}, ${X_nose + 0.93 * dpL} ${Y_f_center - 1}, ${X_nose + 0.98 * dpL} ${Y_f_center}
      L ${X_nose + dpL} ${Y_f_center + 2}
      L ${X_nose + 0.98 * dpL} ${Y_f_center + 5}
      L ${X_nose + 0.76 * dpL} ${Y_f_bottom}
      L ${X_nose + 0.12 * dpL} ${Y_f_bottom}
      C ${X_nose + 0.03 * dpL} ${Y_f_bottom}, ${X_nose} ${Y_f_center + 3}, ${X_nose} ${Y_f_center}
      Z
    `.trim();
  } else if (isA380) {
    // Airbus A380: Giant full double-decker flat cabin roof
    sideFuselagePath = `
      M ${X_nose} ${Y_f_center + 2}
      C ${X_nose + 0.03 * dpL} ${Y_f_center - 2}, ${X_nose + 0.07 * dpL} ${Y_f_top - 0.36 * dpW}, ${X_nose + 0.11 * dpL} ${Y_f_top - 0.36 * dpW}
      L ${X_nose + 0.72 * dpL} ${Y_f_top - 0.36 * dpW}
      C ${X_nose + 0.76 * dpL} ${Y_f_top - 0.36 * dpW}, ${X_nose + 0.82 * dpL} ${Y_f_top}, ${X_nose + 0.85 * dpL} ${Y_f_top}
      C ${X_nose + 0.89 * dpL} ${Y_f_top}, ${X_nose + 0.94 * dpL} ${Y_f_center}, ${X_nose + 0.98 * dpL} ${Y_f_center + 1}
      L ${X_nose + dpL} ${Y_f_center + 4}
      L ${X_nose + 0.97 * dpL} ${Y_f_center + 7}
      L ${X_nose + 0.75 * dpL} ${Y_f_bottom}
      L ${X_nose + 0.12 * dpL} ${Y_f_bottom}
      C ${X_nose + 0.03 * dpL} ${Y_f_bottom}, ${X_nose} ${Y_f_center + 4}, ${X_nose} ${Y_f_center + 2}
      Z
    `.trim();
  } else {
    // Standard Airliner (A320, 737, etc.)
    sideFuselagePath = `
      M ${X_nose} ${Y_f_center}
      Q ${X_nose + 0.04 * dpL} ${Y_f_top} ${X_nose + 0.12 * dpL} ${Y_f_top}
      L ${X_nose + 0.78 * dpL} ${Y_f_top}
      C ${X_nose + 0.83 * dpL} ${Y_f_top}, ${X_nose + 0.92 * dpL} ${Y_f_center - 1}, ${X_nose + 0.97 * dpL} ${Y_f_center}
      L ${X_nose + dpL} ${Y_f_center + 2}
      L ${X_nose + 0.97 * dpL} ${Y_f_center + 4}
      L ${X_nose + 0.76 * dpL} ${Y_f_bottom}
      L ${X_nose + 0.12 * dpL} ${Y_f_bottom}
      Q ${X_nose + 0.03 * dpL} ${Y_f_bottom} ${X_nose} ${Y_f_center}
      Z
    `.trim();
  }

  // Tail vertical fin path - sweeps back and goes up to specs.heightM relative to ground!
  // High point is Y_ground - dpH
  const sideFinPath = `
    M ${X_nose + 0.72 * dpL} ${Y_f_top}
    C ${X_nose + 0.80 * dpL} ${Y_f_top - 0.1 * dpW}, ${X_nose + 0.88 * dpL} ${Y_ground - dpH + 0.15 * dpH}, ${X_nose + 0.92 * dpL} ${Y_ground - dpH}
    L ${X_nose + 0.96 * dpL} ${Y_ground - dpH}
    L ${X_nose + 0.99 * dpL} ${Y_f_center}
    L ${X_nose + 0.90 * dpL} ${Y_f_top}
    Z
  `.trim();

  // Landing Gear
  const noseGearPath = `
    M ${X_nose + 0.13 * dpL} ${Y_f_bottom}
    L ${X_nose + 0.13 * dpL} ${Y_ground - 4}
  `.trim();

  const mainGearPath = `
    M ${X_nose + 0.58 * dpL} ${Y_f_bottom}
    L ${X_nose + 0.58 * dpL} ${Y_ground - 5}
  `.trim();

  // Low wing profile protrusion on the side
  const wingProtrusion = `
    M ${X_nose + 0.40 * dpL} ${Y_f_bottom}
    L ${X_nose + 0.52 * dpL} ${Y_f_bottom + 0.18 * dpW}
    L ${X_nose + 0.58 * dpL} ${Y_f_bottom + 0.08 * dpW}
    L ${X_nose + 0.48 * dpL} ${Y_f_bottom}
    Z
  `.trim();

  // Engines
  let sideEnginesPath = '';
  const engLength = Math.max(12, 0.65 * dpW);
  const engWidth = Math.max(6, 0.24 * dpW);
  const Y_eng = Y_f_bottom + 2;

  if (specs.engineCount === 4 && !isConcorde) {
    // 2 visible engines on side due to overlap representing quad engines
    const X_eng1 = X_nose + 0.36 * dpL;
    const X_eng2 = X_nose + 0.44 * dpL;
    sideEnginesPath = `
      M ${X_eng1 - engLength/2} ${Y_eng}
      h ${engLength} a ${engWidth/2} ${engWidth/2} 0 0 1 ${engWidth/2} ${engWidth/2} a ${engWidth/2} ${engWidth/2} 0 0 1 -${engWidth/2} ${engWidth/2} h -${engLength} a ${engWidth/2} ${engWidth/2} 0 0 1 -${engWidth/2} -${engWidth/2} a ${engWidth/2} ${engWidth/2} 0 0 1 ${engWidth/2} -${engWidth/2} Z
      M ${X_eng2 - engLength * 0.9 / 2} ${Y_eng - 3}
      h ${engLength * 0.9} a ${engWidth * 0.9 / 2} ${engWidth * 0.9 / 2} 0 0 1 ${engWidth * 0.9 / 2} ${engWidth * 0.9 / 2} a ${engWidth * 0.9 / 2} ${engWidth * 0.9 / 2} 0 0 1 -${engWidth * 0.9 / 2} ${engWidth * 0.9 / 2} h -${engLength * 0.9} a ${engWidth * 0.9 / 2} ${engWidth * 0.9 / 2} 0 0 1 -${engWidth * 0.9 / 2} -${engWidth * 0.9 / 2} a ${engWidth * 0.9 / 2} ${engWidth * 0.9 / 2} 0 0 1 ${engWidth * 0.9 / 2} -${engWidth * 0.9 / 2} Z
    `.trim();
  } else if (isConcorde) {
    // Concorde has underlying combustion chambers under wing (aft mount)
    const X_eng = X_nose + 0.72 * dpL;
    sideEnginesPath = `
      M ${X_eng - 12} ${Y_f_bottom}
      L ${X_eng + 10} ${Y_f_bottom + 1.5}
      L ${X_eng + 8} ${Y_f_bottom + 4}
      L ${X_eng - 12} ${Y_f_bottom + 3.5}
      Z
    `.trim();
  } else {
    // Twin engines
    const X_eng = X_nose + 0.38 * dpL;
    sideEnginesPath = `
      M ${X_eng - engLength/2} ${Y_eng}
      h ${engLength} a ${engWidth/2} ${engWidth/2} 0 0 1 ${engWidth/2} ${engWidth/2} a ${engWidth/2} ${engWidth/2} 0 0 1 -${engWidth/2} ${engWidth/2} h -${engLength} a ${engWidth/2} ${engWidth/2} 0 0 1 -${engWidth/2} -${engWidth/2} a ${engWidth/2} ${engWidth/2} 0 0 1 ${engWidth/2} -${engWidth/2} Z
    `.trim();
  }

  return {
    fuselage: sideFuselagePath,
    fin: sideFinPath,
    gear: `${noseGearPath} ${mainGearPath}`,
    wingProtrusion,
    engines: sideEnginesPath,
    Y_ground,
    dpL,
    dpH,
    X_nose
  };
}

/**
 * Builds parametric SVG paths representing the top-view shape of an aircraft
 */
export function getTopViewPaths(specs: Aircraft['specs'], id: string, scale: number) {
  const isConcorde = id.toLowerCase().includes('concorde');
  const isDreamlifter = id.toLowerCase().includes('lcf') || id.toLowerCase().includes('dreamlifter');

  const dpL = specs.lengthM * scale;
  const dpW = specs.wingspanM * scale;
  const dpFw = specs.fuselageWidthM * scale;

  const X_center = 200;
  const Y_nose = 20;
  const Y_tail = Y_nose + dpL;

  // 1. Fuselage Outlines
  let fuselagePath = '';
  if (isConcorde) {
    // Concorde: Needle slender nose
    fuselagePath = `
      M ${X_center} ${Y_nose}
      C ${X_center - 0.5} ${Y_nose + 0.05 * dpL}, ${X_center - dpFw/2} ${Y_nose + 0.15 * dpL}, ${X_center - dpFw/2} ${Y_nose + 0.25 * dpL}
      L ${X_center - dpFw/2} ${Y_nose + 0.85 * dpL}
      L ${X_center} ${Y_tail}
      L ${X_center + dpFw/2} ${Y_nose + 0.85 * dpL}
      L ${X_center + dpFw/2} ${Y_nose + 0.25 * dpL}
      C ${X_center + dpFw/2} ${Y_nose + 0.15 * dpL}, ${X_center + 0.5} ${Y_nose + 0.05 * dpL}, ${X_center} ${Y_nose}
      Z
    `.trim();
  } else if (isDreamlifter) {
    // Dreamlifter: Extends widely for cargo hold
    const dpCargoW = dpFw * 1.5; // Significantly wider fuselage over cargo hold
    fuselagePath = `
      M ${X_center} ${Y_nose}
      C ${X_center - dpFw/3} ${Y_nose + 0.02 * dpL}, ${X_center - dpCargoW/2} ${Y_nose + 0.07 * dpL}, ${X_center - dpCargoW/2} ${Y_nose + 0.12 * dpL}
      L ${X_center - dpCargoW/2} ${Y_nose + 0.82 * dpL}
      C ${X_center - dpCargoW/2} ${Y_nose + 0.86 * dpL}, ${X_center - dpFw/2} ${Y_nose + 0.88 * dpL}, ${X_center - dpFw/2} ${Y_nose + 0.90 * dpL}
      L ${X_center - dpFw/2} ${Y_nose + 0.94 * dpL}
      C ${X_center - dpFw/2} ${Y_nose + 0.96 * dpL}, ${X_center - 1} ${Y_tail - 5}, ${X_center} ${Y_tail}
      C ${X_center + 1} ${Y_tail - 5}, ${X_center + dpFw/2} ${Y_nose + 0.96 * dpL}, ${X_center + dpFw/2} ${Y_nose + 0.94 * dpL}
      L ${X_center + dpFw/2} ${Y_nose + 0.90 * dpL}
      C ${X_center + dpFw/2} ${Y_nose + 0.88 * dpL}, ${X_center + dpCargoW/2} ${Y_nose + 0.86 * dpL}, ${X_center + dpCargoW/2} ${Y_nose + 0.82 * dpL}
      L ${X_center + dpCargoW/2} ${Y_nose + 0.12 * dpL}
      C ${X_center + dpCargoW/2} ${Y_nose + 0.07 * dpL}, ${X_center + dpFw/3} ${Y_nose + 0.02 * dpL}, ${X_center} ${Y_nose}
      Z
    `.trim();
  } else {
    // Standard airliner
    fuselagePath = `
      M ${X_center} ${Y_nose}
      C ${X_center - dpFw/3} ${Y_nose + 0.02 * dpL}, ${X_center - dpFw/2} ${Y_nose + 0.07 * dpL}, ${X_center - dpFw/2} ${Y_nose + 0.12 * dpL}
      L ${X_center - dpFw/2} ${Y_nose + 0.86 * dpL}
      C ${X_center - dpFw/2} ${Y_nose + 0.92 * dpL}, ${X_center - 1} ${Y_tail - 5}, ${X_center} ${Y_tail}
      C ${X_center + 1} ${Y_tail - 5}, ${X_center + dpFw/2} ${Y_nose + 0.92 * dpL}, ${X_center + dpFw/2} ${Y_nose + 0.86 * dpL}
      L ${X_center + dpFw/2} ${Y_nose + 0.12 * dpL}
      C ${X_center + dpFw/2} ${Y_nose + 0.07 * dpL}, ${X_center + dpFw/3} ${Y_nose + 0.02 * dpL}, ${X_center} ${Y_nose}
      Z
    `.trim();
  }

  // 2. Wings
  let wingsPath = '';
  if (isConcorde) {
    // Concorde massive ogival delta wing
    wingsPath = `
      M ${X_center - dpFw/2} ${Y_nose + 0.32 * dpL}
      C ${X_center - dpFw/2} ${Y_nose + 0.45 * dpL}, ${X_center - 0.22 * dpW} ${Y_nose + 0.70 * dpL}, ${X_center - dpW/2} ${Y_nose + 0.85 * dpL}
      h ${dpW/2 - dpFw/2}
      Z
      M ${X_center + dpFw/2} ${Y_nose + 0.32 * dpL}
      C ${X_center + dpFw/2} ${Y_nose + 0.45 * dpL}, ${X_center + 0.22 * dpW} ${Y_nose + 0.70 * dpL}, ${X_center + dpW/2} ${Y_nose + 0.85 * dpL}
      h -${dpW/2 - dpFw/2}
      Z
    `.trim();
  } else {
    // Swept wings (symmetrical)
    const wingRootFront = Y_nose + 0.40 * dpL;
    const wingRootRear = Y_nose + 0.56 * dpL;
    const wingTipFront = Y_nose + 0.58 * dpL;
    const wingTipRear = Y_nose + 0.61 * dpL;

    wingsPath = `
      M ${X_center - dpFw/2} ${wingRootFront}
      L ${X_center - dpW/2} ${wingTipFront}
      L ${X_center - dpW/2} ${wingTipRear}
      L ${X_center - dpFw/2} ${wingRootRear}
      Z
      M ${X_center + dpFw/2} ${wingRootFront}
      L ${X_center + dpW/2} ${wingTipFront}
      L ${X_center + dpW/2} ${wingTipRear}
      L ${X_center + dpFw/2} ${wingRootRear}
      Z
    `.trim();
  }

  // 3. Tailplanes (Horizontal Stabilizers) - absent on Concorde delta
  let tailplanesPath = '';
  if (!isConcorde) {
    const tailSpan = Math.max(16, 0.28 * dpW);
    const tailRootFront = Y_nose + 0.87 * dpL;
    const tailRootRear = Y_nose + 0.96 * dpL;
    const tailTipFront = Y_nose + 0.94 * dpL;
    const tailTipRear = Y_nose + 0.97 * dpL;

    tailplanesPath = `
      M ${X_center - dpFw/2} ${tailRootFront}
      L ${X_center - tailSpan/2} ${tailTipFront}
      L ${X_center - tailSpan/2} ${tailTipRear}
      L ${X_center - dpFw/2} ${tailRootRear}
      Z
      M ${X_center + dpFw/2} ${tailRootFront}
      L ${X_center + tailSpan/2} ${tailTipFront}
      L ${X_center + tailSpan/2} ${tailTipRear}
      L ${X_center + dpFw/2} ${tailRootRear}
      Z
    `.trim();
  }

  // 4. Engines
  let enginesPath = '';
  const engLength = Math.max(10, 0.44 * dpFw);
  const engWidth = Math.max(5, 0.18 * dpFw);

  if (specs.engineCount === 4 && !isConcorde) {
    // Quad Jet: 2 engines on each wing
    const innerY = Y_nose + 0.46 * dpL;
    const outerY = Y_nose + 0.53 * dpL;
    const innerXDist = 0.15 * dpW;
    const outerXDist = 0.28 * dpW;

    enginesPath = `
      M ${X_center - innerXDist - engWidth/2} ${innerY}
      h ${engWidth} q ${engWidth/2} 0 ${engWidth/2} ${engLength/2} t -${engWidth/2} ${engLength/2} h -${engWidth} q -${engWidth/2} 0 -${engWidth/2} -${engLength/2} t ${engWidth/2} -${engLength/2} Z
      M ${X_center - outerXDist - engWidth/2} ${outerY}
      h ${engWidth} q ${engWidth/2} 0 ${engWidth/2} ${engLength/2} t -${engWidth/2} ${engLength/2} h -${engWidth} q -${engWidth/2} 0 -${engWidth/2} -${engLength/2} t ${engWidth/2} -${engLength/2} Z
      
      M ${X_center + innerXDist - engWidth/2} ${innerY}
      h ${engWidth} q ${engWidth/2} 0 ${engWidth/2} ${engLength/2} t -${engWidth/2} ${engLength/2} h -${engWidth} q -${engWidth/2} 0 -${engWidth/2} -${engLength/2} t ${engWidth/2} -${engLength/2} Z
      M ${X_center + outerXDist - engWidth/2} ${outerY}
      h ${engWidth} q ${engWidth/2} 0 ${engWidth/2} ${engLength/2} t -${engWidth/2} ${engLength/2} h -${engWidth} q -${engWidth/2} 0 -${engWidth/2} -${engLength/2} t ${engWidth/2} -${engLength/2} Z
    `.trim();
  } else if (isConcorde) {
    // Concorde: 2 twin engine pods under each delta wing aft side
    const scaleXLeft = X_center - 0.16 * dpW;
    const scaleXRight = X_center + 0.16 * dpW;
    const podY = Y_nose + 0.76 * dpL;
    const podW = 0.05 * dpW;
    const podL = 0.08 * dpL;

    enginesPath = `
      M ${scaleXLeft - podW/2} ${podY}
      h ${podW} v ${podL} h -${podW} Z
      M ${scaleXRight - podW/2} ${podY}
      h ${podW} v ${podL} h -${podW} Z
    `.trim();
  } else {
    // Twin Jets: 1 engine on each wing
    const Y_eng = Y_nose + 0.44 * dpL;
    const X_dist = Math.max(15, 0.15 * dpW);

    enginesPath = `
      M ${X_center - X_dist - engWidth/2} ${Y_eng}
      h ${engWidth} q ${engWidth/2} 0 ${engWidth/2} ${engLength/2} t -${engWidth/2} ${engLength/2} h -${engWidth} q -${engWidth/2} 0 -${engWidth/2} -${engLength/2} t ${engWidth/2} -${engLength/2} Z
      
      M ${X_center + X_dist - engWidth/2} ${Y_eng}
      h ${engWidth} q ${engWidth/2} 0 ${engWidth/2} ${engLength/2} t -${engWidth/2} ${engLength/2} h -${engWidth} q -${engWidth/2} 0 -${engWidth/2} -${engLength/2} t ${engWidth/2} -${engLength/2} Z
    `.trim();
  }

  return {
    fuselage: fuselagePath,
    wings: wingsPath,
    tailplanes: tailplanesPath,
    engines: enginesPath,
    X_center,
    Y_nose,
    dpL,
    dpW
  };
}

export default function AircraftVisualProfile({ aircraft, lang = 'CZ', theme = 'dark' }: AircraftVisualProfileProps) {
  const currentLang = lang;
  const isDark = theme !== 'light';

  // Compute local scale factors assuming direct standalone display
  // STANDALONE bounds: width=280 for top, 460 for side
  const sideScale = Math.min(460 / aircraft.specs.lengthM, 140 / aircraft.specs.heightM);
  const topScale = Math.min(260 / aircraft.specs.lengthM, 260 / aircraft.specs.wingspanM);

  const sidePaths = getSideViewPaths(aircraft.specs, aircraft.id, sideScale);
  const topPaths = getTopViewPaths(aircraft.specs, aircraft.id, topScale);

  const cardTitleClass = isDark ? 'text-slate-200' : 'text-slate-800';
  const cardBorderClass = isDark ? 'border-white/5 bg-slate-900/30' : 'border-slate-200 bg-slate-50/50 shadow-xs';
  const detailsTextClass = isDark ? 'text-slate-400' : 'text-slate-550';

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-5 md:p-6 rounded-2xl border ${cardBorderClass}`}>
      
      {/* SIDE PROFILE */}
      <div className="flex flex-col">
        <div className="mb-2">
          <span className={`text-[10px] font-mono tracking-wider uppercase font-bold text-sky-500`}>
            {currentLang === 'CZ' ? 'PRECIZNÍ TVAR ZBOKU' : 'SIDE PROFILE VIEW'}
          </span>
          <h3 className={`text-base font-bold ${cardTitleClass} flex items-baseline gap-2`}>
            <span>{aircraft.name}</span>
            <span className="text-xs font-mono font-medium text-slate-500">
              L: {aircraft.specs.lengthM}m × H: {aircraft.specs.heightM}m
            </span>
          </h3>
        </div>

        <div className={`relative flex-1 min-h-[250px] border rounded-xl overflow-hidden ${
          isDark ? 'bg-slate-950/60 border-slate-800/60' : 'bg-slate-100/50 border-slate-200'
        }`}>
          {/*Blueprint effect grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          <svg className="w-full h-full" viewBox="0 0 540 250">
            {/* Ground Line */}
            <line 
              x1="10" y1={sidePaths.Y_ground} x2="520" y2={sidePaths.Y_ground} 
              className={isDark ? 'stroke-slate-800' : 'stroke-slate-300'} strokeWidth="1.5" strokeDasharray="3,3" 
            />

            {/* Aircraft Side Silhouette */}
            <g className="transition-all duration-300">
              {/* Main Fuselage */}
              <path 
                d={sidePaths.fuselage} 
                className={isDark ? 'fill-sky-500/10 stroke-sky-400' : 'fill-sky-500/10 stroke-sky-600'} 
                strokeWidth="2" strokeLinejoin="round" 
              />
              {/* Tail Vertical Fin */}
              <path 
                d={sidePaths.fin} 
                className={isDark ? 'fill-sky-500/10 stroke-sky-400' : 'fill-sky-500/10 stroke-sky-600'} 
                strokeWidth="1.5" strokeLinejoin="round" 
              />
              {/* Engines */}
              {sidePaths.engines && (
                <path 
                  d={sidePaths.engines} 
                  className={isDark ? 'fill-sky-400/30 stroke-sky-400' : 'fill-sky-600/30 stroke-sky-600'} 
                  strokeWidth="1.5" 
                />
              )}
              {/* Wing Section Protrusion */}
              <path 
                d={sidePaths.wingProtrusion} 
                className={isDark ? 'fill-sky-500/5 stroke-sky-450/40' : 'fill-sky-500/5 stroke-sky-700/30'} 
                strokeWidth="1" 
              />
              {/* Landing gear paths */}
              <path 
                d={sidePaths.gear} 
                className={isDark ? 'stroke-slate-400' : 'stroke-slate-500'} 
                strokeWidth="1.5" 
              />
              {/* Landing gear wheels */}
              <circle cx={sidePaths.X_nose + 0.13 * sidePaths.dpL} cy={sidePaths.Y_ground - 2} r="3" className={isDark ? 'fill-slate-300' : 'fill-slate-600'} />
              <circle cx={sidePaths.X_nose + 0.58 * sidePaths.dpL} cy={sidePaths.Y_ground - 3} r="4" className={isDark ? 'fill-slate-300' : 'fill-slate-600'} />
            </g>

            {/* Technical Dimension Brackets */}
            {/* 1. Length bracket below ground */}
            <g className="font-mono text-[10px]" fill={isDark ? '#94a3b8' : '#475569'}>
              {/* Left bracket marker */}
              <line 
                x1={sidePaths.X_nose} y1={sidePaths.Y_ground + 10} 
                x2={sidePaths.X_nose} y2={sidePaths.Y_ground + 22} 
                stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1" 
              />
              {/* Right bracket marker */}
              <line 
                x1={sidePaths.X_nose + sidePaths.dpL} y1={sidePaths.Y_ground + 10} 
                x2={sidePaths.X_nose + sidePaths.dpL} y2={sidePaths.Y_ground + 22} 
                stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1" 
              />
              {/* Horizontal line with scale */}
              <line 
                x1={sidePaths.X_nose} y1={sidePaths.Y_ground + 16} 
                x2={sidePaths.X_nose + sidePaths.dpL} y2={sidePaths.Y_ground + 16} 
                stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1" 
              />
              {/* Length Text label */}
              <rect 
                x={sidePaths.X_nose + sidePaths.dpL / 2 - 35} y={sidePaths.Y_ground + 6} 
                width="70" height="18" rx="3" 
                fill={isDark ? '#020617' : '#ffffff'} 
              />
              <text 
                x={sidePaths.X_nose + sidePaths.dpL / 2} y={sidePaths.Y_ground + 18} 
                textAnchor="middle" className="font-bold font-mono"
              >
                {aircraft.specs.lengthM} m
              </text>
            </g>

            {/* 2. Height bracket at the tail fin */}
            <g className="font-mono text-[10px]" fill={isDark ? '#94a3b8' : '#475569'}>
              {/* Ground-level horizontal auxiliary line */}
              <line 
                x1={sidePaths.X_nose + sidePaths.dpL - 10} y1={sidePaths.Y_ground} 
                x2={sidePaths.X_nose + sidePaths.dpL + 25} y2={sidePaths.Y_ground} 
                stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1" strokeDasharray="2,2" 
              />
              {/* Peak auxiliary line */}
              <line 
                x1={sidePaths.X_nose + 0.94 * sidePaths.dpL} y1={sidePaths.Y_ground - sidePaths.dpH} 
                x2={sidePaths.X_nose + sidePaths.dpL + 25} y2={sidePaths.Y_ground - sidePaths.dpH} 
                stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1" strokeDasharray="2,2" 
              />
              {/* Vertical measurement dimension line */}
              <line 
                x1={sidePaths.X_nose + sidePaths.dpL + 18} y1={sidePaths.Y_ground} 
                x2={sidePaths.X_nose + sidePaths.dpL + 18} y2={sidePaths.Y_ground - sidePaths.dpH} 
                stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1" 
              />
              {/* Arrows / Marks */}
              <line x1={sidePaths.X_nose + sidePaths.dpL + 15} y1={sidePaths.Y_ground} x2={sidePaths.X_nose + sidePaths.dpL + 21} y2={sidePaths.Y_ground} stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1" />
              <line x1={sidePaths.X_nose + sidePaths.dpL + 15} y1={sidePaths.Y_ground - sidePaths.dpH} x2={sidePaths.X_nose + sidePaths.dpL + 21} y2={sidePaths.Y_ground - sidePaths.dpH} stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1" />

              {/* Height label text rotated or placed neatly */}
              <rect 
                x={sidePaths.X_nose + sidePaths.dpL + 23} y={sidePaths.Y_ground - sidePaths.dpH / 2 - 9} 
                width="40" height="18" rx="3" 
                fill={isDark ? '#020617' : '#ffffff'} 
              />
              <text 
                x={sidePaths.X_nose + sidePaths.dpL + 43} y={sidePaths.Y_ground - sidePaths.dpH / 2 + 3} 
                textAnchor="middle" className="font-bold font-mono text-[9px]"
              >
                {aircraft.specs.heightM} m
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* TOP PROFILE */}
      <div className="flex flex-col">
        <div className="mb-2">
          <span className={`text-[10px] font-mono tracking-wider uppercase font-bold text-indigo-500`}>
            {currentLang === 'CZ' ? 'PRECIZNÍ TVAR ZE SHORA' : 'TOP-DOWN PROFILE VIEW'}
          </span>
          <h3 className={`text-base font-bold ${cardTitleClass} flex items-baseline gap-2`}>
            <span>{aircraft.name}</span>
            <span className="text-xs font-mono font-medium text-slate-500">
              L: {aircraft.specs.lengthM}m × W: {aircraft.specs.wingspanM}m
            </span>
          </h3>
        </div>

        <div className={`relative flex-1 min-h-[250px] border rounded-xl overflow-hidden ${
          isDark ? 'bg-slate-950/60 border-slate-800/60' : 'bg-slate-100/50 border-slate-200'
        }`}>
          {/* Blueprint effect grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          <svg className="w-full h-full" viewBox="0 0 400 300">
            {/* Central Axis guide */}
            <line 
              x1={topPaths.X_center} y1="10" x2={topPaths.X_center} y2="290" 
              className={isDark ? 'stroke-slate-800/50' : 'stroke-slate-300/60'} strokeWidth="1" strokeDasharray="4,4" 
            />

            {/* Aircraft Top Silhouette */}
            <g className="transition-all duration-300">
              {/* Wings */}
              <path 
                d={topPaths.wings} 
                className={isDark ? 'fill-indigo-500/10 stroke-indigo-400' : 'fill-indigo-500/10 stroke-indigo-600'} 
                strokeWidth="1.8" strokeLinejoin="round" 
              />
              {/* Tailplanes */}
              {topPaths.tailplanes && (
                <path 
                  d={topPaths.tailplanes} 
                  className={isDark ? 'fill-indigo-500/10 stroke-indigo-400' : 'fill-indigo-500/10 stroke-indigo-600'} 
                  strokeWidth="1.5" strokeLinejoin="round" 
                />
              )}
              {/* Engines */}
              {topPaths.engines && (
                <path 
                  d={topPaths.engines} 
                  className={isDark ? 'fill-indigo-400/30 stroke-indigo-400' : 'fill-indigo-600/30 stroke-indigo-600'} 
                  strokeWidth="1.5" 
                />
              )}
              {/* Main Fuselage */}
              <path 
                d={topPaths.fuselage} 
                className={isDark ? 'fill-indigo-500/15 stroke-indigo-400' : 'fill-indigo-500/15 stroke-indigo-600'} 
                strokeWidth="2" strokeLinejoin="round" 
              />
            </g>

            {/* Dimensions for wingspan at the tail end or tip */}
            <g className="font-mono text-[10px]" fill={isDark ? '#94a3b8' : '#475569'}>
              {/* Left wingtip auxiliary line down */}
              <line 
                x1={topPaths.X_center - topPaths.dpW / 2} y1={topPaths.Y_nose + 175} 
                x2={topPaths.X_center - topPaths.dpW / 2} y2={topPaths.Y_nose + 225} 
                stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1" strokeDasharray="2,2" 
              />
              {/* Right wingtip auxiliary line down */}
              <line 
                x1={topPaths.X_center + topPaths.dpW / 2} y1={topPaths.Y_nose + 175} 
                x2={topPaths.X_center + topPaths.dpW / 2} y2={topPaths.Y_nose + 225} 
                stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1" strokeDasharray="2,2" 
              />
              {/* Horiz line for wingspan */}
              <line 
                x1={topPaths.X_center - topPaths.dpW / 2} y1={topPaths.Y_nose + 215} 
                x2={topPaths.X_center + topPaths.dpW / 2} y2={topPaths.Y_nose + 215} 
                stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1" 
              />
              {/* Marks */}
              <line x1={topPaths.X_center - topPaths.dpW / 2} y1={topPaths.Y_nose + 210} x2={topPaths.X_center - topPaths.dpW / 2} y2={topPaths.Y_nose + 220} stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1" />
              <line x1={topPaths.X_center + topPaths.dpW / 2} y1={topPaths.Y_nose + 210} x2={topPaths.X_center + topPaths.dpW / 2} y2={topPaths.Y_nose + 220} stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1" />

              {/* Wingspan text label */}
              <rect 
                x={topPaths.X_center - 35} y={topPaths.Y_nose + 205} 
                width="70" height="18" rx="3" 
                fill={isDark ? '#020617' : '#ffffff'} 
              />
              <text 
                x={topPaths.X_center} y={topPaths.Y_nose + 217} 
                textAnchor="middle" className="font-bold"
              >
                {aircraft.specs.wingspanM} m
              </text>
            </g>
          </svg>
        </div>
      </div>

    </div>
  );
}

interface AircraftCompositeProps {
  aircraft1: Aircraft | null;
  aircraft2: Aircraft | null;
  lang?: 'CZ' | 'EN';
  theme?: 'light' | 'dark';
}

/**
 * Renders an overlapping silhouette diagram of both selected aircraft
 * aligned at nose / wheels backgrounded by a grid.
 * Pink: Slot 1 (aircraft1)
 * Light Green: Slot 2 (aircraft2)
 */
export function AircraftCompositeOverlay({ aircraft1, aircraft2, lang = 'CZ', theme = 'dark' }: AircraftCompositeProps) {
  const currentLang = lang;
  const isDark = theme !== 'light';

  if (!aircraft1 || !aircraft2) return null;

  // Let's compute maximum metrics to scale BOTH together perfectly retaining relative physical size proportions
  const maxLength = Math.max(aircraft1.specs.lengthM, aircraft2.specs.lengthM);
  const maxWingspan = Math.max(aircraft1.specs.wingspanM, aircraft2.specs.wingspanM);
  const maxHeight = Math.max(aircraft1.specs.heightM, aircraft2.specs.heightM);

  // Layout limits:
  // FOR SIDE CANVAS: size is 650x260, ground is at 210
  const limitSideWidth = 530;
  const limitSideHeight = 150;
  const sideScale = Math.min(limitSideWidth / maxLength, limitSideHeight / maxHeight);

  // FOR TOP CANVAS: size is 450x455, Y nose starts at 20, center axis at 225
  const limitTopWidth = 360; 
  const limitTopHeight = 360;
  const topScale = Math.min(limitTopWidth / maxWingspan, limitTopHeight / maxLength);

  // Paths for aircraft 1 (Pink)
  const ac1Side = getSideViewPaths(aircraft1.specs, aircraft1.id, sideScale);
  const ac1Top = getTopViewPaths(aircraft1.specs, aircraft1.id, topScale);

  // Paths for aircraft 2 (Light Green)
  const ac2Side = getSideViewPaths(aircraft2.specs, aircraft2.id, sideScale);
  const ac2Top = getTopViewPaths(aircraft2.specs, aircraft2.id, topScale);

  // Theme-sensitive styling for composite overlay shapes
  const ac1Colors = isDark 
    ? {
        fuselage: "fill-rose-500/15 stroke-rose-500",
        fin: "fill-rose-500/15 stroke-rose-500",
        protrusion: "fill-rose-500/5 stroke-rose-500/30",
        engines: "fill-rose-400/40 stroke-rose-500",
        gear: "stroke-rose-600"
      }
    : {
        fuselage: "fill-rose-500/10 stroke-rose-600",
        fin: "fill-rose-500/10 stroke-rose-600",
        protrusion: "fill-rose-500/5 stroke-rose-600/30",
        engines: "fill-rose-400/30 stroke-rose-600",
        gear: "stroke-rose-700"
      };

  const ac2Colors = isDark 
    ? {
        gClass: "opacity-75 mix-blend-screen relative z-20",
        fuselage: "fill-emerald-500/15 stroke-emerald-500",
        fin: "fill-emerald-500/15 stroke-emerald-500",
        protrusion: "fill-emerald-500/5 stroke-emerald-500/30",
        engines: "fill-emerald-400/40 stroke-emerald-500",
        gear: "stroke-emerald-600"
      }
    : {
        // High visibility light green (emerald-600 outline has superb contrast in light mode)
        gClass: "opacity-85 mix-blend-multiply relative z-20",
        fuselage: "fill-emerald-500/10 stroke-emerald-600",
        fin: "fill-emerald-500/10 stroke-emerald-600",
        protrusion: "fill-emerald-500/5 stroke-emerald-600/35",
        engines: "fill-emerald-400/35 stroke-emerald-600",
        gear: "stroke-emerald-700"
      };

  return (
    <div className={`space-y-6 rounded-2xl md:rounded-3xl p-4 md:p-6 border ${
      isDark ? 'bg-slate-950/20 border-white/5' : 'bg-slate-50 border-slate-200'
    } transition-colors duration-300`}>
      
      {/* SECTION EXPLANATION HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-slate-800/30">
        <div>
          <span className="text-[10px] font-bold font-mono tracking-wide text-rose-500 uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            {currentLang === 'CZ' ? 'GRAFICKÉ PŘEKRYTÍ ROZMĚRŮ' : 'GRAPHICAL METRICS OVERLAY'}
          </span>
          <h3 className={`text-base font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {currentLang === 'CZ' ? 'Srovnání siluet v přesném měřítku' : 'Strict Scale Silhouette Comparison'}
          </h3>
          <p className={`text-xs mt-1 max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {currentLang === 'CZ' 
              ? 'Názorné překrytí tvarů letadel – obě letadla jsou zarovnána na příď (nos) a ground-line, což odhaluje skutečné rozdíly v konstrukci.' 
              : 'Direct superimposition of airframe outlines – both models aligned at their nose and landing wheels to expose absolute geometry offsets.'}
          </p>
        </div>

        {/* Legend */}
        <div className="shrink-0 flex items-center gap-4 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/40 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-500 border border-rose-600 block shrink-0" />
            <span className="text-rose-450 font-bold truncate max-w-[120px]">{aircraft1.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500 border border-emerald-600 block shrink-0" />
            <span className="text-emerald-450 font-bold truncate max-w-[120px]">{aircraft2.name}</span>
          </div>
        </div>
      </div>

      {/* COMPOSITE DRAWINGS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SIDE OVERLAY: lg:col-span-7 */}
        <div className="lg:col-span-7 flex flex-col space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className={`text-[11px] font-bold font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {currentLang === 'CZ' ? 'POHLED ZBOKU (Zarovnáno na nos)' : 'SIDE OVERLAY (Nose aligned)'}
            </span>
          </div>

          <div className={`relative min-h-[280px] rounded-2xl border overflow-hidden ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-[#f8fafc] border-slate-200'
          }`}>
            {/* Technical grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <svg className="w-full h-full min-h-[280px]" viewBox="0 0 650 280">
              
              {/* Helper ground line */}
              <line 
                x1="10" y1={ac1Side.Y_ground} x2="630" y2={ac1Side.Y_ground} 
                className={isDark ? 'stroke-slate-800' : 'stroke-slate-300'} strokeWidth="1.5" strokeDasharray="3,3" 
              />

              {/* DRAW AIRCRAFT 1 (Pink) */}
              <g className="opacity-75 relative z-10">
                {/* Main Fuselage */}
                <path 
                  d={ac1Side.fuselage} 
                  className={ac1Colors.fuselage} 
                  strokeWidth="2" strokeLinejoin="round" 
                />
                {/* Tail Vertical Fin */}
                <path 
                  d={ac1Side.fin} 
                  className={ac1Colors.fin} 
                  strokeWidth="1.5" strokeLinejoin="round" 
                />
                {/* Side wing sections */}
                <path d={ac1Side.wingProtrusion} className={ac1Colors.protrusion} strokeWidth="1" />
                {/* Side engines */}
                {ac1Side.engines && <path d={ac1Side.engines} className={ac1Colors.engines} strokeWidth="1" />}
                {/* Gears */}
                <path d={ac1Side.gear} className={ac1Colors.gear} strokeWidth="1" />
              </g>

              {/* DRAW AIRCRAFT 2 (Light Green) */}
              <g className={ac2Colors.gClass}>
                {/* Main Fuselage */}
                <path 
                  d={ac2Side.fuselage} 
                  className={ac2Colors.fuselage} 
                  strokeWidth="2" strokeLinejoin="round" 
                />
                {/* Tail Vertical Fin */}
                <path 
                  d={ac2Side.fin} 
                  className={ac2Colors.fin} 
                  strokeWidth="1.5" strokeLinejoin="round" 
                />
                {/* Side wing sections */}
                <path d={ac2Side.wingProtrusion} className={ac2Colors.protrusion} strokeWidth="1" />
                {/* Side engines */}
                {ac2Side.engines && <path d={ac2Side.engines} className={ac2Colors.engines} strokeWidth="1" />}
                {/* Gears */}
                <path d={ac2Side.gear} className={ac2Colors.gear} strokeWidth="1" />
              </g>

              {/* TECHNICAL DIMENSIONS COMPARATIVE BAR LABELS */}
              {/* Aircraft 1 Length dimension */}
              <g className="font-mono text-[9px] fill-rose-500">
                {/* Right tip mark line */}
                <line x1={ac1Side.X_nose + ac1Side.dpL} y1={ac1Side.Y_ground + 10} x2={ac1Side.X_nose + ac1Side.dpL} y2={ac1Side.Y_ground + 24} stroke="#f43f5e" strokeWidth="0.8" />
                <line x1={ac1Side.X_nose} y1={ac1Side.Y_ground + 16} x2={ac1Side.X_nose + ac1Side.dpL} y2={ac1Side.Y_ground + 16} stroke="#f43f5e" strokeWidth="0.8" />
                <rect x={ac1Side.X_nose + ac1Side.dpL - 68} y={ac1Side.Y_ground + 18} width="66" height="15" rx="3" fill={isDark ? '#1e1b4b' : '#ffe4e6'} />
                <text x={ac1Side.X_nose + ac1Side.dpL - 35} y={ac1Side.Y_ground + 29} textAnchor="middle" className="font-bold">
                  {aircraft1.name}: {aircraft1.specs.lengthM}m
                </text>
              </g>

              {/* Aircraft 2 Length dimension */}
              <g className="font-mono text-[9px] fill-emerald-500">
                {/* Right tip mark line */}
                <line x1={ac2Side.X_nose + ac2Side.dpL} y1={ac2Side.Y_ground + 28} x2={ac2Side.X_nose + ac2Side.dpL} y2={ac2Side.Y_ground + 42} stroke="#10b981" strokeWidth="0.8" />
                <line x1={ac2Side.X_nose} y1={ac2Side.Y_ground + 34} x2={ac2Side.X_nose + ac2Side.dpL} y2={ac2Side.Y_ground + 34} stroke="#10b981" strokeWidth="0.8" />
                <rect x={ac2Side.X_nose + ac2Side.dpL - 68} y={ac2Side.Y_ground + 36} width="66" height="15" rx="3" fill={isDark ? '#064e3b' : '#d1fae5'} />
                <text x={ac2Side.X_nose + ac2Side.dpL - 35} y={ac2Side.Y_ground + 47} textAnchor="middle" className="font-bold">
                  {aircraft2.name}: {aircraft2.specs.lengthM}m
                </text>
              </g>

              {/* Vertical Aux Line at Nose */}
              <line x1={ac1Side.X_nose} y1={ac1Side.Y_ground + 5} x2={ac1Side.X_nose} y2={ac1Side.Y_ground + 45} stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1" />

              {/* VERTICAL HEIGHT COMPARATIVE AXES */}
              {/* Aircraft 1 Tail auxiliary horizontal line */}
              <line x1={ac1Side.X_nose + ac1Side.dpL - 8} y1={ac1Side.Y_ground - ac1Side.dpH} x2={630} y2={ac1Side.Y_ground - ac1Side.dpH} stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="1,2" />
              {/* Aircraft 2 Tail auxiliary horizontal line */}
              <line x1={ac2Side.X_nose + ac2Side.dpL - 8} y1={ac2Side.Y_ground - ac2Side.dpH} x2={630} y2={ac2Side.Y_ground - ac2Side.dpH} stroke="#10b981" strokeWidth="0.8" strokeDasharray="1,2" />

              {/* Dimension measurement bar at far right */}
              <g className="font-mono text-[8px]">
                {/* Pink bracket */}
                <line x1="620" y1={ac1Side.Y_ground} x2="620" y2={ac1Side.Y_ground - ac1Side.dpH} stroke="#f43f5e" strokeWidth="1" />
                <line x1="617" y1={ac1Side.Y_ground - ac1Side.dpH} x2="623" y2={ac1Side.Y_ground - ac1Side.dpH} stroke="#f43f5e" strokeWidth="1" />
                <text x="614" y={ac1Side.Y_ground - ac1Side.dpH + 3} textAnchor="end" fill="#f43f5e" className="font-bold">
                  {aircraft1.specs.heightM} m
                </text>

                {/* Green bracket */}
                <line x1="600" y1={ac1Side.Y_ground} x2="600" y2={ac1Side.Y_ground - ac2Side.dpH} stroke="#10b981" strokeWidth="1" />
                <line x1="597" y1={ac1Side.Y_ground - ac2Side.dpH} x2="603" y2={ac1Side.Y_ground - ac2Side.dpH} stroke="#10b981" strokeWidth="1" />
                <text x="594" y={ac1Side.Y_ground - ac2Side.dpH + 3} textAnchor="end" fill="#10b981" className="font-bold">
                  {aircraft2.specs.heightM} m
                </text>
              </g>

            </svg>
          </div>
        </div>

        {/* TOP OVERLAY: lg:col-span-5 */}
        <div className="lg:col-span-5 flex flex-col space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className={`text-[11px] font-bold font-mono ${isDark ? 'text-slate-400' : 'text-slate-550'}`}>
              {currentLang === 'CZ' ? 'POHLED ZE SHORA (Zarovnáno na osu)' : 'TOP OVERLAY (Wingspan aligned)'}
            </span>
          </div>

          <div className={`relative min-h-[380px] rounded-2xl border overflow-hidden ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-[#f8fafc] border-slate-200'
          }`}>
            {/* Technical grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <svg className="w-full h-full min-h-[380px]" viewBox="0 0 400 380">
              {/* Central vertical axis guide */}
              <line 
                x1={ac1Top.X_center} y1="10" x2={ac1Top.X_center} y2="370" 
                className={isDark ? 'stroke-slate-800' : 'stroke-slate-300'} strokeWidth="1.5" strokeDasharray="3,3" 
              />

              {/* DRAW AIRCRAFT 1 (Pink) */}
              <g className="opacity-75 relative z-10">
                {/* Wings */}
                <path d={ac1Top.wings} className={ac1Colors.fuselage} strokeWidth="1.8" strokeLinejoin="round" />
                {/* Tailplane */}
                {ac1Top.tailplanes && <path d={ac1Top.tailplanes} className={ac1Colors.fin} strokeWidth="1.2" strokeLinejoin="round" />}
                {/* Fuselage */}
                <path d={ac1Top.fuselage} className={ac1Colors.fuselage} strokeWidth="2" strokeLinejoin="round" />
                {/* Engines */}
                {ac1Top.engines && <path d={ac1Top.engines} className={ac1Colors.engines} strokeWidth="1" />}
              </g>

              {/* DRAW AIRCRAFT 2 (Light Green) */}
              <g className={ac2Colors.gClass}>
                {/* Wings */}
                <path d={ac2Top.wings} className={ac2Colors.fuselage} strokeWidth="1.8" strokeLinejoin="round" />
                {/* Tailplane */}
                {ac2Top.tailplanes && <path d={ac2Top.tailplanes} className={ac2Colors.fin} strokeWidth="1.2" strokeLinejoin="round" />}
                {/* Fuselage */}
                <path d={ac2Top.fuselage} className={ac2Colors.fuselage} strokeWidth="2" strokeLinejoin="round" />
                {/* Engines */}
                {ac2Top.engines && <path d={ac2Top.engines} className={ac2Colors.engines} strokeWidth="1" />}
              </g>

              {/* WINGSPAN DIMENSION COMPARATOR LINES AT BOTTOM */}
              {/* Aircraft 1 (Pink) Wingspan dimension line */}
              <g className="font-mono text-[9px] fill-rose-500">
                <line x1={ac1Top.X_center - ac1Top.dpW / 2} y1="315" x2={ac1Top.X_center - ac1Top.dpW / 2} y2="340" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="1,1" />
                <line x1={ac1Top.X_center + ac1Top.dpW / 2} y1="315" x2={ac1Top.X_center + ac1Top.dpW / 2} y2="340" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="1,1" />
                
                <line x1={ac1Top.X_center - ac1Top.dpW / 2} y1="325" x2={ac1Top.X_center + ac1Top.dpW / 2} y2="325" stroke="#f43f5e" strokeWidth="0.8" />
                <line x1={ac1Top.X_center - ac1Top.dpW / 2} y1="322" x2={ac1Top.X_center - ac1Top.dpW / 2} y2="328" stroke="#f43f5e" strokeWidth="1" />
                <line x1={ac1Top.X_center + ac1Top.dpW / 2} y1="322" x2={ac1Top.X_center + ac1Top.dpW / 2} y2="328" stroke="#f43f5e" strokeWidth="1" />
                
                <rect x={ac1Top.X_center - 65} y="331" width="130" height="15" rx="3" fill={isDark ? '#1e1b4b' : '#ffe4e6'} />
                <text x={ac1Top.X_center} y="342" textAnchor="middle" className="font-bold">
                  {aircraft1.specs.wingspanM} m ({aircraft1.name})
                </text>
              </g>

              {/* Aircraft 2 (Green) Wingspan dimension line */}
              <g className="font-mono text-[9px] fill-emerald-500">
                <line x1={ac2Top.X_center - ac2Top.dpW / 2} y1="345" x2={ac2Top.X_center - ac2Top.dpW / 2} y2="370" stroke="#10b981" strokeWidth="0.8" strokeDasharray="1,1" />
                <line x1={ac2Top.X_center + ac2Top.dpW / 2} y1="345" x2={ac2Top.X_center + ac2Top.dpW / 2} y2="370" stroke="#10b981" strokeWidth="0.8" strokeDasharray="1,1" />
                
                <line x1={ac2Top.X_center - ac2Top.dpW / 2} y1="355" x2={ac2Top.X_center + ac2Top.dpW / 2} y2="355" stroke="#10b981" strokeWidth="0.8" />
                <line x1={ac2Top.X_center - ac2Top.dpW / 2} y1="352" x2={ac2Top.X_center - ac2Top.dpW / 2} y2="358" stroke="#10b981" strokeWidth="1" />
                <line x1={ac2Top.X_center + ac2Top.dpW / 2} y1="352" x2={ac2Top.X_center + ac2Top.dpW / 2} y2="358" stroke="#10b981" strokeWidth="1" />
                
                <rect x={ac2Top.X_center - 65} y="359" width="130" height="15" rx="3" fill={isDark ? '#064e3b' : '#d1fae5'} />
                <text x={ac2Top.X_center} y="370" textAnchor="middle" className="font-bold">
                  {aircraft2.specs.wingspanM} m ({aircraft2.name})
                </text>
              </g>

            </svg>
          </div>
        </div>

      </div>

    </div>
  );
}
