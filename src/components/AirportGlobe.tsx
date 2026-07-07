import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Search, 
  Calendar, 
  Gauge, 
  Navigation, 
  Compass,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sparkles,
  Info,
  Layers,
  Award,
  ChevronLeft,
  Plane,
  Globe,
  ArrowLeftRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { AIRPORTS_DATA } from '../data/airports';
import { COUNTRY_BORDERS } from '../data/borders';
import { Airport } from '../types';
import { translateAirportText } from '../translations';
import { AIRLINE_DATA } from '../airline_data';
import { AIRCRAFT_DATA } from '../data';

interface AirportGlobeProps {
  selectedAirportId: string;
  onSelectAirport: (id: string) => void;
  isDark: boolean;
  lang: 'CZ' | 'EN';
  onBackToList?: () => void;
}

// Scoring helper to select realistic airlines for any route
const getRouteAirlines = (fromId: string, toId: string, distance: number, lang: 'CZ' | 'EN') => {
  if (!fromId || !toId) return [];
  const fromAirport = AIRPORTS_DATA.find(a => a.id === fromId);
  const toAirport = AIRPORTS_DATA.find(a => a.id === toId);
  if (!fromAirport || !toAirport) return [];

  const fromIata = fromAirport.code.split(' ')[0].trim();
  const toIata = toAirport.code.split(' ')[0].trim();

  const hubs: Record<string, string[]> = {
    'smartwings': ['PRG'],
    'lufthansa': ['FRA', 'MUC'],
    'british-airways': ['LHR'],
    'klm': ['AMS'],
    'emirates': ['DXB'],
    'singapore-airlines': ['SIN'],
    'turkish-airlines': ['IST'],
    'qantas': ['SYD'],
    'korean-air': ['ICN'],
    'cathay-pacific': ['HKG'],
    'ana': ['HND'],
    'delta-air-lines': ['JFK', 'LAX', 'ATL'],
    'american-airlines': ['JFK', 'LAX', 'DFW'],
    'united-airlines': ['JFK', 'LAX', 'ORD', 'SFO'],
    'ryanair': ['DUB', 'STN'],
    'wizz-air': ['BUD'],
    'vueling': ['BCN'],
    'tap-portugal': ['LIS'],
    'finnair': ['HEL'],
    'air-canada': ['YYZ'],
  };

  const isEurope = (country: string) => {
    const eu = ['Česká republika', 'Velká Británie', 'Německo', 'Francie', 'Nizozemsko', 'Turecko', 'Finsko', 'Portugalsko', 'Maďarsko', 'Irsko', 'Španělsko'];
    return eu.includes(country);
  };

  const scored = AIRLINE_DATA.map(airline => {
    let score = 0;
    
    // Hub Match
    const airlineHubs = hubs[airline.id] || [];
    if (airlineHubs.includes(fromIata) || airlineHubs.includes(toIata)) {
      score += 15;
    }

    // Country Match
    if (airline.country === fromAirport.country || airline.country === toAirport.country) {
      score += 10;
    }

    // Low-cost short-haul Europe matching
    const bothEurope = isEurope(fromAirport.country) && isEurope(toAirport.country);
    const isLcc = ['ryanair', 'wizz-air', 'vueling'].includes(airline.id);
    
    if (bothEurope) {
      if (isLcc) {
        score += 8;
      } else if (['lufthansa', 'british-airways', 'klm', 'tap-portugal', 'finnair'].includes(airline.id)) {
        score += 6;
      }
    } else {
      if (isLcc) {
        score -= 20; // LCC don't do intercontinental
      }
    }

    // Long haul carriers on long routes
    if (distance > 3500) {
      if (['emirates', 'qatar-airways', 'turkish-airlines'].includes(airline.id)) {
        score += 8;
      } else if (['singapore-airlines', 'qantas', 'cathay-pacific', 'korean-air', 'ana', 'delta-air-lines', 'united-airlines', 'american-airlines', 'air-canada'].includes(airline.id)) {
        score += 5;
      }
    } else {
      // Short routes: reduce score for ultra long haul specific airlines
      if (['qantas', 'singapore-airlines', 'cathay-pacific'].includes(airline.id)) {
        score -= 5;
      }
    }

    return { airline, score };
  });

  // Filter out any airlines with negative or extremely low scores, and return top 3
  const filtered = scored
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // For each of these, find suitable planes from the fleet
  return filtered.map(x => {
    const airline = x.airline;
    
    // Find planes from fleet that have matching range if possible
    const matched = airline.fleet.map(f => {
      const ac = AIRCRAFT_DATA.find(a => a.id === f.aircraftId);
      return ac;
    }).filter(ac => ac !== undefined);

    let suitable = matched.filter(ac => ac!.specs.rangeKm >= distance);
    if (suitable.length === 0) {
      suitable = matched; // Fallback to entire fleet
    }

    // Sort suitable planes by modern range / capacity and take top 2 unique names
    const planes = Array.from(new Set(suitable.slice(0, 2).map(ac => ac!.name)));

    return {
      airline,
      planes: planes.length > 0 ? planes : [lang === 'CZ' ? 'Dopravní letadlo' : 'Commercial Aircraft']
    };
  });
};


// High-fidelity outline coordinates of Earth's main continents (lon, lat)
const CONTINENTS_DATA: number[][][] = [
  // Eurasia (Detailed Europe & Asia, completely separate from Africa)
  [
    [-9, 37], [-9, 38.5], [-9, 42], [-9, 43.8], [-8, 43.8], [-5, 43.5], [-2, 43.3],
    [-1.5, 46], [-2.5, 47.5], [-1.5, 48.5], [0, 49.5], [1.5, 50.1], [3, 51.3], [5, 53],
    [7.5, 53.5], [8, 54], [9, 54.5], [8.5, 55], [8, 56.5], [10, 57.5], [10.5, 56], [10, 54.8],
    [11, 54.2], [14, 54], [16, 54.5], [19, 54.5], [21, 55.5], [22, 57], [20, 60], [18.5, 59.3],
    [16.5, 56.5], [14.5, 55.5], [12.5, 56], [11, 58], [10, 59], [6, 58], [5, 60], [5, 62],
    [12, 66], [15, 68], [20, 70], [25, 71], [31, 70], [35, 69], [40, 67], [41, 66], [39, 65],
    [42, 65], [45, 67], [50, 68], [55, 69], [60, 70], [65, 69], [70, 73], [75, 73], [80, 75],
    [90, 76], [100, 78], [110, 77], [115, 74], [125, 73], [135, 71], [145, 72], [155, 71],
    [165, 69], [175, 67], [179, 66], [175, 64], [172, 62], [165, 60], [162, 57], [160, 55],
    [156, 51], [158, 53], [162, 56], [150, 58], [140, 55], [137, 54], [142, 50], [135, 48],
    [131, 43], [130, 42], [129, 40], [129, 37], [127, 35], [126, 37], [125, 39], [122, 40],
    [118, 38], [121, 37], [122, 35], [121, 31], [120, 28], [118, 26], [116, 24], [114, 22],
    [110, 21], [108, 19], [107, 16], [109, 12], [105, 9], [103, 7], [101, 12], [100, 10],
    [100, 6], [102, 3], [104, 1.3], [103.5, 1.5], [101, 3], [100, 5], [98, 8], [98, 10],
    [96, 15], [94, 18], [92, 21], [88, 22], [86, 20], [82, 17], [80, 13], [78, 10],
    [77.5, 8.1], [76, 10], [74, 15], [73, 19], [70, 21], [68, 23], [67, 24], [62, 25],
    [57, 26], [56, 27], [53, 27], [50, 29], [48, 30], [50, 27], [55, 25], [59, 22],
    [58, 20], [54, 17], [48, 14], [44, 12], [42, 15], [39, 20], [37, 25], [35, 28],
    [34, 28], [32.5, 30], [34, 32], [35, 34.5], [36, 36.5], [33, 36.5], [30, 36.5], [27, 36.5],
    [26, 38], [26, 40], [29, 41], [32, 41], [36, 41.5], [41, 41.5], [41.5, 43], [38, 45],
    [35, 46], [32.5, 46.5], [30, 46.5], [25, 41], [23, 38], [22, 38], [23, 40], [20, 42],
    [18, 40], [15, 40], [18, 40], [16, 38], [14, 41], [12, 43], [10, 44], [12, 45],
    [13.5, 45.5], [14, 45], [15.5, 43.5], [19, 42], [20, 40], [9.5, 44.5], [8, 43.5],
    [5, 43.3], [3, 41.5], [2, 41.5], [0, 39.5], [-1.5, 38], [-4.5, 36.7], [-6, 36.5], [-9, 37]
  ],
  // Africa (Completely separated, accurate boundaries)
  [
    [-13, 28], [-10, 30], [-8, 32], [-5, 35], [-2, 35], [0, 36], [5, 36], [10, 37], [12, 37],
    [15, 34], [20, 32], [25, 31.5], [30, 31.2], [32.2, 31.2], [32.3, 30.5], [32.5, 29.9],
    [35, 27], [38, 22], [40, 18], [43, 13], [43.5, 11.5], [46, 12], [51, 11.5], [51.2, 10.5],
    [50, 8], [48, 5], [46, 2], [43, -2], [41, -4], [40, -10], [38, -15], [35, -20], [33, -25],
    [33, -28], [30, -31], [26, -33], [22, -34.5], [20, -34.8], [18, -34.4], [18, -33], [15, -28],
    [12, -22], [11.5, -15], [13, -12], [12, -9], [9, -5], [9, 0], [8, 4], [5, 4], [2, 6],
    [-5, 5], [-10, 5], [-14, 8], [-14, 8], [-16.5, 12], [-17.5, 14.5], [-17, 16], [-16.5, 19],
    [-17, 21], [-17, 24], [-15, 26], [-13, 28]
  ],
  // North America (High detail)
  [
    [-168, 65], [-162, 60], [-160, 58], [-155, 57], [-150, 59], [-145, 60], [-140, 59],
    [-135, 56], [-130, 52], [-125, 48], [-124, 40], [-120, 34], [-115, 30], [-110, 23],
    [-108, 25], [-105, 20], [-100, 16], [-95, 15], [-90, 14], [-85, 12], [-80, 8],
    [-78, 8], [-79, 9], [-83, 10], [-83, 14], [-88, 16], [-90, 18], [-87, 21], [-90, 20],
    [-97, 20], [-97, 26], [-94, 29.5], [-89, 29], [-85, 30], [-81, 25], [-80, 27],
    [-81, 30], [-79, 33], [-75, 35], [-74, 40], [-71, 41], [-70, 43], [-67, 45],
    [-64, 45], [-61, 47], [-63, 46], [-68, 44], [-70, 48], [-68, 50], [-63, 52],
    [-57, 51.5], [-55, 54], [-57, 58], [-60, 60], [-65, 63], [-68, 66], [-75, 68],
    [-80, 70], [-85, 66], [-90, 65], [-95, 66], [-105, 68], [-115, 69], [-125, 69],
    [-135, 69], [-141, 69.6], [-150, 70], [-160, 71], [-165, 68], [-168, 65]
  ],
  // South America (High detail)
  [
    [-80, 8], [-76, 9], [-74, 11], [-72, 12], [-71, 11.5], [-68, 10.5], [-65, 10.5],
    [-62, 10], [-60, 9], [-58, 6], [-54, 5], [-51, 4], [-48, 0], [-44, -2.5],
    [-38, -4], [-35, -5.5], [-35, -7], [-35, -9], [-38, -13], [-39, -17], [-40.5, -21],
    [-43, -23], [-47, -24], [-48.5, -27], [-52, -31], [-53.5, -33.5], [-54.5, -34.5],
    [-57.5, -34.5], [-58.5, -38], [-62, -39], [-63, -41], [-65, -43], [-67, -46],
    [-66, -48], [-70, -51], [-71, -53], [-73, -54], [-74, -53], [-74, -48], [-75, -45],
    [-74, -40], [-73, -35], [-72, -30], [-71, -25], [-70, -20], [-71, -15], [-76, -14],
    [-80, -9], [-81, -5], [-81.2, -4.5], [-80, -2], [-81, 1], [-79, 4], [-77, 7], [-80, 8]
  ],
  // Australia (High detail)
  [
    [113, -25], [113.5, -22], [114.5, -21.8], [117, -20], [122, -18], [123, -16.5],
    [125, -15], [129, -15], [130.5, -12], [132, -11], [136.5, -12], [136, -14.5],
    [139, -17], [141.5, -15], [142.5, -11], [144, -14], [146, -17], [148, -20],
    [151, -23], [153, -28], [153.5, -29], [151, -34], [150, -37], [147, -38.5],
    [145, -38], [141, -38], [138, -35], [137, -33], [134, -32.5], [129, -32],
    [124, -33], [120, -34], [115, -34.5], [115, -32], [114, -28], [113, -25]
  ],
  // Antarctica (Huge southern ice cap matching the bottom of the photo)
  [
    [-180, -72], [-150, -73], [-120, -74], [-90, -71], [-60, -72], [-30, -75], [0, -76],
    [30, -74], [60, -71], [90, -69], [120, -67], [150, -69], [180, -72]
  ]
];

// Major island outline coordinates (lon, lat) drawn as detailed lands but NOT continents
const ISLANDS_DATA: number[][][] = [
  // Greenland
  [
    [-60, 60], [-45, 60], [-35, 65], [-20, 70], [-25, 75], [-35, 82], [-60, 83], [-73, 78], [-60, 60]
  ],
  // Great Britain (Highly detailed!)
  [
    [-5.5, 50.1], [-3.5, 50.2], [-1.5, 50.5], [1.3, 51.1], [1.5, 52.5], [0.2, 53.5],
    [-1.2, 54.5], [-1.8, 55.7], [-2.0, 57.0], [-1.8, 57.6], [-3.0, 58.7], [-5.0, 58.6],
    [-6.0, 56.8], [-5.5, 55.5], [-3.5, 54.8], [-4.8, 53.3], [-5.3, 51.8], [-5.5, 50.1]
  ],
  // Ireland (Highly detailed!)
  [
    [-10.2, 51.5], [-9.5, 51.5], [-8.0, 51.8], [-6.0, 52.2], [-6.0, 53.5], [-5.8, 54.5],
    [-6.5, 55.2], [-8.2, 55.2], [-10.0, 54.2], [-9.5, 53.0], [-10.5, 52.0], [-10.2, 51.5]
  ],
  // Iceland (Highly detailed!)
  [
    [-24.5, 65.5], [-22, 66.5], [-18, 66.5], [-14, 66.5], [-13.5, 65], [-15, 64],
    [-17, 63.5], [-20.5, 63.3], [-22.5, 64], [-24, 64.8], [-24.5, 65.5]
  ],
  // Sumatra
  [
    [95, 5], [100, 1], [105, -5], [102, -4], [96, 2], [95, 5]
  ],
  // Borneo
  [
    [110, 1], [115, 6], [118, 4], [119, -3], [112, -4], [110, 1]
  ],
  // New Guinea
  [
    [131, -1], [140, -3], [143, -5], [150, -10], [140, -8], [135, -4], [131, -1]
  ],
  // Japan
  [
    [130, 30], [135, 35], [140, 38], [144, 43], [141, 44], [138, 38], [130, 30]
  ],
  // Madagascar (Highly detailed!)
  [
    [49.2, -12.0], [50.2, -15.2], [49.8, -17.0], [48.0, -21.0], [47.0, -23.0], [45.4, -25.2],
    [44.0, -25.2], [43.6, -22.5], [44.4, -19.5], [46.4, -16.0], [48.2, -13.2], [49.2, -12.0]
  ],
  // New Zealand (North Island)
  [
    [174, -35], [178, -37], [176, -40], [175, -41], [172, -41], [173, -38], [174, -35]
  ],
  // New Zealand (South Island)
  [
    [172, -41], [174, -42], [170, -46], [167, -47], [168, -44], [172, -41]
  ]
];

// Helper to classify an airport to its continent or island region based on coordinates & country
function getAirportRegion(lat: number, lon: number, country: string): string {
  const c = country ? country.toLowerCase() : "";
  
  // 1. Islands (Ostrovy)
  if (
    c.includes("island") || 
    c.includes("maledivy") || 
    c.includes("madagaskar") || 
    c.includes("filipíny") || 
    c.includes("indonésie") || 
    c.includes("japonsko") || 
    c.includes("nový zéland") || 
    c.includes("kapverdy") || 
    c.includes("bahamy") || 
    c.includes("mauricius") || 
    c.includes("seychely") ||
    c.includes("karibik") ||
    c.includes("kypr") ||
    c.includes("malta") ||
    c.includes("havaj") ||
    c.includes("hawaii") ||
    // Caribbean lat/lon
    (lat > 10 && lat < 28 && lon > -85 && lon < -59) ||
    // Pacific/Hawaii/Oceania islands
    (lat > 15 && lat < 25 && lon > -161 && lon < -154) ||
    (lat > -25 && lat < -10 && lon > 160 && lon < 185) ||
    (lat > -48 && lat < -33 && lon > 165 && lon < 179) // New Zealand
  ) {
    return 'islands';
  }

  // 2. Continents:
  // Europe
  if (lat > 34 && lat < 72 && lon > -25 && lon < 42) {
    return 'europe';
  }
  // North America
  if (lat > 12 && lat < 85 && lon > -170 && lon < -52) {
    return 'north_america';
  }
  // South America
  if (lat > -56 && lat < 12 && lon > -92 && lon < -32) {
    return 'south_america';
  }
  // Africa
  if (lat > -35 && lat < 37 && lon > -20 && lon < 52) {
    return 'africa';
  }
  // Australia / Oceania
  if (lat > -50 && lat < 5 && lon > 110 && lon < 180) {
    return 'australia';
  }
  // Asia
  if (lat > 5 && lat < 75 && lon > 40 && lon < 180) {
    return 'asia';
  }

  // Fallbacks:
  if (lon < -30) {
    if (lat < 12) return 'south_america';
    return 'north_america';
  }
  if (lon > 100) {
    if (lat < 0) return 'australia';
    return 'asia';
  }
  if (lat < -10) return 'africa';
  
  return 'europe';
}

// Check if a coordinate is on the visible front hemisphere of the 3D globe facing the camera
function isCoordinateVisible(lat: number, lon: number, yaw: number, pitch: number): boolean {
  const latRad = lat * (Math.PI / 180);
  const lonRad = lon * (Math.PI / 180);

  // 3D coordinates on unit sphere
  const x3d = Math.cos(latRad) * Math.sin(lonRad);
  const y3d = Math.sin(latRad);
  const z3d = Math.cos(latRad) * Math.cos(lonRad);

  // Pitch rotation (tilt on X axis)
  const y1 = y3d * Math.cos(pitch) - z3d * Math.sin(pitch);
  const z1 = y3d * Math.sin(pitch) + z3d * Math.cos(pitch);

  // Yaw rotation (spin on Y axis)
  const z2 = -x3d * Math.sin(yaw) + z1 * Math.cos(yaw);

  return z2 > 0;
}

// Get standard country flag emojis for a clean high-fidelity visual indication
function getCountryFlag(country: string): string {
  const c = country.toLowerCase();
  if (c.includes('česká') || c.includes('czech')) return '🇨🇿';
  if (c.includes('velká británie') || c.includes('britain') || c.includes('united kingdom') || c.includes('uk')) return '🇬🇧';
  if (c.includes('německo') || c.includes('germany')) return '🇩🇪';
  if (c.includes('francie') || c.includes('france')) return '🇫🇷';
  if (c.includes('nizozemsko') || c.includes('netherlands')) return '🇳🇱';
  if (c.includes('usa') || c.includes('spojené státy') || c.includes('united states')) return '🇺🇸';
  if (c.includes('singapur') || c.includes('singapore')) return '🇸🇬';
  if (c.includes('japonsko') || c.includes('japan')) return '🇯🇵';
  if (c.includes('emiráty') || c.includes('emirates') || c.includes('uae')) return '🇦🇪';
  if (c.includes('austrálie') || c.includes('australia')) return '🇦🇺';
  if (c.includes('korea')) return '🇰🇷';
  if (c.includes('hongkong') || c.includes('hong kong')) return '🇭🇰';
  if (c.includes('turecko') || c.includes('turkey')) return '🇹🇷';
  if (c.includes('rakousko') || c.includes('austria')) return '🇦🇹';
  if (c.includes('polsko') || c.includes('poland')) return '🇵🇱';
  if (c.includes('slovensko') || c.includes('slovakia')) return '🇸🇰';
  if (c.includes('španělsko') || c.includes('spain')) return '🇪🇸';
  if (c.includes('itálie') || c.includes('italy')) return '🇮🇹';
  if (c.includes('řecko') || c.includes('greece')) return '🇬🇷';
  if (c.includes('švýcarsko') || c.includes('switzerland')) return '🇨🇭';
  if (c.includes('dánsko') || c.includes('denmark')) return '🇩🇰';
  if (c.includes('norsko') || c.includes('norway')) return '🇳🇴';
  if (c.includes('finsko') || c.includes('finland')) return '🇫🇮';
  if (c.includes('portugalsko') || c.includes('portugal')) return '🇵🇹';
  if (c.includes('irsko') || c.includes('ireland')) return '🇮🇪';
  if (c.includes('kanada') || c.includes('canada')) return '🇨🇦';
  if (c.includes('katar') || c.includes('qatar')) return '🇶🇦';
  if (c.includes('čína') || c.includes('china')) return '🇨🇳';
  if (c.includes('thajsko') || c.includes('thailand')) return '🇹🇭';
  if (c.includes('brazílie') || c.includes('brazil')) return '🇧🇷';
  if (c.includes('belgie') || c.includes('belgium')) return '🇧🇪';
  if (c.includes('maďarsko') || c.includes('hungary')) return '🇭🇺';
  if (c.includes('egypt')) return '🇪🇬';
  if (c.includes('švédsko') || c.includes('sweden')) return '🇸🇪';
  if (c.includes('nový zéland') || c.includes('new zealand')) return '🇳🇿';
  if (c.includes('chile')) return '🇨🇱';
  if (c.includes('bulharsko') || c.includes('bulgaria')) return '🇧🇬';
  if (c.includes('rumunsko') || c.includes('romania')) return '🇷🇴';
  if (c.includes('saúdská') || c.includes('saudi')) return '🇸🇦';
  if (c.includes('izrael') || c.includes('israel')) return '🇮🇱';
  if (c.includes('mexiko') || c.includes('mexico')) return '🇲🇽';
  if (c.includes('kuba') || c.includes('cuba')) return '🇨🇺';
  if (c.includes('malta')) return '🇲🇹';
  if (c.includes('kypr') || c.includes('cyprus')) return '🇨🇾';
  if (c.includes('island') || c.includes('iceland')) return '🇮🇸';
  if (c.includes('indie') || c.includes('india')) return '🇮🇳';
  if (c.includes('jihoafrická') || c.includes('south africa')) return '🇿🇦';
  return '🌐';
}

function getShortCountryName(country: string, lang: 'CZ' | 'EN'): string {
  const c = country.toLowerCase();
  if (c.includes('česká') || c.includes('czech')) return lang === 'CZ' ? 'ČESKO' : 'CZECH';
  if (c.includes('velká británie') || c.includes('britain') || c.includes('united kingdom') || c.includes('uk')) return 'UK';
  if (c.includes('německo') || c.includes('germany')) return lang === 'CZ' ? 'NĚMECKO' : 'GERMANY';
  if (c.includes('francie') || c.includes('france')) return lang === 'CZ' ? 'FRANCIE' : 'FRANCE';
  if (c.includes('nizozemsko') || c.includes('netherlands')) return lang === 'CZ' ? 'HOLAND.' : 'NETHERL.';
  if (c.includes('usa') || c.includes('spojené státy') || c.includes('united states')) return 'USA';
  if (c.includes('singapur') || c.includes('singapore')) return lang === 'CZ' ? 'SINGAP.' : 'SINGAP.';
  if (c.includes('japonsko') || c.includes('japan')) return lang === 'CZ' ? 'JAPON.' : 'JAPAN';
  if (c.includes('emiráty') || c.includes('emirates') || c.includes('uae')) return lang === 'CZ' ? 'SAE' : 'UAE';
  if (c.includes('austrálie') || c.includes('australia')) return lang === 'CZ' ? 'AUSTRL.' : 'AUSTRL.';
  if (c.includes('korea')) return lang === 'CZ' ? 'J.KOREA' : 'S.KOREA';
  if (c.includes('hongkong') || c.includes('hong kong')) return 'HONGK.';
  if (c.includes('turecko') || c.includes('turkey')) return lang === 'CZ' ? 'TUREC.' : 'TURKEY';
  if (c.includes('rakousko') || c.includes('austria')) return lang === 'CZ' ? 'RAKOUS.' : 'AUSTRIA';
  if (c.includes('polsko') || c.includes('poland')) return lang === 'CZ' ? 'POLSKO' : 'POLAND';
  if (c.includes('slovensko') || c.includes('slovakia')) return lang === 'CZ' ? 'SLOVENS.' : 'SLOVAK.';
  if (c.includes('španělsko') || c.includes('spain')) return lang === 'CZ' ? 'ŠPANĚL.' : 'SPAIN';
  if (c.includes('itálie') || c.includes('italy')) return lang === 'CZ' ? 'ITÁLIE' : 'ITALY';
  if (c.includes('řecko') || c.includes('greece')) return lang === 'CZ' ? 'ŘECKO' : 'GREECE';
  if (c.includes('švýcarsko') || c.includes('switzerland')) return lang === 'CZ' ? 'ŠVÝCAR.' : 'SWISS';
  if (c.includes('dánsko') || c.includes('denmark')) return lang === 'CZ' ? 'DÁNSKO' : 'DENMARK';
  if (c.includes('norsko') || c.includes('norway')) return lang === 'CZ' ? 'NORSKO' : 'NORWAY';
  if (c.includes('finsko') || c.includes('finland')) return lang === 'CZ' ? 'FINSKO' : 'FINLAND';
  if (c.includes('portugalsko') || c.includes('portugal')) return lang === 'CZ' ? 'PORTUG.' : 'PORTUG.';
  if (c.includes('irsko') || c.includes('ireland')) return lang === 'CZ' ? 'IRSKO' : 'IRELAND';
  if (c.includes('kanada') || c.includes('canada')) return lang === 'CZ' ? 'KANADA' : 'CANADA';
  if (c.includes('katar') || c.includes('qatar')) return 'QATAR';
  if (c.includes('čína') || c.includes('china')) return lang === 'CZ' ? 'ČÍNA' : 'CHINA';
  if (c.includes('thajsko') || c.includes('thailand')) return lang === 'CZ' ? 'THAJS.' : 'THAIL.';
  if (c.includes('brazílie') || c.includes('brazil')) return lang === 'CZ' ? 'BRAZÍL.' : 'BRAZIL';
  if (c.includes('belgie') || c.includes('belgium')) return lang === 'CZ' ? 'BELGIE' : 'BELG.';
  if (c.includes('maďarsko') || c.includes('hungary')) return lang === 'CZ' ? 'MAĎAR.' : 'HUNG.';
  if (c.includes('egypt')) return 'EGYPT';
  if (c.includes('švédsko') || c.includes('sweden')) return lang === 'CZ' ? 'ŠVÉDS.' : 'SWEDEN';
  if (c.includes('nový zéland') || c.includes('new zealand')) return 'NZ';
  if (c.includes('chile')) return 'CHILE';
  if (c.includes('bulharsko') || c.includes('bulgaria')) return lang === 'CZ' ? 'BULHAR.' : 'BULG.';
  if (c.includes('rumunsko') || c.includes('romania')) return lang === 'CZ' ? 'RUMUN.' : 'ROMAN.';
  if (c.includes('saúdská') || c.includes('saudi')) return lang === 'CZ' ? 'S.ARÁB.' : 'SAUDI';
  if (c.includes('izrael') || c.includes('israel')) return 'ISRAEL';
  if (c.includes('mexiko') || c.includes('mexico')) return 'MEXICO';
  if (c.includes('kuba') || c.includes('cuba')) return 'CUBA';
  if (c.includes('kypr') || c.includes('cyprus')) return 'CYPRUS';
  if (c.includes('island') || c.includes('iceland')) return 'ICEL.';
  if (c.includes('indie') || c.includes('india')) return 'INDIA';
  if (c.includes('jihoafrická') || c.includes('south africa')) return 'JAR';
  
  const clean = country.toUpperCase();
  return clean.length > 7 ? clean.substring(0, 6) + '.' : clean;
}

function isAirportInViewport(lat: number, lon: number, currentYaw: number, currentPitch: number, currentZoom: number, width: number, height: number): boolean {
  const latRad = lat * (Math.PI / 180);
  const lonRad = lon * (Math.PI / 180);
  const cx = width / 2;
  const cy = height / 2;
  const size = Math.min(width, height);
  const R = (size * 0.44) * currentZoom;

  const x3d = R * Math.cos(latRad) * Math.sin(lonRad);
  const y3d = R * Math.sin(latRad);
  const z3d = R * Math.cos(latRad) * Math.cos(lonRad);

  const y1 = y3d * Math.cos(currentPitch) - z3d * Math.sin(currentPitch);
  const z1 = y3d * Math.sin(currentPitch) + z3d * Math.cos(currentPitch);

  const x2 = x3d * Math.cos(currentYaw) + z1 * Math.sin(currentYaw);
  const z2 = -x3d * Math.sin(currentYaw) + z1 * Math.cos(currentYaw);
  const y2 = y1;

  const screenX = cx + x2;
  const screenY = cy - y2;

  return z2 > 0 && screenX >= -30 && screenX <= width + 30 && screenY >= -30 && screenY <= height + 30;
}

export default function AirportGlobe({ selectedAirportId, onSelectAirport, isDark, lang, onBackToList }: AirportGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Lazy-loaded smaller airports states & refs
  const [lazyLoadedSmallAirports, setLazyLoadedSmallAirports] = useState<Airport[]>([]);
  const [isLoadingProgressive, setIsLoadingProgressive] = useState(false);
  const airportOpacityRef = useRef<Record<string, number>>({});

  // Group airports into continent and island clusters dynamically
  const regionClusters = useMemo(() => {
    const clusters: { [key: string]: { id: string; nameCZ: string; nameEN: string; lat: number; lon: number; count: number } } = {
      europe: { id: 'europe', nameCZ: 'Evropa', nameEN: 'Europe', lat: 50.0, lon: 15.0, count: 0 },
      north_america: { id: 'north_america', nameCZ: 'S. Amerika', nameEN: 'North America', lat: 40.0, lon: -100.0, count: 0 },
      south_america: { id: 'south_america', nameCZ: 'J. Amerika', nameEN: 'South America', lat: -18.0, lon: -56.0, count: 0 },
      asia: { id: 'asia', nameCZ: 'Asie', nameEN: 'Asia', lat: 34.0, lon: 100.0, count: 0 },
      africa: { id: 'africa', nameCZ: 'Afrika', nameEN: 'Africa', lat: 2.0, lon: 20.0, count: 0 },
      australia: { id: 'australia', nameCZ: 'Austrálie', nameEN: 'Australia', lat: -24.0, lon: 133.0, count: 0 },
      islands: { id: 'islands', nameCZ: 'Ostrovy', nameEN: 'Islands', lat: 18.0, lon: -72.0, count: 0 } // Caribbean region as Islands hub
    };

    AIRPORTS_DATA.forEach(airport => {
      const region = getAirportRegion(airport.lat, airport.lon, airport.country);
      if (clusters[region]) {
        clusters[region].count++;
      } else {
        clusters['europe'].count++;
      }
    });

    return Object.values(clusters).filter(c => c.count > 0);
  }, []);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // 3D View Angles & Controls
  const [yaw, setYaw] = useState(0.4); // horizontal spin
  const [pitch, setPitch] = useState(0.3); // vertical tilt
  const [zoom, setZoom] = useState(1.0); // zoom scaling multiplier
  const [autoRotate, setAutoRotate] = useState(false);

  // Route Finder States
  const [routeMode, setRouteMode] = useState(false);
  const [fromAirportId, setFromAirportId] = useState<string>('');
  const [toAirportId, setToAirportId] = useState<string>('');
  const [fromInput, setFromInput] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [toInput, setToInput] = useState('');
  const [showToDropdown, setShowToDropdown] = useState(false);

  // Airport visibility state: Hide all airports except selected or route airports
  const [hideAllAirports, setHideAllAirports] = useState(false);

  // Group airports into country clusters dynamically
  const countryClusters = useMemo(() => {
    const clusters: { [key: string]: { id: string; name: string; lat: number; lon: number; count: number } } = {};
    
    AIRPORTS_DATA.forEach(airport => {
      const countryName = airport.country;
      if (!clusters[countryName]) {
        clusters[countryName] = {
          id: countryName.toLowerCase().replace(/\s+/g, '-'),
          name: countryName,
          lat: 0,
          lon: 0,
          count: 0
        };
      }
      clusters[countryName].lat += airport.lat;
      clusters[countryName].lon += airport.lon;
      clusters[countryName].count++;
    });

    return Object.values(clusters).map(c => ({
      ...c,
      lat: c.lat / c.count,
      lon: c.lon / c.count
    }));
  }, []);

  // Filtered list of airports to draw on the globe or click
  const airportsToDraw = useMemo(() => {
    // If route is fully searched (both from and to are set), automatically show ONLY those two airports
    if (routeMode && fromAirportId && toAirportId) {
      return AIRPORTS_DATA.filter(a => a.id === fromAirportId || a.id === toAirportId);
    }

    if (hideAllAirports) {
      if (routeMode) {
        return AIRPORTS_DATA.filter(a => a.id === fromAirportId || a.id === toAirportId || a.id === selectedAirportId);
      } else {
        return AIRPORTS_DATA.filter(a => a.id === selectedAirportId);
      }
    }
    
    // If zoom is less than 3.5, individual airports are nested under continent/country clusters,
    // so we only draw the active selections (selected airport or route endpoints)
    if (zoom < 3.5) {
      return AIRPORTS_DATA.filter(a => a.id === selectedAirportId || a.id === fromAirportId || a.id === toAirportId);
    }

    // Base list of airports:
    // 1. Large hubs are always visible when zoom >= 3.5 to make sure the primary structure is always active
    const largeHubs = AIRPORTS_DATA.filter(a => 
      a.id === selectedAirportId || 
      a.id === fromAirportId || 
      a.id === toAirportId || 
      a.passengersYearlyM >= 30 ||
      (a.avgFlightsDaily !== undefined && a.avgFlightsDaily >= 300)
    );

    // 2. Smaller airports are loaded progressively from our React state lazyLoadedSmallAirports based on viewport visibility
    return [...largeHubs, ...lazyLoadedSmallAirports];
  }, [routeMode, fromAirportId, toAirportId, selectedAirportId, hideAllAirports, zoom, lazyLoadedSmallAirports]);

  // Progressive lazy loading effect for smaller airports
  useEffect(() => {
    // Clear small airports if we are zoomed out or restricted
    if (zoom < 4.0 || hideAllAirports || (routeMode && fromAirportId && toAirportId)) {
      setLazyLoadedSmallAirports([]);
      setIsLoadingProgressive(false);
      airportOpacityRef.current = {};
      return;
    }

    setIsLoadingProgressive(true);

    const timer = setTimeout(() => {
      const rect = containerRef.current?.getBoundingClientRect() || { width: 450, height: 450 };
      const width = rect.width;
      const height = rect.height;

      // Find all smaller airports currently visible in the camera's viewport bounding box
      const visibleSmallAirports = AIRPORTS_DATA.filter(airport => {
        const isLarge = airport.id === selectedAirportId ||
          airport.id === fromAirportId ||
          airport.id === toAirportId ||
          airport.passengersYearlyM >= 30 ||
          (airport.avgFlightsDaily !== undefined && airport.avgFlightsDaily >= 300);

        if (isLarge) return false;

        return isAirportInViewport(airport.lat, airport.lon, yaw, pitch, zoom, width, height);
      });

      setLazyLoadedSmallAirports(prev => {
        // Keep previously loaded small airports that are still visible in viewport to prevent visual flickering
        const stillVisible = prev.filter(a => 
          isAirportInViewport(a.lat, a.lon, yaw, pitch, zoom, width, height)
        );

        // Find new small airports that are not yet in stillVisible
        const newVisible = visibleSmallAirports.filter(a => 
          !stillVisible.some(sv => sv.id === a.id)
        );

        if (newVisible.length === 0) {
          setIsLoadingProgressive(false);
          return stillVisible;
        }

        // Load new visible airports in progressive batches to avoid any frame spikes or drawing lag
        const batchSize = 12;
        const initialBatch = newVisible.slice(0, batchSize);
        const remaining = newVisible.slice(batchSize);

        if (remaining.length > 0) {
          let currentList = [...stillVisible, ...initialBatch];
          let index = 0;

          const interval = setInterval(() => {
            const nextBatch = remaining.slice(index, index + batchSize);
            if (nextBatch.length === 0) {
              clearInterval(interval);
              setIsLoadingProgressive(false);
            } else {
              setLazyLoadedSmallAirports(curr => {
                const stillInView = curr.filter(a => 
                  isAirportInViewport(a.lat, a.lon, yaw, pitch, zoom, width, height)
                );
                const uniqueNextBatch = nextBatch.filter(nb => !stillInView.some(s => s.id === nb.id));
                return [...stillInView, ...uniqueNextBatch];
              });
              index += batchSize;
            }
          }, 85); // 85ms batch timing for ultra-smooth rendering

          return currentList;
        } else {
          setIsLoadingProgressive(false);
          return [...stillVisible, ...initialBatch];
        }
      });

    }, 180); // 180ms debounce while rotating/zooming to keep interaction frame rates high

    return () => {
      clearTimeout(timer);
    };
  }, [yaw, pitch, zoom, routeMode, fromAirportId, toAirportId, selectedAirportId, hideAllAirports]);

  // Dynamically calculate which region clusters are currently loaded/visible
  const loadedRegionClusters = useMemo(() => {
    return regionClusters.filter(cluster => isCoordinateVisible(cluster.lat, cluster.lon, yaw, pitch));
  }, [regionClusters, yaw, pitch]);

  // Dynamically calculate which country clusters are currently loaded/visible
  const loadedCountryClusters = useMemo(() => {
    return countryClusters.filter(cluster => isCoordinateVisible(cluster.lat, cluster.lon, yaw, pitch));
  }, [countryClusters, yaw, pitch]);

  // Dynamically calculate which airports are currently loaded/visible
  const loadedAirports = useMemo(() => {
    return airportsToDraw.filter(airport => isCoordinateVisible(airport.lat, airport.lon, yaw, pitch));
  }, [airportsToDraw, yaw, pitch]);

  // When selected airport changes from outside (e.g. sidebar list click)
  const lastAirportId = useRef(selectedAirportId);
  useEffect(() => {
    if (selectedAirportId !== lastAirportId.current) {
      lastAirportId.current = selectedAirportId;
      // If user selected an airport from the sidebar list, we sync it and make sure routeMode is off or reset
      if (routeMode) {
        setFromAirportId(selectedAirportId);
      }
    }
  }, [selectedAirportId]);

  // Set up native non-passive wheel event listener to prevent desktop scrolling when over the globe
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      setZoom(prev => {
        const newZoom = prev - e.deltaY * 0.0015; // slightly faster zoom for deep ranges
        return Math.max(0.6, Math.min(15.0, newZoom));
      });
    };

    canvas.addEventListener('wheel', handleWheelNative, { passive: false });
    return () => {
      canvas.removeEventListener('wheel', handleWheelNative);
    };
  }, []);

  // Mouse/Touch Drag state
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragAngleStart = useRef({ yaw: 0, pitch: 0 });

  // Touch zoom refs for two-finger pinch-to-zoom on mobile
  const touchStartDistance = useRef<number>(0);
  const touchStartZoom = useRef<number>(1.0);

  // Animation & Centering Interpolation
  const animationFrameId = useRef<number | null>(null);
  const targetAngles = useRef<{ yaw: number; pitch: number; active: boolean }>({
    yaw: 0,
    pitch: 0,
    active: false,
  });

  const selectedAirport = useMemo(() => {
    return AIRPORTS_DATA.find(a => a.id === selectedAirportId) || AIRPORTS_DATA[0];
  }, [selectedAirportId]);

  // Find from and to airports if selected
  const fromAirport = useMemo(() => {
    return AIRPORTS_DATA.find(a => a.id === fromAirportId);
  }, [fromAirportId]);

  const toAirport = useMemo(() => {
    return AIRPORTS_DATA.find(a => a.id === toAirportId);
  }, [toAirportId]);

  // Calculate distance, duration and matching airlines
  const { routeDistance, routeHours, routeMinutes, routeAirlines } = useMemo(() => {
    if (!fromAirport || !toAirport) {
      return { routeDistance: 0, routeHours: 0, routeMinutes: 0, routeAirlines: [] };
    }
    
    // Haversine distance formula
    const R_earth = 6371; // km
    const dLat = (toAirport.lat - fromAirport.lat) * Math.PI / 180;
    const dLon = (toAirport.lon - fromAirport.lon) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(fromAirport.lat * Math.PI / 180) * Math.cos(toAirport.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const dist = Math.round(R_earth * c);

    // Estimated flight duration based on an average speed of 850 km/h + 30m climb/descent
    const timeHours = (dist / 850) + 0.5;
    const hrs = Math.floor(timeHours);
    const mins = Math.round((timeHours - hrs) * 60);

    // Match airlines
    const airlines = getRouteAirlines(fromAirportId, toAirportId, dist, lang);

    return {
      routeDistance: dist,
      routeHours: hrs,
      routeMinutes: mins,
      routeAirlines: airlines
    };
  }, [fromAirport, toAirport, lang]);

  // Handle dropdown suggestions
  const filteredSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return AIRPORTS_DATA.filter(a => 
      a.name.toLowerCase().includes(q) || 
      a.code.toLowerCase().includes(q) || 
      a.city.toLowerCase().includes(q) || 
      a.country.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Synchronize from/to inputs with selection and translation
  useEffect(() => {
    const fromAirportObj = AIRPORTS_DATA.find(a => a.id === fromAirportId);
    if (fromAirportObj) {
      setFromInput(`${fromAirportObj.code.split(' ')[0]} - ${translateAirportText(fromAirportObj.city, lang)}`);
    } else {
      setFromInput('');
    }
  }, [fromAirportId, lang]);

  useEffect(() => {
    const toAirportObj = AIRPORTS_DATA.find(a => a.id === toAirportId);
    if (toAirportObj) {
      setToInput(`${toAirportObj.code.split(' ')[0]} - ${translateAirportText(toAirportObj.city, lang)}`);
    } else {
      setToInput('');
    }
  }, [toAirportId, lang]);

  // Filtered lists of airports for autocomplete
  const filteredFromSuggestions = useMemo(() => {
    const fromAirportObj = AIRPORTS_DATA.find(a => a.id === fromAirportId);
    const activeLabel = fromAirportObj 
      ? `${fromAirportObj.code.split(' ')[0]} - ${translateAirportText(fromAirportObj.city, lang)}`
      : '';
    
    if (!fromInput.trim() || fromInput === activeLabel) {
      return AIRPORTS_DATA;
    }

    const query = fromInput.trim().toLowerCase();
    return AIRPORTS_DATA.filter((airport) => {
      const city = translateAirportText(airport.city, lang).toLowerCase();
      const name = translateAirportText(airport.name, lang).toLowerCase();
      const country = translateAirportText(airport.country, lang).toLowerCase();
      const code = airport.code.toLowerCase();
      return (
        city.includes(query) ||
        name.includes(query) ||
        country.includes(query) ||
        code.includes(query)
      );
    });
  }, [fromInput, fromAirportId, lang]);

  const filteredToSuggestions = useMemo(() => {
    const toAirportObj = AIRPORTS_DATA.find(a => a.id === toAirportId);
    const activeLabel = toAirportObj 
      ? `${toAirportObj.code.split(' ')[0]} - ${translateAirportText(toAirportObj.city, lang)}`
      : '';
    
    if (!toInput.trim() || toInput === activeLabel) {
      return AIRPORTS_DATA;
    }

    const query = toInput.trim().toLowerCase();
    return AIRPORTS_DATA.filter((airport) => {
      const city = translateAirportText(airport.city, lang).toLowerCase();
      const name = translateAirportText(airport.name, lang).toLowerCase();
      const country = translateAirportText(airport.country, lang).toLowerCase();
      const code = airport.code.toLowerCase();
      return (
        city.includes(query) ||
        name.includes(query) ||
        country.includes(query) ||
        code.includes(query)
      );
    });
  }, [toInput, toAirportId, lang]);

  // Center Globe on a specific coordinate smoothly
  const centerOnCoordinate = (lat: number, lon: number) => {
    // Math to match target orientation facing straight forward at (0,0,R)
    // Lon needs to face us, Lat needs to align vertically
    const targetY = -lon * (Math.PI / 180);
    const targetP = lat * (Math.PI / 180);

    targetAngles.current = {
      yaw: targetY,
      pitch: targetP,
      active: true,
    };
    setAutoRotate(false); // Pause auto-rotation when focusing on an airport
  };

  // Center on airport or route midpoint when selection or route changes
  useEffect(() => {
    if (routeMode && fromAirportId && toAirportId) {
      const fromAirport = AIRPORTS_DATA.find(a => a.id === fromAirportId);
      const toAirport = AIRPORTS_DATA.find(a => a.id === toAirportId);
      if (fromAirport && toAirport) {
        // Calculate average midpoint latitude and longitude on the sphere
        const midLat = (fromAirport.lat + toAirport.lat) / 2;
        let midLon = (fromAirport.lon + toAirport.lon) / 2;
        if (Math.abs(fromAirport.lon - toAirport.lon) > 180) {
          midLon += 180;
          if (midLon > 180) midLon -= 360;
        }
        centerOnCoordinate(midLat, midLon);
      }
    } else if (!routeMode && selectedAirportId) {
      const airport = AIRPORTS_DATA.find(a => a.id === selectedAirportId);
      if (airport) {
        centerOnCoordinate(airport.lat, airport.lon);
      }
    }
  }, [routeMode, fromAirportId, toAirportId, selectedAirportId]);

  // Handle Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let currentYaw = yaw;
    let currentPitch = pitch;
    let currentZoom = zoom;

    const render = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Handle Resize dynamically to fill container
      const rect = containerRef.current?.getBoundingClientRect() || { width: 450, height: 450 };
      const width = rect.width;
      const height = rect.height;
      
      if (canvas.width !== width * window.devicePixelRatio || canvas.height !== height * window.devicePixelRatio) {
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const cx = width / 2;
      const cy = height / 2;
      const size = Math.min(width, height);
      const R = (size * 0.44) * currentZoom; // base sphere radius (increased to 0.44 to make it fill the available space beautifully)

      // Interpolate angles if automatic focusing is active
      if (targetAngles.current.active) {
        // Handle yaw wrap-around for shortest path
        let yawDiff = targetAngles.current.yaw - currentYaw;
        yawDiff = Math.atan2(Math.sin(yawDiff), Math.cos(yawDiff));
        
        let pitchDiff = targetAngles.current.pitch - currentPitch;
        
        currentYaw += yawDiff * 0.08;
        currentPitch += pitchDiff * 0.08;

        setYaw(currentYaw);
        setPitch(currentPitch);

        if (Math.abs(yawDiff) < 0.002 && Math.abs(pitchDiff) < 0.002) {
          currentYaw = targetAngles.current.yaw;
          currentPitch = targetAngles.current.pitch;
          targetAngles.current.active = false;
        }
      } else if (autoRotate && !isDragging.current) {
        // Continuous rotation if autoRotate is true
        currentYaw += 0.0018;
        setYaw(currentYaw);
      }

      // Projection mapping Helper Function
      const project = (lat: number, lon: number) => {
        const latRad = lat * (Math.PI / 180);
        const lonRad = lon * (Math.PI / 180);

        // 3D coordinates on sphere
        const x3d = R * Math.cos(latRad) * Math.sin(lonRad);
        const y3d = R * Math.sin(latRad);
        const z3d = R * Math.cos(latRad) * Math.cos(lonRad);

        // Pitch rotation (tilt on X axis)
        const y1 = y3d * Math.cos(currentPitch) - z3d * Math.sin(currentPitch);
        const z1 = y3d * Math.sin(currentPitch) + z3d * Math.cos(currentPitch);

        // Yaw rotation (spin on Y axis)
        const x2 = x3d * Math.cos(currentYaw) + z1 * Math.sin(currentYaw);
        const z2 = -x3d * Math.sin(currentYaw) + z1 * Math.cos(currentYaw);
        const y2 = y1;

        return {
          x: cx + x2,
          y: cy - y2,
          z: z2, // depth indicator: positive = front, negative = back
        };
      };

      // Helper to draw a contiguous coordinate path on the front or back side seamlessly,
      // interpolating at the z=0 horizon boundary to avoid gaps and disconnected lines.
      const drawPath = (coords: number[][], side: 'front' | 'back') => {
        if (coords.length < 2) return;
        
        let active = false;
        
        for (let i = 0; i < coords.length - 1; i++) {
          const ptA = project(coords[i][1], coords[i][0]);
          const ptB = project(coords[i+1][1], coords[i+1][0]);
          
          if (side === 'front') {
            const aFront = ptA.z > 0;
            const bFront = ptB.z > 0;
            
            if (aFront && bFront) {
              if (!active) {
                ctx.moveTo(ptA.x, ptA.y);
                active = true;
              }
              ctx.lineTo(ptB.x, ptB.y);
            } else if (aFront && !bFront) {
              // Cross front to back: interpolate to z=0 horizon
              const t = ptA.z / (ptA.z - ptB.z);
              const cx_val = ptA.x + t * (ptB.x - ptA.x);
              const cy_val = ptA.y + t * (ptB.y - ptA.y);
              if (!active) {
                ctx.moveTo(ptA.x, ptA.y);
                active = true;
              }
              ctx.lineTo(cx_val, cy_val);
              active = false;
            } else if (!aFront && bFront) {
              // Cross back to front: interpolate to z=0 horizon
              const t = ptA.z / (ptA.z - ptB.z);
              const cx_val = ptA.x + t * (ptB.x - ptA.x);
              const cy_val = ptA.y + t * (ptB.y - ptA.y);
              ctx.moveTo(cx_val, cy_val);
              ctx.lineTo(ptB.x, ptB.y);
              active = true;
            } else {
              active = false;
            }
          } else {
            // side === 'back'
            const aBack = ptA.z <= 0;
            const bBack = ptB.z <= 0;
            
            if (aBack && bBack) {
              if (!active) {
                ctx.moveTo(ptA.x, ptA.y);
                active = true;
              }
              ctx.lineTo(ptB.x, ptB.y);
            } else if (aBack && !bBack) {
              // Cross back to front: interpolate to z=0 horizon
              const t = ptA.z / (ptA.z - ptB.z);
              const cx_val = ptA.x + t * (ptB.x - ptA.x);
              const cy_val = ptA.y + t * (ptB.y - ptA.y);
              if (!active) {
                ctx.moveTo(ptA.x, ptA.y);
                active = true;
              }
              ctx.lineTo(cx_val, cy_val);
              active = false;
            } else if (!aBack && bBack) {
              // Cross front to back: interpolate to z=0 horizon
              const t = ptA.z / (ptA.z - ptB.z);
              const cx_val = ptA.x + t * (ptB.x - ptA.x);
              const cy_val = ptA.y + t * (ptB.y - ptA.y);
              ctx.moveTo(cx_val, cy_val);
              ctx.lineTo(ptB.x, ptB.y);
              active = true;
            } else {
              active = false;
            }
          }
        }
      };

      // 1. DRAW BACK-SIDE ELEMENT GRIDS (See-through holographic effect)
      ctx.lineWidth = 0.5;
      
      // Draw parallels (constant latitude) on the back
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let activePath = false;
        for (let lon = -180; lon <= 180; lon += 5) {
          const pt = project(lat, lon);
          if (pt.z <= 0) {
            if (!activePath) {
              ctx.moveTo(pt.x, pt.y);
              activePath = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            activePath = false;
          }
        }
        ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.05)' : 'rgba(99, 102, 241, 0.07)';
        ctx.stroke();
      }

      // Draw meridians (constant longitude) on the back
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        let activePath = false;
        for (let lat = -85; lat <= 85; lat += 5) {
          const pt = project(lat, lon);
          if (pt.z <= 0) {
            if (!activePath) {
              ctx.moveTo(pt.x, pt.y);
              activePath = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            activePath = false;
          }
        }
        ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.05)' : 'rgba(99, 102, 241, 0.07)';
        ctx.stroke();
      }

      // Draw continent outlines on the back
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.12)';
      for (const continent of CONTINENTS_DATA) {
        ctx.beginPath();
        drawPath(continent, 'back');
        ctx.stroke();
      }

      // Draw island outlines on the back (thinner than continents)
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.06)' : 'rgba(99, 102, 241, 0.09)';
      for (const island of ISLANDS_DATA) {
        ctx.beginPath();
        drawPath(island, 'back');
        ctx.stroke();
      }

      // Draw country outlines on the back (detailed boundaries)
      ctx.lineWidth = 0.15;
      ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.03)' : 'rgba(99, 102, 241, 0.05)';
      for (const country of COUNTRY_BORDERS) {
        ctx.beginPath();
        drawPath(country.coords, 'back');
        ctx.stroke();
      }

      // 2. DRAW MAIN WATER SPHERE DISK (Acts as a mask + ambient gradient)
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      const radGrad = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R);
      if (isDark) {
        radGrad.addColorStop(0, '#0c2e4e'); // deep, rich marine blue-cyan
        radGrad.addColorStop(0.7, '#071d32'); // very deep sea
        radGrad.addColorStop(1, '#020d18'); // midnight edge
      } else {
        radGrad.addColorStop(0, '#2d89b3'); // bright, crisp ocean sky blue from the photo
        radGrad.addColorStop(0.7, '#217399'); // deep turquoise ocean
        radGrad.addColorStop(1, '#15506c'); // shaded deep sea edge
      }
      ctx.fillStyle = radGrad;
      ctx.fill();

      // Outer glow of the sphere
      ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.28)' : 'rgba(99, 102, 241, 0.22)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3. DRAW FRONT-SIDE GRID LINES (Subtle lines showing latitude/longitude grid)
      ctx.lineWidth = 0.5;
      
      // Parallels on the front
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let activePath = false;
        for (let lon = -180; lon <= 180; lon += 5) {
          const pt = project(lat, lon);
          if (pt.z > 0) {
            if (!activePath) {
              ctx.moveTo(pt.x, pt.y);
              activePath = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            activePath = false;
          }
        }
        ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.18)';
        ctx.stroke();
      }

      // Meridians on the front
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        let activePath = false;
        for (let lat = -85; lat <= 85; lat += 5) {
          const pt = project(lat, lon);
          if (pt.z > 0) {
            if (!activePath) {
              ctx.moveTo(pt.x, pt.y);
              activePath = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            activePath = false;
          }
        }
        ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.18)';
        ctx.stroke();
      }

      // 4. DRAW FRONT-SIDE CONTINENT OUTLINES & BORDERS (glowing, crisp, bold!)
      ctx.lineWidth = 2.5; // Slightly cleaner but still prominent bold continent line as requested
      ctx.shadowBlur = isDark ? 6 : 0;
      ctx.shadowColor = isDark ? 'rgba(99, 102, 241, 0.4)' : 'transparent';
      
      ctx.strokeStyle = isDark ? 'rgba(45, 212, 191, 0.9)' : 'rgba(49, 46, 129, 0.95)'; // Deep indigo in light mode, glowing teal in dark mode
      for (const continent of CONTINENTS_DATA) {
        ctx.beginPath();
        drawPath(continent, 'front');
        ctx.stroke();
      }
      ctx.shadowBlur = 0; // Reset shadow

      // Draw island outlines on the front side (thinner, detailed, non-bold to prevent clunkiness!)
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = isDark ? 'rgba(45, 212, 191, 0.75)' : 'rgba(49, 46, 129, 0.75)';
      for (const island of ISLANDS_DATA) {
        ctx.beginPath();
        drawPath(island, 'front');
        ctx.stroke();
      }

      // Draw detailed country borders on the front side (Thinner, extremely precise!)
      for (const country of COUNTRY_BORDERS) {
        ctx.beginPath();
        drawPath(country.coords, 'front');
        
        ctx.lineWidth = 0.22; // Very thin, delicate borders as requested
        ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.35)' : 'rgba(255, 255, 255, 0.55)'; // Light borders on blue sea in light mode, subtle indigo on slate in dark mode
        ctx.stroke();

        // Label country name if zoom is deep enough to see details clearly (> 1.8)
        if (zoom > 1.8) {
          // Calculate average center of country border coords for labels
          let avgLon = 0;
          let avgLat = 0;
          country.coords.forEach(([lon, lat]) => {
            avgLon += lon;
            avgLat += lat;
          });
          avgLon /= country.coords.length;
          avgLat /= country.coords.length;

          // Slightly offset center for USA and Canada labels to look perfect
          if (country.id === 'us') { avgLon = -98; avgLat = 39; }
          else if (country.id === 'ca') { avgLon = -102; avgLat = 57; }
          else if (country.id === 'cz') { avgLon = 15.3; avgLat = 49.8; }

          const pt = project(avgLat, avgLon);
          if (pt.z > 0) {
            ctx.font = 'bold 8px "JetBrains Mono", monospace';
            ctx.fillStyle = country.id === 'cz'
              ? (isDark ? 'rgba(45, 212, 191, 0.95)' : 'rgba(13, 148, 136, 0.95)')
              : (isDark ? 'rgba(148, 163, 184, 0.55)' : 'rgba(71, 85, 105, 0.65)');
            ctx.textAlign = 'center';
            ctx.fillText(lang === 'CZ' ? country.nameCZ.toUpperCase() : country.name.toUpperCase(), pt.x, pt.y);
          }
        }
      }

      // 4.5 DRAW ACTIVE FLIGHT ROUTE PATH (if in routeMode and both from/to are set)
      if (routeMode && fromAirportId && toAirportId) {
        const fromAirport = AIRPORTS_DATA.find(a => a.id === fromAirportId);
        const toAirport = AIRPORTS_DATA.find(a => a.id === toAirportId);
        if (fromAirport && toAirport) {
          // Interpolate 60 points along the Great Circle arc
          const lat1 = fromAirport.lat;
          const lon1 = fromAirport.lon;
          const lat2 = toAirport.lat;
          const lon2 = toAirport.lon;

          const lat1Rad = lat1 * Math.PI / 180;
          const lon1Rad = lon1 * Math.PI / 180;
          const lat2Rad = lat2 * Math.PI / 180;
          const lon2Rad = lon2 * Math.PI / 180;

          const x1 = Math.cos(lat1Rad) * Math.sin(lon1Rad);
          const y1 = Math.sin(lat1Rad);
          const z1 = Math.cos(lat1Rad) * Math.cos(lon1Rad);

          const x2 = Math.cos(lat2Rad) * Math.sin(lon2Rad);
          const y2 = Math.sin(lat2Rad);
          const z2 = Math.cos(lat2Rad) * Math.cos(lon2Rad);

          // Build array of 3D coordinates
          const pts: { lat: number; lon: number }[] = [];
          const steps = 60;
          for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            
            // Linear interpolation of 3D vectors
            const xt = x1 + t * (x2 - x1);
            const yt = y1 + t * (y2 - y1);
            const zt = z1 + t * (z2 - z1);
            const len = Math.sqrt(xt*xt + yt*yt + zt*zt);
            
            // Normalize to project back onto sphere surface
            const nx = xt / len;
            const ny = yt / len;
            const nz = zt / len;

            // Convert back to lat, lon
            const latT = Math.asin(ny) * 180 / Math.PI;
            const lonT = Math.atan2(nx, nz) * 180 / Math.PI;
            pts.push({ lat: latT, lon: lonT });
          }

          // 1. Draw BACK segment of flight path (faint dashed line wrapping around earth)
          ctx.beginPath();
          let activeBack = false;
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = isDark ? 'rgba(239, 68, 68, 0.25)' : 'rgba(220, 38, 38, 0.35)';
          ctx.setLineDash([4, 4]);
          
          for (let i = 0; i < pts.length; i++) {
            const pt = project(pts[i].lat, pts[i].lon);
            if (pt.z <= 0) {
              if (!activeBack) {
                ctx.moveTo(pt.x, pt.y);
                activeBack = true;
              } else {
                ctx.lineTo(pt.x, pt.y);
              }
            } else {
              activeBack = false;
            }
          }
          ctx.stroke();
          ctx.setLineDash([]); // Reset line dash

          // 2. Draw FRONT segment of flight path (bright glowing red line)
          ctx.beginPath();
          let activeFront = false;
          ctx.lineWidth = 3.0;
          ctx.strokeStyle = isDark ? '#ef4444' : '#dc2626';
          ctx.shadowBlur = isDark ? 6 : 0;
          ctx.shadowColor = '#ef4444';

          for (let i = 0; i < pts.length; i++) {
            const pt = project(pts[i].lat, pts[i].lon);
            if (pt.z > 0) {
              if (!activeFront) {
                ctx.moveTo(pt.x, pt.y);
                activeFront = true;
              } else {
                ctx.lineTo(pt.x, pt.y);
              }
            } else {
              activeFront = false;
            }
          }
          ctx.stroke();
          ctx.shadowBlur = 0; // Reset shadow

          // 3. Draw animated flying signal particle along the route
          const time = Date.now();
          const flowT = (time % 4000) / 4000; // flows 0 to 1 every 4 seconds
          
          const flowIdx = Math.floor(flowT * steps);
          if (flowIdx >= 0 && flowIdx < pts.length) {
            const flowCoord = pts[flowIdx];
            const flowPt = project(flowCoord.lat, flowCoord.lon);
            
            if (flowPt.z > 0) {
              ctx.beginPath();
              ctx.arc(flowPt.x, flowPt.y, 5, 0, Math.PI * 2);
              ctx.fillStyle = '#f59e0b'; // amber color
              ctx.shadowBlur = 8;
              ctx.shadowColor = '#f59e0b';
              ctx.fill();
              ctx.shadowBlur = 0; // Reset
              
              // Core of particle
              ctx.beginPath();
              ctx.arc(flowPt.x, flowPt.y, 2.5, 0, Math.PI * 2);
              ctx.fillStyle = '#ffffff';
              ctx.fill();
            }
          }
        }
      }

      // 5. DRAW AIRPORT MARKERS (pulsating circles + names with progressive opacity fade-in)
      loadedAirports.forEach((airport) => {
        const pt = project(airport.lat, airport.lon);
        
        // Only draw airports located on the front side of the earth
        if (pt.z > 0) {
          const isSelected = airport.id === selectedAirportId;
          const isLarge = airport.id === selectedAirportId ||
            airport.id === fromAirportId ||
            airport.id === toAirportId ||
            airport.passengersYearlyM >= 30 ||
            (airport.avgFlightsDaily !== undefined && airport.avgFlightsDaily >= 300);

          // Get or initialize opacity
          let opacity = airportOpacityRef.current[airport.id] !== undefined 
            ? airportOpacityRef.current[airport.id] 
            : (isLarge ? 1.0 : 0.0); // large hubs start fully visible, small ones start at 0

          // Smoothly animate opacity towards 1.0
          if (opacity < 1.0) {
            opacity = Math.min(1.0, opacity + 0.08); // fade in 8% per frame
            airportOpacityRef.current[airport.id] = opacity;
          }

          // Apply opacity to our colors
          const fillStyleCore = isSelected
            ? (isDark ? `rgba(45, 212, 191, ${opacity})` : `rgba(13, 148, 136, ${opacity})`)
            : (isDark ? `rgba(99, 102, 241, ${0.85 * opacity})` : `rgba(79, 70, 229, ${0.85 * opacity})`);

          const fillStyleText = isSelected
            ? (isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(15, 23, 42, ${opacity})`)
            : (isDark ? `rgba(148, 163, 184, ${0.75 * opacity})` : `rgba(71, 85, 105, ${0.75 * opacity})`);

          // Pulsing circle scale
          const pulseScale = (Date.now() % 1600) / 1600;

          // Draw animated pulsing glow
          if (isSelected) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 4 + pulseScale * 12, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? `rgba(45, 212, 191, ${0.45 * (1 - pulseScale) * opacity})` : `rgba(13, 148, 136, ${0.45 * (1 - pulseScale) * opacity})`;
            ctx.fill();
          }

          // Main core dot
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isSelected ? 4.5 : 3, 0, Math.PI * 2);
          ctx.fillStyle = fillStyleCore;
          ctx.fill();

          // Border for selected
          if (isSelected) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 6.5, 0, Math.PI * 2);
            ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(15, 23, 42, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Render Airport Code and optional City next to dot
          ctx.font = isSelected ? 'bold 10px "JetBrains Mono", monospace' : '9px "JetBrains Mono", monospace';
          ctx.fillStyle = fillStyleText;
          
          const codeOnly = airport.code.split(' ')[0];
          const labelText = zoom > 1.8
            ? `${codeOnly} (${translateAirportText(airport.city, lang)})`
            : codeOnly;

          ctx.fillText(
            labelText,
            pt.x + (isSelected ? 8 : 6),
            pt.y + 3
          );
        }
      });

      // If currentZoom < 1.8, draw continent and island cluster badges projected on the 3D globe!
      if (currentZoom < 1.8) {
        loadedRegionClusters.forEach((cluster) => {
          const pt = project(cluster.lat, cluster.lon);
          
          // Only draw if it's on the front side of the globe
          if (pt.z > 0) {
            const badgeX = pt.x;
            const badgeY = pt.y;

            // Pulsing glow radius
            const pulse = (Date.now() % 2000) / 2000;
            const glowRad = 26 + pulse * 10;

            // 1. Glowing outer pulse
            ctx.beginPath();
            ctx.arc(badgeX, badgeY, glowRad, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? `rgba(45, 212, 191, ${0.12 * (1 - pulse)})` : `rgba(79, 70, 229, ${0.09 * (1 - pulse)})`;
            ctx.fill();

            // 2. Main badge container
            ctx.beginPath();
            ctx.arc(badgeX, badgeY, 24, 0, Math.PI * 2);
            
            // Gradient fill for depth
            const grad = ctx.createLinearGradient(badgeX - 24, badgeY - 24, badgeX + 24, badgeY + 24);
            if (isDark) {
              grad.addColorStop(0, '#0f172a');
              grad.addColorStop(1, '#1e293b');
            } else {
              grad.addColorStop(0, '#ffffff');
              grad.addColorStop(1, '#f1f5f9');
            }
            ctx.fillStyle = grad;
            ctx.shadowBlur = 8;
            ctx.shadowColor = isDark ? 'rgba(45, 212, 191, 0.25)' : 'rgba(79, 70, 229, 0.15)';
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow

            // 3. Colored border ring
            ctx.beginPath();
            ctx.arc(badgeX, badgeY, 24, 0, Math.PI * 2);
            ctx.strokeStyle = isDark ? 'rgba(45, 212, 191, 0.45)' : 'rgba(79, 70, 229, 0.35)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // 4. Draw text inside: Count + continent/island name
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Count text
            ctx.font = 'bold 11px "JetBrains Mono", monospace';
            ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
            ctx.fillText(`${cluster.count}`, badgeX, badgeY - 5);

            // Label text below count
            ctx.font = 'bold 7px "Inter", sans-serif';
            ctx.fillStyle = isDark ? '#2dd4bf' : '#4f46e5';
            const label = lang === 'CZ' ? cluster.nameCZ.toUpperCase() : cluster.nameEN.toUpperCase();
            ctx.fillText(label, badgeX, badgeY + 7);
          }
        });
      }

      // If currentZoom >= 1.8 && currentZoom < 3.5, draw country cluster indicators on the 3D globe!
      if (currentZoom >= 1.8 && currentZoom < 3.5) {
        loadedCountryClusters.forEach((cluster) => {
          const pt = project(cluster.lat, cluster.lon);
          
          if (pt.z > 0) {
            const badgeX = pt.x;
            const badgeY = pt.y;
            const radius = 22;

            // Small pulsing glow
            const pulse = (Date.now() % 1600) / 1600;
            const glowRad = radius + 2 + pulse * 6;

            ctx.beginPath();
            ctx.arc(badgeX, badgeY, glowRad, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? `rgba(45, 212, 191, ${0.1 * (1 - pulse)})` : `rgba(79, 70, 229, ${0.08 * (1 - pulse)})`;
            ctx.fill();

            // Main bubble circle
            ctx.beginPath();
            ctx.arc(badgeX, badgeY, radius, 0, Math.PI * 2);
            
            const grad = ctx.createLinearGradient(badgeX - radius, badgeY - radius, badgeX + radius, badgeY + radius);
            if (isDark) {
              grad.addColorStop(0, '#0f172a');
              grad.addColorStop(1, '#1e293b');
            } else {
              grad.addColorStop(0, '#ffffff');
              grad.addColorStop(1, '#f1f5f9');
            }
            ctx.fillStyle = grad;
            ctx.shadowBlur = 4;
            ctx.shadowColor = isDark ? 'rgba(45, 212, 191, 0.2)' : 'rgba(79, 70, 229, 0.1)';
            ctx.fill();
            ctx.shadowBlur = 0;

            // Border
            ctx.beginPath();
            ctx.arc(badgeX, badgeY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = isDark ? 'rgba(45, 212, 191, 0.35)' : 'rgba(79, 70, 229, 0.25)';
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Flag and text
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Flag emoji in center-top
            ctx.font = '12px "Inter", sans-serif';
            ctx.fillText(getCountryFlag(cluster.name), badgeX, badgeY - 8);

            // Shorthand country name in center
            ctx.font = 'bold 7px "Inter", sans-serif';
            ctx.fillStyle = isDark ? '#2dd4bf' : '#4f46e5';
            const countryShort = getShortCountryName(cluster.name, lang);
            ctx.fillText(countryShort, badgeX, badgeY + 3);

            // Count text in center-bottom
            ctx.font = 'bold 8px "JetBrains Mono", monospace';
            ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
            ctx.fillText(`${cluster.count}`, badgeX, badgeY + 11);
          }
        });
      }

      ctx.restore();
      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [yaw, pitch, zoom, selectedAirportId, autoRotate, isDark, lang, routeMode, fromAirportId, toAirportId, airportsToDraw, regionClusters]);

  // Handle Mouse Down / Touch Start (Drag initialization)
  const handleStart = (clientX: number, clientY: number) => {
    isDragging.current = true;
    dragStart.current = { x: clientX, y: clientY };
    dragAngleStart.current = { yaw, pitch };
    targetAngles.current.active = false; // Interrupt auto focus animation on manual drag
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) return; // Left click only
    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2) {
      isDragging.current = false;
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDistance.current = dist;
      touchStartZoom.current = zoom;
    } else if (e.touches.length === 1) {
      touchStartDistance.current = 0;
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Handle Mouse Move / Touch Move (Dragging rotating globe)
  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;

    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;

    // Convert mouse movement to angular rotation (reduced sensitivity when zoomed in)
    const sensitivity = 0.005 / Math.pow(Math.max(1, zoom), 1.3);
    let newYaw = dragAngleStart.current.yaw + dx * sensitivity;
    let newPitch = dragAngleStart.current.pitch + dy * sensitivity;

    // Clamp vertical tilt (pitch) to prevent globe from going fully upside down
    const pitchLimit = Math.PI / 2.1; // roughly 85 degrees
    newPitch = Math.max(-pitchLimit, Math.min(pitchLimit, newPitch));

    setYaw(newYaw);
    setPitch(newPitch);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2) {
      if (touchStartDistance.current > 0) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = dist / touchStartDistance.current;
        const newZoom = Math.max(0.6, Math.min(15.0, touchStartZoom.current * factor));
        setZoom(newZoom);
      }
    } else if (e.touches.length === 1) {
      if (touchStartDistance.current === 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }
  };

  // Handle Mouse Up / Touch End / Click Detection
  const handleEnd = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    const moveDistance = Math.sqrt(dx * dx + dy * dy);

    // If drag distance was very small, treat as a pure CLICK/TAP to select airport
    if (moveDistance < 5) {
      handleCanvasClick(clientX, clientY);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handleEnd(e.clientX, e.clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length < 2) {
      touchStartDistance.current = 0;
    }

    if (touchStartDistance.current > 0) {
      isDragging.current = false;
      return;
    }

    if (e.changedTouches.length !== 1) return;
    if (e.touches.length > 0) {
      isDragging.current = false;
      return;
    }
    handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  };

  // Detect which airport was clicked
  const handleCanvasClick = (screenX: number, screenY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();
    const clickX = screenX - canvasRect.left;
    const clickY = screenY - canvasRect.top;

    const rect = containerRef.current?.getBoundingClientRect() || { width: 450, height: 450 };
    const width = rect.width;
    const height = rect.height;
    const cx = width / 2;
    const cy = height / 2;
    const size = Math.min(width, height);
    const R = (size * 0.44) * zoom;

    // Check if clicked any of the regional cluster badges (only active when zoomed out)
    if (zoom < 1.8) {
      for (const cluster of loadedRegionClusters) {
        const latRad = cluster.lat * (Math.PI / 180);
        const lonRad = cluster.lon * (Math.PI / 180);

        // Spherical coordinates
        const x3d = R * Math.cos(latRad) * Math.sin(lonRad);
        const y3d = R * Math.sin(latRad);
        const z3d = R * Math.cos(latRad) * Math.cos(lonRad);

        // Rotate by current angles to find screen coordinate of the badge
        const y1 = y3d * Math.cos(pitch) - z3d * Math.sin(pitch);
        const z1 = y3d * Math.sin(pitch) + z3d * Math.cos(pitch);

        const x2 = x3d * Math.cos(yaw) + z1 * Math.sin(yaw);
        const z2 = -x3d * Math.sin(yaw) + z1 * Math.cos(yaw);
        const y2 = y1;

        // Project on screen
        const projX = cx + x2;
        const projY = cy - y2;

        // Only clickable if on the front side of the globe
        if (z2 > 0) {
          const dist = Math.hypot(clickX - projX, clickY - projY);
          if (dist <= 28) {
            // Smoothly pivot the globe to focus on the clicked region cluster
            targetAngles.current = {
              yaw: -lonRad,
              pitch: -latRad,
              active: true
            };
            setZoom(2.8);
            return;
          }
        }
      }
    }

    // Check if clicked any of the country clusters (only active in medium zoom range)
    if (zoom >= 1.8 && zoom < 3.5) {
      for (const cluster of loadedCountryClusters) {
        const latRad = cluster.lat * (Math.PI / 180);
        const lonRad = cluster.lon * (Math.PI / 180);

        // Spherical coordinates
        const x3d = R * Math.cos(latRad) * Math.sin(lonRad);
        const y3d = R * Math.sin(latRad);
        const z3d = R * Math.cos(latRad) * Math.cos(lonRad);

        // Rotate
        const y1 = y3d * Math.cos(pitch) - z3d * Math.sin(pitch);
        const z1 = y3d * Math.sin(pitch) + z3d * Math.cos(pitch);

        const x2 = x3d * Math.cos(yaw) + z1 * Math.sin(yaw);
        const z2 = -x3d * Math.sin(yaw) + z1 * Math.cos(yaw);
        const y2 = y1;

        // Project on screen
        const projX = cx + x2;
        const projY = cy - y2;

        if (z2 > 0) {
          const dist = Math.hypot(clickX - projX, clickY - projY);
          if (dist <= 25) {
            // Center on this country cluster and zoom in
            targetAngles.current = {
              yaw: -lonRad,
              pitch: -latRad,
              active: true
            };
            setZoom(4.2);
            return;
          }
        }
      }
    }

    // Check each loaded airport
    let closestAirport: Airport | null = null;
    let minDistance = 18; // maximum selection click distance in pixels

    loadedAirports.forEach((airport) => {
      const latRad = airport.lat * (Math.PI / 180);
      const lonRad = airport.lon * (Math.PI / 180);

      // Spherical coordinates
      const x3d = R * Math.cos(latRad) * Math.sin(lonRad);
      const y3d = R * Math.sin(latRad);
      const z3d = R * Math.cos(latRad) * Math.cos(lonRad);

      // Rotate
      const y1 = y3d * Math.cos(pitch) - z3d * Math.sin(pitch);
      const z1 = y3d * Math.sin(pitch) + z3d * Math.cos(pitch);

      const x2 = x3d * Math.cos(yaw) + z1 * Math.sin(yaw);
      const z2 = -x3d * Math.sin(yaw) + z1 * Math.cos(yaw);
      const y2 = y1;

      // Project on screen
      const projX = cx + x2;
      const projY = cy - y2;

      // Only selectable if on the front side
      if (z2 > 0) {
        const dx = clickX - projX;
        const dy = clickY - projY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < minDistance) {
          minDistance = dist;
          closestAirport = airport;
        }
      }
    });

    if (closestAirport) {
      if (routeMode) {
        if (!fromAirportId) {
          setFromAirportId((closestAirport as Airport).id);
        } else if (!toAirportId && (closestAirport as Airport).id !== fromAirportId) {
          setToAirportId((closestAirport as Airport).id);
        } else {
          setToAirportId((closestAirport as Airport).id);
        }
      } else {
        onSelectAirport((closestAirport as Airport).id);
      }
    }
  };

  // Wheel zooming with limits
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const newZoom = zoom - e.deltaY * 0.0015;
    setZoom(Math.max(0.6, Math.min(15.0, newZoom)));
  };

  const handleZoomIn = () => setZoom(prev => Math.min(15.0, prev + 0.5));
  const handleZoomOut = () => setZoom(prev => Math.max(0.6, prev - 0.5));
  const handleRecenter = () => {
    const airport = AIRPORTS_DATA.find(a => a.id === selectedAirportId) || AIRPORTS_DATA[0];
    centerOnCoordinate(airport.lat, airport.lon);
    setZoom(1.0);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full lg:h-[calc(100vh-20px)] p-4 md:p-6 overflow-y-auto lg:overflow-hidden">
      {/* Top Navigation Bar (Desktop & Mobile) */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/15 gap-4 w-full select-none shrink-0">
        <div className="flex items-center gap-3">
          {/* Back button to return to the plane catalog */}
          <button
            onClick={onBackToList}
            className={`flex items-center gap-1.5 text-xs font-bold font-mono text-teal-400 bg-teal-500/10 hover:bg-teal-500/20 active:scale-95 transition-all py-2 px-3.5 rounded-xl border border-teal-400/20 shadow-sm shadow-teal-500/5 cursor-pointer`}
          >
            <ChevronLeft className="w-4 h-4" />
            {lang === 'CZ' ? 'KATALOG LETADEL' : 'AIRCRAFT CATALOG'}
          </button>
        </div>

        {/* Title / Info */}
        <div className="hidden sm:flex flex-col items-center text-center">
          <h2 className="text-xs font-extrabold tracking-widest bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent uppercase font-mono leading-none">
            {lang === 'CZ' ? '3D GLÓBUS LETIŠŤ' : '3D AIRPORTS GLOBE'}
          </h2>
          <span className="text-[8px] text-slate-500 font-mono tracking-wider mt-0.5">
            {lang === 'CZ' ? 'INTERAKTIVNÍ VIZUALIZACE S DETAILNÍMI HRANICEMI' : 'INTERACTIVE GEOSPATIAL VISUALIZATION'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Active selection tag */}
          <span className={`text-[9px] text-slate-400 font-mono font-bold tracking-wider uppercase border rounded-lg px-2.5 py-1 ${
            isDark ? 'bg-slate-950/40 border-white/5' : 'bg-slate-50 border-slate-200'
          }`}>
            {translateAirportText(selectedAirport.city, lang)} ({selectedAirport.code.split(' ')[0]})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full h-full items-start overflow-hidden min-h-0">
        
        {/* LEFT: Interactive 3D Globe or Google Map with floating overlays */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative bg-slate-900/10 rounded-3xl border border-white/5 p-4 overflow-hidden h-[380px] sm:h-[450px] lg:h-[calc(100vh-140px)] min-h-0 w-full flex">
        
        {/* Top Floating Controls Overlay */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-col md:flex-row gap-2 items-stretch md:items-center justify-between pointer-events-none">
          
          {/* 1. Toggle Button Group - Switch between Airport Search and Route Finder */}
          <div className="flex bg-slate-900/95 border border-slate-700/50 rounded-xl p-1 shrink-0 shadow-lg pointer-events-auto self-start">
            <button
              onClick={() => setRouteMode(false)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                !routeMode
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'CZ' ? 'HLEDAT LETIŠTĚ' : 'SEARCH AIRPORT'}
            </button>
            <button
              onClick={() => setRouteMode(true)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                routeMode
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'CZ' ? 'NAJÍT TRASU' : 'FIND ROUTE'}
            </button>
          </div>

          {/* 2. Interactive Input Section */}
          <div className="flex-1 flex justify-end pointer-events-auto">
            {!routeMode ? (
              /* Single Airport Search */
              <div className="relative w-full sm:max-w-[260px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder={lang === 'CZ' ? 'Vyhledat letiště...' : 'Search airport...'}
                  className={`w-full pl-9 pr-8 py-2 rounded-xl text-xs font-mono border transition-all ${
                    isDark 
                      ? 'bg-slate-900/95 border-slate-700/50 text-white placeholder-slate-500 focus:border-teal-500/70 focus:ring-1 focus:ring-teal-500/30' 
                      : 'bg-white/95 border-slate-250 text-slate-800 placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20 shadow-sm'
                  }`}
                />
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-[10px] font-mono font-bold text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    ✕
                  </button>
                )}

                {/* Dropdown search suggestions */}
                <AnimatePresence>
                  {showDropdown && searchQuery && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className={`absolute left-0 right-0 mt-1.5 rounded-xl border max-h-56 overflow-y-auto z-30 shadow-2xl ${
                        isDark 
                          ? 'bg-slate-900/95 border-slate-800 text-slate-200' 
                          : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((airport) => (
                          <button
                            key={airport.id}
                            onClick={() => {
                              onSelectAirport(airport.id);
                              setSearchQuery('');
                              setShowDropdown(false);
                            }}
                            className={`w-full text-left p-3 flex items-center justify-between border-b last:border-0 text-xs font-mono cursor-pointer transition-colors ${
                              isDark 
                               ? 'border-white/5 hover:bg-slate-800/60' 
                               : 'border-slate-100 hover:bg-slate-50'
                            }`}
                          >
                            <div>
                              <p className="font-bold text-slate-200 dark:text-white leading-tight">{translateAirportText(airport.city, lang)}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[220px]">{translateAirportText(airport.name, lang)}</p>
                            </div>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              isDark ? 'bg-teal-500/15 text-teal-400' : 'bg-teal-50 text-teal-700 border border-teal-100'
                            }`}>
                              {airport.code.split(' ')[0]}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="p-4 text-center text-xs text-slate-500 italic">
                          {lang === 'CZ' ? 'Nebylo nalezeno žádné letiště' : 'No airports matched'}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Route Finder Search Dropdowns */
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-[500px] bg-slate-900/95 border border-slate-700/50 p-2 rounded-2xl shadow-xl">
                {/* FROM SEARCH FIELD */}
                <div className="relative w-full">
                  <input
                    type="text"
                    value={fromInput}
                    onChange={(e) => {
                      setFromInput(e.target.value);
                      setShowFromDropdown(true);
                    }}
                    onFocus={() => setShowFromDropdown(true)}
                    onBlur={() => setTimeout(() => setShowFromDropdown(false), 200)}
                    placeholder={lang === 'CZ' ? 'Z letiště...' : 'From airport...'}
                    className="w-full pl-8 pr-6 py-1.5 rounded-xl text-xs font-mono border transition-all bg-slate-950 border-slate-800 text-white focus:border-teal-500/70 focus:ring-1 focus:ring-teal-500/30"
                  />
                  <MapPin className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-teal-400" />
                  
                  {/* FROM DROPDOWN */}
                  {showFromDropdown && (
                    <div className="absolute left-0 right-0 mt-1.5 rounded-xl border max-h-48 overflow-y-auto z-30 shadow-2xl bg-slate-900 border-slate-800 text-slate-200">
                      {filteredFromSuggestions.length > 0 ? (
                        filteredFromSuggestions.map((airport) => (
                          <button
                            key={airport.id}
                            onMouseDown={() => {
                              setFromAirportId(airport.id);
                              setShowFromDropdown(false);
                            }}
                            className="w-full text-left p-2.5 flex items-center justify-between border-b last:border-0 border-white/5 hover:bg-slate-800/60 text-[10px] font-mono cursor-pointer transition-colors"
                          >
                            <div className="truncate pr-2">
                              <span className="font-bold text-white">{translateAirportText(airport.city, lang)}</span>
                              <span className="text-slate-400 text-[9px] ml-1.5 truncate">({translateAirportText(airport.name, lang)})</span>
                            </div>
                            <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-teal-500/15 text-teal-400 shrink-0">
                              {airport.code.split(' ')[0]}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="p-2.5 text-center text-[10px] text-slate-500 italic">
                          {lang === 'CZ' ? 'Nenalezeno' : 'No match'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <span className="text-teal-400 text-xs font-mono font-bold hidden sm:inline">➔</span>

                {/* TO SEARCH FIELD */}
                <div className="relative w-full">
                  <input
                    type="text"
                    value={toInput}
                    onChange={(e) => {
                      setToInput(e.target.value);
                      setShowToDropdown(true);
                    }}
                    onFocus={() => setShowToDropdown(true)}
                    onBlur={() => setTimeout(() => setShowToDropdown(false), 200)}
                    placeholder={lang === 'CZ' ? 'Na letiště...' : 'To airport...'}
                    className="w-full pl-8 pr-6 py-1.5 rounded-xl text-xs font-mono border transition-all bg-slate-950 border-slate-800 text-white focus:border-teal-500/70 focus:ring-1 focus:ring-teal-500/30"
                  />
                  <MapPin className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-emerald-400" />
                  
                  {/* TO DROPDOWN */}
                  {showToDropdown && (
                    <div className="absolute left-0 right-0 mt-1.5 rounded-xl border max-h-48 overflow-y-auto z-30 shadow-2xl bg-slate-900 border-slate-800 text-slate-200">
                      {filteredToSuggestions.length > 0 ? (
                        filteredToSuggestions.map((airport) => (
                          <button
                            key={airport.id}
                            onMouseDown={() => {
                              setToAirportId(airport.id);
                              setShowToDropdown(false);
                            }}
                            className="w-full text-left p-2.5 flex items-center justify-between border-b last:border-0 border-white/5 hover:bg-slate-800/60 text-[10px] font-mono cursor-pointer transition-colors"
                          >
                            <div className="truncate pr-2">
                              <span className="font-bold text-white">{translateAirportText(airport.city, lang)}</span>
                              <span className="text-slate-400 text-[9px] ml-1.5 truncate">({translateAirportText(airport.name, lang)})</span>
                            </div>
                            <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-teal-500/15 text-teal-400 shrink-0">
                              {airport.code.split(' ')[0]}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="p-2.5 text-center text-[10px] text-slate-500 italic">
                          {lang === 'CZ' ? 'Nenalezeno' : 'No match'}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* CLEAR BUTTON */}
                {(fromAirportId || toAirportId) && (
                  <button
                    onClick={() => {
                      setFromAirportId('');
                      setToAirportId('');
                    }}
                    className="px-2 py-1.5 rounded-xl text-[10px] font-mono font-black text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer shrink-0"
                    title={lang === 'CZ' ? 'Vymazat trasu' : 'Clear route'}
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Dynamic map container */}
        <div className="w-full h-full flex-1 flex items-center justify-center relative min-h-0">
          <div ref={containerRef} className="touch-none w-full h-full flex-1 flex items-center justify-center relative cursor-grab active:cursor-grabbing">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => { isDragging.current = false; }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="block touch-none"
            />

            {/* Compass/Atmospheric Grid Indicator */}
            <div className="absolute bottom-4 left-4 pointer-events-none flex flex-col gap-1 text-[10px] font-mono text-slate-500 tracking-wider">
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-teal-500/60 animate-spin" style={{ animationDuration: '30s' }} />
                <span>3D SPATIAL PROJECTION</span>
              </div>
              <div className={`text-[9px] font-bold px-1.5 py-0.5 rounded self-start ${
                isDark ? 'text-teal-400 bg-teal-500/10 border border-teal-500/20' : 'text-teal-700 bg-teal-50 border border-teal-200'
              }`}>
                ZOOM: {zoom.toFixed(1)}x
              </div>
              <div className={`text-[9px] font-bold px-1.5 py-0.5 rounded self-start flex items-center gap-1 ${
                isDark ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {lang === 'CZ' 
                  ? `NAČTENO: ${loadedAirports.length} letišť v zorném poli` 
                  : `LOADED: ${loadedAirports.length} airports in view`}
              </div>
              {isLoadingProgressive && (
                <div className={`text-[9px] font-bold px-1.5 py-0.5 rounded self-start flex items-center gap-1.5 ${
                  isDark ? 'text-teal-400 bg-teal-500/10 border border-teal-500/20' : 'text-teal-700 bg-teal-50 border border-teal-200'
                }`}>
                  <RefreshCw className="w-2.5 h-2.5 animate-spin text-teal-400" />
                  <span>{lang === 'CZ' ? 'NAČÍTÁNÍ SEKTORU...' : 'LOADING SECTOR...'}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating control overlay buttons */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            title={lang === 'CZ' ? 'Přiblížit' : 'Zoom In'}
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all cursor-pointer shadow-md ${
              isDark 
                ? 'bg-slate-900 border-slate-700/60 text-slate-200 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            title={lang === 'CZ' ? 'Oddálit' : 'Zoom Out'}
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all cursor-pointer shadow-md ${
              isDark 
                ? 'bg-slate-900 border-slate-700/60 text-slate-200 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRecenter}
            title={lang === 'CZ' ? 'Vycentrovat na vybrané' : 'Recenter Selected'}
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all cursor-pointer shadow-md ${
              isDark 
                ? 'bg-slate-900 border-slate-700/60 text-slate-200 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5 text-teal-500" />
          </button>
          <button
            onClick={() => setHideAllAirports(!hideAllAirports)}
            title={lang === 'CZ' ? (hideAllAirports ? 'Zobrazit všechna letiště' : 'Skrýt ostatní letiště') : (hideAllAirports ? 'Show all airports' : 'Hide other airports')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all cursor-pointer shadow-md ${
              hideAllAirports
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : isDark
                  ? 'bg-slate-900 border-slate-700/60 text-slate-400 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            {hideAllAirports ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

      {/* RIGHT: Selected Airport Detailed Specification metrics OR Active Route Details */}
      <div className="lg:col-span-5 space-y-5 h-full lg:overflow-y-auto pr-1 lg:h-[calc(100vh-140px)] pb-10 block w-full">
        {routeMode ? (
          /* ROUTE FINDER MODE PANEL */
          fromAirport && toAirport ? (
            <div className="space-y-5">
              {/* Route Summary Card */}
              <div className={`p-6 rounded-3xl border text-left shadow-xl ${
                isDark 
                  ? 'bg-slate-900/40 border-white/5' 
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
                style={{
                  backgroundImage: isDark ? 'radial-gradient(circle at top right, rgba(20, 184, 166, 0.08), transparent 70%)' : 'none'
                }}
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-teal-400 uppercase tracking-widest">
                    <Compass className="w-3.5 h-3.5" />
                    <span>{lang === 'CZ' ? 'DETAILY LETU' : 'FLIGHT DETAILS'}</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setFromAirportId('');
                      setToAirportId('');
                    }}
                    className="text-[10px] font-mono text-slate-500 hover:text-slate-300 font-bold cursor-pointer"
                  >
                    {lang === 'CZ' ? 'ZRUŠIT TRASU' : 'CANCEL ROUTE'}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="text-left">
                    <span className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {fromAirport.code.split(' ')[0]}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{translateAirportText(fromAirport.city, lang)}</p>
                  </div>

                  <div className="flex-1 flex flex-col items-center px-4 relative">
                    <div className="w-full border-t border-dashed border-slate-700/60 relative">
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-slate-950 px-1 text-teal-400">
                        <Plane className="w-3.5 h-3.5 rotate-90" />
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-2 font-bold tracking-wider">
                      {routeDistance.toLocaleString()} km
                    </span>
                  </div>

                  <div className="text-right">
                    <span className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {toAirport.code.split(' ')[0]}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{translateAirportText(toAirport.city, lang)}</p>
                  </div>
                </div>

                {/* Flight calculations and estimate speeds */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/40">
                  <div className="text-left">
                    <span className="text-[9px] font-mono text-slate-500 font-bold block uppercase tracking-wider">
                      {lang === 'CZ' ? 'EST. ČAS LETU' : 'EST. FLIGHT TIME'}
                    </span>
                    <span className={`text-sm font-black font-mono ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      {routeHours}h {routeMinutes}m
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-mono text-slate-500 font-bold block uppercase tracking-wider">
                      {lang === 'CZ' ? 'PRŮMĚRNÁ RYCHLOST' : 'CRUISE SPEED'}
                    </span>
                    <span className={`text-sm font-black font-mono ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      ~850 km/h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Choose Route Invitation Card */
            <div className={`p-8 rounded-3xl border text-center flex flex-col items-center justify-center h-48 ${
              isDark ? 'bg-slate-900/40 border-white/5 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}>
              <Compass className="w-10 h-10 text-teal-400 animate-pulse mb-3" />
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider">
                {lang === 'CZ' ? 'Vytvořte si trasu letu' : 'Plan your flight path'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs font-mono leading-relaxed">
                {lang === 'CZ' 
                  ? 'Zvolte výchozí a cílové letiště v horním menu nebo klikněte na body na glóbusu.' 
                  : 'Select your origin and destination airports in the top menu or click points on the globe.'}
              </p>
            </div>
          )
        ) : (
          /* STANDARD AIRPORT DETAILS PANEL */
          <>
            {/* Core Info Header card */}
            <div className={`p-6 rounded-3xl border text-left shadow-xl ${
              isDark 
                ? 'bg-slate-900/40 border-white/5' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}
              style={{
                backgroundImage: isDark ? 'radial-gradient(circle at top right, rgba(20, 184, 166, 0.08), transparent 70%)' : 'none'
              }}
            >
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <span className={`text-[10px] font-mono tracking-widest font-extrabold uppercase px-2 py-0.5 rounded-md ${
                    isDark ? 'bg-teal-500/10 text-teal-400' : 'bg-teal-50 text-teal-700 border border-teal-100'
                  }`}>
                    {selectedAirport.code}
                  </span>
                  <h2 className={`text-xl font-black tracking-tight mt-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {translateAirportText(selectedAirport.name, lang)}
                  </h2>
                  <p className={`text-xs font-mono font-bold mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {translateAirportText(selectedAirport.city, lang)}, {translateAirportText(selectedAirport.country, lang)}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shrink-0 ${
                  isDark ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'bg-teal-50 text-teal-600 border border-teal-100'
                }`}>
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-650'}`}>
                {translateAirportText(selectedAirport.description, lang)}
              </p>
            </div>

            {/* Airport statistics metrics Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              
              {/* Opened stat */}
              <div className={`p-4 rounded-2xl border text-left flex flex-col justify-between ${
                isDark ? 'bg-slate-950/40 border-white/5' : 'bg-slate-50/70 border-slate-200'
              }`}>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">{lang === 'CZ' ? 'ROK OTEVŘENÍ' : 'BUILT YEAR'}</span>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span className={`text-base font-black tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-850'}`}>
                    {selectedAirport.builtYear}
                  </span>
                </div>
              </div>

              {/* Average daily aircraft operations */}
              <div className={`p-4 rounded-2xl border text-left flex flex-col justify-between ${
                isDark ? 'bg-slate-950/40 border-white/5' : 'bg-slate-50/70 border-slate-200'
              }`}>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">{lang === 'CZ' ? 'DENNÍ LETŮ' : 'DAILY FLIGHTS'}</span>
                <div className="flex items-center gap-2 mt-2">
                  <Gauge className="w-4 h-4 text-emerald-400" />
                  <span className={`text-base font-black tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-850'}`}>
                    {selectedAirport.avgFlightsDaily !== undefined ? `~${selectedAirport.avgFlightsDaily.toLocaleString()}` : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Yearly passengers count */}
              <div className={`p-4 rounded-2xl border text-left flex flex-col justify-between ${
                isDark ? 'bg-slate-950/40 border-white/5' : 'bg-slate-50/70 border-slate-200'
              }`}>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">{lang === 'CZ' ? 'CESTUJÍCÍ Ročně' : 'YEARLY PASSENGERS'}</span>
                <div className="flex items-center gap-2 mt-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className={`text-base font-black tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-850'}`}>
                    {selectedAirport.passengersYearlyM} {lang === 'CZ' ? 'mil.' : 'million'}
                  </span>
                </div>
              </div>

              {/* Active runways count */}
              <div className={`p-4 rounded-2xl border text-left flex flex-col justify-between ${
                isDark ? 'bg-slate-950/40 border-white/5' : 'bg-slate-50/70 border-slate-200'
              }`}>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">{lang === 'CZ' ? 'POČET DRAH' : 'RUNWAYS COUNT'}</span>
                <div className="flex items-center gap-2 mt-2">
                  <Navigation className="w-4 h-4 text-teal-400" />
                  <span className={`text-base font-black tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-850'}`}>
                    {selectedAirport.runwaysCount}
                  </span>
                </div>
              </div>

              {/* Altitude above sea level */}
              <div className="col-span-2 p-4 rounded-2xl border text-left flex items-center justify-between bg-slate-900/20 border-white/5">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">{lang === 'CZ' ? 'NADMOŘSKÁ VÝŠKA' : 'ELEVATION'}</span>
                <span className={`text-xs font-bold font-mono ${isDark ? 'text-slate-300' : 'text-slate-750'}`}>
                  {selectedAirport.altitudeM} {lang === 'CZ' ? 'm n. m.' : 'm asl'} ({Math.round(selectedAirport.altitudeM * 3.28084)} ft)
                </span>
              </div>

            </div>

            {/* Unique Fact box */}
            <div className={`p-5 rounded-2xl border text-left ${
              isDark ? 'bg-teal-950/10 border-teal-950/30' : 'bg-teal-50/40 border-teal-200/50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-teal-500" />
                <span className="text-xs font-bold text-teal-500 uppercase tracking-wide">
                  {lang === 'CZ' ? 'Zajímavost' : 'Unique Fact'}
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-350' : 'text-slate-650'}`}>
                {translateAirportText(selectedAirport.uniqueness, lang)}
              </p>
            </div>
          </>
        )}
      </div>

    </div>
    </div>
  );
}
