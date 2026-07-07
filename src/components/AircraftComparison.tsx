import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Search, 
  Users, 
  Milestone, 
  Gauge, 
  Scale, 
  Ruler, 
  Wrench, 
  Calendar, 
  ArrowLeftRight, 
  Info,
  RotateCw,
  Plane,
  Layers,
  Globe,
  Compass
} from 'lucide-react';
import { Aircraft, Airline } from '../types';
import { AIRCRAFT_DATA } from '../data';
import { AIRLINE_DATA } from '../airline_data';
import { EUFlag, USFlag, CanadaFlag, EUCanadaFlag, BrazilFlag, CZFlag, GermanyFlag, IEFlag, NLFlag, QAFlag, HUFlag, UKFlag, SGFlag, PTFlag, FIFlag, TRFlag, JPFlag, AEFlag, AUFlag, KRFlag, ESFlag, HKFlag, SmartwingsLogo, DeltaLogo, LufthansaLogo, RyanairLogo, BritishAirwaysLogo, KLMLogo, QatarLogo, WizzLogo, SingaporeLogo, TapLogo, AirCanadaLogo, FinnairLogo, UnitedLogo, AmericanLogo, TurkishLogo, ANALogo, EmiratesLogo, QantasLogo, KoreanLogo, VuelingLogo, CathayLogo, AirFranceLogo, IberiaLogo, SASLogo, BrusselsAirlinesLogo, LOTLogo, AustrianAirlinesLogo, SwissLogo, EtihadLogo, JALLogo } from './Flags';
import { translateCategory, translateTypicalCapacity, translateCountry, translateText } from '../translations';
import { AircraftCompositeOverlay } from './AircraftVisualProfile';

interface AircraftComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  initialAircraft?: Aircraft | null;
  initialAirline?: Airline | null;
  initialMode?: 'aircraft' | 'airline';
  lang?: 'CZ' | 'EN';
  theme?: 'light' | 'dark';
}


export default function AircraftComparison({ 
  isOpen, 
  onClose, 
  initialAircraft, 
  initialAirline,
  initialMode = 'aircraft',
  lang: inputLang, 
  theme = 'dark' 
}: AircraftComparisonProps) {
  const currentLang = inputLang || 'CZ';
  const isDark = theme !== 'light';

  // Theme design helpers
  const modalBg = isDark 
    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-white/5' 
    : 'bg-white border-slate-200';

  const headerBg = isDark 
    ? 'bg-slate-950/40 border-b border-white/5' 
    : 'bg-slate-50 border-b border-slate-200';

  const searchBoxBg = isDark
    ? 'bg-slate-950/20 divide-x divide-white/5 border-b border-white/5'
    : 'bg-slate-100/50 divide-x divide-slate-200 border-b border-slate-200';

  const cardSlotBg = isDark
    ? 'bg-slate-900/50 border border-white/5'
    : 'bg-slate-50 border border-slate-200/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]';

  const titleText = isDark ? 'text-white' : 'text-slate-800';
  const subtitleText = isDark ? 'text-slate-500' : 'text-slate-450';
  
  const closeBtnBg = isDark 
    ? 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white' 
    : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border border-slate-200/60';
  
  const emptySelBtn = isDark
    ? 'bg-slate-950/50 hover:bg-slate-950 border border-dashed border-slate-800 hover:border-sky-500/50 text-slate-450 hover:text-sky-400'
    : 'bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-350 hover:border-sky-500/50 text-slate-500 hover:text-sky-650';

  const listDropdownBg = isDark
    ? 'bg-slate-900 border-slate-800 shadow-2xl'
    : 'bg-white border-slate-200 shadow-2xl';

  const inputInsideBg = isDark
    ? 'bg-slate-950 border-slate-800 text-white'
    : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white';

  const [compareMode, setCompareMode] = useState<'aircraft' | 'airline'>(initialMode);

  const [slot1, setSlot1] = useState<Aircraft | null>(null);
  const [slot2, setSlot2] = useState<Aircraft | null>(null);
  const [searchOpen1, setSearchOpen1] = useState(false);
  const [searchOpen2, setSearchOpen2] = useState(false);
  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');

  const [airlineSlot1, setAirlineSlot1] = useState<Airline | null>(null);
  const [airlineSlot2, setAirlineSlot2] = useState<Airline | null>(null);
  const [airlineSearchOpen1, setAirlineSearchOpen1] = useState(false);
  const [airlineSearchOpen2, setAirlineSearchOpen2] = useState(false);
  const [airlineQuery1, setAirlineQuery1] = useState('');
  const [airlineQuery2, setAirlineQuery2] = useState('');

  // Set initial choices on open
  useEffect(() => {
    if (isOpen) {
      if (initialMode) {
        setCompareMode(initialMode);
      }
      if (initialAircraft) {
        setSlot1(initialAircraft);
      }
      if (initialAirline) {
        setAirlineSlot1(initialAirline);
      }
    }
  }, [initialAircraft, initialAirline, initialMode, isOpen]);

  // Filter aircraft for Slot 1 search dropdown
  const filtered1 = useMemo(() => {
    if (!query1.trim()) return AIRCRAFT_DATA;
    return AIRCRAFT_DATA.filter(a => 
      a.name.toLowerCase().includes(query1.toLowerCase()) || 
      a.manufacturer.toLowerCase().includes(query1.toLowerCase()) ||
      a.modelSeries.toLowerCase().includes(query1.toLowerCase())
    );
  }, [query1]);

  // Filter aircraft for Slot 2 search dropdown
  const filtered2 = useMemo(() => {
    if (!query2.trim()) return AIRCRAFT_DATA;
    return AIRCRAFT_DATA.filter(a => 
      a.name.toLowerCase().includes(query2.toLowerCase()) || 
      a.manufacturer.toLowerCase().includes(query2.toLowerCase()) ||
      a.modelSeries.toLowerCase().includes(query2.toLowerCase())
    );
  }, [query2]);

  // Filter airlines for Slot 1 search dropdown
  const filteredAirlines1 = useMemo(() => {
    if (!airlineQuery1.trim()) return AIRLINE_DATA;
    return AIRLINE_DATA.filter(a => 
      a.name.toLowerCase().includes(airlineQuery1.toLowerCase()) || 
      a.country.toLowerCase().includes(airlineQuery1.toLowerCase()) ||
      a.alliance.toLowerCase().includes(airlineQuery1.toLowerCase())
    );
  }, [airlineQuery1]);

  // Filter airlines for Slot 2 search dropdown
  const filteredAirlines2 = useMemo(() => {
    if (!airlineQuery2.trim()) return AIRLINE_DATA;
    return AIRLINE_DATA.filter(a => 
      a.name.toLowerCase().includes(airlineQuery2.toLowerCase()) || 
      a.country.toLowerCase().includes(airlineQuery2.toLowerCase()) ||
      a.alliance.toLowerCase().includes(airlineQuery2.toLowerCase())
    );
  }, [airlineQuery2]);


  const text = {
    title: currentLang === 'CZ' ? 'Srovnávač Letadel' : 'Aircraft Comparator',
    subtitle: currentLang === 'CZ' ? 'Porovnejte technické parametry dvou vybraných letadel.' : 'Compare technical metrics of two selected aircraft side-by-side.',
    change: currentLang === 'CZ' ? 'Změnit' : 'Change',
    deleteDescription: currentLang === 'CZ' ? 'Smazat' : 'Delete',
    select: currentLang === 'CZ' ? 'Výběr letadla' : 'Select aircraft',
    searchPlaceholder: currentLang === 'CZ' ? 'Vyhledat...' : 'Search...',
    clear: currentLang === 'CZ' ? 'Zrušit' : 'Clear',
    noResults: currentLang === 'CZ' ? 'Nenalezena žádná letadla' : 'No aircraft found',
    notSelected: currentLang === 'CZ' ? 'Není vybráno' : 'Not selected',
    chooseTwoTitle: currentLang === 'CZ' ? 'Zvolte dvě letadla k porovnání' : 'Select two aircraft to compare',
    chooseTwoDesc: currentLang === 'CZ' ? 'Po vybrání obou modelů získáte okamžité porovnání jejich rozměrů, kapacity, motorů, rychlosti a doletu s grafickým zvýrazněním odlišností.' : 'Once both models are selected, you will get an instant comparison of their dimensions, capacity, engines, speed, and range with graphical highlighting of the differences.',
    uniquenessLabel: currentLang === 'CZ' ? 'Zajímavost' : 'Fun Fact',
    footerAssistant: currentLang === 'CZ' ? 'AirCatalog porovnávací asistent' : 'AirCatalog comparison assistant',
    footerDisclaimer: currentLang === 'CZ' ? 'Udávané parametry jsou chráněny licencí či technickými listy výrobců. Loga společností jsou pouze přibližné z důvodu autorských práv.' : 'Specified parameters are protected by copyright or manufacturer datasheets. Company logos are only approximate due to copyright reasons.',
    same: currentLang === 'CZ' ? 'Stejné' : 'Same',
    more: currentLang === 'CZ' ? 'O {p} % víc' : '{p}% more',
    less: currentLang === 'CZ' ? 'O {p} % méně' : '{p}% less',
  };

  if (!isOpen) return null;

  // Helper helper to get country flag
  const getFlag = (country: string) => {
    const norm = country.toLowerCase();
    if (norm.includes('evropská unie / kanada') || norm.includes('european union / canada')) return <EUCanadaFlag />;
    if (norm.includes('evropská unie') || norm.includes('european union') || norm.includes('france') || norm.includes('francie') || norm.includes('německo') || norm.includes('germany') || norm.includes('velká británie') || norm.includes('united kingdom') || norm.includes('eu') || norm.includes('uk')) return <EUFlag />;
    if (norm.includes('usa') || norm.includes('spojené státy') || norm.includes('united states')) return <USFlag />;
    if (norm.includes('kanada') || norm.includes('canada')) return <CanadaFlag />;
    if (norm.includes('brazílie') || norm.includes('brazil')) return <BrazilFlag />;
    return <span className="text-xs">🌐</span>;
  };

  // Helper for numeric render comparisons
  const renderSpecRow = (
    label: string, 
    icon: React.ReactNode, 
    val1Accessor: (a: Aircraft) => number | string,
    val2Accessor: (a: Aircraft) => number | string,
    unit: string,
    isNumeric: boolean = true
  ) => {
    const v1 = slot1 ? val1Accessor(slot1) : null;
    const v2 = slot2 ? val2Accessor(slot2) : null;

    let comp1 = '';
    let comp2 = '';
    let barWidth1 = '0%';
    let barWidth2 = '0%';

    if (isNumeric && typeof v1 === 'number' && typeof v2 === 'number' && v1 > 0 && v2 > 0) {
      const sum = v1 + v2;
      barWidth1 = `${Math.max(8, (v1 / sum) * 100)}%`;
      barWidth2 = `${Math.max(8, (v2 / sum) * 100)}%`;

      const diff1 = v1 - v2;
      if (diff1 > 0) {
        const p = Math.round((v1 / v2 - 1) * 100);
        comp1 = text.more.replace('{p}', String(p));
      } else if (diff1 < 0) {
        const p = Math.round((1 - v1 / v2) * 100);
        comp1 = text.less.replace('{p}', String(p));
      } else {
        comp1 = text.same;
      }

      const diff2 = v2 - v1;
      if (diff2 > 0) {
        const p = Math.round((v2 / v1 - 1) * 100);
        comp2 = text.more.replace('{p}', String(p));
      } else if (diff2 < 0) {
        const p = Math.round((1 - v2 / v1) * 100);
        comp2 = text.less.replace('{p}', String(p));
      } else {
        comp2 = text.same;
      }
    }

    const isSlot1Higher = comp1 && (comp1.includes('víc') || comp1.includes('more'));
    const isSlot2Higher = comp2 && (comp2.includes('víc') || comp2.includes('more'));

    return (
      <div className={`border-b ${isDark ? 'border-white/5 hover:bg-slate-900/10' : 'border-slate-200 hover:bg-slate-50'} py-3 md:py-4 transition-colors px-3 md:px-4 rounded-xl`}>
        <div className="flex items-center gap-1.5 mb-2">
          <div className={`p-1 ${isDark ? 'bg-slate-800/80 text-sky-400' : 'bg-slate-100 text-sky-600'} rounded select-none`}>{icon}</div>
          <span className={`text-[10px] md:text-[11px] uppercase font-bold tracking-wider font-mono ${isDark ? 'text-slate-400' : 'text-slate-550'}`}>{label}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 items-center">
          {/* Slot 1 Value */}
          <div className="text-left font-mono">
            {v1 !== null ? (
              <div className="space-y-1">
                <div className={`text-xs md:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {typeof v1 === 'number' ? v1.toLocaleString(currentLang === 'CZ' ? 'cs-CZ' : 'en-GB') : v1}{' '}
                  {v1 !== '' && <span className={`text-[9px] md:text-[10px] font-sans font-medium ${isDark ? 'text-slate-500' : 'text-slate-450'}`}>{unit}</span>}
                </div>
                {comp1 && (
                  <div className={`text-[9px] md:text-[10px] py-0.5 px-2 inline-block rounded-full border font-bold ${
                    isSlot1Higher ? 'bg-emerald-500/10 text-emerald-450 border-emerald-500/15' : 
                    comp1 === text.same ? (isDark ? 'bg-slate-800/40 text-slate-400 border-slate-700/50' : 'bg-slate-100 text-slate-500 border-slate-205') :
                    (isDark ? 'bg-slate-950 text-slate-400 border-white/5' : 'bg-slate-100 text-slate-650 border-slate-200')
                  }`}>
                    {comp1}
                  </div>
                )}
                {/* Visual bar split */}
                {isNumeric && typeof v1 === 'number' && typeof v2 === 'number' && (
                  <div className={`w-full h-1 rounded-full mt-1 overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
                    <div style={{ width: barWidth1 }} className={`h-full rounded-full transition-all duration-500 ${isSlot1Higher ? 'bg-emerald-500' : 'bg-[#94a3b8]'}`} />
                  </div>
                )}
              </div>
            ) : (
              <span className="text-[11px] text-slate-500 italic">{text.notSelected}</span>
            )}
          </div>

          {/* Slot 2 Value */}
          <div className="text-right font-mono">
            {v2 !== null ? (
              <div className="space-y-1">
                <div className={`text-xs md:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {typeof v2 === 'number' ? v2.toLocaleString(currentLang === 'CZ' ? 'cs-CZ' : 'en-GB') : v2}{' '}
                  {v2 !== '' && <span className={`text-[9px] md:text-[10px] font-sans font-medium ${isDark ? 'text-slate-500' : 'text-slate-450'}`}>{unit}</span>}
                </div>
                {comp2 && (
                  <div className={`text-[9px] md:text-[10px] py-0.5 px-2 inline-block rounded-full border font-bold ${
                    isSlot2Higher ? 'bg-emerald-500/10 text-emerald-450 border-emerald-500/15' : 
                    comp2 === text.same ? (isDark ? 'bg-slate-800/40 text-slate-400 border-slate-700/50' : 'bg-slate-100 text-slate-500 border-slate-205') :
                    (isDark ? 'bg-slate-950 text-slate-400 border-white/5' : 'bg-slate-100 text-slate-650 border-slate-200')
                  }`}>
                    {comp2}
                  </div>
                )}
                {/* Visual bar split */}
                {isNumeric && typeof v2 === 'number' && typeof v1 === 'number' && (
                  <div className={`w-full h-1 rounded-full mt-1 overflow-hidden flex justify-end ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
                    <div style={{ width: barWidth2 }} className={`h-full rounded-full transition-all duration-500 ${isSlot2Higher ? 'bg-emerald-500' : 'bg-[#94a3b8]'}`} />
                  </div>
                )}
              </div>
            ) : (
              <span className="text-[11px] text-slate-500 italic">{text.notSelected}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getAirlineAvgCapacity = (airline: Airline) => {
    let totalCap = 0;
    let totalCount = 0;
    airline.fleet.forEach(item => {
      const ac = AIRCRAFT_DATA.find(a => a.id === item.aircraftId);
      if (ac) {
        totalCap += ac.specs.capacityMax * item.quantity;
        totalCount += item.quantity;
      }
    });
    return totalCount > 0 ? Math.round(totalCap / totalCount) : 0;
  };

  const getAirlineAvgRange = (airline: Airline) => {
    let totalRange = 0;
    let totalCount = 0;
    airline.fleet.forEach(item => {
      const ac = AIRCRAFT_DATA.find(a => a.id === item.aircraftId);
      if (ac) {
        totalRange += ac.specs.rangeKm * item.quantity;
        totalCount += item.quantity;
      }
    });
    return totalCount > 0 ? Math.round(totalRange / totalCount) : 0;
  };

  const renderAirlineSpecRow = (
    label: string, 
    icon: React.ReactNode, 
    val1Accessor: (a: Airline) => number | string,
    val2Accessor: (a: Airline) => number | string,
    unit: string,
    isNumeric: boolean = true,
    isLowerBetter: boolean = false
  ) => {
    const v1 = airlineSlot1 ? val1Accessor(airlineSlot1) : null;
    const v2 = airlineSlot2 ? val2Accessor(airlineSlot2) : null;

    let comp1 = '';
    let comp2 = '';
    let barWidth1 = '0%';
    let barWidth2 = '0%';

    if (isNumeric && typeof v1 === 'number' && typeof v2 === 'number' && v1 > 0 && v2 > 0) {
      const sum = v1 + v2;
      barWidth1 = `${Math.max(8, (v1 / sum) * 100)}%`;
      barWidth2 = `${Math.max(8, (v2 / sum) * 100)}%`;

      const diff1 = v1 - v2;
      if (diff1 > 0) {
        const p = Math.round((v1 / v2 - 1) * 100);
        comp1 = isLowerBetter ? text.less.replace('{p}', String(p)) : text.more.replace('{p}', String(p));
      } else if (diff1 < 0) {
        const p = Math.round((1 - v1 / v2) * 100);
        comp1 = isLowerBetter ? text.more.replace('{p}', String(p)) : text.less.replace('{p}', String(p));
      } else {
        comp1 = text.same;
      }

      const diff2 = v2 - v1;
      if (diff2 > 0) {
        const p = Math.round((v2 / v1 - 1) * 100);
        comp2 = isLowerBetter ? text.less.replace('{p}', String(p)) : text.more.replace('{p}', String(p));
      } else if (diff2 < 0) {
        const p = Math.round((1 - v2 / v1) * 100);
        comp2 = isLowerBetter ? text.more.replace('{p}', String(p)) : text.less.replace('{p}', String(p));
      } else {
        comp2 = text.same;
      }
    }

    const isSlot1Higher = comp1 && (comp1.includes('víc') || comp1.includes('more'));
    const isSlot2Higher = comp2 && (comp2.includes('víc') || comp2.includes('more'));

    return (
      <div className={`border-b ${isDark ? 'border-white/5 hover:bg-slate-900/10' : 'border-slate-200 hover:bg-slate-50'} py-3 md:py-4 transition-colors px-3 md:px-4 rounded-xl`}>
        <div className="flex items-center gap-1.5 mb-2">
          <div className={`p-1 ${isDark ? 'bg-slate-800/80 text-indigo-400' : 'bg-slate-100 text-indigo-600'} rounded select-none`}>{icon}</div>
          <span className={`text-[10px] md:text-[11px] uppercase font-bold tracking-wider font-mono ${isDark ? 'text-slate-400' : 'text-slate-550'}`}>{label}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 items-center">
          {/* Slot 1 Value */}
          <div className="text-left font-mono">
            {v1 !== null ? (
              <div className="space-y-1">
                <div className={`text-xs md:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {typeof v1 === 'number' ? v1.toLocaleString(currentLang === 'CZ' ? 'cs-CZ' : 'en-GB') : v1}{' '}
                  {v1 !== '' && <span className={`text-[9px] md:text-[10px] font-sans font-medium ${isDark ? 'text-slate-500' : 'text-slate-450'}`}>{unit}</span>}
                </div>
                {comp1 && (
                  <div className={`text-[9px] md:text-[10px] py-0.5 px-2 inline-block rounded-full border font-bold ${
                    isSlot1Higher ? 'bg-emerald-500/10 text-emerald-450 border-emerald-500/15' : 
                    comp1 === text.same ? (isDark ? 'bg-slate-800/40 text-slate-400 border-slate-700/50' : 'bg-slate-100 text-slate-500 border-slate-205') :
                    (isDark ? 'bg-slate-950 text-slate-400 border-white/5' : 'bg-slate-100 text-slate-650 border-slate-200')
                  }`}>
                    {comp1}
                  </div>
                )}
                {/* Visual bar split */}
                {isNumeric && typeof v1 === 'number' && typeof v2 === 'number' && (
                  <div className={`w-full h-1 rounded-full mt-1 overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
                    <div style={{ width: barWidth1 }} className={`h-full rounded-full transition-all duration-500 ${isSlot1Higher ? 'bg-emerald-500' : 'bg-[#94a3b8]'}`} />
                  </div>
                )}
              </div>
            ) : (
              <span className="text-[11px] text-slate-500 italic">{text.notSelected}</span>
            )}
          </div>

          {/* Slot 2 Value */}
          <div className="text-right font-mono">
            {v2 !== null ? (
              <div className="space-y-1">
                <div className={`text-xs md:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {typeof v2 === 'number' ? v2.toLocaleString(currentLang === 'CZ' ? 'cs-CZ' : 'en-GB') : v2}{' '}
                  {v2 !== '' && <span className={`text-[9px] md:text-[10px] font-sans font-medium ${isDark ? 'text-slate-500' : 'text-slate-450'}`}>{unit}</span>}
                </div>
                {comp2 && (
                  <div className={`text-[9px] md:text-[10px] py-0.5 px-2 inline-block rounded-full border font-bold ${
                    isSlot2Higher ? 'bg-emerald-500/10 text-emerald-450 border-emerald-500/15' : 
                    comp2 === text.same ? (isDark ? 'bg-slate-800/40 text-slate-400 border-slate-700/50' : 'bg-slate-100 text-slate-500 border-slate-205') :
                    (isDark ? 'bg-slate-950 text-slate-400 border-white/5' : 'bg-slate-100 text-slate-650 border-slate-200')
                  }`}>
                    {comp2}
                  </div>
                )}
                {/* Visual bar split */}
                {isNumeric && typeof v2 === 'number' && typeof v1 === 'number' && (
                  <div className={`w-full h-1 rounded-full mt-1 overflow-hidden flex justify-end ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
                    <div style={{ width: barWidth2 }} className={`h-full rounded-full transition-all duration-500 ${isSlot2Higher ? 'bg-emerald-500' : 'bg-[#94a3b8]'}`} />
                  </div>
                )}
              </div>
            ) : (
              <span className="text-[11px] text-slate-500 italic">{text.notSelected}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${isDark ? 'bg-slate-950/95' : 'bg-slate-900/40'} backdrop-blur-md flex flex-col justify-start md:justify-center items-center p-3 md:p-6 select-none font-sans`}>
      
      <div className={`w-full max-w-6xl ${modalBg} border shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden flex flex-col my-auto relative z-10 shrink-0 max-h-[92vh] md:max-h-[90vh]`}>
        
        {/* MODAL HEADER */}
        <div className={`p-3.5 md:p-5 border-b ${isDark ? 'border-white/5 bg-slate-950/40' : 'border-slate-200/80 bg-slate-50'} flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0`}>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-2 bg-gradient-to-tr from-sky-400 to-indigo-500 text-white rounded-xl shadow-lg">
              <ArrowLeftRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>
            <div>
              <h2 className={`text-sm md:text-base font-extrabold ${titleText} tracking-tight flex items-center gap-1.5`}>
                {compareMode === 'aircraft' ? text.title : (currentLang === 'CZ' ? 'Srovnávač Leteckých Společností' : 'Airline Comparator')} 
                <span className="text-[9px] bg-sky-500/15 border border-sky-500/20 text-sky-450 uppercase px-1.5 py-0.5 rounded-full font-mono font-bold">Beta</span>
              </h2>
              <p className={`text-[9px] md:text-[10px] ${subtitleText} font-mono`}>
                {compareMode === 'aircraft' 
                  ? text.subtitle 
                  : (currentLang === 'CZ' ? 'Porovnejte fleet, historii, aliance a velikosti letek dvou vybraných společností.' : 'Compare fleets, history, alliances, and fleet sizes of two airlines side-by-side.')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Mode selector (Aircraft / Airline) */}
            <div className={`flex p-1 rounded-xl border ${isDark ? 'bg-slate-950/60 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
              <button
                onClick={() => setCompareMode('aircraft')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  compareMode === 'aircraft'
                    ? 'bg-sky-500/15 text-sky-450 shadow-sm'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {currentLang === 'CZ' ? 'Letadla' : 'Aircraft'}
              </button>
              <button
                onClick={() => setCompareMode('airline')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  compareMode === 'airline'
                    ? 'bg-indigo-500/15 text-indigo-450 shadow-sm'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {currentLang === 'CZ' ? 'Společnosti' : 'Airlines'}
              </button>
            </div>

            <button 
              onClick={onClose}
              className={`p-1.5 md:p-2 ${closeBtnBg} rounded-xl transition-all cursor-pointer`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SEARCH AND SELECTION BOXES */}
        <div className={`grid grid-cols-2 ${searchBoxBg} shrink-0`}>
          {compareMode === 'aircraft' ? (
            <>
              {/* SLOT 1 SELECTION */}
              <div className="p-2.5 md:p-4 relative">
                {slot1 ? (
                  <div className={`flex flex-col xl:flex-row xl:items-center justify-between gap-2 ${cardSlotBg} p-2 md:p-3 rounded-xl md:rounded-2xl`}>
                    <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                      <div className="shrink-0 scale-90 md:scale-105">
                        {getFlag(slot1.country)}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className={`text-[11px] md:text-sm font-bold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{slot1.name}</h4>
                        <p className={`text-[8px] md:text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-450'} font-mono truncate`}>{slot1.manufacturer} • {translateCategory(slot1.category, currentLang)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-1.5 self-end xl:self-auto shrink-0 mt-1 xl:mt-0">
                      <button 
                        onClick={() => { setSearchOpen1(!searchOpen1); setSearchOpen2(false); }}
                        className="p-1 px-2 bg-sky-500/10 hover:bg-sky-500/15 border border-sky-500/30 text-sky-450 font-bold text-[9px] md:text-[10px] rounded-lg transition-all cursor-pointer whitespace-nowrap"
                      >
                        {text.change}
                      </button>
                      <button 
                        onClick={() => { setSlot1(null); setSearchOpen1(false); }}
                        className={`p-1 text-[9px] md:text-[10px] hover:text-rose-400 font-bold ${isDark ? 'text-slate-500' : 'text-slate-450'} transition-colors cursor-pointer`}
                      >
                        {text.deleteDescription}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => { setSearchOpen1(!searchOpen1); setSearchOpen2(false); }}
                    className={`w-full flex items-center justify-center gap-1.5 p-2.5 md:p-3.5 outline-none rounded-xl md:rounded-2xl transition-all duration-300 font-mono text-[10px] md:text-xs font-semibold cursor-pointer ${emptySelBtn}`}
                  >
                    <Search className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-500" />
                    {text.select}
                  </button>
                )}

                {/* SLOT 1 SEARCH DROPDOWN */}
                <AnimatePresence>
                  {searchOpen1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute left-2.5 right-2.5 md:left-4 md:right-4 top-[calc(100%+4px)] ${listDropdownBg} border rounded-xl md:rounded-2xl z-50 p-2 md:p-3 max-h-[250px] md:max-h-[300px] flex flex-col`}
                    >
                      <div className="relative mb-2 shrink-0">
                        <Search className="absolute left-2.5 top-2 w-3 h-3 text-slate-500" />
                        <input
                          type="text"
                          className={`w-full ${inputInsideBg} border rounded-lg py-1.5 pl-7 pr-3 text-[11px] outline-none placeholder-slate-500 focus:border-sky-500`}
                          placeholder={text.searchPlaceholder}
                          value={query1}
                          onChange={(e) => setQuery1(e.target.value)}
                        />
                        {query1 && (
                          <button onClick={() => setQuery1('')} className="absolute right-2.5 top-1.5 text-slate-400 hover:text-white text-[9px] font-bold">{text.clear}</button>
                        )}
                      </div>
                      <div className="overflow-y-auto flex-1 space-y-1 scrollbar-thin">
                        {filtered1.length > 0 ? (
                          filtered1.map(aircraft => (
                            <button
                              key={aircraft.id}
                              onClick={() => {
                                setSlot1(aircraft);
                                setSearchOpen1(false);
                                setQuery1('');
                              }}
                              className={`w-full text-left p-1.5 md:p-2 rounded-lg text-[11px] flex justify-between items-center transition-colors ${
                                slot1?.id === aircraft.id 
                                  ? 'bg-sky-500/10 text-sky-400 font-bold' 
                                  : isDark
                                    ? 'text-slate-300 hover:bg-slate-800'
                                    : 'text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <span className="truncate pr-2">{aircraft.name}</span>
                              <span className={`text-[8px] md:text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border shrink-0 ${
                                isDark
                                  ? 'bg-slate-950/40 border-white/5 text-slate-500'
                                  : 'bg-slate-100 border-slate-200 text-slate-500'
                              }`}>{aircraft.manufacturer}</span>
                            </button>
                          ))
                        ) : (
                          <div className="text-center py-4 text-[11px] text-slate-500 font-mono">{text.noResults}</div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SLOT 2 SELECTION */}
              <div className="p-2.5 md:p-4 relative">
                {slot2 ? (
                  <div className={`flex flex-col xl:flex-row xl:items-center justify-between gap-2 ${cardSlotBg} p-2 md:p-3 rounded-xl md:rounded-2xl`}>
                    <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                      <div className="shrink-0 scale-90 md:scale-105">
                        {getFlag(slot2.country)}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className={`text-[11px] md:text-sm font-bold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{slot2.name}</h4>
                        <p className={`text-[8px] md:text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-450'} font-mono truncate`}>{slot2.manufacturer} • {translateCategory(slot2.category, currentLang)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-1.5 self-end xl:self-auto shrink-0 mt-1 xl:mt-0">
                      <button 
                        onClick={() => { setSearchOpen2(!searchOpen2); setSearchOpen1(false); }}
                        className="p-1 px-2 bg-[#818cf8]/10 hover:bg-[#818cf8]/15 border border-[#818cf8]/30 text-[#818cf8] font-bold text-[9px] md:text-[10px] rounded-lg transition-all cursor-pointer whitespace-nowrap"
                      >
                        {text.change}
                      </button>
                      <button 
                        onClick={() => { setSlot2(null); setSearchOpen2(false); }}
                        className={`p-1 text-[9px] md:text-[10px] hover:text-rose-400 font-bold ${isDark ? 'text-slate-500' : 'text-slate-450'} transition-colors cursor-pointer`}
                      >
                        {text.deleteDescription}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => { setSearchOpen2(!searchOpen2); setSearchOpen1(false); }}
                    className={`w-full flex items-center justify-center gap-1.5 p-2.5 md:p-3.5 outline-none rounded-xl md:rounded-2xl transition-all duration-300 font-mono text-[10px] md:text-xs font-semibold cursor-pointer ${emptySelBtn}`}
                  >
                    <Search className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-500" />
                    {text.select}
                  </button>
                )}

                {/* SLOT 2 SEARCH DROPDOWN */}
                <AnimatePresence>
                  {searchOpen2 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute left-2.5 right-2.5 md:left-4 md:right-4 top-[calc(100%+4px)] ${listDropdownBg} border rounded-xl md:rounded-2xl z-50 p-2 md:p-3 max-h-[250px] md:max-h-[300px] flex flex-col`}
                    >
                      <div className="relative mb-2 shrink-0">
                        <Search className="absolute left-2.5 top-2 w-3 h-3 text-slate-500" />
                        <input
                          type="text"
                          className={`w-full ${inputInsideBg} border rounded-lg py-1.5 pl-7 pr-3 text-[11px] outline-none placeholder-slate-500 focus:border-[#818cf8]`}
                          placeholder={text.searchPlaceholder}
                          value={query2}
                          onChange={(e) => setQuery2(e.target.value)}
                        />
                        {query2 && (
                          <button onClick={() => setQuery2('')} className={`absolute right-2.5 top-1.5 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'} text-[9px] font-bold`}>{text.clear}</button>
                        )}
                      </div>
                      <div className="overflow-y-auto flex-1 space-y-1 scrollbar-thin">
                        {filtered2.length > 0 ? (
                          filtered2.map(aircraft => (
                            <button
                              key={aircraft.id}
                              onClick={() => {
                                setSlot2(aircraft);
                                setSearchOpen2(false);
                                setQuery2('');
                              }}
                              className={`w-full text-left p-1.5 md:p-2 rounded-lg text-[11px] flex justify-between items-center transition-colors ${
                                slot2?.id === aircraft.id 
                                  ? 'bg-[#818cf8]/10 text-[#818cf8] font-bold' 
                                  : isDark
                                    ? 'text-slate-300 hover:bg-slate-800'
                                    : 'text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <span className="truncate pr-2">{aircraft.name}</span>
                              <span className={`text-[8px] md:text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border shrink-0 ${
                                isDark
                                  ? 'bg-slate-950/40 border-white/5 text-slate-500'
                                  : 'bg-slate-100 border-slate-200 text-slate-500'
                              }`}>{aircraft.manufacturer}</span>
                            </button>
                          ))
                        ) : (
                          <div className="text-center py-4 text-[11px] text-slate-500 font-mono">{text.noResults}</div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              {/* AIRLINE SLOT 1 SELECTION */}
              <div className="p-2.5 md:p-4 relative">
                {airlineSlot1 ? (
                  <div className={`flex flex-col xl:flex-row xl:items-center justify-between gap-2 ${cardSlotBg} p-2 md:p-3 rounded-xl md:rounded-2xl`}>
                    <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                      <div className="shrink-0 scale-90 md:scale-105">
                        {airlineSlot1.id === 'lufthansa' ? (
                          <LufthansaLogo />
                        ) : airlineSlot1.id === 'delta-air-lines' ? (
                          <DeltaLogo />
                        ) : airlineSlot1.id === 'smartwings' ? (
                          <SmartwingsLogo />
                        ) : airlineSlot1.id === 'ryanair' ? (
                          <RyanairLogo />
                        ) : airlineSlot1.id === 'british-airways' ? (
                          <BritishAirwaysLogo />
                        ) : airlineSlot1.id === 'klm' ? (
                          <KLMLogo />
                        ) : airlineSlot1.id === 'qatar-airways' ? (
                          <QatarLogo />
                        ) : airlineSlot1.id === 'wizz-air' ? (
                          <WizzLogo />
                        ) : airlineSlot1.id === 'singapore-airlines' ? (
                          <SingaporeLogo />
                        ) : airlineSlot1.id === 'tap-portugal' ? (
                          <TapLogo />
                        ) : airlineSlot1.id === 'air-canada' ? (
                          <AirCanadaLogo />
                        ) : airlineSlot1.id === 'finnair' ? (
                          <FinnairLogo />
                        ) : airlineSlot1.id === 'united-airlines' ? (
                          <UnitedLogo />
                        ) : airlineSlot1.id === 'american-airlines' ? (
                          <AmericanLogo />
                        ) : airlineSlot1.id === 'turkish-airlines' ? (
                          <TurkishLogo />
                        ) : airlineSlot1.id === 'ana' ? (
                          <ANALogo />
                        ) : airlineSlot1.id === 'emirates' ? (
                          <EmiratesLogo />
                        ) : airlineSlot1.id === 'qantas' ? (
                          <QantasLogo />
                        ) : airlineSlot1.id === 'korean-air' ? (
                          <KoreanLogo />
                        ) : airlineSlot1.id === 'vueling' ? (
                          <VuelingLogo />
                        ) : airlineSlot1.id === 'cathay-pacific' ? (
                          <CathayLogo />
                        ) : airlineSlot1.id === 'air-france' ? (
                          <AirFranceLogo />
                        ) : airlineSlot1.id === 'iberia' ? (
                          <IberiaLogo />
                        ) : airlineSlot1.id === 'sas' ? (
                          <SASLogo />
                        ) : airlineSlot1.id === 'brussels-airlines' ? (
                          <BrusselsAirlinesLogo />
                        ) : airlineSlot1.id === 'lot-polish-airlines' ? (
                          <LOTLogo />
                        ) : airlineSlot1.id === 'austrian-airlines' ? (
                          <AustrianAirlinesLogo />
                        ) : airlineSlot1.id === 'swiss-international' ? (
                          <SwissLogo />
                        ) : airlineSlot1.id === 'etihad-airways' ? (
                          <EtihadLogo />
                        ) : airlineSlot1.id === 'japan-airlines' ? (
                          <JALLogo />
                        ) : airlineSlot1.id === 'united-airlines' || airlineSlot1.id === 'american-airlines' || airlineSlot1.country === 'USA' ? (
                          <USFlag />
                        ) : (
                          <EUFlag />
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className={`text-[11px] md:text-sm font-bold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{airlineSlot1.name}</h4>
                        <p className={`text-[8px] md:text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-450'} font-mono truncate`}>{airlineSlot1.alliance} • {translateCountry(airlineSlot1.country, currentLang)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-1.5 self-end xl:self-auto shrink-0 mt-1 xl:mt-0">
                      <button 
                        onClick={() => { setAirlineSearchOpen1(!airlineSearchOpen1); setAirlineSearchOpen2(false); }}
                        className="p-1 px-2 bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/30 text-indigo-450 font-bold text-[9px] md:text-[10px] rounded-lg transition-all cursor-pointer whitespace-nowrap"
                      >
                        {text.change}
                      </button>
                      <button 
                        onClick={() => { setAirlineSlot1(null); setAirlineSearchOpen1(false); }}
                        className={`p-1 text-[9px] md:text-[10px] hover:text-rose-400 font-bold ${isDark ? 'text-slate-500' : 'text-slate-450'} transition-colors cursor-pointer`}
                      >
                        {text.deleteDescription}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => { setAirlineSearchOpen1(!airlineSearchOpen1); setAirlineSearchOpen2(false); }}
                    className={`w-full flex items-center justify-center gap-1.5 p-2.5 md:p-3.5 outline-none rounded-xl md:rounded-2xl transition-all duration-300 font-mono text-[10px] md:text-xs font-semibold cursor-pointer ${emptySelBtn}`}
                  >
                    <Search className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-500" />
                    {currentLang === 'CZ' ? 'Výběr společnosti' : 'Select airline'}
                  </button>
                )}

                {/* AIRLINE SLOT 1 SEARCH DROPDOWN */}
                <AnimatePresence>
                  {airlineSearchOpen1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute left-2.5 right-2.5 md:left-4 md:right-4 top-[calc(100%+4px)] ${listDropdownBg} border rounded-xl md:rounded-2xl z-50 p-2 md:p-3 max-h-[250px] md:max-h-[300px] flex flex-col`}
                    >
                      <div className="relative mb-2 shrink-0">
                        <Search className="absolute left-2.5 top-2 w-3 h-3 text-slate-500" />
                        <input
                          type="text"
                          className={`w-full ${inputInsideBg} border rounded-lg py-1.5 pl-7 pr-3 text-[11px] outline-none placeholder-slate-500 focus:border-indigo-500`}
                          placeholder={text.searchPlaceholder}
                          value={airlineQuery1}
                          onChange={(e) => setAirlineQuery1(e.target.value)}
                        />
                        {airlineQuery1 && (
                          <button onClick={() => setAirlineQuery1('')} className="absolute right-2.5 top-1.5 text-slate-400 hover:text-white text-[9px] font-bold">{text.clear}</button>
                        )}
                      </div>
                      <div className="overflow-y-auto flex-1 space-y-1 scrollbar-thin">
                        {filteredAirlines1.length > 0 ? (
                          filteredAirlines1.map(airline => (
                            <button
                              key={airline.id}
                              onClick={() => {
                                setAirlineSlot1(airline);
                                setAirlineSearchOpen1(false);
                                setAirlineQuery1('');
                              }}
                              className={`w-full text-left p-1.5 md:p-2 rounded-lg text-[11px] flex justify-between items-center transition-colors ${
                                airlineSlot1?.id === airline.id 
                                  ? 'bg-indigo-500/10 text-indigo-400 font-bold' 
                                  : isDark
                                    ? 'text-slate-300 hover:bg-slate-800'
                                    : 'text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <span className="truncate pr-2">{airline.name}</span>
                              <span className={`text-[8px] md:text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border shrink-0 ${
                                isDark
                                  ? 'bg-slate-950/40 border-white/5 text-slate-500'
                                  : 'bg-slate-100 border-slate-200 text-slate-500'
                              }`}>{airline.alliance}</span>
                            </button>
                          ))
                        ) : (
                          <div className="text-center py-4 text-[11px] text-slate-500 font-mono">{text.noResults}</div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* AIRLINE SLOT 2 SELECTION */}
              <div className="p-2.5 md:p-4 relative">
                {airlineSlot2 ? (
                  <div className={`flex flex-col xl:flex-row xl:items-center justify-between gap-2 ${cardSlotBg} p-2 md:p-3 rounded-xl md:rounded-2xl`}>
                    <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                      <div className="shrink-0 scale-90 md:scale-105">
                        {airlineSlot2.id === 'lufthansa' ? (
                          <LufthansaLogo />
                        ) : airlineSlot2.id === 'delta-air-lines' ? (
                          <DeltaLogo />
                        ) : airlineSlot2.id === 'smartwings' ? (
                          <SmartwingsLogo />
                        ) : airlineSlot2.id === 'ryanair' ? (
                          <RyanairLogo />
                        ) : airlineSlot2.id === 'british-airways' ? (
                          <BritishAirwaysLogo />
                        ) : airlineSlot2.id === 'klm' ? (
                          <KLMLogo />
                        ) : airlineSlot2.id === 'qatar-airways' ? (
                          <QatarLogo />
                        ) : airlineSlot2.id === 'wizz-air' ? (
                          <WizzLogo />
                        ) : airlineSlot2.id === 'singapore-airlines' ? (
                          <SingaporeLogo />
                        ) : airlineSlot2.id === 'tap-portugal' ? (
                          <TapLogo />
                        ) : airlineSlot2.id === 'air-canada' ? (
                          <AirCanadaLogo />
                        ) : airlineSlot2.id === 'finnair' ? (
                          <FinnairLogo />
                        ) : airlineSlot2.id === 'united-airlines' ? (
                          <UnitedLogo />
                        ) : airlineSlot2.id === 'american-airlines' ? (
                          <AmericanLogo />
                        ) : airlineSlot2.id === 'turkish-airlines' ? (
                          <TurkishLogo />
                        ) : airlineSlot2.id === 'ana' ? (
                          <ANALogo />
                        ) : airlineSlot2.id === 'emirates' ? (
                          <EmiratesLogo />
                        ) : airlineSlot2.id === 'qantas' ? (
                          <QantasLogo />
                        ) : airlineSlot2.id === 'korean-air' ? (
                          <KoreanLogo />
                        ) : airlineSlot2.id === 'vueling' ? (
                          <VuelingLogo />
                        ) : airlineSlot2.id === 'cathay-pacific' ? (
                          <CathayLogo />
                        ) : airlineSlot2.id === 'air-france' ? (
                          <AirFranceLogo />
                        ) : airlineSlot2.id === 'iberia' ? (
                          <IberiaLogo />
                        ) : airlineSlot2.id === 'sas' ? (
                          <SASLogo />
                        ) : airlineSlot2.id === 'brussels-airlines' ? (
                          <BrusselsAirlinesLogo />
                        ) : airlineSlot2.id === 'lot-polish-airlines' ? (
                          <LOTLogo />
                        ) : airlineSlot2.id === 'austrian-airlines' ? (
                          <AustrianAirlinesLogo />
                        ) : airlineSlot2.id === 'swiss-international' ? (
                          <SwissLogo />
                        ) : airlineSlot2.id === 'etihad-airways' ? (
                          <EtihadLogo />
                        ) : airlineSlot2.id === 'japan-airlines' ? (
                          <JALLogo />
                        ) : airlineSlot2.id === 'united-airlines' || airlineSlot2.id === 'american-airlines' || airlineSlot2.country === 'USA' ? (
                          <USFlag />
                        ) : (
                          <EUFlag />
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className={`text-[11px] md:text-sm font-bold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{airlineSlot2.name}</h4>
                        <p className={`text-[8px] md:text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-450'} font-mono truncate`}>{airlineSlot2.alliance} • {translateCountry(airlineSlot2.country, currentLang)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-1.5 self-end xl:self-auto shrink-0 mt-1 xl:mt-0">
                      <button 
                        onClick={() => { setAirlineSearchOpen2(!airlineSearchOpen2); setAirlineSearchOpen1(false); }}
                        className="p-1 px-2 bg-[#818cf8]/10 hover:bg-[#818cf8]/15 border border-[#818cf8]/30 text-[#818cf8] font-bold text-[9px] md:text-[10px] rounded-lg transition-all cursor-pointer whitespace-nowrap"
                      >
                        {text.change}
                      </button>
                      <button 
                        onClick={() => { setAirlineSlot2(null); setAirlineSearchOpen2(false); }}
                        className={`p-1 text-[9px] md:text-[10px] hover:text-rose-400 font-bold ${isDark ? 'text-slate-500' : 'text-slate-450'} transition-colors cursor-pointer`}
                      >
                        {text.deleteDescription}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => { setAirlineSearchOpen2(!airlineSearchOpen2); setAirlineSearchOpen1(false); }}
                    className={`w-full flex items-center justify-center gap-1.5 p-2.5 md:p-3.5 outline-none rounded-xl md:rounded-2xl transition-all duration-300 font-mono text-[10px] md:text-xs font-semibold cursor-pointer ${emptySelBtn}`}
                  >
                    <Search className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-500" />
                    {currentLang === 'CZ' ? 'Výběr společnosti' : 'Select airline'}
                  </button>
                )}

                {/* AIRLINE SLOT 2 SEARCH DROPDOWN */}
                <AnimatePresence>
                  {airlineSearchOpen2 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute left-2.5 right-2.5 md:left-4 md:right-4 top-[calc(100%+4px)] ${listDropdownBg} border rounded-xl md:rounded-2xl z-50 p-2 md:p-3 max-h-[250px] md:max-h-[300px] flex flex-col`}
                    >
                      <div className="relative mb-2 shrink-0">
                        <Search className="absolute left-2.5 top-2 w-3 h-3 text-slate-500" />
                        <input
                          type="text"
                          className={`w-full ${inputInsideBg} border rounded-lg py-1.5 pl-7 pr-3 text-[11px] outline-none placeholder-slate-500 focus:border-[#818cf8]`}
                          placeholder={text.searchPlaceholder}
                          value={airlineQuery2}
                          onChange={(e) => setAirlineQuery2(e.target.value)}
                        />
                        {airlineQuery2 && (
                          <button onClick={() => setAirlineQuery2('')} className={`absolute right-2.5 top-1.5 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'} text-[9px] font-bold`}>{text.clear}</button>
                        )}
                      </div>
                      <div className="overflow-y-auto flex-1 space-y-1 scrollbar-thin">
                        {filteredAirlines2.length > 0 ? (
                          filteredAirlines2.map(airline => (
                            <button
                              key={airline.id}
                              onClick={() => {
                                setAirlineSlot2(airline);
                                setAirlineSearchOpen2(false);
                                setAirlineQuery2('');
                              }}
                              className={`w-full text-left p-1.5 md:p-2 rounded-lg text-[11px] flex justify-between items-center transition-colors ${
                                airlineSlot2?.id === airline.id 
                                  ? 'bg-[#818cf8]/10 text-[#818cf8] font-bold' 
                                  : isDark
                                    ? 'text-slate-300 hover:bg-slate-800'
                                    : 'text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <span className="truncate pr-2">{airline.name}</span>
                              <span className={`text-[8px] md:text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border shrink-0 ${
                                isDark
                                  ? 'bg-slate-950/40 border-white/5 text-slate-500'
                                  : 'bg-slate-100 border-slate-200 text-slate-500'
                              }`}>{airline.alliance}</span>
                            </button>
                          ))
                        ) : (
                          <div className="text-center py-4 text-[11px] text-slate-500 font-mono">{text.noResults}</div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>

        {/* TABULAR COMPARISONS AND VISUAL COMPARISONS - Dynamic heights */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth p-3.5 md:p-6 space-y-4 max-h-[calc(92vh-190px)]">
          
          {compareMode === 'aircraft' ? (
            (!slot1 && !slot2) ? (
              <div className="py-16 md:py-24 text-center">
                <ArrowLeftRight className={`w-10 h-10 md:w-12 md:h-12 stroke-[1.5] mx-auto opacity-50 mb-3 animate-bounce ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                <h3 className={`text-xs md:text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{text.chooseTwoTitle}</h3>
                <p className={`text-[10px] md:text-xs mt-1 max-w-sm mx-auto font-medium leading-relaxed px-4 text-center ${isDark ? 'text-slate-500' : 'text-slate-450'}`}>
                  {text.chooseTwoDesc}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* OVERLAPPING PHYSICAL SILHOUETTES VIEW */}
                {slot1 && slot2 && (
                  <AircraftCompositeOverlay 
                    aircraft1={slot1} 
                    aircraft2={slot2} 
                    lang={currentLang} 
                    theme={isDark ? 'dark' : 'light'} 
                  />
                )}

                {/* COMPARISON RESULTS ROWS */}
                <div className={`${isDark ? 'bg-slate-950/30 border-white/5' : 'bg-slate-50 border-slate-200/85 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]'} border rounded-xl md:rounded-2xl overflow-hidden divide-y ${isDark ? 'divide-white/5' : 'divide-slate-200/60'}`}>
                  
                  {renderSpecRow(
                    currentLang === 'CZ' ? 'Kapacita cestujících (Max)' : 'Passenger capacity (Max)',
                    <Users className="w-3.5 h-3.5" />,
                    a => a.specs.capacityMax,
                    a => a.specs.capacityMax,
                    currentLang === 'CZ' ? 'pasažérů' : 'passengers'
                  )}

                  {renderSpecRow(
                    currentLang === 'CZ' ? 'Typická kapacita' : 'Typical seating',
                    <Users className="w-3.5 h-3.5" />,
                    a => translateTypicalCapacity(a.specs.capacityTypical, currentLang),
                    a => translateTypicalCapacity(a.specs.capacityTypical, currentLang),
                    '',
                    false
                  )}

                  {renderSpecRow(
                    currentLang === 'CZ' ? 'Dolet (Maximální dolet)' : 'Range (Maximum range)',
                    <Milestone className="w-3.5 h-3.5" />,
                    a => a.specs.rangeKm,
                    a => a.specs.rangeKm,
                    'km'
                  )}

                  {renderSpecRow(
                    currentLang === 'CZ' ? 'Cestovní Rychlost' : 'Cruising Speed',
                    <Gauge className="w-3.5 h-3.5" />,
                    a => a.specs.cruiseSpeedKmh,
                    a => a.specs.cruiseSpeedKmh,
                    'km/h'
                  )}

                  {renderSpecRow(
                    currentLang === 'CZ' ? 'Cestovní Rychlost (Mach)' : 'Cruising Speed (Mach)',
                    <Gauge className="w-3.5 h-3.5" />,
                    a => a.specs.cruiseMach,
                    a => a.specs.cruiseMach,
                    'M'
                  )}

                  {renderSpecRow(
                    currentLang === 'CZ' ? 'Rozpětí Křídel' : 'Wingspan',
                    <Ruler className="w-3.5 h-3.5" />,
                    a => a.specs.wingspanM,
                    a => a.specs.wingspanM,
                    'm'
                  )}

                  {renderSpecRow(
                    currentLang === 'CZ' ? 'Délka Letadla' : 'Aircraft Length',
                    <Ruler className="w-3.5 h-3.5" />,
                    a => a.specs.lengthM,
                    a => a.specs.lengthM,
                    'm'
                  )}

                  {renderSpecRow(
                    currentLang === 'CZ' ? 'Výška Letadla' : 'Aircraft Height',
                    <Ruler className="w-3.5 h-3.5" />,
                    a => a.specs.heightM,
                    a => a.specs.heightM,
                    'm'
                  )}

                  {renderSpecRow(
                    currentLang === 'CZ' ? 'Šířka trupu' : 'Fuselage width',
                    <Ruler className="w-3.5 h-3.5" />,
                    a => a.specs.fuselageWidthM,
                    a => a.specs.fuselageWidthM,
                    'm'
                  )}

                  {renderSpecRow(
                    currentLang === 'CZ' ? 'Plocha křídel' : 'Wing area',
                    <Ruler className="w-3.5 h-3.5" />,
                    a => a.specs.wingAreaM2,
                    a => a.specs.wingAreaM2,
                    'm²'
                  )}

                  {renderSpecRow(
                    currentLang === 'CZ' ? 'Max. Vzletová Hmotnost (MTOW)' : 'Max Takeoff Weight (MTOW)',
                    <Scale className="w-3.5 h-3.5" />,
                    a => a.specs.mtowTonnes,
                    a => a.specs.mtowTonnes,
                    currentLang === 'CZ' ? 'tun' : 'tonnes'
                  )}

                  {renderSpecRow(
                    currentLang === 'CZ' ? 'Počet motorů' : 'Engine count',
                    <Wrench className="w-3.5 h-3.5" />,
                    a => a.specs.engineCount,
                    a => a.specs.engineCount,
                    ''
                  )}

                  {renderSpecRow(
                    currentLang === 'CZ' ? 'Model motoru' : 'Engine model',
                    <Wrench className="w-3.5 h-3.5" />,
                    a => a.specs.engineType,
                    a => a.specs.engineType,
                    '',
                    false
                  )}

                  {renderSpecRow(
                    currentLang === 'CZ' ? 'První Let' : 'First Flight',
                    <Calendar className="w-3.5 h-3.5" />,
                    a => a.specs.firstFlightYear,
                    a => a.specs.firstFlightYear,
                    currentLang === 'CZ' ? 'rok' : 'year'
                  )}

                </div>

                {/* DYNAMIC FUN FACT SECTION */}
                {slot1 && slot2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className={`${isDark ? 'bg-sky-500/5 border-sky-500/10' : 'bg-sky-50 border-sky-200/70 shadow-xs'} p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-300`}>
                      <h5 className={`text-[9px] md:text-[10px] font-bold font-mono tracking-wide uppercase mb-1 flex items-center gap-1.5 ${isDark ? 'text-sky-400' : 'text-sky-700 font-extrabold'}`}>
                        <Info className="w-3.5 h-3.5" /> {text.uniquenessLabel}: {slot1.name}
                      </h5>
                      <p className={`text-[11px] md:text-xs leading-relaxed font-sans ${isDark ? 'text-slate-300' : 'text-slate-800 font-medium'}`}>{translateText(slot1.uniqueness, currentLang, true)}</p>
                    </div>
                    <div className={`${isDark ? 'bg-[#818cf8]/5 border-[#818cf8]/10' : 'bg-indigo-50 border-indigo-200/70 shadow-xs'} p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-300`}>
                      <h5 className={`text-[9px] md:text-[10px] font-bold font-mono tracking-wide uppercase mb-1 flex items-center gap-1.5 ${isDark ? 'text-[#818cf8]' : 'text-indigo-700 font-extrabold'}`}>
                        <Info className="w-3.5 h-3.5" /> {text.uniquenessLabel}: {slot2.name}
                      </h5>
                      <p className={`text-[11px] md:text-xs leading-relaxed font-sans ${isDark ? 'text-slate-300' : 'text-slate-800 font-medium'}`}>{translateText(slot2.uniqueness, currentLang, true)}</p>
                    </div>
                  </div>
                )}

              </div>
            )
          ) : (
            (!airlineSlot1 && !airlineSlot2) ? (
              <div className="py-16 md:py-24 text-center">
                <ArrowLeftRight className={`w-10 h-10 md:w-12 md:h-12 stroke-[1.5] mx-auto opacity-50 mb-3 animate-bounce ${isDark ? 'text-[#818cf8]' : 'text-indigo-400'}`} />
                <h3 className={`text-xs md:text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {currentLang === 'CZ' ? 'Zvolte dvě letecké společnosti k porovnání' : 'Select two airlines to compare'}
                </h3>
                <p className={`text-[10px] md:text-xs mt-1 max-w-sm mx-auto font-medium leading-relaxed px-4 text-center ${isDark ? 'text-slate-500' : 'text-slate-450'}`}>
                  {currentLang === 'CZ' 
                    ? 'Po vybrání obou společností získáte okamžité porovnání velikosti jejich letek, průměrného doletu, založení, domovských letišť a aliančních uskupení.' 
                    : 'Once both airlines are selected, you will get an instant comparison of their fleet size, average range, establishment year, hubs, and alliances.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`${isDark ? 'bg-slate-950/30 border-white/5' : 'bg-slate-50 border-slate-200/85 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]'} border rounded-xl md:rounded-2xl overflow-hidden divide-y ${isDark ? 'divide-white/5' : 'divide-slate-200/60'}`}>
                  {renderAirlineSpecRow(
                    currentLang === 'CZ' ? 'Rok Založení' : 'Founded Year',
                    <Calendar className="w-3.5 h-3.5" />,
                    a => a.foundedYear,
                    a => a.foundedYear,
                    currentLang === 'CZ' ? 'rok' : 'year',
                    true,
                    true // isLowerBetter
                  )}

                  {renderAirlineSpecRow(
                    currentLang === 'CZ' ? 'Celková velikost letky' : 'Total Fleet Size',
                    <Plane className="w-3.5 h-3.5" />,
                    a => a.fleet.reduce((acc, curr) => acc + curr.quantity, 0),
                    a => a.fleet.reduce((acc, curr) => acc + curr.quantity, 0),
                    currentLang === 'CZ' ? 'letadel' : 'aircraft',
                    true
                  )}

                  {renderAirlineSpecRow(
                    currentLang === 'CZ' ? 'Počet aktivních typů letadel' : 'Unique aircraft types',
                    <Layers className="w-3.5 h-3.5" />,
                    a => a.fleet.filter(x => x.quantity > 0).length,
                    a => a.fleet.filter(x => x.quantity > 0).length,
                    currentLang === 'CZ' ? 'typů' : 'types',
                    true
                  )}

                  {renderAirlineSpecRow(
                    currentLang === 'CZ' ? 'Průměrná kapacita letky' : 'Average Fleet Capacity',
                    <Users className="w-3.5 h-3.5" />,
                    a => getAirlineAvgCapacity(a),
                    a => getAirlineAvgCapacity(a),
                    currentLang === 'CZ' ? 'pasažérů' : 'passengers',
                    true
                  )}

                  {renderAirlineSpecRow(
                    currentLang === 'CZ' ? 'Průměrný dolet letky' : 'Average Fleet Range',
                    <Milestone className="w-3.5 h-3.5" />,
                    a => getAirlineAvgRange(a),
                    a => getAirlineAvgRange(a),
                    'km',
                    true
                )}

                  {renderAirlineSpecRow(
                    currentLang === 'CZ' ? 'Aliance' : 'Alliance',
                    <Globe className="w-3.5 h-3.5" />,
                    a => a.alliance,
                    a => a.alliance,
                    '',
                    false
                  )}

                   {renderAirlineSpecRow(
                    currentLang === 'CZ' ? 'Hlavní Hub' : 'Primary Hub',
                    <Compass className="w-3.5 h-3.5" />,
                    a => a.hub.replace('Mnichov', currentLang === 'CZ' ? 'Mnichov' : 'Munich').replace('Praha', currentLang === 'CZ' ? 'Praha' : 'Prague'),
                    a => a.hub.replace('Mnichov', currentLang === 'CZ' ? 'Mnichov' : 'Munich').replace('Praha', currentLang === 'CZ' ? 'Praha' : 'Prague'),
                    '',
                    false
                  )}

                  {renderAirlineSpecRow(
                    currentLang === 'CZ' ? 'Země původu' : 'Country of Origin',
                    <Globe className="w-3.5 h-3.5" />,
                    a => translateCountry(a.country, currentLang),
                    a => translateCountry(a.country, currentLang),
                    '',
                    false
                  )}
                </div>
              </div>
            )
          )}

        </div>

        {/* COMPARISON BAR FOOTER */}
        <div className={`p-3.5 md:p-4 border-t ${isDark ? 'border-white/5 bg-slate-950/40 text-slate-500' : 'border-slate-200 bg-slate-50 text-slate-500'} text-center font-mono text-[8px] md:text-[9px] flex flex-col md:flex-row justify-between items-center gap-2 shrink-0`}>
          <span>{text.footerAssistant}</span>
          <span className={isDark ? 'text-slate-650' : 'text-slate-450'}>{text.footerDisclaimer}</span>
        </div>

      </div>
    </div>
  );
}
