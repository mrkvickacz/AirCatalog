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
  RotateCw
} from 'lucide-react';
import { Aircraft } from '../types';
import { AIRCRAFT_DATA } from '../data';
import { EUFlag, USFlag, CanadaFlag, EUCanadaFlag, BrazilFlag } from './Flags';
import { translateCategory, translateTypicalCapacity, translateCountry, translateText } from '../translations';
import { AircraftCompositeOverlay } from './AircraftVisualProfile';

interface AircraftComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  initialAircraft?: Aircraft | null;
  lang?: 'CZ' | 'EN';
  theme?: 'light' | 'dark';
}

export default function AircraftComparison({ isOpen, onClose, initialAircraft, lang: inputLang, theme = 'dark' }: AircraftComparisonProps) {
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

  const [slot1, setSlot1] = useState<Aircraft | null>(null);
  const [slot2, setSlot2] = useState<Aircraft | null>(null);

  const [searchOpen1, setSearchOpen1] = useState(false);
  const [searchOpen2, setSearchOpen2] = useState(false);

  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');

  // Set initial aircraft in slot 1 if provided
  useEffect(() => {
    if (initialAircraft && isOpen) {
      setSlot1(initialAircraft);
    }
  }, [initialAircraft, isOpen]);

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
    footerDisclaimer: currentLang === 'CZ' ? 'Udávané parametry jsou chráněny licencí či technickými listy výrobců.' : 'Specified parameters are protected by copyright or manufacturer datasheets.',
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

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${isDark ? 'bg-slate-950/95' : 'bg-slate-900/40'} backdrop-blur-md flex flex-col justify-start md:justify-center items-center p-3 md:p-6 select-none font-sans`}>
      
      <div className={`w-full max-w-6xl ${modalBg} border shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden flex flex-col my-auto relative z-10 shrink-0 max-h-[92vh] md:max-h-[90vh]`}>
        
        {/* MODAL HEADER */}
        <div className={`p-3.5 md:p-5 border-b ${isDark ? 'border-white/5 bg-slate-950/40' : 'border-slate-200/80 bg-slate-50'} flex items-center justify-between shrink-0`}>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-2 bg-gradient-to-tr from-sky-400 to-indigo-500 text-white rounded-xl shadow-lg">
              <ArrowLeftRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>
            <div>
              <h2 className={`text-sm md:text-base font-extrabold ${titleText} tracking-tight flex items-center gap-1.5`}>
                {text.title} <span className="text-[9px] bg-sky-500/15 border border-sky-500/20 text-sky-450 uppercase px-1.5 py-0.5 rounded-full font-mono font-bold">Beta</span>
              </h2>
              <p className={`text-[9px] md:text-[10px] ${subtitleText} font-mono`}>{text.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className={`p-1.5 md:p-2 ${closeBtnBg} rounded-xl transition-all cursor-pointer`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SEARCH AND SELECTION BOXES */}
        <div className={`grid grid-cols-2 ${searchBoxBg} shrink-0`}>
          
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

        </div>

        {/* TABULAR COMPARISONS AND VISUAL COMPARISONS - Dynamic heights */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth p-3.5 md:p-6 space-y-4 max-h-[calc(92vh-190px)]">
          
          {(!slot1 && !slot2) ? (
            <div className="py-16 md:py-24 text-center">
              <ArrowLeftRight className={`w-10 h-10 md:w-12 md:h-12 stroke-[1.5] mx-auto opacity-50 mb-3 animate-bounce ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
              <h3 className={`text-xs md:text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{text.chooseTwoTitle}</h3>
              <p className={`text-[10px] md:text-xs mt-1 max-w-sm mx-auto font-medium leading-relaxed px-4 text-center ${isDark ? 'text-slate-500' : 'text-slate-450'}`}>
                {text.chooseTwoDesc}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              
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

              {/* OVERLAPPING PHYSICAL SILHOUETTES VIEW */}
              {slot1 && slot2 && (
                <AircraftCompositeOverlay 
                  aircraft1={slot1} 
                  aircraft2={slot2} 
                  lang={currentLang} 
                  theme={isDark ? 'dark' : 'light'} 
                />
              )}

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
