import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, 
  Search, 
  Users, 
  Gauge, 
  Milestone, 
  Ruler, 
  Scale, 
  Wrench, 
  Calendar, 
  Sparkles, 
  Globe, 
  Compass, 
  Info, 
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Layers,
  ArrowLeftRight,
  Eye,
  Sun,
  Moon
} from 'lucide-react';
import { AIRCRAFT_DATA } from './data';
import { Aircraft, AircraftCategory } from './types';
import { EUFlag, USFlag, EUCanadaFlag, CZFlag, UKFlag, BrazilFlag, CanadaFlag } from './components/Flags';
import AircraftComparison from './components/AircraftComparison';
import AircraftVisualProfile from './components/AircraftVisualProfile';
import { 
  TRANSLATIONS, 
  translateCategory, 
  translateTypicalCapacity, 
  translateCountry, 
  translateText 
} from './translations';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('theme_preset');
      return (saved === 'light' || saved === 'dark') ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    try {
      localStorage.setItem('theme_preset', newTheme);
    } catch (_) {}
  };

  const isDark = theme === 'dark';

  // Design tokens for dynamic theme swapping
  const bgMainClass = isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]';
  const textMainClass = isDark ? 'text-slate-100' : 'text-slate-800';
  const textMutedClass = isDark ? 'text-slate-450' : 'text-slate-550';
  const textSubtleClass = isDark ? 'text-slate-500' : 'text-slate-450';
  const borderMutedClass = isDark ? 'border-slate-850/40' : 'border-slate-200';
  const borderSubtleClass = isDark ? 'border-white/5' : 'border-slate-200/60';
  const bgSubtleClass = isDark ? 'bg-slate-950/20' : 'bg-slate-100/60';
  const bgCardClass = isDark ? 'bg-slate-900/40' : 'bg-white shadow-sm shadow-slate-200/60';

  const [lang, setLang] = useState<'CZ' | 'EN'>(() => {
    try {
      const saved = localStorage.getItem('language_preset');
      return (saved === 'CZ' || saved === 'EN' || saved === 'UK') ? (saved === 'UK' ? 'EN' : saved as 'CZ' | 'EN') : 'CZ';
    } catch {
      return 'CZ';
    }
  });

  const handleLanguageChange = (newLang: 'CZ' | 'EN') => {
    setLang(newLang);
    try {
      localStorage.setItem('language_preset', newLang);
    } catch (_) {}
  };

  const t = TRANSLATIONS[lang];

  const getVariantText = (count: number) => {
    if (lang === 'CZ') {
      return count === 1 ? 'verze' : count >= 2 && count <= 4 ? 'verze' : 'verzí';
    } else {
      return count === 1 ? 'variant' : 'variants';
    }
  };

  const getModelText = (count: number) => {
    if (lang === 'CZ') {
      return count === 1 ? 'model' : count >= 2 && count <= 4 ? 'modely' : 'modelů';
    } else {
      return count === 1 ? 'model' : 'models';
    }
  };

  const [selectedId, setSelectedId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('selected_aircraft_id');
      const exists = AIRCRAFT_DATA.some(a => a.id === saved);
      return exists && saved ? saved : AIRCRAFT_DATA[0].id;
    } catch {
      return AIRCRAFT_DATA[0].id;
    }
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Vše');
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');
  const [compareOpen, setCompareOpen] = useState<boolean>(false);

  const [seenIds, setSeenIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('seen_aircraft_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('seen_aircraft_ids', JSON.stringify(seenIds));
  }, [seenIds]);

  const toggleSeen = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSeenIds(prev => 
      prev.includes(id) 
        ? prev.filter(x => x !== id) 
        : [...prev, id]
    );
  };

  const AircraftListItem = ({ aircraft, isSelected }: { aircraft: Aircraft; isSelected: boolean; key?: string }) => {
    const isBoeing = aircraft.manufacturer.toLowerCase() === 'boeing';
    const isEmbraer = aircraft.manufacturer.toLowerCase() === 'embraer';
    const isCessna = aircraft.manufacturer.toLowerCase() === 'cessna';
    const isBombardier = aircraft.manufacturer.toLowerCase() === 'bombardier';
    const isSeen = seenIds.includes(aircraft.id);

    // Get flag and country text
    const normCountry = aircraft.country.toLowerCase();
    let flagComponent = <EUFlag />;
    let countryLabel = aircraft.country;
    if (isBombardier || normCountry === 'kanada' || normCountry === 'canada') {
      flagComponent = <CanadaFlag />;
      countryLabel = lang === 'CZ' ? 'Kanada' : 'Canada';
    } else if (isCessna || isBoeing) {
      flagComponent = <USFlag />;
      countryLabel = 'USA';
    } else if (isEmbraer || normCountry === 'brazílie' || normCountry === 'brazil') {
      flagComponent = <BrazilFlag />;
      countryLabel = lang === 'CZ' ? 'Brazílie' : 'Brazil';
    } else if (normCountry.includes('kanada')) {
      flagComponent = <EUCanadaFlag />;
      countryLabel = lang === 'CZ' ? 'EU / Kanada' : 'EU / Canada';
    } else if (normCountry.includes('usa') || normCountry.includes('spojené státy')) {
      flagComponent = <USFlag />;
      countryLabel = 'USA';
    } else {
      flagComponent = <EUFlag />;
      countryLabel = lang === 'CZ' ? 'Evropská unie' : 'European Union';
    }

    return (
      <motion.div
        id={`btn-aircraft-${aircraft.id}`}
        role="button"
        tabIndex={0}
        onClick={() => handleSelect(aircraft.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSelect(aircraft.id);
          }
        }}
        className={`w-full text-left p-3 rounded-2xl transition-all duration-300 relative group cursor-pointer border select-none outline-none ${
          isSelected
            ? isBoeing 
              ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-indigo-500/50 shadow-md'
              : isEmbraer
                ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-emerald-500/50 shadow-md'
                : isCessna
                  ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-amber-500/50 shadow-md'
                  : 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-sky-500/50 shadow-md'
            : isDark
              ? 'bg-slate-900/15 border-white/5 hover:bg-slate-800/30 hover:border-slate-800 text-slate-300'
              : 'bg-slate-900 border-slate-950 text-slate-100 hover:bg-slate-950 shadow-sm'
        }`}
        layoutId={`button-bg-${aircraft.id}`}
      >
        {isSelected && (
          <motion.div 
            className={`absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-gradient-to-b rounded-r-full ${
              isBoeing ? 'from-[#818cf8] to-[#6366f1]' : isEmbraer ? 'from-[#10b981] to-[#059669]' : isCessna ? 'from-[#f59e0b] to-[#d97706]' : 'from-[#38bdf8] to-[#818cf8]0'
            }`}
            layoutId={isBoeing ? "active-indicator-boeing-helper" : isEmbraer ? "active-indicator-embraer-helper" : isCessna ? "active-indicator-cessna-helper" : "active-indicator-airbus-helper"}
          />
        )}

        <div className="flex justify-between items-start w-full gap-2">
          <div className="flex gap-2.5 items-start">
            {/* Dot Indicator */}
            <div className="mt-1 shrink-0">
              <span className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isSelected 
                  ? isBoeing 
                    ? 'bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.8)]' 
                    : isEmbraer
                      ? 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]'
                      : isCessna
                        ? 'bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]'
                        : 'bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.8)]' 
                  : 'bg-slate-800'
              }`} />
            </div>

            <div>
              {/* Flag + Country Label */}
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="w-3.5 h-2.5 flex items-center shrink-0 overflow-hidden rounded-[1px] opacity-80 shadow-sm">
                  {flagComponent}
                </div>
                <span className={`text-[10px] md:text-[9px] font-mono ${isSelected ? 'text-slate-300' : isDark ? 'text-slate-500' : 'text-slate-450'}`}>
                  {countryLabel}
                </span>
                {isSeen && (
                  <span className="flex items-center gap-0.5 text-[10px] md:text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1 rounded ml-1">
                    👁️ {lang === 'CZ' ? 'VIDĚNO' : 'SPOTTED'}
                  </span>
                )}
              </div>

              {/* Aircraft Name */}
              <h4 className={`font-bold text-sm md:text-[13px] leading-tight tracking-tight ${
                isSelected ? 'text-white' : isDark ? 'text-slate-200': 'text-white'
              }`}>
                {aircraft.name}
              </h4>

              {/* Subspecs */}
              <p className={`text-[11px] md:text-[10px] mt-0.5 font-mono ${
                isSelected ? 'text-slate-300' : isDark ? 'text-slate-400 font-light' : 'text-slate-350 font-light'
              }`}>
                {lang === 'CZ' 
                  ? `${aircraft.specs.engineCount}x motor • ${aircraft.specs.rangeKm.toLocaleString('cs-CZ')} km dolet`
                  : `${aircraft.specs.engineCount}x ${aircraft.specs.engineCount > 1 ? 'engines' : 'engine'} • ${aircraft.specs.rangeKm.toLocaleString('en-GB')} km range`
                }
              </p>
            </div>
          </div>

          {/* Action side (Seen eye + Chevron toggle) */}
          <div className="flex items-center gap-1 mt-0.5 self-center shrink-0">
            {/* Eye toggle button */}
            <button
              id={`eye-toggle-${aircraft.id}`}
              onClick={(e) => toggleSeen(aircraft.id, e)}
              className={`p-1 rounded-xl border transition-all duration-200 cursor-pointer ${
                isSeen
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-440 hover:bg-emerald-500/30'
                  : 'bg-slate-950/20 border-white/5 text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
              }`}
              title={
                lang === 'CZ'
                  ? (isSeen ? "Označit jako neviděné" : "Označit jako viděné naživo")
                  : (isSeen ? "Mark as unseen" : "Mark as seen live")
              }
            >
              <Eye className="w-3 h-3" />
            </button>

            <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${
              isSelected 
                ? isBoeing ? 'text-indigo-300 translate-x-0.5' : 'text-sky-300 translate-x-0.5' 
                : 'text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5'
            }`} />
          </div>
        </div>
      </motion.div>
    );
  };

  const [airbusExpanded, setAirbusExpanded] = useState<boolean>(true);
  const [a10Expanded, setA10Expanded] = useState<boolean>(false); // Just a note, no a10, we had standard a310/a320/...
  const [a220Expanded, setA220Expanded] = useState<boolean>(false);
  const [a300Expanded, setA300Expanded] = useState<boolean>(false);
  const [a310Expanded, setA310Expanded] = useState<boolean>(false);
  const [a320Expanded, setA320Expanded] = useState<boolean>(false);
  const [a330Expanded, setA330Expanded] = useState<boolean>(false);
  const [a340Expanded, setA340Expanded] = useState<boolean>(false);
  const [a350Expanded, setA350Expanded] = useState<boolean>(false);
  const [a380Expanded, setA380Expanded] = useState<boolean>(false);
  const [belugaExpanded, setBelugaExpanded] = useState<boolean>(false);
  const [boeingExpanded, setBoeingExpanded] = useState<boolean>(false);
  const [b707Expanded, setB707Expanded] = useState<boolean>(false);
  const [b717Expanded, setB717Expanded] = useState<boolean>(false);
  const [b727Expanded, setB727Expanded] = useState<boolean>(false);
  const [b737Expanded, setB737Expanded] = useState<boolean>(false);
  const [b747Expanded, setB747Expanded] = useState<boolean>(false);
  const [b757Expanded, setB757Expanded] = useState<boolean>(false);
  const [b767Expanded, setB767Expanded] = useState<boolean>(false);
  const [b777Expanded, setB777Expanded] = useState<boolean>(false);
  const [b787Expanded, setB787Expanded] = useState<boolean>(false);
  const [embraerExpanded, setEmbraerExpanded] = useState<boolean>(false);
  const [cessnaExpanded, setCessnaExpanded] = useState<boolean>(false);
  const [bombardierExpanded, setBombardierExpanded] = useState<boolean>(false);

  // List of categories for tabs
  const categories = ['Vše', 'Úzkotrupá (Single-Aisle)', 'Širokotrupá (Wide-Body)', 'Regionální (Regional)', 'Historická / Nadzvuková'];

  // Filter aircraft based on search query and category
  const filteredAircraft = useMemo(() => {
    return AIRCRAFT_DATA.filter(aircraft => {
      const matchSearch = aircraft.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          aircraft.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          aircraft.modelSeries.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCategory = selectedCategory === 'Vše' || aircraft.category === selectedCategory;
      
      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Separate filtered lists for Airbus and Boeing
  const airbusAircraft = useMemo(() => {
    return filteredAircraft.filter(a => a.manufacturer.toLowerCase() === 'airbus');
  }, [filteredAircraft]);

  const a220Aircraft = useMemo(() => {
    return airbusAircraft.filter(a => a.id.startsWith('airbus-a220-'));
  }, [airbusAircraft]);

  const a300Aircraft = useMemo(() => {
    return airbusAircraft.filter(a => a.id.startsWith('airbus-a300-'));
  }, [airbusAircraft]);

  const a310Aircraft = useMemo(() => {
    return airbusAircraft.filter(a => a.id.startsWith('airbus-a310-'));
  }, [airbusAircraft]);

  const a320Aircraft = useMemo(() => {
    return airbusAircraft.filter(a => a.id.startsWith('airbus-a320-'));
  }, [airbusAircraft]);

  const a330Aircraft = useMemo(() => {
    return airbusAircraft.filter(a => a.id.startsWith('airbus-a330-'));
  }, [airbusAircraft]);

  const a340Aircraft = useMemo(() => {
    return airbusAircraft.filter(a => a.id.startsWith('airbus-a340-'));
  }, [airbusAircraft]);

  const a350Aircraft = useMemo(() => {
    return airbusAircraft.filter(a => a.id.startsWith('airbus-a350-') || a.id.startsWith('airbus-a350f'));
  }, [airbusAircraft]);

  const a380Aircraft = useMemo(() => {
    return airbusAircraft.filter(a => a.id.startsWith('airbus-a380-'));
  }, [airbusAircraft]);

  const belugaAircraft = useMemo(() => {
    return airbusAircraft.filter(a => a.id.startsWith('airbus-beluga'));
  }, [airbusAircraft]);

  const otherAirbusAircraft = useMemo(() => {
    return airbusAircraft.filter(a => !a.id.startsWith('airbus-a220-') && !a.id.startsWith('airbus-a300-') && !a.id.startsWith('airbus-a310-') && !a.id.startsWith('airbus-a320-') && !a.id.startsWith('airbus-a330-') && !a.id.startsWith('airbus-a340-') && !a.id.startsWith('airbus-a350-') && !a.id.startsWith('airbus-a350f') && !a.id.startsWith('airbus-a380-') && !a.id.startsWith('airbus-beluga'));
  }, [airbusAircraft]);

  const boeingAircraft = useMemo(() => {
    return filteredAircraft.filter(a => a.manufacturer.toLowerCase() === 'boeing');
  }, [filteredAircraft]);

  const b707Aircraft = useMemo(() => {
    return boeingAircraft.filter(a => a.id === 'boeing-707' || a.id.startsWith('boeing-707-') || a.id === 'boeing-720');
  }, [boeingAircraft]);

  const b717Aircraft = useMemo(() => {
    return boeingAircraft.filter(a => a.id.startsWith('boeing-717'));
  }, [boeingAircraft]);

  const b727Aircraft = useMemo(() => {
    return boeingAircraft.filter(a => a.id.startsWith('boeing-727'));
  }, [boeingAircraft]);

  const b737Aircraft = useMemo(() => {
    return boeingAircraft.filter(a => a.id.startsWith('boeing-737'));
  }, [boeingAircraft]);

  const b747Aircraft = useMemo(() => {
    return boeingAircraft.filter(a => a.id.startsWith('boeing-747'));
  }, [boeingAircraft]);

  const b757Aircraft = useMemo(() => {
    return boeingAircraft.filter(a => a.id.startsWith('boeing-757'));
  }, [boeingAircraft]);

  const b767Aircraft = useMemo(() => {
    return boeingAircraft.filter(a => a.id.startsWith('boeing-767'));
  }, [boeingAircraft]);

  const b777Aircraft = useMemo(() => {
    return boeingAircraft.filter(a => a.id.startsWith('boeing-777'));
  }, [boeingAircraft]);

  const b787Aircraft = useMemo(() => {
    return boeingAircraft.filter(a => a.id.startsWith('boeing-787'));
  }, [boeingAircraft]);

  const otherBoeingAircraft = useMemo(() => {
    return boeingAircraft.filter(a => 
      a.id !== 'boeing-707' && !a.id.startsWith('boeing-707-') && a.id !== 'boeing-720' &&
      !a.id.startsWith('boeing-717') &&
      !a.id.startsWith('boeing-727') &&
      !a.id.startsWith('boeing-737') &&
      !a.id.startsWith('boeing-747') &&
      !a.id.startsWith('boeing-757') &&
      !a.id.startsWith('boeing-767') &&
      !a.id.startsWith('boeing-777') &&
      !a.id.startsWith('boeing-787')
    );
  }, [boeingAircraft]);

  const embraerAircraft = useMemo(() => {
    return filteredAircraft.filter(a => a.manufacturer.toLowerCase() === 'embraer');
  }, [filteredAircraft]);

  const cessnaAircraft = useMemo(() => {
    return filteredAircraft.filter(a => a.manufacturer.toLowerCase() === 'cessna');
  }, [filteredAircraft]);

  const bombardierAircraft = useMemo(() => {
    return filteredAircraft.filter(a => a.manufacturer.toLowerCase() === 'bombardier');
  }, [filteredAircraft]);

  // Selected aircraft details
  const selectedAircraft = useMemo(() => {
    return AIRCRAFT_DATA.find(a => a.id === selectedId) || AIRCRAFT_DATA[0];
  }, [selectedId]);

  // Expand the active manufacturer folder if selected model changes
  useEffect(() => {
    if (selectedAircraft) {
      if (selectedAircraft.manufacturer.toLowerCase() === 'airbus') {
        setAirbusExpanded(true);
        if (selectedAircraft.id.startsWith('airbus-a220-')) {
          setA220Expanded(true);
        } else if (selectedAircraft.id.startsWith('airbus-a300-')) {
          setA300Expanded(true);
        } else if (selectedAircraft.id.startsWith('airbus-a310-')) {
          setA310Expanded(true);
        } else if (selectedAircraft.id.startsWith('airbus-a320-')) {
          setA320Expanded(true);
        } else if (selectedAircraft.id.startsWith('airbus-a330-')) {
          setA330Expanded(true);
        } else if (selectedAircraft.id.startsWith('airbus-a340-')) {
          setA340Expanded(true);
        } else if (selectedAircraft.id.startsWith('airbus-a350-') || selectedAircraft.id.startsWith('airbus-a350f')) {
          setA350Expanded(true);
        } else if (selectedAircraft.id.startsWith('airbus-a380-')) {
          setA380Expanded(true);
        } else if (selectedAircraft.id.startsWith('airbus-beluga')) {
          setBelugaExpanded(true);
        }
      } else if (selectedAircraft.manufacturer.toLowerCase() === 'boeing') {
        setBoeingExpanded(true);
        if (selectedAircraft.id === 'boeing-707' || selectedAircraft.id.startsWith('boeing-707-') || selectedAircraft.id === 'boeing-720') {
          setB707Expanded(true);
        } else if (selectedAircraft.id.startsWith('boeing-717')) {
          setB717Expanded(true);
        } else if (selectedAircraft.id.startsWith('boeing-727')) {
          setB727Expanded(true);
        } else if (selectedAircraft.id.startsWith('boeing-737')) {
          setB737Expanded(true);
        } else if (selectedAircraft.id.startsWith('boeing-747')) {
          setB747Expanded(true);
        } else if (selectedAircraft.id.startsWith('boeing-757')) {
          setB757Expanded(true);
        } else if (selectedAircraft.id.startsWith('boeing-767')) {
          setB767Expanded(true);
        } else if (selectedAircraft.id.startsWith('boeing-777')) {
          setB777Expanded(true);
        } else if (selectedAircraft.id.startsWith('boeing-787')) {
          setB787Expanded(true);
        }
      } else if (selectedAircraft.manufacturer.toLowerCase() === 'embraer') {
        setEmbraerExpanded(true);
      } else if (selectedAircraft.manufacturer.toLowerCase() === 'cessna') {
        setCessnaExpanded(true);
      }
    }
  }, [selectedId, selectedAircraft]); // Run when selected aircraft changes

  // Auto-expand sections that have search results
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      if (airbusAircraft.length > 0) {
        setAirbusExpanded(true);
        if (a220Aircraft.length > 0) {
          setA220Expanded(true);
        }
        if (a300Aircraft.length > 0) {
          setA300Expanded(true);
        }
        if (a310Aircraft.length > 0) {
          setA310Expanded(true);
        }
        if (a320Aircraft.length > 0) {
          setA320Expanded(true);
        }
        if (a330Aircraft.length > 0) {
          setA330Expanded(true);
        }
        if (a340Aircraft.length > 0) {
          setA340Expanded(true);
        }
        if (a350Aircraft.length > 0) {
          setA350Expanded(true);
        }
        if (a380Aircraft.length > 0) {
          setA380Expanded(true);
        }
        if (belugaAircraft.length > 0) {
          setBelugaExpanded(true);
        }
      }
      if (boeingAircraft.length > 0) {
        setBoeingExpanded(true);
        if (b707Aircraft.length > 0) {
          setB707Expanded(true);
        }
        if (b717Aircraft.length > 0) {
          setB717Expanded(true);
        }
        if (b727Aircraft.length > 0) {
          setB727Expanded(true);
        }
        if (b737Aircraft.length > 0) {
          setB737Expanded(true);
        }
        if (b747Aircraft.length > 0) {
          setB747Expanded(true);
        }
        if (b757Aircraft.length > 0) {
          setB757Expanded(true);
        }
        if (b767Aircraft.length > 0) {
          setB767Expanded(true);
        }
        if (b777Aircraft.length > 0) {
          setB777Expanded(true);
        }
        if (b787Aircraft.length > 0) {
          setB787Expanded(true);
        }
      }
      if (embraerAircraft.length > 0) {
        setEmbraerExpanded(true);
      }
      if (cessnaAircraft.length > 0) {
        setCessnaExpanded(true);
      }
    } else {
      // Když se vyhledávání smaže, zavřou se všechny složky kromě té s právě vybraným letadlem
      setAirbusExpanded(false);
      setA220Expanded(false);
      setA300Expanded(false);
      setA310Expanded(false);
      setA320Expanded(false);
      setA330Expanded(false);
      setA340Expanded(false);
      setA350Expanded(false);
      setA380Expanded(false);
      setBelugaExpanded(false);
      setBoeingExpanded(false);
      setB707Expanded(false);
      setB717Expanded(false);
      setB727Expanded(false);
      setB737Expanded(false);
      setB747Expanded(false);
      setB757Expanded(false);
      setB767Expanded(false);
      setB777Expanded(false);
      setB787Expanded(false);
      setEmbraerExpanded(false);
      setCessnaExpanded(false);
   
      if (selectedAircraft) {
        if (selectedAircraft.manufacturer.toLowerCase() === 'airbus') {
          setAirbusExpanded(true);
          if (selectedAircraft.id.startsWith('airbus-a220-')) {
            setA220Expanded(true);
          } else if (selectedAircraft.id.startsWith('airbus-a300-')) {
            setA300Expanded(true);
          } else if (selectedAircraft.id.startsWith('airbus-a310-')) {
            setA310Expanded(true);
          } else if (selectedAircraft.id.startsWith('airbus-a320-')) {
            setA320Expanded(true);
          } else if (selectedAircraft.id.startsWith('airbus-a330-')) {
            setA330Expanded(true);
          } else if (selectedAircraft.id.startsWith('airbus-a340-')) {
            setA340Expanded(true);
          } else if (selectedAircraft.id.startsWith('airbus-a350-') || selectedAircraft.id.startsWith('airbus-a350f')) {
            setA350Expanded(true);
          } else if (selectedAircraft.id.startsWith('airbus-a380-')) {
            setA380Expanded(true);
          } else if (selectedAircraft.id.startsWith('airbus-beluga')) {
            setBelugaExpanded(true);
          }
        } else if (selectedAircraft.manufacturer.toLowerCase() === 'boeing') {
          setBoeingExpanded(true);
          if (selectedAircraft.id === 'boeing-707' || selectedAircraft.id.startsWith('boeing-707-') || selectedAircraft.id === 'boeing-720') {
            setB707Expanded(true);
          } else if (selectedAircraft.id.startsWith('boeing-717')) {
            setB717Expanded(true);
          } else if (selectedAircraft.id.startsWith('boeing-727')) {
            setB727Expanded(true);
          } else if (selectedAircraft.id.startsWith('boeing-737')) {
            setB737Expanded(true);
          } else if (selectedAircraft.id.startsWith('boeing-747')) {
            setB747Expanded(true);
          } else if (selectedAircraft.id.startsWith('boeing-757')) {
            setB757Expanded(true);
          } else if (selectedAircraft.id.startsWith('boeing-767')) {
            setB767Expanded(true);
          } else if (selectedAircraft.id.startsWith('boeing-777')) {
            setB777Expanded(true);
          } else if (selectedAircraft.id.startsWith('boeing-787')) {
            setB787Expanded(true);
          }
        } else if (selectedAircraft.manufacturer.toLowerCase() === 'embraer') {
          setEmbraerExpanded(true);
        } else if (selectedAircraft.manufacturer.toLowerCase() === 'cessna') {
          setCessnaExpanded(true);
        } else if (selectedAircraft.manufacturer.toLowerCase() === 'bombardier') {
          setBombardierExpanded(true);
        }
      }
    }
  }, [searchQuery, airbusAircraft.length, a220Aircraft.length, a300Aircraft.length, a310Aircraft.length, a320Aircraft.length, a330Aircraft.length, a340Aircraft.length, a350Aircraft.length, a380Aircraft.length, belugaAircraft.length, boeingAircraft.length, b707Aircraft.length, b717Aircraft.length, b727Aircraft.length, b737Aircraft.length, b747Aircraft.length, b757Aircraft.length, b767Aircraft.length, b777Aircraft.length, b787Aircraft.length, embraerAircraft.length, cessnaAircraft.length, bombardierAircraft.length, selectedAircraft]);

  // Calculate fleet averages for comparison
  const fleetAverages = useMemo(() => {
    const total = AIRCRAFT_DATA.length;
    let sumCapacity = 0;
    let sumRange = 0;
    let sumSpeed = 0;
    let sumWeight = 0;
    let sumLength = 0;
    let sumWingspan = 0;
    let sumHeight = 0;
    let sumFuselage = 0;
    let sumWingArea = 0;

    AIRCRAFT_DATA.forEach(a => {
      sumCapacity += a.specs.capacityMax;
      sumRange += a.specs.rangeKm;
      sumSpeed += a.specs.cruiseSpeedKmh;
      sumWeight += a.specs.mtowTonnes;
      sumLength += a.specs.lengthM;
      sumWingspan += a.specs.wingspanM;
      sumHeight += a.specs.heightM;
      sumFuselage += a.specs.fuselageWidthM || 0;
      sumWingArea += a.specs.wingAreaM2 || 0;
    });

    return {
      capacity: Math.round(sumCapacity / total),
      range: Math.round(sumRange / total),
      speed: Math.round(sumSpeed / total),
      weight: Math.round(sumWeight / total),
      length: parseFloat((sumLength / total).toFixed(1)),
      wingspan: parseFloat((sumWingspan / total).toFixed(1)),
      height: parseFloat((sumHeight / total).toFixed(1)),
      fuselage: parseFloat((sumFuselage / total).toFixed(2)),
      wingArea: Math.round(sumWingArea / total),
    };
  }, []);

  // Compute percentage comparisons for the selected aircraft vs fleet average
  const comparisonStats = useMemo(() => {
    const current = selectedAircraft.specs;
    return {
      capacity: {
        percent: Math.round(((current.capacityMax - fleetAverages.capacity) / fleetAverages.capacity) * 100),
        value: current.capacityMax
      },
      range: {
        percent: Math.round(((current.rangeKm - fleetAverages.range) / fleetAverages.range) * 100),
        value: current.rangeKm
      },
      speed: {
        percent: Math.round(((current.cruiseSpeedKmh - fleetAverages.speed) / fleetAverages.speed) * 100),
        value: current.cruiseSpeedKmh
      },
      weight: {
        percent: Math.round(((current.mtowTonnes - fleetAverages.weight) / fleetAverages.weight) * 100),
        value: current.mtowTonnes
      },
      length: {
        percent: Math.round(((current.lengthM - fleetAverages.length) / fleetAverages.length) * 100),
        value: current.lengthM
      },
      wingspan: {
        percent: Math.round(((current.wingspanM - fleetAverages.wingspan) / fleetAverages.wingspan) * 100),
        value: current.wingspanM
      },
      height: {
        percent: Math.round(((current.heightM - fleetAverages.height) / fleetAverages.height) * 100),
        value: current.heightM
      },
      fuselage: {
        percent: Math.round(((current.fuselageWidthM - fleetAverages.fuselage) / fleetAverages.fuselage) * 100),
        value: current.fuselageWidthM
      },
      wingArea: {
        percent: Math.round(((current.wingAreaM2 - fleetAverages.wingArea) / fleetAverages.wingArea) * 100),
        value: current.wingAreaM2
      }
    };
  }, [selectedAircraft, fleetAverages]);

  // Select the first plane from filtered list if current selection gets filtered out
  const handleSelect = (id: string) => {
    setSelectedId(id);
    setMobileView('detail');
    try {
      localStorage.setItem('selected_aircraft_id', id);
    } catch (_) {}
  };

  const airbusFamilies = useMemo(() => [
    { id: 'a220', name: 'Airbus A220', list: a220Aircraft, expanded: a220Expanded, setExpanded: setA220Expanded, flag: <EUCanadaFlag /> },
    { id: 'a300', name: 'Airbus A300', list: a300Aircraft, expanded: a300Expanded, setExpanded: setA300Expanded, flag: <EUFlag /> },
    { id: 'a310', name: 'Airbus A310', list: a310Aircraft, expanded: a310Expanded, setExpanded: setA310Expanded, flag: <EUFlag /> },
    { id: 'a320', name: 'Airbus A320', list: a320Aircraft, expanded: a320Expanded, setExpanded: setA320Expanded, flag: <EUFlag /> },
    { id: 'a330', name: 'Airbus A330', list: a330Aircraft, expanded: a330Expanded, setExpanded: setA330Expanded, flag: <EUFlag /> },
    { id: 'a340', name: 'Airbus A340', list: a340Aircraft, expanded: a340Expanded, setExpanded: setA340Expanded, flag: <EUFlag /> },
    { id: 'a350', name: 'Airbus A350', list: a350Aircraft, expanded: a350Expanded, setExpanded: setA350Expanded, flag: <EUFlag /> },
    { id: 'a380', name: 'Airbus A380', list: a380Aircraft, expanded: a380Expanded, setExpanded: setA380Expanded, flag: <EUFlag /> },
    { id: 'beluga', name: 'Airbus Beluga', list: belugaAircraft, expanded: belugaExpanded, setExpanded: setBelugaExpanded, flag: <EUFlag /> },
  ], [
    a220Aircraft, a220Expanded,
    a300Aircraft, a300Expanded,
    a310Aircraft, a310Expanded,
    a320Aircraft, a320Expanded,
    a330Aircraft, a330Expanded,
    a340Aircraft, a340Expanded,
    a350Aircraft, a350Expanded,
    a380Aircraft, a380Expanded,
    belugaAircraft, belugaExpanded
  ]);

  return (
    <div className={`min-h-screen ${bgMainClass} font-sans ${textMainClass} flex flex-col md:flex-row antialiased transition-colors duration-300 ${isDark ? 'dark-theme' : 'light-theme'}`}>
      
      {/* LEFT SIDEBAR: Flight catalog navigation */}
      <aside 
        id="sidebar"
        className={`w-full md:w-[380px] lg:w-[420px] backdrop-blur-md border-b md:border-b-0 md:border-r ${isDark ? 'bg-slate-900/40 border-slate-800/60' : 'bg-white/95 border-slate-200/80 shadow-sm'} flex flex-col shrink-0 h-screen sticky top-0 transition-colors duration-300 ${
          mobileView === 'detail' ? 'hidden md:flex' : 'flex'
        }`}
      >
        {/* Header Branding */}
        <div className={`p-6 pb-4 border-b ${isDark ? 'border-slate-800/40' : 'border-slate-200'} space-y-3.5`}>
          {/* Settings panel (Language & Theme) */}
          <div className={`flex items-center justify-between border rounded-2xl p-2 px-3 transition-colors ${isDark ? 'bg-slate-950/20 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 select-none ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <Globe className={`w-3.5 h-3.5 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
              <span>{lang === 'CZ' ? 'Nastavení' : 'Settings'}</span>
            </span>
            <div className="flex items-center gap-2.5">
              {/* Language Switcher Buttons */}
              <div className="flex gap-1">
                <button
                  onClick={() => handleLanguageChange('CZ')}
                  title={t.czLang}
                  className={`flex items-center justify-center w-7 h-5 rounded-lg border text-[9px] font-bold font-mono transition-all cursor-pointer ${
                    lang === 'CZ' 
                      ? 'bg-sky-500/10 border-sky-500/35 text-sky-450 shadow-sm shadow-sky-500/5 font-extrabold' 
                      : isDark
                        ? 'bg-transparent border-transparent text-slate-500 hover:text-slate-350'
                        : 'bg-transparent border-transparent text-slate-450 hover:text-slate-600'
                  }`}
                >
                  <span>CZ</span>
                </button>
                <button
                  onClick={() => handleLanguageChange('EN')}
                  title={t.enLang}
                  className={`flex items-center justify-center w-7 h-5 rounded-lg border text-[9px] font-bold font-mono transition-all cursor-pointer ${
                    lang === 'EN' 
                      ? 'bg-sky-500/10 border-sky-500/35 text-sky-450 shadow-sm shadow-sky-500/5 font-extrabold' 
                      : isDark
                        ? 'bg-transparent border-transparent text-slate-500 hover:text-slate-350'
                        : 'bg-transparent border-transparent text-slate-450 hover:text-slate-600'
                  }`}
                >
                  <span>EN</span>
                </button>
              </div>

              {/* Vertical divider */}
              <div className={`w-[1px] h-3.5 ${isDark ? 'bg-white/5' : 'bg-slate-300'}`} />

              {/* Theme Switcher Button */}
              <button
                onClick={toggleTheme}
                title={t.changeTheme}
                className={`flex items-center justify-center p-1 px-1.5 rounded-lg border text-[9px] font-bold font-mono transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-slate-800/40 border-transparent text-slate-400 hover:text-amber-400 hover:bg-slate-800/80' 
                    : 'bg-white border-slate-200 text-amber-500 shadow-sm hover:bg-slate-50'
                }`}
              >
                {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                <span className="ml-1 text-[9px] tracking-tight">{isDark ? t.themeDark : t.themeLight}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-0.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-gradient-to-tr from-[#38bdf8] to-[#818cf8] rounded-xl text-white shadow-lg shadow-sky-500/10 shrink-0">
                <Plane className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold bg-gradient-to-r from-[#38bdf8] to-[#818cf8] bg-clip-text text-transparent tracking-tight">
                  AirCatalog
                </h1>
                <p className={`text-[9px] ${isDark ? 'text-slate-500' : 'text-slate-450'} font-mono tracking-wider`}>
                  {t.catalogSubtitle.replace('{count}', String(AIRCRAFT_DATA.length))}
                </p>
              </div>
            </div>
            <button
              onClick={() => setCompareOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/25 rounded-xl text-[10px] font-bold text-sky-450 transition-all cursor-pointer shadow-md shadow-sky-500/5 select-none shrink-0"
            >
              <ArrowLeftRight className="w-3 h-3" />
              {t.compareButton}
            </button>
          </div>
        </div>

        {/* Search controls */}
        <div className="p-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
            <input
              id="search-input"
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-2xl text-base md:text-sm placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-sky-500/25 focus:border-sky-500/50 transition-all font-sans ${
                isDark 
                  ? 'bg-slate-950/50 border-slate-800 text-slate-200' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 shadow-inner'
              }`}
            />
          </div>
        </div>

        {/* Sekce označených letadel - Viděno naživo */}
        <div id="seen-aircraft-section" className="px-4 py-1.5">
          <div className={`border rounded-2xl p-3 space-y-2 transition-all ${
            isDark 
              ? 'bg-slate-950/30 border-slate-800/60' 
              : 'bg-slate-50/70 border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-1 bg-emerald-500/10 rounded-lg text-emerald-400 shrink-0 ${seenIds.length > 0 ? 'animate-pulse' : ''}`}>
                  <Eye className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className={`text-xs font-bold block leading-tight ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{t.seenSectionTitle}</span>
                  <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-450'} font-mono`}>
                    {t.seenRatio
                      .replace('{seen}', String(seenIds.length))
                      .replace('{total}', String(AIRCRAFT_DATA.length))
                      .replace('{percent}', String(Math.round((seenIds.length / AIRCRAFT_DATA.length) * 100)))}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className={`w-full h-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-800/40' : 'bg-slate-200'}`}>
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(2, (seenIds.length / AIRCRAFT_DATA.length) * 100)}%` }}
              />
            </div>

            {/* List of Seen Aircraft as scrollable horizontal pills */}
            {seenIds.length > 0 ? (
              <div className="flex gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar scroll-smooth">
                {AIRCRAFT_DATA.filter(a => seenIds.includes(a.id)).map(aircraft => (
                  <button
                    key={aircraft.id}
                    onClick={() => handleSelect(aircraft.id)}
                    className={`flex items-center gap-1.5 px-2 py-0.5 border rounded-xl text-[10px] font-mono whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      selectedId === aircraft.id
                        ? 'border-emerald-500/50 text-emerald-400 shadow-sm bg-emerald-500/10'
                        : isDark
                          ? 'bg-slate-900/40 border-white/5 text-slate-350 hover:border-slate-300 hover:bg-slate-800/50'
                          : 'bg-white border-slate-250 text-slate-600 hover:border-slate-450 hover:bg-slate-100 shadow-xs'
                    }`}
                  >
                    <span>{aircraft.name.replace('Boeing ', '').replace('Airbus ', '')}</span>
                    <span 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSeen(aircraft.id);
                      }}
                      className="text-[10px] text-slate-450 hover:text-rose-400 ml-0.5 font-sans font-bold"
                      title={t.removeFromSeen}
                    >
                      ×
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-slate-500 font-sans italic leading-relaxed">
                {lang === 'CZ' 
                  ? 'Zatím prázdné. Označte letadla tlačítkem očička v katalogu!' 
                  : 'Empty so far. Mark aircraft with the eye icon in the catalog!'}
              </p>
            )}
          </div>
        </div>

        {/* Categories Tab Swapper */}
        <div className={`px-4 py-2 border-b ${isDark ? 'border-slate-800/40' : 'border-slate-200'}`}>
          <div className="flex gap-1.5 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
            {categories.map((cat) => (
              <button
                id={`cat-${cat}`}
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-2 md:px-3 md:py-1.5 text-sm md:text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#38bdf8] to-[#818cf8] text-white shadow-md shadow-sky-500/15 font-bold'
                    : isDark 
                      ? 'bg-slate-800/40 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 border border-white/5'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 border border-slate-200/40'
                }`}
              >
                {cat === 'Vše' 
                  ? (lang === 'CZ' ? 'Všechny modely' : 'All Models') 
                  : translateCategory(cat, lang)}
              </button>
            ))}
          </div>
        </div>

        {/* Flight Selection List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          <AnimatePresence mode="popLayout">
            {filteredAircraft.length > 0 ? (
              <div className="space-y-4">
                {/* AIRBUS SECTION */}
                {airbusAircraft.length > 0 && (
                  <div className="space-y-2">
                    <button
                      onClick={() => setAirbusExpanded(!airbusExpanded)}
                      className="w-full flex items-center justify-between p-3 bg-slate-950/40 hover:bg-slate-900/60 border border-white/5 rounded-2xl transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-sky-500/10 rounded-lg group-hover:scale-105 transition-transform duration-200 flex items-center justify-center text-sm w-7 h-7 select-none">
                          <EUFlag />
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm md:text-xs font-extrabold tracking-wider text-slate-200 font-mono">AIRBUS</h4>
                          <p className="text-[11px] md:text-[10px] text-slate-500 font-mono">
                            {airbusAircraft.length} {getModelText(airbusAircraft.length)}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${airbusExpanded ? 'rotate-90 text-sky-400' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {airbusExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="space-y-2 pl-3 border-l border-sky-500/15 overflow-hidden py-1"
                        >
                          {/* Nested Airbus A220 sub-folder */}
                          {a220Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setA220Expanded(!a220Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/a220"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-sky-500/10 rounded-lg group-hover/a220:scale-105 transition-transform duration-200 flex items-center justify-center select-none">
                                    <EUCanadaFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Airbus A220</h5>
                                    <p className="text-[9px] text-slate-500 font-mono">
                                      {a220Aircraft.length} {getVariantText(a220Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${a220Expanded ? 'rotate-90 text-sky-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {a220Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-2 pl-3.5 border-l border-sky-500/10 overflow-hidden py-1"
                                  >
                                    {a220Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Airbus A300 sub-folder */}
                          {a300Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setA300Expanded(!a300Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/a300"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-sky-500/10 rounded-lg group-hover/a300:scale-105 transition-transform duration-200 flex items-center justify-center select-none">
                                    <EUFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Airbus A300</h5>
                                    <p className="text-[9px] text-slate-500 font-mono">
                                      {a300Aircraft.length} {getVariantText(a300Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${a300Expanded ? 'rotate-90 text-sky-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {a300Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-2 pl-3.5 border-l border-sky-500/10 overflow-hidden py-1"
                                  >
                                    {a300Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Airbus A310 sub-folder */}
                          {a310Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setA310Expanded(!a310Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/a310"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-sky-500/10 rounded-lg group-hover/a310:scale-105 transition-transform duration-200 flex items-center justify-center select-none">
                                    <EUFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Airbus A310</h5>
                                    <p className="text-[9px] text-slate-500 font-mono">
                                      {a310Aircraft.length} {getVariantText(a310Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${a310Expanded ? 'rotate-90 text-sky-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {a310Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-2 pl-3.5 border-l border-sky-500/10 overflow-hidden py-1"
                                  >
                                    {a310Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Airbus A320 sub-folder */}
                          {a320Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setA320Expanded(!a320Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/a320"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-sky-500/10 rounded-lg group-hover/a320:scale-105 transition-transform duration-200 flex items-center justify-center select-none">
                                    <EUFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Airbus A320</h5>
                                    <p className="text-[9px] text-slate-500 font-mono">
                                      {a320Aircraft.length} {getVariantText(a320Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${a320Expanded ? 'rotate-90 text-sky-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {a320Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-2 pl-3.5 border-l border-sky-500/10 overflow-hidden py-1"
                                  >
                                    {a320Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Airbus A330 sub-folder */}
                          {a330Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setA330Expanded(!a330Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/a330"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-sky-500/10 rounded-lg group-hover/a330:scale-105 transition-transform duration-200 flex items-center justify-center select-none">
                                    <EUFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Airbus A330</h5>
                                    <p className="text-[9px] text-slate-500 font-mono">
                                      {a330Aircraft.length} {getVariantText(a330Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${a330Expanded ? 'rotate-90 text-sky-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {a330Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-2 pl-3.5 border-l border-sky-500/10 overflow-hidden py-1"
                                  >
                                    {a330Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Airbus A340 sub-folder */}
                          {a340Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setA340Expanded(!a340Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/a340"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-sky-500/10 rounded-lg group-hover/a340:scale-105 transition-transform duration-200 flex items-center justify-center select-none">
                                    <EUFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Airbus A340</h5>
                                    <p className="text-[9px] text-slate-500 font-mono">
                                      {a340Aircraft.length} {getVariantText(a340Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${a340Expanded ? 'rotate-90 text-sky-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {a340Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-2 pl-3.5 border-l border-sky-500/10 overflow-hidden py-1"
                                  >
                                    {a340Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Airbus A350 sub-folder */}
                          {a350Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setA350Expanded(!a350Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/a350"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-sky-500/10 rounded-lg group-hover/a350:scale-105 transition-transform duration-200 flex items-center justify-center select-none">
                                    <EUFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Airbus A350</h5>
                                    <p className="text-[9px] text-slate-500 font-mono">
                                      {a350Aircraft.length} {getVariantText(a350Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${a350Expanded ? 'rotate-90 text-sky-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {a350Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-2 pl-3.5 border-l border-sky-500/10 overflow-hidden py-1"
                                  >
                                    {a350Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Airbus A380 sub-folder */}
                          {a380Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setA380Expanded(!a380Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/a380"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-sky-500/10 rounded-lg group-hover/a380:scale-105 transition-transform duration-200 flex items-center justify-center select-none">
                                    <EUFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Airbus A380</h5>
                                    <p className="text-[9px] text-slate-500 font-mono">
                                      {a380Aircraft.length} {getVariantText(a380Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${a380Expanded ? 'rotate-90 text-sky-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {a380Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-2 pl-3.5 border-l border-sky-500/10 overflow-hidden py-1"
                                  >
                                    {a380Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Airbus Beluga sub-folder */}
                          {belugaAircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setBelugaExpanded(!belugaExpanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/beluga"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-sky-500/10 rounded-lg group-hover/beluga:scale-105 transition-transform duration-200 flex items-center justify-center select-none">
                                    <EUFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Airbus Beluga</h5>
                                    <p className="text-[9px] text-slate-500 font-mono">
                                      {belugaAircraft.length} {getVariantText(belugaAircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${belugaExpanded ? 'rotate-90 text-sky-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {belugaExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-2 pl-3.5 border-l border-sky-500/10 overflow-hidden py-1"
                                  >
                                    {belugaAircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {otherAirbusAircraft.map((aircraft) => (
                            <AircraftListItem
                              key={aircraft.id}
                              aircraft={aircraft}
                              isSelected={aircraft.id === selectedId}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* BOEING SECTION */}
                {boeingAircraft.length > 0 && (
                  <div className="space-y-2">
                    <button
                      onClick={() => setBoeingExpanded(!boeingExpanded)}
                      className="w-full flex items-center justify-between p-3 bg-slate-950/40 hover:bg-slate-900/60 border border-white/5 rounded-2xl transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-indigo-500/10 rounded-lg group-hover:scale-105 transition-transform duration-200 flex items-center justify-center text-sm w-7 h-7 select-none">
                          <USFlag />
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm md:text-xs font-extrabold tracking-wider text-slate-200 font-mono">BOEING</h4>
                          <p className="text-[11px] md:text-[10px] text-slate-500 font-mono">
                            {boeingAircraft.length} {getModelText(boeingAircraft.length)}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${boeingExpanded ? 'rotate-90 text-indigo-400' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {boeingExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="space-y-2 pl-3 border-l border-indigo-500/15 overflow-hidden py-1"
                        >
                          {/* Nested Boeing 707 sub-folder */}
                          {b707Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setB707Expanded(!b707Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/b707"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-indigo-500/10 rounded-lg group-hover/b707:scale-105 transition-transform duration-200 flex items-center justify-center select-none w-6 h-6 shrink-0">
                                    <USFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Boeing 707</h5>
                                    <p className="text-[9px] text-slate-500 font-mono">
                                      {b707Aircraft.length} {getVariantText(b707Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${b707Expanded ? 'rotate-90 text-indigo-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {b707Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-1.5 pl-3 border-l border-indigo-500/10 overflow-hidden py-1"
                                  >
                                    {b707Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Boeing 717 sub-folder */}
                          {b717Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setB717Expanded(!b717Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/b717"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-indigo-500/10 rounded-lg group-hover/b717:scale-105 transition-transform duration-200 flex items-center justify-center select-none w-6 h-6 shrink-0">
                                    <USFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Boeing 717</h5>
                                    <p className="text-[9px] text-slate-500 font-mono">
                                      {b717Aircraft.length} {getVariantText(b717Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${b717Expanded ? 'rotate-90 text-indigo-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {b717Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-1.5 pl-3 border-l border-indigo-500/10 overflow-hidden py-1"
                                  >
                                    {b717Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Boeing 727 sub-folder */}
                          {b727Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setB727Expanded(!b727Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/b727"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-indigo-500/10 rounded-lg group-hover/b727:scale-105 transition-transform duration-200 flex items-center justify-center select-none w-6 h-6 shrink-0">
                                    <USFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Boeing 727</h5>
                                    <p className="text-[9px] text-slate-500 font-mono">
                                      {b727Aircraft.length} {getVariantText(b727Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${b727Expanded ? 'rotate-90 text-indigo-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {b727Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-1.5 pl-3 border-l border-indigo-500/10 overflow-hidden py-1"
                                  >
                                    {b727Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Boeing 737 sub-folder */}
                          {b737Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setB737Expanded(!b737Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/b737"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-indigo-500/10 rounded-lg group-hover/b737:scale-105 transition-transform duration-200 flex items-center justify-center select-none w-6 h-6 shrink-0">
                                    <USFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Boeing 737</h5>
                                    <p className="text-[9px] text-slate-400 font-mono">
                                      {b737Aircraft.length} {getVariantText(b737Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${b737Expanded ? 'rotate-90 text-indigo-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {b737Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-1.5 pl-3 border-l border-indigo-500/10 overflow-hidden py-1"
                                  >
                                    {b737Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Boeing 747 sub-folder */}
                          {b747Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setB747Expanded(!b747Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/b747"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-indigo-500/10 rounded-lg group-hover/b747:scale-105 transition-transform duration-200 flex items-center justify-center select-none w-6 h-6 shrink-0">
                                    <USFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Boeing 747</h5>
                                    <p className="text-[9px] text-slate-400 font-mono">
                                      {b747Aircraft.length} {getVariantText(b747Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${b747Expanded ? 'rotate-90 text-indigo-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {b747Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-1.5 pl-3 border-l border-indigo-500/10 overflow-hidden py-1"
                                  >
                                    {b747Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Boeing 757 sub-folder */}
                          {b757Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setB757Expanded(!b757Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/b757"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-indigo-500/10 rounded-lg group-hover/b757:scale-105 transition-transform duration-200 flex items-center justify-center select-none w-6 h-6 shrink-0">
                                    <USFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Boeing 757</h5>
                                    <p className="text-[9px] text-slate-400 font-mono">
                                      {b757Aircraft.length} {getVariantText(b757Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${b757Expanded ? 'rotate-90 text-indigo-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {b757Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-1.5 pl-3 border-l border-indigo-500/10 overflow-hidden py-1"
                                  >
                                    {b757Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Boeing 767 sub-folder */}
                          {b767Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setB767Expanded(!b767Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/b767"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-indigo-500/10 rounded-lg group-hover/b767:scale-105 transition-transform duration-200 flex items-center justify-center select-none w-6 h-6 shrink-0">
                                    <USFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Boeing 767</h5>
                                    <p className="text-[9px] text-slate-400 font-mono">
                                      {b767Aircraft.length} {getVariantText(b767Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${b767Expanded ? 'rotate-90 text-indigo-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {b767Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-1.5 pl-3 border-l border-indigo-500/10 overflow-hidden py-1"
                                  >
                                    {b767Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Boeing 777 sub-folder */}
                          {b777Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setB777Expanded(!b777Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/b777"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-indigo-500/10 rounded-lg group-hover/b777:scale-105 transition-transform duration-200 flex items-center justify-center select-none w-6 h-6 shrink-0">
                                    <USFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Boeing 777</h5>
                                    <p className="text-[9px] text-slate-400 font-mono">
                                      {b777Aircraft.length} {getVariantText(b777Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${b777Expanded ? 'rotate-90 text-indigo-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {b777Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-1.5 pl-3 border-l border-indigo-500/10 overflow-hidden py-1"
                                  >
                                    {b777Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Nested Boeing 787 sub-folder */}
                          {b787Aircraft.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              <button
                                onClick={() => setB787Expanded(!b787Expanded)}
                                className="w-full flex items-center justify-between p-2.5 bg-slate-950/20 hover:bg-slate-900/40 border border-white/5 rounded-2xl transition-all cursor-pointer group/b787"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-indigo-500/10 rounded-lg group-hover/b787:scale-105 transition-transform duration-200 flex items-center justify-center select-none w-6 h-6 shrink-0">
                                    <USFlag />
                                  </div>
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-slate-300 font-mono">Boeing 787</h5>
                                    <p className="text-[9px] text-slate-400 font-mono">
                                      {b787Aircraft.length} {getVariantText(b787Aircraft.length)}
                                    </p>
                                  </div>
                                </div>
                                <ChevronRight className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${b787Expanded ? 'rotate-90 text-indigo-400' : ''}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {b787Expanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="space-y-1.5 pl-3 border-l border-indigo-500/10 overflow-hidden py-1"
                                  >
                                    {b787Aircraft.map((aircraft) => (
                                      <AircraftListItem
                                        key={aircraft.id}
                                        aircraft={aircraft}
                                        isSelected={aircraft.id === selectedId}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {/* Other Boeing aircraft */}
                          {otherBoeingAircraft.map((aircraft) => (
                            <AircraftListItem
                              key={aircraft.id}
                              aircraft={aircraft}
                              isSelected={aircraft.id === selectedId}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* EMBRAER SECTION */}
                {embraerAircraft.length > 0 && (
                  <div className="space-y-2">
                    <button
                      onClick={() => setEmbraerExpanded(!embraerExpanded)}
                      className="w-full flex items-center justify-between p-3 bg-slate-950/40 hover:bg-slate-900/60 border border-white/5 rounded-2xl transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-emerald-500/10 rounded-lg group-hover:scale-105 transition-transform duration-200 flex items-center justify-center text-sm w-7 h-7 select-none">
                          <BrazilFlag />
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm md:text-xs font-extrabold tracking-wider text-slate-200 font-mono">EMBRAER</h4>
                          <p className="text-[11px] md:text-[10px] text-slate-500 font-mono">
                            {embraerAircraft.length} {getModelText(embraerAircraft.length)}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${embraerExpanded ? 'rotate-90 text-emerald-400' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {embraerExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="space-y-2 pl-3 border-l border-emerald-500/15 overflow-hidden py-1"
                        >
                          {embraerAircraft.map((aircraft) => (
                            <AircraftListItem
                              key={aircraft.id}
                              aircraft={aircraft}
                              isSelected={aircraft.id === selectedId}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* CESSNA SECTION */}
                {cessnaAircraft.length > 0 && (
                  <div className="space-y-2">
                    <button
                      onClick={() => setCessnaExpanded(!cessnaExpanded)}
                      className="w-full flex items-center justify-between p-3 bg-slate-950/40 hover:bg-slate-900/60 border border-white/5 rounded-2xl transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-amber-500/10 rounded-lg group-hover:scale-105 transition-transform duration-200 flex items-center justify-center text-sm w-7 h-7 select-none">
                          <USFlag />
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm md:text-xs font-extrabold tracking-wider text-slate-200 font-mono">CESSNA</h4>
                          <p className="text-[11px] md:text-[10px] text-slate-500 font-mono">
                            {cessnaAircraft.length} {getModelText(cessnaAircraft.length)}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${cessnaExpanded ? 'rotate-90 text-amber-400' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {cessnaExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="space-y-2 pl-3 border-l border-amber-500/15 overflow-hidden py-1"
                        >
                          {cessnaAircraft.map((aircraft) => (
                            <AircraftListItem
                              key={aircraft.id}
                              aircraft={aircraft}
                              isSelected={aircraft.id === selectedId}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* BOMBARDIER SECTION */}
                {bombardierAircraft.length > 0 && (
                  <div className="space-y-2">
                    <button
                      onClick={() => setBombardierExpanded(!bombardierExpanded)}
                      className="w-full flex items-center justify-between p-3 bg-slate-950/40 hover:bg-slate-900/60 border border-white/5 rounded-2xl transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-red-500/10 rounded-lg group-hover:scale-105 transition-transform duration-200 flex items-center justify-center text-sm w-7 h-7 select-none">
                          <CanadaFlag />
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm md:text-xs font-extrabold tracking-wider text-slate-200 font-mono">BOMBARDIER</h4>
                          <p className="text-[11px] md:text-[10px] text-slate-500 font-mono">
                            {bombardierAircraft.length} {getModelText(bombardierAircraft.length)}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${bombardierExpanded ? 'rotate-90 text-red-400' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {bombardierExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="space-y-2 pl-3 border-l border-red-500/15 overflow-hidden py-1"
                        >
                          {bombardierAircraft.map((aircraft) => (
                            <AircraftListItem
                              key={aircraft.id}
                              aircraft={aircraft}
                              isSelected={aircraft.id === selectedId}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500">
                <Plane className="w-8 h-8 mx-auto stroke-slate-600 mb-2.5" />
                <p className="text-sm font-medium">Žádná letadla nebyla nalezena</p>
                <p className="text-xs text-slate-500 mt-1">Zkuste upravit klíčová slova</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info brand */}
        <div className="p-4 border-t border-slate-800/40 hidden md:block bg-slate-950/20">
          <div className="flex items-center gap-2.5 text-xs text-slate-500 font-mono">
            <Globe className="w-4 h-4 text-slate-600" />
            <span>AirCatalog Katalog v1.2</span>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN PANEL: Extensive aviation details */}
      <main 
        id="main-details"
        className={`flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full relative ${
          mobileView === 'list' ? 'hidden md:block' : 'block'
        }`}
        style={{
          background: 'radial-gradient(circle at 75% 25%, rgba(56, 189, 248, 0.05) 0%, transparent 65%)'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAircraft.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Mobile back navigation bar */}
            <div className="md:hidden flex items-center justify-between mb-4 pb-3 border-b border-slate-800/40 gap-4">
              <button
                id="mobile-back-btn"
                onClick={() => setMobileView('list')}
                className="flex items-center gap-1.5 text-xs font-bold font-mono text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 active:scale-95 transition-all py-2.5 px-4 rounded-xl border border-sky-400/20 shadow-sm shadow-sky-500/5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                ZPĚT NA SEZNAM
              </button>
              <span className="text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase truncate max-w-[180px]">
                {selectedAircraft.name}
              </span>
            </div>
            {/* 1. HERO CAPTURE AREA: Elegant Blueprint Banner instead of photo */}
            <div 
              className="relative overflow-hidden bg-slate-900/60 rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl border border-white/5 flex flex-col justify-between"
              style={{
                backgroundImage: 'radial-gradient(circle at top right, rgba(56, 189, 248, 0.08), transparent 70%)'
              }}
            >
              {/* Engineering blueprint grid effect */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                {/* Manufacturer & Series model info */}
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 border border-slate-700/50 rounded-md text-[11px] font-bold font-mono tracking-wider">
                    {selectedAircraft.manufacturer}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs text-slate-400 font-mono font-medium">{selectedAircraft.modelSeries}</span>
                </div>

                {/* Quick Specs Overlay Pills */}
                <div className="flex gap-1.5 flex-wrap">
                  <span className="bg-slate-950/70 border border-white/10 px-3 py-1 text-[11px] font-bold tracking-wide uppercase rounded-full text-slate-300 backdrop-blur-md">
                    {translateCategory(selectedAircraft.category, lang)}
                  </span>
                  <span className="bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 px-3 py-1 text-[11px] font-bold tracking-wide uppercase rounded-full backdrop-blur-md">
                    {t.firstFlight.replace('{year}', String(selectedAircraft.specs.firstFlightYear))}
                  </span>
                </div>
              </div>

              {/* Title, Country and Engine indicators */}
              <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10 pb-2">
                <div>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                    {selectedAircraft.name}
                  </h1>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="bg-white/5 border border-white/10 text-slate-300 py-1.5 px-3 rounded-full text-xs font-mono flex items-center gap-1.5 backdrop-blur-md">
                    <Compass className="w-3.5 h-3.5 text-sky-400 rotate-12" />
                    <span>{t.countryOfOrigin.replace('{country}', translateCountry(selectedAircraft.country, lang))}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-sky-500/10 text-sky-300 border border-sky-500/20 font-mono py-1.5 px-3 rounded-full text-xs font-bold shrink-0 backdrop-blur-md">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>{t.enginesCount.replace('{count}', String(selectedAircraft.specs.engineCount))}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. AIRPLANE INTRO: Full Description */}
            <div className={`rounded-3xl p-6 md:p-8 shadow-xl border transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-900/40 border-white/5' : 'bg-white border-slate-200'}`}>
              {/* Description grids */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className={`lg:col-span-8 space-y-4 text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <p>{translateText(selectedAircraft.description, lang, false)}</p>
                </div>

                {/* Fun Fact quote layout */}
                <div className={`lg:col-span-4 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between border transition-all duration-300 ${
                  isDark ? 'bg-amber-500/5 border-amber-500/20' : 'bg-amber-50 border-amber-100 shadow-sm shadow-amber-100/50'
                }`}>
                  <div className={`absolute -right-6 -top-6 ${isDark ? 'text-amber-500/10' : 'text-amber-500/15'}`}>
                    <Sparkles className="w-24 h-24 stroke-[1.2]" />
                  </div>
                  <div>
                    <div className={`flex items-center gap-2 font-bold text-xs mb-2.5 font-mono ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                      <Sparkles className={`w-4 h-4 animate-spin-slow ${isDark ? 'text-amber-600' : 'text-amber-500'}`} />
                      <span>{t.funFactHeader}</span>
                    </div>
                    <p className={`text-sm italic font-medium leading-relaxed relative z-10 ${
                      isDark ? 'text-amber-200' : 'text-amber-900 font-semibold'
                    }`}>
                      {lang === 'CZ' ? `„${selectedAircraft.uniqueness}“` : `"${translateText(selectedAircraft.uniqueness, lang, true)}"`}
                    </p>
                  </div>
                  <div className={`text-[10px] font-mono mt-4 pt-3 border-t ${
                    isDark ? 'text-amber-500/45 border-amber-500/10' : 'text-amber-800/65 border-amber-200/60'
                  }`}>
                    {t.funFactFooter}
                  </div>
                </div>
              </div>
            </div>

            {/* 2.5 VISUAL PROFILE VIEW (SIDE & TOP SHAPES WITH DIMENSIONS) */}
            <AircraftVisualProfile 
              aircraft={selectedAircraft}
              lang={lang}
              theme={isDark ? 'dark' : 'light'}
            />

            {/* 3. TECHNICAL SPECIFICATIONS BENTO GRID */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className={`w-4 h-4 animate-spin-slow ${isDark ? 'text-[#38bdf8]' : 'text-sky-600'}`} />
                  <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                    {t.specsHeader}
                  </h3>
                </div>
                <span className={`text-[10px] font-mono text-right ${isDark ? 'text-slate-500' : 'text-slate-450'}`}>{t.specsSubheader}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {/* Stat Card: Max Capacity */}
                <div className={`rounded-2xl p-5 border shadow-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-slate-900/40 border-white/5 hover:border-[#38bdf8]/30 hover:shadow-cyan-950/20' 
                    : 'bg-white border-slate-200 hover:border-[#38bdf8]/30 hover:shadow-slate-200/80'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.capacityCardTitle}</span>
                  </div>
                  <div className={`font-mono text-xs ${isDark ? 'text-slate-500' : 'text-slate-450'}`}>{t.capacityCardSubtitle}</div>
                  <div className={`text-2xl font-bold mt-0.5 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {selectedAircraft.specs.capacityMax} <span className={`text-sm font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{t.capacityCardMaxTypical}</span>
                  </div>
                  <div className={`text-xs mt-2 font-medium py-1 px-2 rounded-lg inline-block border ${
                    isDark ? 'bg-slate-950/40 border-white/5 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    {t.capacityCardTypicalLabel} <span className="text-sky-500 font-bold">{translateTypicalCapacity(selectedAircraft.specs.capacityTypical, lang)}</span>
                  </div>
                </div>

                {/* Stat Card: Reach Range */}
                <div className={`rounded-2xl p-5 border shadow-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-slate-900/40 border-white/5 hover:border-[#38bdf8]/30 hover:shadow-cyan-950/20' 
                    : 'bg-white border-slate-200 hover:border-[#38bdf8]/30 hover:shadow-slate-200/80'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                      <Milestone className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.rangeCardTitle}</span>
                  </div>
                  <div className={`font-mono text-xs ${isDark ? 'text-slate-500' : 'text-slate-450'}`}>{t.rangeCardSubtitle}</div>
                  <div className={`text-2xl font-bold mt-0.5 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {selectedAircraft.specs.rangeKm.toLocaleString(lang === 'CZ' ? 'cs-CZ' : 'en-GB')} <span className={`text-sm font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>km</span>
                  </div>
                  
                  {/* Visual scale bar for range */}
                  <div className="mt-4">
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-1">
                      <span>{t.rangeCardCompareScale}</span>
                      <span className="font-bold text-emerald-500">{Math.round((selectedAircraft.specs.rangeKm / 16000) * 100)} %</span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden border ${isDark ? 'bg-slate-950 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (selectedAircraft.specs.rangeKm / 16000) * 100)}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Stat Card: Velocity Speed */}
                <div className={`rounded-2xl p-5 border shadow-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-slate-900/40 border-white/5 hover:border-[#38bdf8]/30 hover:shadow-cyan-950/20' 
                    : 'bg-white border-slate-200 hover:border-[#38bdf8]/30 hover:shadow-slate-200/80'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                      <Gauge className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.speedCardTitle}</span>
                  </div>
                  <div className={`font-mono text-xs ${isDark ? 'text-slate-500' : 'text-slate-450'}`}>{t.speedCardSubtitle}</div>
                  <div className={`text-2xl font-bold mt-0.5 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {selectedAircraft.specs.cruiseSpeedKmh} <span className={`text-sm font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>km/h</span>
                  </div>
                  <div className={`text-xs mt-2 font-mono font-bold py-1 px-2 rounded-lg inline-block border ${
                    isDark ? 'bg-indigo-500/10 border-indigo-500/15 text-[#818cf8]' : 'bg-indigo-50 border-indigo-150 text-indigo-700'
                  }`}>
                    {t.speedCardMachLabel.replace('{mach}', String(selectedAircraft.specs.cruiseMach))} {selectedAircraft.specs.cruiseMach > 1 ? t.supersonicLabel : ''}
                  </div>
                </div>

                {/* Stat Card: Wingspan / Dimensions */}
                <div className={`rounded-2xl p-5 border shadow-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-slate-900/40 border-white/5 hover:border-[#38bdf8]/30 hover:shadow-cyan-950/20' 
                    : 'bg-white border-slate-200 hover:border-[#38bdf8]/30 hover:shadow-slate-200/80'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2.5 bg-violet-500/10 text-violet-400 rounded-xl">
                      <Ruler className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.dimensionsCardTitle}</span>
                  </div>
                  <div className={`text-sm font-bold mb-2 pb-1 border-b ${isDark ? 'text-white border-white/5' : 'text-slate-800 border-slate-200'}`}>
                    {t.dimensionsCardSub}
                  </div>
                  <div className={`space-y-1.5 text-xs font-sans ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <div className={`flex justify-between py-0.5 border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                      <span className={`${isDark ? 'text-slate-500' : 'text-slate-450'}`}>{t.overallLength}</span>
                      <span className={`font-mono font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{selectedAircraft.specs.lengthM} m</span>
                    </div>
                    <div className={`flex justify-between py-0.5 border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                      <span className={`${isDark ? 'text-slate-500' : 'text-slate-450'}`}>{t.wingspan}</span>
                      <span className={`font-mono font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{selectedAircraft.specs.wingspanM} m</span>
                    </div>
                    <div className={`flex justify-between py-0.5 border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                      <span className={`${isDark ? 'text-slate-500' : 'text-slate-450'}`}>{t.height}</span>
                      <span className={`font-mono font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{selectedAircraft.specs.heightM} m</span>
                    </div>
                    <div className={`flex justify-between py-0.5 border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                      <span className={`${isDark ? 'text-slate-500' : 'text-slate-450'}`}>{t.fuselageWidth}</span>
                      <span className={`font-mono font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{selectedAircraft.specs.fuselageWidthM} m</span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span className={`${isDark ? 'text-slate-500' : 'text-slate-450'}`}>{t.wingArea}</span>
                      <span className={`font-mono font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{selectedAircraft.specs.wingAreaM2} m²</span>
                    </div>
                  </div>
                </div>

                {/* Stat Card: MTOW Weight */}
                <div className={`rounded-2xl p-5 border shadow-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-slate-900/40 border-white/5 hover:border-[#38bdf8]/30 hover:shadow-cyan-950/20' 
                    : 'bg-white border-slate-200 hover:border-[#38bdf8]/30 hover:shadow-slate-200/80'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl">
                      <Scale className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.mtowCardTitle}</span>
                  </div>
                  <div className={`font-mono text-xs ${isDark ? 'text-slate-500' : 'text-slate-450'}`}>{t.mtowCardSub}</div>
                  <div className={`text-2xl font-bold mt-0.5 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {selectedAircraft.specs.mtowTonnes} <span className={`text-sm font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{lang === 'CZ' ? 'tun' : 'tonnes'}</span>
                  </div>
                  <div className={`text-[10px] mt-3 font-sans leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t.mtowCardDesc}
                  </div>
                </div>

                {/* Stat Card: Engine & Engineering spec */}
                <div className={`rounded-2xl p-5 border shadow-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-slate-900/40 border-white/5 hover:border-[#38bdf8]/30 hover:shadow-cyan-950/20' 
                    : 'bg-white border-slate-200 hover:border-[#38bdf8]/30 hover:shadow-slate-200/80'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.enginesCardTitle}</span>
                  </div>
                  <div className={`font-mono text-xs ${isDark ? 'text-slate-500' : 'text-slate-450'}`}>{t.enginesCardSub}</div>
                  <div className={`text-sm font-bold mt-1 lines-clamp-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {selectedAircraft.specs.engineType}
                  </div>
                  <div className={`text-[11px] font-mono mt-2 border p-1.5 rounded-lg flex justify-between items-center ${
                    isDark ? 'bg-slate-950/40 border-white/5 text-[#94a3b8]' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <span>{t.enginesCardListLabel}</span>
                    <span className="bg-amber-500/20 text-amber-500 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold text-[10px]">
                      {selectedAircraft.specs.engineCount}x JT/CFM/RR
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* 4. FLEET STATISTICAL COMPARISON REPORT CARD */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950/40 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden border border-white/5">
              <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#38bdf8] font-bold uppercase">
                    <TrendingUp className="w-4 h-4" />
                    <span>{t.comparisonHeader}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {t.comparisonSubheader}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1.5 max-w-xl">
                    {t.comparisonDesc.replace('{name}', selectedAircraft.name)}
                  </p>
                </div>
                
                <div className="shrink-0 flex items-center gap-1.5 bg-[#38bdf8]/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-mono border border-[#38bdf8]/15 text-sky-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse" />
                  <span>{t.comparisonEngineActive}</span>
                </div>
              </div>

              {/* Progress and indicators rows */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 relative z-10 pt-6 border-t border-white/5">
                
                {/* Max Passengers comparator */}
                <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-500 font-mono tracking-wider">{lang === 'CZ' ? 'KAPACITA SEDADEL' : 'SEATING CAPACITY'}</div>
                  <div className="text-xl font-bold tracking-tight mt-1 flex items-baseline justify-between gap-2 text-white">
                    <span>{comparisonStats.capacity.value}</span>
                    <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                      comparisonStats.capacity.percent >= 0 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {comparisonStats.capacity.percent >= 0 ? '+' : ''}{comparisonStats.capacity.percent}%
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1.5">{t.comparisonAverage.replace('{val}', String(fleetAverages.capacity))}</div>
                </div>

                {/* Range comparator */}
                <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-500 font-mono tracking-wider">{lang === 'CZ' ? 'MAXIMÁLNÍ DOLET' : 'MAXIMUM RANGE'}</div>
                  <div className="text-xl font-bold tracking-tight mt-1 flex items-baseline justify-between gap-2 text-white">
                    <span>{comparisonStats.range.value.toLocaleString(lang === 'CZ' ? 'cs-CZ' : 'en-GB')} km</span>
                    <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                      comparisonStats.range.percent >= 0 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {comparisonStats.range.percent >= 0 ? '+' : ''}{comparisonStats.range.percent}%
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1.5">{t.comparisonAverage.replace('{val}', `${fleetAverages.range.toLocaleString(lang === 'CZ' ? 'cs-CZ' : 'en-GB')} km`)}</div>
                </div>

                {/* Length comparator */}
                <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-500 font-mono tracking-wider">{lang === 'CZ' ? 'CELKOVÁ DÉLKA LETADLA' : 'OVERALL LENGTH'}</div>
                  <div className="text-xl font-bold tracking-tight mt-1 flex items-baseline justify-between gap-2 text-white">
                    <span>{comparisonStats.length.value} m</span>
                    <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                      comparisonStats.length.percent >= 0 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {comparisonStats.length.percent >= 0 ? '+' : ''}{comparisonStats.length.percent}%
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1.5">{t.comparisonAverage.replace('{val}', `${fleetAverages.length} m`)}</div>
                </div>

                {/* Wingspan comparator */}
                <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-500 font-mono tracking-wider">{lang === 'CZ' ? 'ROZPĚTÍ KŘÍDEL' : 'WINGSPAN'}</div>
                  <div className="text-xl font-bold tracking-tight mt-1 flex items-baseline justify-between gap-2 text-white">
                    <span>{comparisonStats.wingspan.value} m</span>
                    <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                      comparisonStats.wingspan.percent >= 0 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {comparisonStats.wingspan.percent >= 0 ? '+' : ''}{comparisonStats.wingspan.percent}%
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1.5">{t.comparisonAverage.replace('{val}', `${fleetAverages.wingspan} m`)}</div>
                </div>

                {/* Height comparator */}
                <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-500 font-mono tracking-wider">{lang === 'CZ' ? 'VÝŠKA LETADLA' : 'AIRCRAFT HEIGHT'}</div>
                  <div className="text-xl font-bold tracking-tight mt-1 flex items-baseline justify-between gap-2 text-white">
                    <span>{comparisonStats.height.value} m</span>
                    <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                      comparisonStats.height.percent >= 0 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {comparisonStats.height.percent >= 0 ? '+' : ''}{comparisonStats.height.percent}%
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1.5">{t.comparisonAverage.replace('{val}', `${fleetAverages.height} m`)}</div>
                </div>

                {/* Fuselage width comparator */}
                <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-500 font-mono tracking-wider">{lang === 'CZ' ? 'ŠÍŘKA TRUPU' : 'FUSELAGE WIDTH'}</div>
                  <div className="text-xl font-bold tracking-tight mt-1 flex items-baseline justify-between gap-2 text-white">
                    <span>{comparisonStats.fuselage.value} m</span>
                    <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                      comparisonStats.fuselage.percent >= 0 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {comparisonStats.fuselage.percent >= 0 ? '+' : ''}{comparisonStats.fuselage.percent}%
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1.5">{t.comparisonAverage.replace('{val}', `${fleetAverages.fuselage} m`)}</div>
                </div>

                {/* Wing area comparator */}
                <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-500 font-mono tracking-wider">{lang === 'CZ' ? 'PLOCHA KŘÍDEL' : 'WING AREA'}</div>
                  <div className="text-xl font-bold tracking-tight mt-1 flex items-baseline justify-between gap-2 text-white">
                    <span>{comparisonStats.wingArea.value} m²</span>
                    <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                      comparisonStats.wingArea.percent >= 0 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {comparisonStats.wingArea.percent >= 0 ? '+' : ''}{comparisonStats.wingArea.percent}%
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1.5">{t.comparisonAverage.replace('{val}', `${fleetAverages.wingArea} m²`)}</div>
                </div>

                {/* Speed comparator */}
                <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-500 font-mono tracking-wider">{lang === 'CZ' ? 'CESTOVNÍ RYCHLOST' : 'CRUISING SPEED'}</div>
                  <div className="text-xl font-bold tracking-tight mt-1 flex items-baseline justify-between gap-2 text-white">
                    <span>{comparisonStats.speed.value} km/h</span>
                    <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                      comparisonStats.speed.percent >= 0 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {comparisonStats.speed.percent >= 0 ? '+' : ''}{comparisonStats.speed.percent}%
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1.5">{t.comparisonAverage.replace('{val}', `${fleetAverages.speed} km/h`)}</div>
                </div>

              </div>
            </div>

            {/* Help guidelines banner */}
            <div className="bg-slate-900/20 rounded-2xl p-4 flex items-center gap-3 border border-white/5">
              <Info className="w-5 h-5 text-slate-500 shrink-0" />
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.helpGuidelines}
              </p>
            </div>

          </motion.div>
        </AnimatePresence>
      </main>

      <AircraftComparison 
        isOpen={compareOpen} 
        onClose={() => setCompareOpen(false)} 
        initialAircraft={selectedAircraft}
        lang={lang}
        theme={theme}
      />

    </div>
  );
}
