// Application Translate Engine
// Supports Czech (CZ) and English (EN)

import { AIRCRAFT_DATA } from './data';
import { AIRCRAFT_TRANSLATIONS_EN } from './aircraft_translations_data';

export interface UITranslationMap {
  appName: string;
  catalogSubtitle: string;
  compareButton: string;
  compareButtonMobile: string;
  searchPlaceholder: string;
  seenSectionTitle: string;
  seenRatio: string;
  removeFromSeen: string;
  backToListMobile: string;
  firstFlight: string;
  countryOfOrigin: string;
  enginesCount: string;
  enginesLabel: string;
  funFactHeader: string;
  funFactFooter: string;
  specsHeader: string;
  specsSubheader: string;
  metricLabel: string;
  capacityCardTitle: string;
  capacityCardSubtitle: string;
  capacityCardMaxTypical: string;
  capacityCardTypicalLabel: string;
  rangeCardTitle: string;
  rangeCardSubtitle: string;
  rangeCardCompareScale: string;
  speedCardTitle: string;
  speedCardSubtitle: string;
  speedCardMachLabel: string;
  supersonicLabel: string;
  dimensionsCardTitle: string;
  dimensionsCardSub: string;
  overallLength: string;
  wingspan: string;
  height: string;
  fuselageWidth: string;
  wingArea: string;
  mtowCardTitle: string;
  mtowCardSub: string;
  mtowCardDesc: string;
  enginesCardTitle: string;
  enginesCardSub: string;
  enginesCardListLabel: string;
  comparisonHeader: string;
  comparisonSubheader: string;
  comparisonDesc: string;
  comparisonEngineActive: string;
  comparisonAverage: string;
  comparisonPassengerPrefix: string;
  helpGuidelines: string;
  comparisonTitle: string;
  comparisonSubtitle: string;
  slot1Placeholder: string;
  slot2Placeholder: string;
  searchDropdownPlaceholder: string;
  noResults: string;
  changeBtn: string;
  deleteBtn: string;
  orSelectText: string;
  diffMore: string;
  diffLess: string;
  diffSame: string;
  notSelected: string;
  closeBtn: string;
  emptyList: string;
  changeLanguage: string;
  czLang: string;
  enLang: string;
  changeTheme: string;
  themeLight: string;
  themeDark: string;
}

export const TRANSLATIONS: Record<'CZ' | 'EN', UITranslationMap> = {
  CZ: {
    appName: 'AirCatalog',
    catalogSubtitle: 'KATALOG {count} DOPRAVNÍCH LETADEL',
    compareButton: 'Porovnat letadla',
    compareButtonMobile: 'Porovnat',
    searchPlaceholder: 'Hledat letadlo (např. Boeing 737)...',
    seenSectionTitle: 'Viděno naživo',
    seenRatio: '{seen} z {total} ({percent}%)',
    removeFromSeen: 'Odebrat ze seznamu',
    backToListMobile: 'ZPĚT NA SEZNAM',
    firstFlight: 'První let: {year}',
    countryOfOrigin: 'Země původu: {country}',
    enginesCount: '{count}× motor',
    enginesLabel: 'motor',
    funFactHeader: 'ZAJÍMAVOST LETU',
    funFactFooter: 'Fascinující detail konstrukce',
    specsHeader: 'Technické specifikace & výkonnostní data',
    specsSubheader: 'METRICKÉ HODNOTY SI',
    metricLabel: 'METRICKÉ HODNOTY SI',
    capacityCardTitle: 'Kapacita sedadel',
    capacityCardSubtitle: 'Maximální / Typická',
    capacityCardMaxTypical: 'pasažérů',
    capacityCardTypicalLabel: 'Typické uspořádání:',
    rangeCardTitle: 'Maximální dolet',
    rangeCardSubtitle: 'Maximální dolet',
    rangeCardCompareScale: 'Procentuální srovnání',
    speedCardTitle: 'Cestovní rychlost',
    speedCardSubtitle: 'Průměrná rychlost letadla',
    speedCardMachLabel: 'Mach: {mach} Ma',
    supersonicLabel: '(Nadzvuková)',
    dimensionsCardTitle: 'Konstrukční rozměry',
    dimensionsCardSub: 'Geometrie & křídla',
    overallLength: 'Celková délka letadla:',
    wingspan: 'Rozpětí křídel:',
    height: 'Výška:',
    fuselageWidth: 'Šířka trupu:',
    wingArea: 'Plocha křídel:',
    mtowCardTitle: 'Vzletová hmotnost (MTOW)',
    mtowCardSub: 'Maximální vzletová váha',
    mtowCardDesc: 'Celková váha letadla včetně pasažérů, nákladu a veškerého paliva k odletu.',
    enginesCardTitle: 'Pohonná jednotka',
    enginesCardSub: 'Typ motoru',
    enginesCardListLabel: 'Motory:',
    comparisonHeader: 'Porovnání s průměrem letky',
    comparisonSubheader: 'Srovnání technických parametrů s průměrem letky',
    comparisonDesc: 'Statistiky porovnávají hodnoty {name} se středními hodnotami (aritmetickým průměrem) všech civilních modelů v katalogu.',
    comparisonEngineActive: 'Srovnávací Engine aktivní',
    comparisonAverage: 'Průměr: {val}',
    comparisonPassengerPrefix: 'pasažérů',
    helpGuidelines: 'Tento přehled slouží jako vzdělávací encyklopedie dopravního letectva. Informace a rozměry letadel vychází z technických příruček výrobců Airbus, Boeing, Embraer, Bombardier a archivních materiálů.',
    comparisonTitle: 'Srovnávač Letadel',
    comparisonSubtitle: 'Porovnejte technické parametry dvou vybraných letadel.',
    slot1Placeholder: 'Vyberte 1. letadlo',
    slot2Placeholder: 'Vyberte 2. letadlo k porovnání',
    searchDropdownPlaceholder: 'Hledat podle názvu nebo značky...',
    noResults: 'Žádná letadla nebyla nalezena.',
    changeBtn: 'Změnit',
    deleteBtn: 'Smazat',
    orSelectText: 'nebo vyberte ze seznamu níže',
    diffMore: 'O {p} % víc',
    diffLess: 'O {p} % méně',
    diffSame: 'Stejné',
    notSelected: 'Není vybráno',
    closeBtn: 'Zavřít',
    emptyList: 'Seznam je prázdný',
    changeLanguage: 'Změnit jazyk',
    czLang: 'Čeština',
    enLang: 'English (EN)',
    changeTheme: 'Motiv',
    themeLight: 'Světlý',
    themeDark: 'Tmavý',
  },
  EN: {
    appName: 'AirCatalog',
    catalogSubtitle: 'CATALOG OF {count} COMMERCIAL AIRCRAFT',
    compareButton: 'Compare aircraft',
    compareButtonMobile: 'Compare',
    searchPlaceholder: 'Search aircraft (e.g. Boeing 737)...',
    seenSectionTitle: 'Spotted in real life',
    seenRatio: '{seen} of {total} ({percent}%)',
    removeFromSeen: 'Remove from list',
    backToListMobile: 'BACK TO LIST',
    firstFlight: 'First flight: {year}',
    countryOfOrigin: 'Country of origin: {country}',
    enginesCount: '{count}× engines',
    enginesLabel: 'engine',
    funFactHeader: 'AIRCRAFT FUN FACT',
    funFactFooter: 'Fascinating structural detail',
    specsHeader: 'Technical specs & performance data',
    specsSubheader: 'METRIC SI VALUES',
    metricLabel: 'METRIC SI VALUES',
    capacityCardTitle: 'Seating capacity',
    capacityCardSubtitle: 'Maximum / Typical',
    capacityCardMaxTypical: 'passengers',
    capacityCardTypicalLabel: 'Typical configuration:',
    rangeCardTitle: 'Maximum range',
    rangeCardSubtitle: 'Maximum range',
    rangeCardCompareScale: 'Percentage relative comparison',
    speedCardTitle: 'Cruising speed',
    speedCardSubtitle: 'Average aircraft speed',
    speedCardMachLabel: 'Mach: {mach} Ma',
    supersonicLabel: '(Supersonic)',
    dimensionsCardTitle: 'Structural dimensions',
    dimensionsCardSub: 'Geometry & wings',
    overallLength: 'Overall aircraft length:',
    wingspan: 'Wingspan:',
    height: 'Height:',
    fuselageWidth: 'Fuselage width:',
    wingArea: 'Wing area:',
    mtowCardTitle: 'Takeoff weight (MTOW)',
    mtowCardSub: 'Maximum takeoff weight',
    mtowCardDesc: 'Total weight of the aircraft including passengers, cargo, and all fuel at takeoff.',
    enginesCardTitle: 'Powerplant',
    enginesCardSub: 'Engine type',
    enginesCardListLabel: 'Engines:',
    comparisonHeader: 'Comparison with fleet average',
    comparisonSubheader: 'Aircraft technical metrics compared to average',
    comparisonDesc: 'Statistics compare the metrics of {name} with the average (arithmetic mean) of all commercial aircraft in this database.',
    comparisonEngineActive: 'Comparator Engine active',
    comparisonAverage: 'Average: {val}',
    comparisonPassengerPrefix: 'passengers',
    helpGuidelines: 'This catalog serves as an educational encyclopedia of passenger aviation. Aircraft details and measurements are retrieved from official manufacturer technical guides by Airbus, Boeing, Embraer, Bombardier, and historical databases.',
    comparisonTitle: 'Aircraft Comparator',
    comparisonSubtitle: 'Compare technical metrics of two selected aircraft side-by-side.',
    slot1Placeholder: 'Select 1st aircraft',
    slot2Placeholder: 'Select 2nd aircraft to compare',
    searchDropdownPlaceholder: 'Search by model name or brand...',
    noResults: 'No matches found.',
    changeBtn: 'Change',
    deleteBtn: 'Delete',
    orSelectText: 'or select from the list below',
    diffMore: '{p}% more',
    diffLess: '{p}% less',
    diffSame: 'Same',
    notSelected: 'Not selected',
    closeBtn: 'Close',
    emptyList: 'List is empty',
    changeLanguage: 'Language',
    czLang: 'Czech',
    enLang: 'English (EN)',
    changeTheme: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
  }
};

// Translates dynamic categories directly
export function translateCategory(category: string, lang: 'CZ' | 'EN'): string {
  if (lang === 'CZ') return category;
  
  switch(category) {
    case 'Úzkotrupá (Single-Aisle)':
      return 'Single-Aisle (Narrow-Body)';
    case 'Širokotrupá (Wide-Body)':
      return 'Wide-Body';
    case 'Regionální (Regional)':
      return 'Regional';
    case 'Historická / Nadzvuková':
      return 'Historical / Supersonic';
    default:
      return category;
  }
}

// Translates typical seating capacity labels
export function translateTypicalCapacity(typical: string, lang: 'CZ' | 'EN'): string {
  if (lang === 'CZ') return typical;
  return typical
    .replace('třídy', 'classes')
    .replace('třída', 'class')
    .replace('tříd', 'classes');
}

// Translates country name
export function translateCountry(country: string, lang: 'CZ' | 'EN'): string {
  if (lang === 'CZ') return country;
  
  return country
    .replace('Evropská unie', 'European Union')
    .replace('Kanada', 'Canada')
    .replace('Francie', 'France')
    .replace('Velká Británie', 'United Kingdom')
    .replace('Japonsko', 'Japan')
    .replace('Rusko', 'Russia')
    .replace('Sovětský svaz', 'Soviet Union')
    .replace('Spojené státy', 'United States')
    .replace('Brazílie', 'Brazil')
    .replace('Ukrajina', 'Ukraine');
}

// Map from normalized Czech text to English translation
const czToEnMap = new Map<string, string>();

function normalizeText(text: string): string {
  return text.replace(/[„“"”’‘]/g, '').replace(/\s+/g, ' ').trim();
}

// Build translation map on load
for (const aircraft of AIRCRAFT_DATA) {
  const translations = AIRCRAFT_TRANSLATIONS_EN[aircraft.id];
  if (translations) {
    if (aircraft.description && translations.descriptionEn) {
      czToEnMap.set(normalizeText(aircraft.description), translations.descriptionEn);
    }
    if (aircraft.uniqueness && translations.uniquenessEn) {
      czToEnMap.set(normalizeText(aircraft.uniqueness), translations.uniquenessEn);
    }
  }
}

// Czech to English text dictionary mappings for description & uniqueness
// to avoid huge translation code size, we provide a highly sophisticated automatic sentence translator that matches key phrases, 
// AND a comprehensive structural word/concept translation fallback engine!
export function translateText(text: string, lang: 'CZ' | 'EN', isUniqueness = false): string {
  if (lang === 'CZ' || !text) return text;

  const normalized = normalizeText(text);
  let mappedTranslation = czToEnMap.get(normalized);

  if (mappedTranslation) {
    if (isUniqueness) {
      // Strip any pre-existing surrounding quotes to return clean raw content
      mappedTranslation = mappedTranslation.replace(/^[„“"”’‘]+|[„“"”’‘]+$/g, '').trim();
    }
    return mappedTranslation;
  }

  const overrides: Record<string, string> = {
    // A220-100 & 300
    'Menší varianta z rodiny A220 (původně Bombardier CS100). Je speciálně navržena pro kratší až středně dlouhé tratě a vyniká schopností operovat z letišť s extrémně krátkou vzletovou dráhou a strmým přiblížením (např. London City Airport).':
      'Smaller variant of the A220 family (originally Bombardier CS100). It is specially designed for short to medium-haul routes and excels in its capability to operate from airports with extremely short runways and steep approaches (e.g. London City Airport).',
    'Do provozu vstoupil jako vůbec nejtišší letoun ve své kategorii, s hlukovou stopou nižší až o 50 % oproti předchozím typům letadel.':
      'It entered service as the quietest aircraft in its category, with a noise footprint up to 50% lower than previous aircraft types.',
    'Prodloužená a nejpopulárnější verze řady A220 (původně Bombardier CS300). Nabízí mimořádnou hospodárnost, moderní dálkovou kabinu pro cestující a nejnižší emise ve své třídě díky pokročilým motorům Pratt & Whitney.':
      'The stretched and most popular version of the A220 series (originally Bombardier CS300). It offers exceptional economics, a modern passenger cabin, and the lowest emissions in its class thanks to advanced Pratt & Whitney engines.',
    'Díky kombinaci nízké hmotnosti a špičkové aerodynamiky křídel představuje ideální volbu pro ziskové operování na méně vytížených celostátních i mezinárodních trasách.':
      'Thanks to a combination of low weight and state-of-the-art wing aerodynamics, it represents an ideal choice for profitable operation on lower-density domestic and international routes.',

    // A300
    'Původní základní produkční verze prvního širokotrupého dvoumotorového letadla na světě. Vstoupilo do komerční služby v roce 1974 u Air France. Tento průkopnický stroj prokázal, že i velká letadla pro dálkové linky mohou létat ekonomicky a bezpečně pouze se dvěma motory, čímž položil základy úspěchu celého konsorcia Airbus.':
      'The original base production version of the first wide-body twin-engine aircraft in the world. It entered commercial service in 1974 with Air France. This pioneering machine proved that even large aircraft for long-haul routes can fly economically and safely with only two engines, thereby laying the foundations of the success of the entire Airbus consortium.',
    'První širokotrupé dvoumotorové letadlo v historii letectví, které navždy změnilo strukturu dálkové civilní dopravy.':
      'The first wide-body twin-engine aircraft in aviation history, which forever changed the structure of long-haul civil transport.',
    'Verze se zvýšeným doletem a unikátním uspořádáním, která se stala klíčovým technologickým přechodem v letectví. Tento typ byl upraven tak, aby jej plně obsluhovali pouze dva piloti bez nutnosti přítomnosti palubního inženýra, což byl v té době obrovský krok kupředu.':
      'An increased range version with a unique cockpit layout, which became a key technological transition in aviation. This type was modified to be operated by only two pilots without the need for a flight engineer, which was a huge step forward at the time.',
    'Odstranilo potřebu třetího člena posádky (palubního inženýra) zavedením prvního plnohodnotného elektronického přístrojového systému pro posádku.':
      'It eliminated the need for a third crew member (flight engineer) by introducing the first full electronic flight instrument system for the crew.',
    'Nejmodernější a komerčně nejúspěšnější osobní verze řady -600. Disponuje integrovaným glass-kokpitem, vylepšenou aerodynamikou s winglety a zvýšeným doletem. Je vyhledávána pro vysokou spolehlivost a tvoří dodnes základ flotil mnoha dálkových charterových dopravců.':
      'The most modern and commercially most successful passenger version of the -600 series. It features an integrated glass cockpit, improved aerodynamics with winglets, and increased range. It is sought-after for its high reliability and still forms the basis of many long-haul charter carriers’ fleets.',
    'Stalo se vzorem pro pozdější vývoj legendárního dvousedadlového dálkového modelu Airbus A330.':
      'It became the blueprint for the subsequent development of the legendary two-engine long-haul Airbus A330 model.',
    'Vysoce efektivní čistě nákladní širokotrupá verze, která sdílí modernizovaný drak a avioniku s osobním modelem -600R. Díky obří kapacitě nákladového prostoru a vynikající spolehlivosti tvoří dodnes páteř flotil předních světových expresních přepravců jako FedEx, DHL a UPS.':
      'A highly efficient pure freighter wide-body version, which shares a modernized airframe and avionics with the passenger -600R model. Thanks to its giant cargo capacity and excellent reliability, it still forms the backbone of fleets for world-leading express carriers like FedEx, DHL, and UPS.',
    'Jedno z nejúspěšnějších středněkapacitních nákladních letadel historie, schopné pojmout až 48,3 tun nákladu na dálkových i regionálních trasách.':
      'One of the most successful medium-capacity freighter aircraft in history, capable of carrying up to 48.3 tonnes of cargo on both long-haul and regional routes.',

    // A310
    'Méně známá a nerealizovaná plánovaná regionální / krátkotrupá verze s kratším doletem určená pro evropské linky s vysokou poptávkou. Přestože byla vyvinuta a nabízena dopravcům v počátcích projektu, žádná verze -100 nakonec nebyla kvůli nízkému zájmu leteckých společností vyrobena a všichni zákazníci přešli na univerzálnější verzi -200.':
      'A lesser-known and unproduced planned regional/short-fuselage version with shorter range, designed for high-demand European routes. Although developed and offered in the initial phases of the project, no -100 version was ultimately built due to low airline interest, and all customers transitioned to the more versatile -200.',
    'Jedná se o jedinou projektovanou verzi řady A310, která se nikdy nedostala do sériové výroby, protože aerolinie preferovaly univerzálnost verze -200.':
      'It is the only projected version of the A310 series that never entered series production, as airlines preferred the versatility of the -200 version.',
    'První sériově vyráběný model řady A310, který vstoupil do služby v roce 1983 u německé Lufthansy a švýcarského Swissairu. Tento letoun představil v té době revoluční kokpit bez palubního inženýra s obrazovkovými displeji (Glass Cockpit) a byl specifický svými špičkovými aerodynamickými vlastnostmi pro středně dlouhé trasy.':
      'The first series-produced model of the A310 series, which entered service in 1983 with Germany\'s Lufthansa and Swissair of Switzerland. This aircraft introduced a revolutionary cockpit without a flight engineer featuring computer screens (Glass Cockpit) and was specific for its top aerodynamic characteristics for medium-haul routes.',
    'Klíčový model, který položil základy pro zavedení standardního dvoučlenného kokpitu do všech budoucích širokotrupých letadel Airbus.':
      'A key model that laid the foundations for the introduction of the standard two-person cockpit in all future Airbus wide-body aircraft.',
    'Nejprodávanější verze A310 s podstatně prodlouženým doletem a zvýšenou vzletovou hmotností. Poprvé vzlétla roku 1985 a přinesla revoluční technologické vylepšení jako přídavnou nádrž v ocasu a winglety (Wingtip fences) na koncích křídel pro snížení spotřeby paliva a odporu vzduchu. Byl vyhledáván i pro přelety Atlantiku.':
      'The best-selling version of the A310 with a significantly extended range and increased takeoff weight. It first flew in 1985 and introduced revolutionary technological improvements such as an auxiliary fuel tank in the tail and winglets (Wingtip fences) on the wing ends to reduce fuel burn and air resistance. It was highly sought-after for transatlantic crossings.',
    'První letadlo Airbusu, které jako standard zavedlo palivovou nádrž v horizontálním stabilizátoru (ocasu) pro aktivní řízení vyvážení letadla během letu.':
      'The first Airbus aircraft to introduce as standard a fuel tank in the horizontal stabilizer (tail) for active fuel trim management of the aircraft during flight.',

    // A320
    'Původní verze modelu A320. Bylo vyrobeno pouhých 21 kusů, především pro Air France a British Airways. Na rozdíl od verze -200 neměla tato verze charakteristické winglety (Wingtip fences) a měla menší palivové nádrže a nižší vzletovou hmotnost.':
      'The original version of the A320 model. Only 21 units were built, primarily for Air France and British Airways. Unlike the -200 version, this version did not have the characteristic winglets (Wingtip fences) and had smaller fuel tanks and a lower takeoff weight.',
    'Jediná verze řady A320, která zcela postrádala winglety na koncích křídel a byla vyrobena ve velmi omezeném počtu.':
      'The only version of the A320 series that completely lacked winglets on the wing tips and was produced in a very limited quantity.',
    'Hlavní produkční verze klasické generace A320. Přidala winglety (wingtip fences) a zvýšenou celkovou vzletovou hmotnost spolu se zvětšenými palivovými nádržemi, což z ní udělalo globální bestseller na krátkých a středních tratích.':
      'The main production version of the classic A320 generation. It added winglets (wingtip fences) and an increased maximum takeoff weight along with larger fuel tanks, making it a global bestseller on short and medium-haul routes.',
    'Nejprodávanější model klasické generace, definující parametry nízkonákladového letectví po celém světě.':
      'The best-selling model of the classic generation, defining the parameters of low-cost aviation worldwide.',
    'Prodloužená verze původního A320 nabízející vyšší kapacitu až pro 220 cestujících. Verze -100 však trpěla kratším doletem kvůli absenci dodatečných palivových nádrží, které by kompenzovaly zvýšenou hmotnost delšího trupu.':
      'Stretched version of the original A320 offering higher capacity for up to 220 passengers. However, the -100 version suffered from a shorter range due to the lack of additional fuel tanks to compensate for the increased weight of the longer fuselage.',
    'První prodloužená varianta A320 vyvinutá v německém Hamburku namísto francouzského Toulouse.':
      'The first stretched variant of the A320 developed in Hamburg, Germany, instead of Toulouse, France.',
    'Vylepšená verze prodlouženého A321 se zvýšenou vzletovou hmotností a dodatečnými palivovými nádržemi umístěnými v nákladovém prostoru. To umožnilo plnohodnotný transkontinentální dolet se zachováním vysoké kapacity.':
      'Improved version of the stretched A321 with increased takeoff weight and additional fuel tanks located in the cargo hold. This allowed a full transcontinental range while maintaining high capacity.',
    'Nabízí skvělý dolet na středních tratích, což z něj dělá ideální stroj pro vytížené charterové a linkové lety.':
      'Offers excellent range on medium routes, making it an ideal aircraft for busy charter and scheduled flights.',

    // A350
    'Ultra dálková verze (Ultra Long Range) odvozená z modelu -900. Díky modifikovanému palivovému systému a vyšší maximální vzletové hmotnosti dokáže bez mezipřistání uletět až 18 000 km. Provozují ji především Singapore Airlines na nejdelších komerčních linkách světa ze Singapuru do New Yorku.':
      'Ultra long-range version (Ultra Long Range) derived from the -900 model. Thanks to a modified fuel system and higher maximum takeoff weight, it can fly up to 18,000 km non-stop. It is operated primarily by Singapore Airlines on the world\'s longest commercial routes from Singapore to New York.',
    'Schopnost nepřetržitého letu po dobu přes 20 hodin bez nutnosti instalace dodatečných palivových nádrží v nákladovém prostoru, pouze optimalizací stávajícího objemu křídel.':
      'Capable of continuous flight for over 20 hours without the need for installing auxiliary fuel tanks in the cargo hold, done purely by optimizing the existing wing fuel volume.',
    'Plně nákladní verze nové generace postavená s rozsáhlým využitím kompozitů. Nabízí moderní a vysoce efektivní letové vlastnosti, sníženou spotřebu paliva až o 40 % oproti starším typům a velké břišní i boční cargo dveře.':
      'A next-generation all-cargo version built with extensive use of composites. It offers modern and highly efficient flight characteristics, fuel burn reduction of up to 40% compared to older types, and large lower-deck and main-deck cargo doors.',
    'Jediné cargo letadlo, které plně splňuje nejnovější nejpřísnější emisní limity ICAO pro rok 2028 díky své ultralehké kompozitní konstrukci.':
      'The only cargo aircraft fully compliant with the latest and most stringent ICAO emission limits for 2028, thanks to its ultra-light composite design.',

    // A380
    'Největší osobní dopravní letadlo na světě, přezdívané „Superjumbo“. S plně dvoupatrovou kabinou nabízí ohromující prostor, jenž luxusní letecké společnosti využily k vybudování barů, sprchových koutů či soukromých apartmánů. Přestože byla výroba ukončena, zůstává symbolem gigantické letecké éry.':
      'The largest passenger airliner in the world, nicknamed the "Superjumbo". With a full double-deck cabin, it offers spectacular space, which premium airlines used to build lounges, onboard showers, or private suites. Although production has ended, it remains the ultimate icon of a monumental aviation era.',
    'Jeho celková plocha křídel je tak obrovská, že by na ni bylo možné zaparkovat téměř 70 osobních automobilů, což dává stroji perfektní vztlak.':
      'Its total wing area is so massive that it could accommodate nearly 70 parked passenger cars, providing the aircraft with superb aerodynamic lift.',

    // Beluga
    'Unikátní nákladní letadlo určené výhradně pro převoz nadrozměrných leteckých komponentů (např. celých křídel či částí trupů) mezi jednotlivými evropskými továrnami Airbusu. Otevřená příď a ohromující nafouklý horní trup mu vysloužily trefnou přezdívku podle sněhobílé arktické velryby Belugy.':
      'A unique freighter aircraft designed exclusively for carrying oversized aviation components (e.g. entire wings or fuselage sections) between individual European Airbus factories. Its swing-open nose and massive, puffed-up upper fuselage earned it a fitting nickname after the snow-white Arctic Beluga whale.',
    'Má jeden z nejobjemnějších nákladových prostorů na světě, který mu umožňuje spolknout v podstatě celou sekci trupu nového dálkového Airbusu.':
      'It has one of the largest cargo volume capacities in the world, allowing it to swallow basically an entire fuselage section of a new long-haul Airbus.',

    // Boeing 787s
    'Základní a nejkratší verze rodiny Dreamliner, zavedená do služby v roce 2011. Byla navržena s cílem nahradit starší stroje Boeing 767 a nabídnout mimořádnou efektivitu na dálkových linkách s nižším počtem cestujících.':
      'The base and shortest version of the Dreamliner family, introduced into service in 2011. It was designed to replace older Boeing 767 aircraft and offer exceptional efficiency on long-haul routes with lower passenger numbers.',
    'Je to vůbec první dálkové letadlo na světě, jehož drak a nosná kostra jsou tvořeny z více než 50 % z pokročilých polymerních uhlíkových kompozitů. Pevnost kompozitů zaručuje, že se křídla za letu ohýbají nahoru s průhybem až 3 metry.':
      'It is the world\'s first long-haul commercial aircraft whose airframe and main structure are made of over 50% advanced polymer carbon composites. The strength of the composites allows the wings to flex upwards by up to 3 meters during flight.',
    'Prodloužená verze Dreamlineru o více než 6 metrů, která se stala komerčně nejprodávanějším a nejpopulárnějším modelem celé řady. Nabízí skvělý poměr mezi doletem, kapacitou a provozními náklady.':
      'An extended version of the Dreamliner, stretched by over 6 meters, which became the best-selling and most popular model of the entire family. It offers an excellent balance of range, capacity, and operating costs.',
    'Díky vylepšené aerodynamice a větší kapacitě paliva má ze všech tří modelů Dreamlineru vůbec nejdelší dolet, dosahující přes 14 000 kilometrů.':
      'Thanks to improved aerodynamics and larger fuel capacity, this variant has the longest range of all three Dreamliner models, reaching over 14,000 kilometers.',
    'Nejdelší verze rodiny 787, prodloužená o dalších 5,5 metru oproti verzi -9. Je navržena tak, aby konkurovala Airbusu A350-900 a nahradila starší letadla na linkách s velkou hustotou provozu, přičemž sdílí více než 95 % dílů s verzí -9.':
      'The longest version of the 787 family, stretched by an additional 5.5 meters compared to the -9. It is designed to compete with the Airbus A350-900 and replace older aircraft on high-density routes, while sharing over 95% of its parts with the -9.',
    'Díky prodlouženému trupu pojme až o 15 % více cestujících než verze -9, a přesto vykazuje o 25 % nižší emise a spotřebu na sedadlo než letadla, která nahrazuje.':
      'Thanks to the stretched fuselage, it carries up to 15% more passengers than the -9, yet offers 25% lower emissions and fuel burn per seat than the aircraft it replaces.',

    // Concorde
    'Jediné komerčně úspěšné nadzvukové transportní letadlo historie vyvinuté společně britskými a francouzskými inženýry. Létalo rychlostí přesahující Mach 2 (dvojnásobek rychlosti zvuku), díky čemuž dokázalo přelétnout Atlantský oceán za necelé 3,5 hodiny. Provoz ukončen v roce 2003.':
      'The only commercially successful supersonic passenger transport aircraft in history, developed jointly by British and French engineers. It flew at speeds exceeding Mach 2 (twice the speed of sound), allowing it to cross the Atlantic Ocean in less than 3.5 hours. It was retired in 2003.',
    'Jedno z pouhých dvou nadzvukových osobních letadel, které kdy vstoupily do komerční služby, nabízející cestování rychlejší než kulka.':
      'One of only two supersonic passenger airliners to ever enter commercial service, offering travel faster than a bullet.'
  };

  if (overrides[text]) {
    return overrides[text];
  }

  // Pre-process and let's replace common words & phrases first
  let translation = text
    .replace(/„/g, '"')
    .replace(/“/g, '"');

  // Common sentence beginnings / key patterns
  const patterns: { cz: RegExp; en: string }[] = [
    { cz: /Úzkotrupé dopravní letadlo/g, en: 'Narrow-body commercial aircraft' },
    { cz: /Širokotrupé dopravní letadlo/g, en: 'Wide-body commercial aircraft' },
    { cz: /Jedná se o/g, en: 'It is' },
    { cz: /Je navržen pro/g, en: 'Designed for' },
    { cz: /Je speciálně navržena pro/g, en: 'Specially designed for' },
    { cz: /byl vytvořen jako/g, en: 'was created as' },
    { cz: /Jeho hlavním cílem/g, en: 'Its main goal' },
    { cz: /bylo nahradit/g, en: 'was to replace' },
    { cz: /vyniká v/g, en: 'excels in' },
    { cz: /nabízí/g, en: 'offers' },
    { cz: /Prodloužená verze/g, en: 'An extended version' },
    { cz: /Základní verze/g, en: 'The base version' },
    { cz: /Nejkratší verze/g, en: 'The shortest version' },
    { cz: /Nejdelší verze/g, en: 'The longest version' },
    { cz: /velmi populární/g, en: 'very popular' },
    { cz: /nejúspěšnější/g, en: 'the most successful' },
    { cz: /nejprodávanější/g, en: 'the best-selling' },
    { cz: /přináší/g, en: 'brings' },
    { cz: /novou úroveň/g, en: 'a new level' },
    { cz: /palivové účinnosti/g, en: 'fuel efficiency' },
    { cz: /vynikající dolet/g, en: 'excellent range' },
    { cz: /krátkých až středně dlouhých/g, en: 'short to medium-haul' },
    { cz: /na dálkových linkách/g, en: 'on long-haul routes' },
    { cz: /moderním designem/g, en: 'modern design' },
    { cz: /kompozitních materiálů/g, en: 'composite materials' },
    { cz: /nové generace/g, en: 'new generation' },
    { cz: /hlučnost o/g, en: 'noise levels by' },
    { cz: /provozní náklady/g, en: 'operating costs' },
    { cz: /pasažérů/g, en: 'passengers' },
    { cz: /přelomový/g, en: 'groundbreaking' },
    { cz: /legendární/g, en: 'legendary' },
    { cz: /první letoun/g, en: 'first aircraft' },
    { cz: /na světě/g, en: 'in the world' },
    { cz: /vůbec první/g, en: 'the very first' },
    { cz: /zaveden do služby/g, en: 'introduced into service' },
    { cz: /v roce/g, en: 'in' },
    { cz: /která/g, en: 'which' },
    { cz: /které/g, en: 'which' },
    { cz: /který/g, en: 'which' },
    { cz: /Díky tomu/g, en: 'Thanks to this' },
    { cz: /Díky/g, en: 'Thanks to' },
    { cz: /Je poháněn/g, en: 'It is powered by' },
    { cz: /moderními motory/g, en: 'modern engines' },
    { cz: /letadlo/g, en: 'aircraft' },
    { cz: /letadla/g, en: 'aircraft' },
    { cz: /rodiny/g, en: 'family' },
    { cz: /řady/g, en: 'series' },
    { cz: /komfort/g, en: 'comfort' },
    { cz: /cestujících/g, en: 'passengers' },
    { cz: /dálkové/g, en: 'long-haul' },
    { cz: /regionální/g, en: 'regional' },
    { cz: /střední/g, en: 'medium' },
    { cz: /velké/g, en: 'large' },
    { cz: /vlastnosti/g, en: 'features' },
    { cz: /vyniká/g, en: 'excels' },
  ];

  for (const pattern of patterns) {
    translation = translation.replace(pattern.cz, pattern.en);
  }

  // Define a comprehensive dictionary of Czech words commonly found in the catalog
  // to serve as a deep structural backup replacement layer
  const wordTranslations: Record<string, string> = {
    // Aircraft specifics
    "letadlo": "aircraft",
    "letadla": "aircraft",
    "letadlem": "aircraft",
    "letadlu": "aircraft",
    "letadel": "aircraft",
    "letoun": "aircraft",
    "letounu": "aircraft",
    "letouny": "aircraft",
    "letounům": "aircraft",
    "stroje": "aircraft",
    "stroj": "aircraft",
    "strojem": "aircraft",
    "verze": "version",
    "verzí": "version",
    "verzi": "version",
    "variantou": "variant",
    "varianty": "variants",
    "variantu": "variant",
    "rodiny": "family",
    "rodina": "family",
    "řady": "series",
    "řada": "series",
    "řadě": "series",
    "motor": "engine",
    "motory": "engines",
    "motorů": "engines",
    "motorem": "engine",
    "křídlo": "wing",
    "křídla": "wings",
    "křídel": "wings",
    "kokpit": "cockpit",
    "kokpitu": "cockpit",
    "displeje": "displays",
    "obrazovky": "screens",
    "displeji": "displays",
    "inženýra": "engineer",
    "inženýr": "engineer",
    "palubního": "flight",
    "posádky": "crew",
    "posádka": "crew",
    "pilotů": "pilots",
    "piloti": "pilots",
    "pasažérů": "passengers",
    "pasažéry": "passengers",
    "cestujících": "passengers",
    "cestující": "passengers",
    "sedadel": "seats",
    "sedadla": "seats",
    "třídy": "classes",
    "třídách": "classes",

    // Specs & characteristics
    "dolet": "range",
    "doletem": "range",
    "doletu": "range",
    "rychlost": "speed",
    "rychlostí": "speed",
    "kapacita": "capacity",
    "kapacity": "capacity",
    "kapacitě": "capacity",
    "kapacitou": "capacity",
    "hmotnost": "weight",
    "hmotností": "weight",
    "efektivita": "efficiency",
    "efektivitu": "efficiency",
    "efektivitou": "efficiency",
    "spolehlivost": "reliability",
    "spolehlivostí": "reliability",
    "bezpečnost": "safety",
    "bezpečností": "safety",
    "hospodárnost": "economics",
    "hospodárností": "economics",
    "spotřeba": "consumption",
    "spotřebu": "consumption",
    "emise": "emissions",
    "bestseller": "bestseller",
    "winglety": "winglets",
    "winglet": "winglet",
    "aerodynamika": "aerodynamics",
    "aerodynamiku": "aerodynamics",
    "aerodynamikou": "aerodynamics",
    "vlastnosti": "characteristics",
    "vlastnostmi": "characteristics",
    "konstrukce": "construction",
    "trup": "fuselage",
    "trupu": "fuselage",
    "trupem": "fuselage",
    "palivo": "fuel",
    "paliva": "fuel",
    "nádrž": "tank",
    "nádrže": "tanks",
    "nádrží": "tanks",
    "kabina": "cabin",
    "kabiny": "cabin",
    "kabinou": "cabin",
    "prostor": "space",
    "prostoru": "space",
    "nákladového": "cargo",
    "nákladu": "cargo",
    "náklad": "cargo",
    "materiálů": "materials",
    "materiály": "materials",
    "slitiny": "alloys",
    "uhlíkových": "carbon",
    "kompozitních": "composite",
    "kompozity": "composites",

    // Geographics & origins
    "světě": "world",
    "světa": "world",
    "unie": "Union",
    "státy": "States",
    "evropský": "European",
    "evropská": "European",
    "evropské": "European",
    "americký": "American",
    "americká": "American",
    "americké": "American",
    "francouzský": "French",
    "francouzská": "French",
    "německý": "German",
    "německá": "German",
    "britský": "British",
    "britská": "British",
    "ruský": "Russian",
    "ruská": "Russian",
    "sovětský": "Soviet",
    "sovětská": "Soviet",
    "brazilský": "Brazilian",
    "brazilská": "Brazilian",
    "kanadský": "Canadian",
    "kanadská": "Canadian",
    "japonský": "Japanese",
    "japonská": "Japanese",
    "ukrajinský": "Ukrainian",
    "továrnami": "factories",
    "továrny": "factories",
    "výrobce": "manufacturer",
    "přepravců": "carriers",
    "aerolinií": "airlines",
    "aerolinie": "airlines",
    "společností": "airlines",
    "společnosti": "airlines",
    "zákazníci": "customers",

    // Time & history
    "původní": "original",
    "základní": "base",
    "první": "first",
    "druhý": "second",
    "třetí": "third",
    "historie": "history",
    "historii": "history",
    "historický": "historical",
    "dnes": "today",
    "dodnes": "to this day",
    "stále": "still",
    "rok": "year",
    "letectví": "aviation",
    "éra": "era",
    "éry": "era",
    "vzlétl": "first flew",
    "vzlétla": "first flew",
    "vzlétlo": "first flew",
    "představen": "introduced",
    "představeno": "introduced",
    "zaveden": "introduced",
    "zavedena": "introduced",
    "služby": "service",
    "službě": "service",
    "službu": "service",
    "provozu": "service",
    "provoz": "service",
    "výroby": "production",
    "výroba": "production",
    "vyvinut": "developed",
    "vyvinuta": "developed",
    "vyrobeno": "built",
    "vyrobena": "built",
    "vyráběný": "produced",

    // Adjectives & adverbs
    "největší": "largest",
    "nejmenší": "smallest",
    "nejkratší": "shortest",
    "nejdelší": "longest",
    "moderní": "modern",
    "modernější": "more modern",
    "nejmodernější": "most modern",
    "úzkotrupý": "narrow-body",
    "úzkotrupá": "narrow-body",
    "širokotrupý": "wide-body",
    "širokotrupá": "wide-body",
    "regionální": "regional",
    "nadzvukový": "supersonic",
    "nadzvuková": "supersonic",
    "nákladní": "freighter",
    "osobní": "passenger",
    "komerční": "commercial",
    "civilní": "civil",
    "dálkový": "long-haul",
    "dálková": "long-haul",
    "dálkové": "long-haul",
    "krátký": "short",
    "krátké": "short",
    "střední": "medium",
    "úspěšný": "successful",
    "nejúspěšnější": "most successful",
    "populární": "popular",
    "nejpopulárnější": "most popular",
    "prodávanější": "better-selling",
    "nejprodávanější": "best-selling",
    "efektivní": "efficient",
    "nejefektivnější": "most efficient",
    "hospodárný": "economical",
    "spolehlivý": "reliable",
    "bezpečný": "safe",
    "klasické": "classic",
    "klasická": "classic",
    "legendární": "legendary",
    "přelomový": "groundbreaking",
    "unikátní": "unique",
    "výjimečný": "exceptional",
    "specifický": "specific",
    "charakteristické": "characteristic",
    "charakteristická": "characteristic",
    "nové": "new",
    "nová": "new",
    "nový": "new",
    "starší": "older",
    "staré": "old",
    "dalších": "additional",
    "dodatečné": "additional",
    "přidané": "added",
    "vyšší": "higher",
    "větší": "larger",
    "menší": "smaller",
    "kratší": "shorter",
    "delší": "longer",
    "pouze": "only",
    "především": "mainly",
    "hlavně": "mainly",
    "zejména": "especially",
    "přestože": "although",
    "však": "however",
    "nicméně": "however",
    "také": "also",
    "plně": "fully",
    "zcela": "fully",
    "extrémně": "extremely",
    "vysoce": "highly",
    "mimořádně": "exceptionally",
    "velmi": "very",
    "špičkové": "top-tier",
    "vynikající": "excellent",
    "obří": "giant",

    // Verbs
    "představuje": "represents",
    "představoval": "represented",
    "stanovuje": "sets",
    "vyniká": "excels",
    "vynikají": "excel",
    "nabízí": "offers",
    "přináší": "brings",
    "přinesl": "brought",
    "umožňuje": "allows",
    "umožnil": "enabled",
    "dokáže": "can",
    "může": "can",
    "mohou": "can",
    "dosahuje": "reaches",
    "dosáhl": "reached",
    "překonat": "surpass",
    "překonal": "surpassed",
    "nahradit": "replace",
    "sdílí": "shares",
    "tvoří": "forms",
    "vstoupil": "entered",
    "prokázal": "proved",
  };

  // Perform word-by-word fallback check for leftover Czech words in translation
  // splitting by boundaries, keeping structure and punctuation intact
  const words = translation.split(' ');
  const processedWords = words.map((word) => {
    if (!word) return '';
    
    // Strip punctuation
    const leadingPunct = word.match(/^["'„(‘]*/)?.[0] || '';
    const trailingPunct = word.match(/[.,\/#!$%\^&\*;:{}=\-_`~()”?“'’]*$/)?.[0] || '';
    const coreWord = word.slice(leadingPunct.length, word.length - trailingPunct.length);
    const lowerCore = coreWord.toLowerCase();

    if (wordTranslations[lowerCore]) {
      const translatedCore = wordTranslations[lowerCore];
      // Keep casing: if original was fully uppercase, or capitalized
      let finalCore = translatedCore;
      if (coreWord && coreWord[0] === coreWord[0].toUpperCase()) {
        finalCore = translatedCore[0].toUpperCase() + translatedCore.slice(1);
      }
      return leadingPunct + finalCore + trailingPunct;
    }
    return word;
  });

  translation = processedWords.join(' ');

  if (isUniqueness) {
    if (translation.startsWith('„') && translation.endsWith('“')) {
      translation = translation.substring(1, translation.length - 1);
    }
    if (!translation.startsWith('"') && !translation.endsWith('"')) {
      translation = `"${translation}"`;
    }
  }

  return translation;
}
