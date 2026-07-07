// Automatically recovered, reconstructed and unified translations file
import { AIRCRAFT_TRANSLATIONS_EN } from './aircraft_translations_data';
import { AIRCRAFT_DATA } from './data';

// --- MAIN UI TRANSLATIONS ---
export const TRANSLATIONS: Record<'CZ' | 'EN', Record<string, string>> = {
  CZ: {
    'appName': 'AirCatalog',
    'catalogSubtitle': 'KATALOG {count} DOPRAVNÍCH LETADEL',
    'compareButton': 'Porovnat letadla',
    'compareButtonMobile': 'Porovnat',
    'searchPlaceholder': 'Hledat letadlo (např. Boeing 737)...',
    'seenSectionTitle': 'Viděno naživo',
    'seenRatio': '{seen} z {total} ({percent}%)',
    'removeFromSeen': 'Odebrat ze seznamu',
    'backToListMobile': 'ZPĚT NA SEZNAM',
    'firstFlight': 'První let: {year}',
    'countryOfOrigin': 'Země původu: {country}',
    'enginesCount': '{count}× motor',
    'enginesLabel': 'motor',
    'funFactHeader': 'ZAJÍMAVOST LETU',
    'funFactFooter': 'Fascinující detail konstrukce',
    'specsHeader': 'Technické specifikace & výkonnostní data',
    'specsSubheader': 'METRICKÉ HODNOTY SI',
    'metricLabel': 'METRICKÉ HODNOTY SI',
    'capacityCardTitle': 'Kapacita sedadel',
    'capacityCardSubtitle': 'Maximální / Typická',
    'capacityCardMaxTypical': 'pasažérů',
    'capacityCardTypicalLabel': 'Typické uspořádání:',
    'rangeCardTitle': 'Maximální dolet',
    'rangeCardSubtitle': 'Maximální dolet',
    'rangeCardCompareScale': 'Procentuální srovnání',
    'speedCardTitle': 'Cestovní rychlost',
    'speedCardSubtitle': 'Průměrná rychlost letadla',
    'speedCardMachLabel': 'Mach: {mach} Ma',
    'supersonicLabel': '(Nadzvuková)',
    'dimensionsCardTitle': 'Konstrukční rozměry',
    'dimensionsCardSub': 'Geometrie & křídla',
    'overallLength': 'Celková délka letadla:',
    'wingspan': 'Rozpětí křídel:',
    'height': 'Výška:',
    'fuselageWidth': 'Šířka trupu:',
    'wingArea': 'Plocha křídel:',
    'mtowCardTitle': 'Vzletová hmotnost (MTOW)',
    'mtowCardSub': 'Maximální vzletová váha',
    'mtowCardDesc': 'Celková váha letadla včetně pasažérů, nákladu a veškerého paliva k odletu.',
    'enginesCardTitle': 'Pohonná jednotka',
    'enginesCardSub': 'Typ motoru',
    'enginesCardListLabel': 'Motory:',
    'comparisonHeader': 'Porovnání s průměrem letky',
    'comparisonSubheader': 'Srovnání technických parametrů s průměrem letky',
    'comparisonDesc': 'Statistiky porovnávají hodnoty {name} se středními hodnotami (aritmetickým průměrem) všech civilních modelů v katalogu.',
    'comparisonEngineActive': 'Srovnávací Engine aktivní',
    'comparisonAverage': 'Průměr: {val}',
    'comparisonPassengerPrefix': 'pasažérů',
    'helpGuidelines': 'Tento přehled slouží jako vzdělávací encyklopedie dopravního letectva. Informace a rozměry letadel vychází z technických příruček výrobců Airbus, Boeing, Embraer, Bombardier a archivních materiálů.',
    'comparisonTitle': 'Srovnávač Letadel',
    'comparisonSubtitle': 'Porovnejte technické parametry dvou vybraných letadel.',
    'slot1Placeholder': 'Vyberte 1. letadlo',
    'slot2Placeholder': 'Vyberte 2. letadlo k porovnání',
    'searchDropdownPlaceholder': 'Hledat podle názvu nebo značky...',
    'noResults': 'Žádná letadla nebyla nalezena.',
    'changeBtn': 'Změnit',
    'deleteBtn': 'Smazat',
    'orSelectText': 'nebo vyberte ze seznamu níže',
    'diffMore': 'O {p} % víc',
    'diffLess': 'O {p} % méně',
    'diffSame': 'Stejné',
    'notSelected': 'Není vybráno',
    'closeBtn': 'Zavřít',
    'emptyList': 'Seznam je prázdný',
    'changeLanguage': 'Změnit jazyk',
    'czLang': 'Čeština',
    'enLang': 'English (EN)',
    'changeTheme': 'Motiv',
    'themeLight': 'Světlý',
    'themeDark': 'Tmavý',
    'logoDisclaimer': 'Loga společností jsou pouze přibližné z důvodu autorských práv.',
  },
  EN: {
    'appName': 'AirCatalog',
    'catalogSubtitle': 'CATALOG OF {count} COMMERCIAL AIRCRAFT',
    'compareButton': 'Compare aircraft',
    'compareButtonMobile': 'Compare',
    'searchPlaceholder': 'Search aircraft (e.g. Boeing 737)...',
    'seenSectionTitle': 'Spotted in real life',
    'seenRatio': '{seen} of {total} ({percent}%)',
    'removeFromSeen': 'Remove from list',
    'backToListMobile': 'BACK TO LIST',
    'firstFlight': 'First flight: {year}',
    'countryOfOrigin': 'Country of origin: {country}',
    'enginesCount': '{count}× engines',
    'enginesLabel': 'engine',
    'funFactHeader': 'AIRCRAFT FUN FACT',
    'funFactFooter': 'Fascinating structural detail',
    'specsHeader': 'Technical specs & performance data',
    'specsSubheader': 'METRIC SI VALUES',
    'metricLabel': 'METRIC SI VALUES',
    'capacityCardTitle': 'Seating capacity',
    'capacityCardSubtitle': 'Maximum / Typical',
    'capacityCardMaxTypical': 'passengers',
    'capacityCardTypicalLabel': 'Typical configuration:',
    'rangeCardTitle': 'Maximum range',
    'rangeCardSubtitle': 'Maximum range',
    'rangeCardCompareScale': 'Percentage relative comparison',
    'speedCardTitle': 'Cruising speed',
    'speedCardSubtitle': 'Average aircraft speed',
    'speedCardMachLabel': 'Mach: {mach} Ma',
    'supersonicLabel': '(Supersonic)',
    'dimensionsCardTitle': 'Structural dimensions',
    'dimensionsCardSub': 'Geometry & wings',
    'overallLength': 'Overall aircraft length:',
    'wingspan': 'Wingspan:',
    'height': 'Height:',
    'fuselageWidth': 'Fuselage width:',
    'wingArea': 'Wing area:',
    'mtowCardTitle': 'Takeoff weight (MTOW)',
    'mtowCardSub': 'Maximum takeoff weight',
    'mtowCardDesc': 'Total weight of the aircraft including passengers, cargo, and all fuel at takeoff.',
    'enginesCardTitle': 'Powerplant',
    'enginesCardSub': 'Engine type',
    'enginesCardListLabel': 'Engines:',
    'comparisonHeader': 'Comparison with fleet average',
    'comparisonSubheader': 'Aircraft technical metrics compared to average',
    'comparisonDesc': 'Statistics compare the metrics of {name} with the average (arithmetic mean) of all commercial aircraft in this database.',
    'comparisonEngineActive': 'Comparator Engine active',
    'comparisonAverage': 'Average: {val}',
    'comparisonPassengerPrefix': 'passengers',
    'helpGuidelines': 'This catalog serves as an educational encyclopedia of passenger aviation. Aircraft details and measurements are retrieved from official manufacturer technical guides by Airbus, Boeing, Embraer, Bombardier, and historical databases.',
    'comparisonTitle': 'Aircraft Comparator',
    'comparisonSubtitle': 'Compare technical metrics of two selected aircraft side-by-side.',
    'slot1Placeholder': 'Select 1st aircraft',
    'slot2Placeholder': 'Select 2nd aircraft to compare',
    'searchDropdownPlaceholder': 'Search by model name or brand...',
    'noResults': 'No matches found.',
    'changeBtn': 'Change',
    'deleteBtn': 'Delete',
    'orSelectText': 'or select from the list below',
    'diffMore': '{p}% more',
    'diffLess': '{p}% less',
    'diffSame': 'Same',
    'notSelected': 'Not selected',
    'closeBtn': 'Close',
    'emptyList': 'List is empty',
    'changeLanguage': 'Language',
    'czLang': 'Czech',
    'enLang': 'English (EN)',
    'changeTheme': 'Theme',
    'themeLight': 'Light',
    'themeDark': 'Dark',
    'logoDisclaimer': 'Company logos are only approximate due to copyright reasons.',
  }
};

// --- AIRPORT DATA TRANSLATIONS ---
export const airportTranslations: Record<string, string> = {
  'Belgie': 'Belgium',
  'Maďarsko': 'Hungary',
  'Rumunsko': 'Romania',
  'Bulharsko': 'Bulgaria',
  'Srbsko': 'Serbia',
  'Chorvatsko': 'Croatia',
  'Slovinsko': 'Slovenia',
  'Albánie': 'Albania',
  'Severní Makedonie': 'North Macedonia',
  'Černá Hora': 'Montenegro',
  'Bosna a Hercegovina': 'Bosnia and Herzegovina',
  'Lucembursko': 'Luxembourg',
  'Švýcarsko/Francie': 'Switzerland/France',
  'Švédsko': 'Sweden',
  'Nizozemsko': 'Netherlands',
  'Kosovo': 'Kosovo',
  'Island': 'Iceland',
  'Faerské ostrovy': 'Faroe Islands',
  'Saúdská Arábie': 'Saudi Arabia',
  'Omán': 'Oman',
  'Kuvajt': 'Kuwait',
  'Bahrajn': 'Bahrain',
  'Spojené arabské emiráty': 'United Arab Emirates',
  'Izrael': 'Israel',
  'Jordánsko': 'Jordan',
  'Libanon': 'Lebanon',
  'Irák': 'Iraq',
  'Írán': 'Iran',
  'Kypr': 'Cyprus',
  'Severní Kypr': 'Northern Cyprus',
  'Guam': 'Guam',
  'Severní Mariany': 'Northern Mariana Islands',
  'Portoriko': 'Puerto Rico',
  'Americké Panenské ostrovy': 'U.S. Virgin Islands',
  'Americká Samoa': 'American Samoa',
  'Menší odlehlé ostrovy USA': 'U.S. Minor Outlying Islands',
  'Marshallovy ostrovy': 'Marshall Islands',
  'Palau': 'Palau',
  'Mikronésie': 'Micronesia',
  'Kanada': 'Canada',
  'Mexiko': 'Mexico',
  'Guatemala': 'Guatemala',
  'El Salvador': 'El Salvador',
  'Honduras': 'Honduras',
  'Nikaragua': 'Nicaragua',
  'Kostarika': 'Costa Rica',
  'Panama': 'Panama',
  'Bahamy': 'Bahamas',
  'Kuba': 'Cuba',
  'Jamajka': 'Jamaica',
  'Dominikánská republika': 'Dominican Republic',
  'Haiti': 'Haiti',
  'Kajmanské ostrovy': 'Cayman Islands',
  'Turks a Caicos': 'Turks and Caicos Islands',
  'Svatý Martin': 'Sint Maarten',
  'Svatý Bartoloměj': 'Saint Barthélemy',
  'Anguilla': 'Anguilla',
  'Antigua a Barbuda': 'Antigua and Barbuda',
  'Svatý Kryštof a Nevis': 'Saint Kitts and Nevis',
  'Montserrat': 'Montserrat',
  'Guadeloupe': 'Guadeloupe',
  'Dominika': 'Dominica',
  'Martinik': 'Martinique',
  'Svatá Lucie': 'Saint Lucia',
  'Svatý Vincenc a Grenadiny': 'Saint Vincent and the Grenadines',
  'Grenada': 'Grenada',
  'Barbados': 'Barbados',
  'Trinidad a Tobago': 'Trinidad and Tobago',
  'Curaçao': 'Curaçao',
  'Aruba': 'Aruba',
  'Karibské Nizozemsko': 'Caribbean Netherlands',
  'Kolumbie': 'Colombia',
  'Venezuela': 'Venezuela',
  'Guyana': 'Guyana',
  'Surinam': 'Suriname',
  'Francouzská Guyana': 'French Guiana',
  'Ekvádor': 'Ecuador',
  'Peru': 'Peru',
  'Bolívie': 'Bolivia',
  'Paraguay': 'Paraguay',
  'Uruguay': 'Uruguay',
  'Argentina': 'Argentina',
  'Brazílie': 'Brazil',
  'Chile': 'Chile',
  'Austrálie': 'Australia',
  'Vnější území Austrálie': 'External Territories of Australia',
  'Nový Zéland': 'New Zealand',
  'Papua Nová Guinea': 'Papua New Guinea',
  'Fidži': 'Fiji',
  'Nová Kaledonie': 'New Caledonia',
  'Vanuatu': 'Vanuatu',
  'Šalamounovy ostrovy': 'Solomon Islands',
  'Kiribati': 'Kiribati',
  'Tuvalu': 'Tuvalu',
  'Tonga': 'Tonga',
  'Samoa': 'Samoa',
  'Cookovy ostrovy': 'Cook Islands',
  'Niue': 'Niue',
  'Francouzská Polynésie': 'French Polynesia',
  'Wallis a Futuna': 'Wallis and Futuna',
  'Nauru': 'Nauru',
  'Japonsko': 'Japan',
  'Jižní Korea': 'South Korea',
  'Mnichov': 'Munich',
  'Brusel': 'Brussels',
  'Ženeva': 'Geneva',
  'Budapešť': 'Budapest',
  'Bukurešť': 'Bucharest',
  'Sofie': 'Sofia',
  'Bělehrad': 'Belgrade',
  'Záhřeb': 'Zagreb',
  'Lublaň': 'Ljubljana',
  'Tirana': 'Tirana',
  'Skopje': 'Skopje',
  'Krakov': 'Krakow',
  'Katovice': 'Katowice',
  'Gdaňsk': 'Gdansk',
  'Vratislav': 'Wroclaw',
  'Poznaň': 'Poznan',
  'Košice': 'Kosice',
  'Salcburk': 'Salzburg',
  'Linec': 'Linz',
  'Štýrský Hradec': 'Graz',
  'Hamburk': 'Hamburg',
  'Berlín Braniborsko': 'Berlin Brandenburg',
  'Berlín': 'Berlin',
  'Lipsko': 'Leipzig',
  'Drážďany': 'Dresden',
  'Norimberk': 'Nuremberg',
  'Brémy': 'Bremen',
  'Nice': 'Nice',
  'Štrasburk': 'Strasbourg',
  'Basilej': 'Basel',
  'Lutyš': 'Liege',
  'Ostende': 'Ostend',
  'Brugy': 'Bruges',
  'Rijád': 'Riyadh',
  'Džidda': 'Jeddah',
  'Dammám': 'Dammam',
  'Medína': 'Medina',
  'Manáma': 'Manama',
  'Šardžá': 'Sharjah',
  'Rás al-Chajma': 'Ras Al Khaimah',
  'Al-Ajn': 'Al Ain',
  'Bejrút': 'Beirut',
  'Erbíl': 'Erbil',
  'Bagdád': 'Baghdad',
  'Teherán': 'Tehran',
  'Mašhad': 'Mashhad',
  'Šíráz': 'Shiraz',
  'Isfahán': 'Isfahan',
  'Tabríz': 'Tabriz',
  'Larnaka': 'Larnaca',
  'Pafos': 'Paphos',
  'Nikósie': 'Nicosia',
  'Peking': 'Beijing',
  'Káhira': 'Cairo',
  'Kapské Město': 'Cape Town',
  'Ósaka': 'Osaka',
  'Tokio': 'Tokyo',
  'Soul': 'Seoul',
  'Letiště Václava Havla Praha': 'Prague Václav Havel Airport',
  'Praha': 'Prague',
  'Česká republika': 'Czech Republic',
  'Největší mezinárodní letiště v České republice, dříve známé jako Letiště Praha-Ruzyně. Slouží jako hlavní základna pro letecké společnosti Smartwings a Czech Airlines. Nachází se na severozápadním okraji Prahy.': 'The largest international airport in the Czech Republic, formerly known as Prague-Ruzyně Airport. It serves as the main base for Smartwings and Czech Airlines, and is located on the northwestern edge of Prague.',
  'Původní terminál 4 byl postaven v roce 1937 v unikátním stylu české meziválečné avantgardy a získal zlatou medaili na Mezinárodní výstavě umění a techniky v Paříži.': 'The original Terminal 4 was built in 1937 in a unique Czech interwar avant-garde style and won a gold medal at the International Exhibition of Art and Technology in Paris.',
  'Letiště Londýn Heathrow': 'London Heathrow Airport',
  'Londýn': 'London',
  'Velká Británie': 'United Kingdom',
  'Nejrušnější letiště v Evropě a jedno z nejvýznamnějších globálních center. Slouží jako hlavní uzel pro národního dopravce British Airways a aerolinky Virgin Atlantic.': 'The busiest airport in Europe and one of the most prominent global aviation hubs. It serves as the main hub for the national carrier British Airways and Virgin Atlantic.',
  'Patří k nejvíce vytíženým letištím se dvěma dráhami na světě. Dráhy jsou využívány v režimu střídání, aby se ulevilo obyvatom pod příletovými koridory od hluku.': 'It ranks among the busiest two-runway airports in the world. The runways are used in an alternating pattern to provide noise relief for residents living under the flight paths.',
  'Patří k nejvíce vytíženým letištím se dvěma dráhami na světě. Dráhy jsou využívány v režimu střídání, aby se ulevilo obyvatelům pod příletovými koridory od hluku.': 'It ranks among the busiest two-runway airports in the world. The runways are used in an alternating pattern to provide noise relief for residents living under the flight paths.',
  'Letiště Frankfurt nad Mohanem': 'Frankfurt Airport',
  'Frankfurt': 'Frankfurt',
  'Německo': 'Germany',
  'Hlavní německé letiště a největší uzel společnosti Lufthansa. Je jedním z nejdůležitějších přestupních bodů a nákladních letišť v celé Evropě.': 'The primary German airport and Lufthansa\'s main hub. It is one of the most important passenger transfer points and cargo airports in Europe.',
  'Vybaveno pokročilým podzemním automatizovaným systémem pro přepravu zavazadel o délce přes 80 km, který odbaví tisíce kufrů za hodinu.': 'It features an advanced underground automated baggage conveyor system spanning over 80 km, handling thousands of suitcases per hour.',
  'Letiště Charlese de Gaulla Paříž': 'Paris Charles de Gaulle Airport',
  'Paříž': 'Paris',
  'Francie': 'France',
  'Největší francouzské letiště pojmenované po generálovi a prezidentovi Charlesi de Gaullovi. Slouží jako hlavní uzel pro Air France a alianci SkyTeam v Evropě.': 'The largest French airport, named after general and president Charles de Gaulle. It serves as the main hub for Air France and the SkyTeam alliance in Europe.',
  'Kruhový Terminál 1 má futuristický design s prosklenými tubusy a eskalátory křižujícími středovou halu, což se stalo ikonickým prvkem řady sci-fi filmů.': 'The circular Terminal 1 features a futuristic design with glass tubes and escalators crisscrossing the central atrium, which has become an iconic element in several sci-fi films.',
  'Letiště Amsterdam Schiphol': 'Amsterdam Airport Schiphol',
  'Amsterdam': 'Amsterdam',
  'Důležitý evropský uzel s unikátním konceptem jednoho obřího terminálu rozděleného na mola. Je hlavní bází pro národního dopravce KLM.': 'A major European hub with a unique single-terminal concept divided into piers. It is the primary base for the national carrier KLM.',
  'Nachází se na dně bývalého jezera Haarlemmerbmeer, což znamená, že celá plocha leží přibližně 3 metry pod hladinou moře.': 'It is built on the floor of the former Haarlemmerbmeer lake, which means the entire airport lies approximately 3 meters below sea level.',
  'Letiště Johna F. Kennedyho New York': 'John F. Kennedy International Airport',
  'New York': 'New York',
  'USA': 'United States',
  'Hlavní mezinárodní brána do Spojených států a nejrušnější letiště v metropolitní oblasti New Yorku. Slouží jako klíčový uzel pro Delta Air Lines, American Airlines a JetBlue.': 'The primary international gateway to the United States and the busiest airport in the New York metropolitan area. It serves as a key hub for Delta Air Lines, American Airlines, and JetBlue.',
  'Historický terminál TWA Flight Center, navržený Eero Saarinem v roce 1962, je mistrovským dílem organické architektury a dnes slouží jako luxusní hotel.': 'The historic TWA Flight Center terminal, designed by Eero Saarinen in 1962, is a masterpiece of organic architecture and now serves as a luxury hotel.',
  'Mezinárodní letiště Los Angeles': 'Los Angeles International Airport',
  'Los Angeles': 'Los Angeles',
  'Obří letiště na západním pobřeží USA, které slouží jako brána do Pacifiku a Asie. Je to jeden z největších leteckých uzlů na světě a oblíbené místo pro spottery.': 'A massive airport on the US West Coast serving as a gateway to the Pacific and Asia. It is one of the world\'s largest aviation hubs and a legendary spot for plane spotting.',
  'Jeho dominantou je futuristická budova Theme Building z roku 1961, která připomíná létající talíř přistávající na čtyřech obloukových nohách.': 'Its landmark is the futuristic Theme Building from 1961, which resembles a flying saucer landing on four arched legs.',
  'Letiště Singapur Changi': 'Singapore Changi Airport',
  'Singapur': 'Singapore',
  'Pravidelně vyhodnocováno jako nejlepší letiště světa. Changi nabízí tranzitním cestujícím střešní bazény, kina, motýlí zahrady a skluzavky.': 'Consistently voted the world\'s best airport. Changi offers transit passengers rooftop pools, movie theaters, butterfly gardens, and multi-story slides.',
  'Uvnitř komplexu „Jewel“ se nachází Rain Vortex, nejvyšší krytý vodopád na světě vysoký 40 metrů, obklopený pětipatrovým krytým deštným pralesem.': 'Inside the \'Jewel\' complex lies the Rain Vortex, the world\'s tallest indoor waterfall at 40 meters, surrounded by a five-story indoor rainforest.',
  'Mezinárodní letiště Tokio Haneda': 'Tokyo Haneda Airport',
  'Jedno ze dvou velkých tokijských letišť, nacházející se blíže centru města. Slouží jako hlavní základna pro All Nippon Airways (ANA) a Japan Airlines.': 'One of the two primary airports serving Tokyo, located closer to the city center. It serves as the main hub for All Nippon Airways (ANA) and Japan Airlines.',
  'Oceňováno pro naprostou čistotu a perfektní dochvilnost. Většina drah je vybudována na uměle navezených ostrovech v Tokijské zátoce.': 'Highly praised for its immaculate cleanliness and perfect punctuality. Most of its runways are constructed on reclaimed land in Tokyo Bay.',
  'Mezinárodní letiště Dubaj': 'Dubai International Airport',
  'Dubaj': 'Dubai',
  'Největší mezinárodní uzel na Blízkém východě, který spojuje Evropu, Afriku, Asii a Austrálii. Je to domovská základna a pýcha aerolinií Emirates.': 'The largest international hub in the Middle East, connecting Europe, Africa, Asia, and Australia. It is the main home base and pride of Emirates.',
  'Terminál 3 je největším letištním terminálem na světě a byl speciálně navržen pro exkluzivní a plynulé odbavování obřích letadel Airbus A380.': 'Terminal 3 is the largest airport terminal in the world and was specifically designed for the exclusive and smooth handling of the giant Airbus A380.',
  'Letiště Sydney Kingsforda Smitha': 'Sydney Kingsford Smith Airport',
  'Sydney': 'Sydney',
  'Klíčové mezinárodní a vnitrostátní letiště v Austrálii. Slouží jako hlavní základna pro společnost Qantas a nabízí úžasné příletové výhledy na Sydney Opera House.': 'The primary international and domestic airport in Australia. It serves as the main hub for Qantas and offers stunning arrival views of the Sydney Opera House.',
  'Jedno z nejstarších nepřetržitě fungujících komerčních letišť na světě. Hlavní vzletová a přistávací dráha je částečně postavena na umělém náspu v Botany Bay.': 'One of the oldest continuously operating commercial airports in the world. Its main runway is partially built on reclaimed land in Botany Bay.',
  'Mezinárodní letiště Soul Inčchon': 'Incheon International Airport',
  'Největší letiště v Jižní Koreji vybudované na uměle spojených ostrovech. Je to jeden z nejrychlejších leteckých uzlů pro odbavení zavazadel a pasovou kontrolu.': 'The largest airport in South Korea, built on reclaimed land between islands. It is one of the fastest hubs in the world for baggage processing and passport control.',
  'Disponuje vlastním golfovým hřištěm, lázněmi, kluzištěm, vnitřními zahradami a tradičním muzeem korejské kultury přímo v terminálu.': 'It features its own golf course, spa, ice skating rink, indoor gardens, and a traditional Korean culture museum directly inside the terminal.',
  'Mezinárodní letiště Hongkong': 'Hong Kong International Airport',
  'Hongkong': 'Hong Kong',
  'Čína (Hongkong)': 'China (Hong Kong)',
  'Moderní letiště nahrazující legendární staré letiště Kai Tak (známé extrémně nebezpečnými přistáními mezi mrakodrapy). Slouží jako uzel pro Cathay Pacific.': 'A highly modern airport replacing the legendary Kai Tak Airport (famous for its extremely dangerous landings between skyscrapers). It serves as the primary hub for Cathay Pacific.',
  'Vybudováno na obřím umělém ostrově Chek Lap Kok vytvořeném srovnáním dvou původních hornatých ostrovů se zemí a rozšířením o mořskou mělčinu.': 'Built on a massive artificial island, Chek Lap Kok, which was created by leveling two original mountainous islands and reclaiming land from the shallow sea.',
  'Letiště Istanbul': 'Istanbul Airport',
  'Istanbul': 'Istanbul',
  'Turecko': 'Turkey',
  'Nové megastaveniště vybudované na evropské straně Istanbulu, které nahradilo kapacitně nedostačující Atatürkovo letiště. Je sídlem Turkish Airlines.': 'A brand new mega-airport built on the European side of Istanbul, replacing the capacity-constrained Atatürk Airport. It serves as the home hub for Turkish Airlines.',
  'Jeho řídicí věž má ikonický aerodynamický tvar inspirovaný květem tulipánu, což je tradiční islámský a turecký symbol elegance.': 'Its air traffic control tower features an iconic aerodynamic shape inspired by the tulip, which is a traditional Islamic and Turkish symbol of elegance.',
  'Letiště Brno-Tuřany': 'Brno-Tuřany Airport',
  'Brno': 'Brno',
  'V roce 2009 zde sloužil mši papež Benedikt XVI. před více než 120 tisíci věřícími, což byla největší událost v historii letiště.': 'In 2009, Pope Benedict XVI celebrated mass here in front of more than 120,000 believers, which was the largest event in the airport\'s history.',
  'Druhé nejrušnější letiště v České republice, zajišťující pravidelné i charterové lety. Má velmi moderní a architektonicky oceňovaný odbavovací terminál.': 'The second busiest airport in the Czech Republic, providing regular and charter flights. It has a highly modern and architecturally award-winning passenger terminal.',
  'Letiště Leoše Janáčka Ostrava': 'Leoš Janáček Airport Ostrava',
  'Ostrava': 'Ostrava',
  'Každoročně se zde konají Dny NATO v Ostravě, největší letecko-armádně-bezpečnostní akce v Evropě, která přitahuje stovky tisíc diváků.': 'Every year, NATO Days in Ostrava is held here, the largest air, military, and security show in Europe, attracting hundreds of thousands of spectators.',
  'Významné regionální mezinárodní letiště na severovýchodě České republiky. Slouží jako důležitý nákladní uzel a brána pro charterové a pravidelné lety.': 'A significant regional international airport in the northeast of the Czech Republic. It serves as an important cargo hub and a gateway for charter and scheduled flights.',
  'Letiště Karlovy Vary': 'Karlovy Vary Airport',
  'Karlovy Vary': 'Karlovy Vary',
  'Terminál s futuristickým tvarem trupu letadla získal ocenění Stavba roku a je jednou z nejmodernějších staveb v Karlovarském kraji.': 'The terminal with a futuristic airplane fuselage shape won the Building of the Year award and is one of the most modern structures in the Karlovy Vary Region.',
  'Regionální mezinárodní letiště obsluhující světoznámé lázeňské město Karlovy Vary a okolní region Západních Čech.': 'A regional international airport serving the world-famous spa town of Karlovy Vary and the surrounding region of Western Bohemia.',
  'Letiště Mnichov': 'Munich Airport',
  'Má vlastní pivovar s pivní zahrádkou „Airbräu“, kde se vaří pivo přímo na letišti podle tradičních bavorských receptur.': 'It has its own brewery with a beer garden "Airbräu", where beer is brewed directly at the airport according to traditional Bavarian recipes.',
  'Druhé nejrušnější letiště v Německu a významný uzel společnosti Lufthansa. Je oceňováno za vysokou kvalitu služeb a čistotu.': 'The second busiest airport in Germany and a major hub for Lufthansa. It is highly rated for its service quality and cleanliness.',
  'Letiště Vídeň-Schwechat': 'Vienna International Airport',
  'Vídeň': 'Vienna',
  'Rakousko': 'Austria',
  'Letiště nabízí unikátní návštěvnické centrum s 360-stupňovou virtuální realitou z kokpitu letadla a velkou vyhlídkovou terasou.': 'The airport offers a unique visitor center with 360-degree virtual reality from the aircraft cockpit and a large observation deck.',
  'Největší a nejrušnější letiště v Rakousku, nacházející se u Schwechatu. Slouží jako hlavní základna pro Austrian Airlines a uzel pro lety do východní Evropy.': 'The largest and busiest airport in Austria, located near Schwechat. It serves as the primary base for Austrian Airlines and a hub for flights to Eastern Europe.',
  'Letiště Chopina Varšava': 'Warsaw Chopin Airport',
  'Varšava': 'Warsaw',
  'Polsko': 'Poland',
  'Pojmenováno po slavném polském skladateli Frédéricu Chopinovi. Letiště zvládá téměř 40 % veškeré osobní letecké dopravy v Polsku.': 'Named after the famous Polish composer Frédéric Chopin. The airport handles nearly 40% of all passenger air traffic in Poland.',
  'Největší letiště v Polsku, dříve známé jako letiště Okęcie. Slouží jako hlavní základna pro polského národního dopravce LOT Polish Airlines.': 'The largest airport in Poland, formerly known as Okęcie Airport. It serves as the main hub for Polish national carrier LOT Polish Airlines.',
  'Letiště M. R. Štefánika Bratislava': 'M. R. Štefánik Airport Bratislava',
  'Bratislava': 'Bratislava',
  'Slovensko': 'Slovakia',
  'Pojmenováno po generálu M. R. Štefánikovi. Dráhy jsou uspořázány do tvaru písmene X, což umožňuje přistání z různých směrů podle větru.': 'Named after General M. R. Štefánik. The runways are arranged in an X-shape, allowing landings from different directions depending on the wind.',
  'Hlavní mezinárodní letiště na Slovensku, nacházející se v bratislavské čtvrti Ružinov. Slouží jako důležitá báze pro nízkonákladové aerolinky.': 'The primary international airport in Slovakia, located in Bratislava\'s Ružinov district. It serves as an important base for low-cost airlines.',
  'Letiště Londýn Gatwick': 'London Gatwick Airport',
  'Je považováno za nejefektivnější jednodráhové letiště na světě, které dokáže v nejrušnějších hodinách odbavit až 55 letů za hodinu na jediné dráze.': 'It is considered the most efficient single-runway airport in the world, capable of handling up to 55 flights per hour on a single runway during peak hours.',
  'Druhé největší letiště v Londýně a v celé Velké Británii. Je oblíbené zejména pro nízkonákladové lety a prázdninové charterové spoje.': 'The second-largest airport in London and the entire United Kingdom. It is particularly popular for low-cost flights and holiday charter connections.',
  'Letiště Londýn Stansted': 'London Stansted Airport',
  'Během druhé světové války sloužilo jako významná základna pro britské RAF a americké letectvo USAAF pod názvem RAF Stansted Mountfitchet.': 'During World War II, it served as an important base for the British RAF and US USAAF under the name RAF Stansted Mountfitchet.',
  'Třetí největší londýnské letiště, které slouží jako největší základna pro nízkonákladovou leteckou společnost Ryanair v Evropě.': 'The third-largest London airport, which serves as the largest base for low-cost carrier Ryanair in Europe.',
  'Letiště Paříž-Orly': 'Paris Orly Airport',
  'V padesátých a šedesátých letech bylo symbolem francouzského luxusu a modernismu a jeho terasy byly oblíbeným víkendovým výletním místem Pařížanů.': 'In the 1950s and 1960s, it was a symbol of French luxury and modernism, and its terraces were a favorite weekend excursion spot for Parisians.',
  'Druhé největší letiště v Paříži, které slouží převážně pro vnitrostátní a evropské lety a spoje do francouzských zámořských území a severní Afriky.': 'The second-largest airport in Paris, serving mainly domestic and European flights as well as connections to French overseas territories and North Africa.',
  'Letiště Madrid-Barajas Adolfa Suáreze': 'Adolfo Suárez Madrid–Barajas Airport',
  'Terminál 4, navržený architektem Richardem Rogersem, má ikonickou zvlněnou střechu z bambusového dřeva a je považován za mistrovské dílo architektury.': 'Terminal 4, designed by architect Richard Rogers, features an iconic wavy roof made of bamboo wood and is considered a masterpiece of architecture.',
  'Největší a nejrušnější letiště ve Španělsku, které slouží jako hlavní brána pro lety mezi Evropou a Latinskou Amerikou. Je základnou společnosti Iberia.': 'The largest and busiest airport in Spain, serving as the main gateway for flights between Europe and Latin America. It is the hub of Iberia.',
  'Letiště Barcelona-El Prat Josepa Tarradellase': 'Josep Tarradellas Barcelona–El Prat Airport',
  'Barcelona': 'Barcelona',
  'Španělsko': 'Spain',
  'Nachází se hned vedle chráněné přírodní rezervace v deltě řeky Llobregat, což vyžaduje přísná ekologická a hluková opatření při vzletech nad moře.': 'It is located right next to a protected nature reserve in the Llobregat River delta, requiring strict environmental and noise-mitigation measures during over-sea takeoffs.',
  'Druhé největší letiště ve Španělsku a hlavní uzel pro nízkonákladovou společnost Vueling a Catalonii. Leží pouhých 12 km od centra Barcelony.': 'The second-largest airport in Spain and the main hub for low-cost carrier Vueling and Catalonia. It lies just 12 km from the center of Barcelona.',
  'Letiště Řím-Fiumicino Leonarda da Vinciho': 'Rome Fiumicino Leonardo da Vinci Airport',
  'Řím': 'Rome',
  'Itálie': 'Italy',
  'Oficiálně pojmenováno po renesančním géniovi Leonardu da Vincim, jehož obří socha s modelem helikoptéry vítá cestující před letištěm.': 'Officially named after the Renaissance genius Leonardo da Vinci, whose giant statue holding a helicopter model welcomes passengers in front of the airport.',
  'Hlavní a největší letiště v Itálii, které slouží jako domovská základna pro národního dopravce ITA Airways (nástupce Alitalie).': 'The primary and largest airport in Italy, serving as the home base for the national carrier ITA Airways (successor to Alitalia).',
  'Letiště Milán Malpensa': 'Milan Malpensa Airport',
  'Milán': 'Milan',
  'Letiště vzniklo na místě, kde v roce 1910 slavní italští letečtí průkopníci bratři Caproniové testovali své první prototypy dvojplošníků.': 'The airport was built on the site where, in 1910, the famous Italian aviation pioneers, the Caproni brothers, tested their first biplane prototypes.',
  'Největší mezinárodní letiště pro metropolitní oblast Milána a severní Itálii. Slouží jako významný uzel pro cargo a nízkonákladové lety.': 'The largest international airport for the Milan metropolitan area and northern Italy. It serves as a major hub for cargo and low-cost flights.',
  'Letiště Atény': 'Athens International Airport',
  'Atény': 'Athens',
  'Řecko': 'Greece',
  'Při jeho stavbě v historické oblasti Mesogaia bylo nalezeno obrovské množství antických archeologických památek, které jsou dnes vystaveny v muzeu v odletové hale.': 'During its construction in the historic Mesogaia region, a huge quantity of ancient archaeological artifacts were discovered, which are now exhibited in a museum inside the departure hall.',
  'Mezinárodní letiště Eleftheriose Venizelose slouží jako hlavní brána do Řecka a uzel pro národního dopravce Aegean Airlines.': 'Athens International Airport "Eleftherios Venizelos" serves as the primary gateway to Greece and a hub for the national carrier Aegean Airlines.',
  'Letiště Rhodos „Diagoras“': 'Rhodes "Diagoras" International Airport',
  'Rhodos': 'Rhodes',
  'Oficiálně nese jméno Diagoras z Rhodu, což byl slavný antický olympionik a boxer z 5. století př. n. l.': 'Officially bears the name of Diagoras of Rhodes, who was a famous ancient Olympian boxer from the 5th century BC.',
  'Velmi vytížené charterové letiště na ostrově Rhodos, které zažívá obrovský nárůst dopravy během letních měsíců.': 'A highly busy charter airport on the island of Rhodes, experiencing a huge traffic increase during the summer months.',
  'Letiště Heraklion „Nikos Kazantzakis“': 'Heraklion "Nikos Kazantzakis" International Airport',
  'Heraklion / Kréta': 'Heraklion / Crete',
  'Pojmenováno po slavném krétském rodákovi, spisovateli a filozofovi Nikosi Kazantzakisovi (autorovi románu Řek Zorba).': 'Named after the famous Cretan native, writer, and philosopher Nikos Kazantzakis (author of the novel Zorba the Greek).',
  'Druhé nejrušnější letiště v Řecku nacházející se na severním pobřeží ostrova Kréta, těsně vedle města Heraklion.': 'The second busiest airport in Greece, located on the northern coast of the island of Crete, right next to the city of Heraklion.',
  'Letiště Curych': 'Zurich Airport',
  'Curych': 'Zurich',
  'Švýcarsko': 'Switzerland',
  'Letiště má unikátní přírodní rezervaci s mokřady přímo uprostřed areálu mezi vzletovými drahami, kterou obývá řada chráněných druhů ptáků a obojživelníků.': 'The airport features a unique nature reserve with wetlands right in the center of the airfield between the runways, home to many protected bird and amphibian species.',
  'Největší švýcarské mezinárodní letiště, které slouží jako hlavní základna pro švýcarského národního dopravce Swiss International Air Lines.': 'The largest Swiss international airport, which serves as the main hub for the Swiss national carrier Swiss International Air Lines.',
  'Letiště Kodaň': 'Copenhagen Airport',
  'Kodaň': 'Copenhagen',
  'Dánsko': 'Denmark',
  'Jedno z nejstarších civilních letišť na světě. Má perfektní železniční a silniční spojení přes slavný Öresundský most přímo do Švédska.': 'One of the oldest civil airports in the world. It features a perfect rail and road connection via the famous Øresund Bridge directly to Sweden.',
  'Hlavní mezinárodní letiště v Dánsku a největší letiště v celé Skandinávii. Slouží jako hlavní přestupní uzel pro leteckou společnost SAS.': 'The main international airport in Denmark and the largest airport in all of Scandinavia. It serves as the primary transfer hub for SAS.',
  'Letiště Oslo Gardermoen': 'Oslo Airport, Gardermoen',
  'Oslo': 'Oslo',
  'Norsko': 'Norway',
  'Terminál je postaven z norského dřeva a skla a k vytápění využívá unikátní systém akumulace sněhu z drah, který se v létě používá ke chlazení budovy.': 'The terminal is built with Norwegian wood and glass, and uses a unique snow accumulation system from the runways for heating, which is used in the summer to cool the building.',
  'Hlavní mezinárodní letiště obsluhující hlavní město Norska. Je známé svým ekologickým přístupem a moderní severskou architekturou.': 'The primary international airport serving the capital of Norway. It is famous for its eco-friendly approach and modern Nordic architecture.',
  'Letiště Helsinky-Vantaa': 'Helsinki Airport',
  'Helsinky': 'Helsinki',
  'Finsko': 'Finland',
  'Bylo postaveno speciálně pro Letní olympijské hry v Helsinkách v roce 1952 a dnes je vyhlášeným specialistou na rychlé přestupy mezi Evropou a Asií.': 'It was built specifically for the 1952 Summer Olympics in Helsinki and is now a renowned specialist in fast transfers between Europe and Asia.',
  'Hlavní finské mezinárodní letiště nacházející se ve městě Vantaa. Slouží jako klíčová základna a přestupní uzel pro leteckou společnost Finnair.': 'The main Finnish international airport located in the city of Vantaa. It serves as a key base and transfer hub for Finnair.',
  'Letiště Lisabon Humberta Delgada': 'Lisbon Humberto Delgado Airport',
  'Lisabon': 'Lisbon',
  'Portugalsko': 'Portugal',
  'Oficiálně nese jméno Humberta Delgada, portugalského generála a politika. Nachází se přímo uprostřed obytné zástavby Lisabonu, což nabízí dechberoucí nízké přílety nad městem.': 'Officially named after Humberto Delgado, a Portuguese general and politician. Located directly in the middle of Lisbon\'s residential areas, it offers breathtaking low approaches over the city.',
  'Hlavní mezinárodní letiště v Portugalsku a klíčový evropský uzel pro lety do Brazílie a jižní Ameriky. Slouží jako domovská základna pro TAP Air Portugal.': 'The main international airport in Portugal and a key European hub for flights to Brazil and South America. It serves as the home base for TAP Air Portugal.',
  'Letiště Dublin': 'Dublin Airport',
  'Dublin': 'Dublin',
  'Irsko': 'Ireland',
  'Nabízí unikátní americkou předhraniční kontrolu (US Preclearance), což znamená, že cestující projdou americkou imigrační kontrolou již v Dublinu a v USA přistanou jako vnitrostátní let.': 'It offers unique US Preclearance, meaning passengers go through US immigration and customs in Dublin and land in the USA as domestic arrivals.',
  'Hlavní a nejrušnější letiště v Irsku. Slouží jako centrála a domovská základna pro Aer Lingus and nízkonákladového giganta Ryanair.': 'The main and busiest airport in Ireland. It serves as the headquarters and home base for Aer Lingus and low-cost giant Ryanair.',
  'Hlavní a nejrušnější letiště v Irsku. Slouží jako centrála a domovská základna pro Aer Lingus a nízkonákladového giganta Ryanair.': 'The main and busiest airport in Ireland. It serves as the headquarters and home base for Aer Lingus and low-cost giant Ryanair.',
  'Letiště Antalya': 'Antalya Airport',
  'Antalya': 'Antalya',
  'Během letní sezóny se stává jedním z nejvytíženějších letišť ve středomoří, které obsluhuje stovky tisíc turistů směřujících na Tureckou riviéru.': 'During the summer season, it becomes one of the busiest airports in the Mediterranean, serving hundreds of thousands of tourists heading to the Turkish Riviera.',
  'Velké mezinárodní letiště na jihozápadě Turecka, které slouží jako hlavní brána pro turisty z celé Evropy a Asie.': 'A major international airport in southwestern Turkey, serving as the primary gateway for tourists from across Europe and Asia.',
  'Letiště Atlanta Hartsfield-Jackson': 'Hartsfield–Jackson Atlanta International Airport',
  'Atlanta': 'Atlanta',
  'Dlouhodobě nejrušnější letiště na světě podle počtu přepravených cestujících i počtu vzletů a přistání, přičemž z Atlanty lze doletět do 80 % populace USA do dvou hodin.': 'Long-term busiest airport in the world by passenger numbers and takeoffs/landings, with 80% of the US population within a two-hour flight of Atlanta.',
  'Gigantický uzel v unijním státě Georgie, který slouží jako hlavní globální uzel pro společnost Delta Air Lines.': 'A gigantic hub in the state of Georgia, serving as the main global hub for Delta Air Lines.',
  'Letiště Chicago O\'Hare': 'Chicago O\'Hare International Airport',
  'Chicago': 'Chicago',
  'Má největší počet vzletových a přistávacích drah (celkem 8) ze všech civilních letišť na světě, které jsou uspořádány v paralelním systému.': 'It has the largest number of runways (8 in total) of any civilian airport in the world, arranged in a parallel layout.',
  'Klíčový uzel ve státě Illinois, který slouží jako hlavní základna pro United Airlines a American Airlines. Je legendární svou velikostí a vytížeností.': 'A key hub in the state of Illinois, serving as a primary base for United Airlines and American Airlines. It is legendary for its size and busyness.',
  'Letiště Dallas/Fort Worth': 'Dallas/Fort Worth International Airport',
  'Dallas/Fort Worth': 'Dallas/Fort Worth',
  'Rozlohou je větší než celý ostrov Manhattan a disponuje vlastní plnohodnotnou poštovní službou, policejním sborem a hasičským záchranným systémem.': 'By land area, it is larger than the entire island of Manhattan and possesses its own fully functional postal service, police force, and fire department.',
  'Druhé největší letiště v USA podle rozlohy, ležící v Texasu. Je hlavním a největším super-uzlem pro leteckou společnost American Airlines.': 'The second-largest airport in the US by land area, located in Texas. It is the primary and largest super-hub for American Airlines.',
  'Letiště Denver': 'Denver International Airport',
  'Denver': 'Denver',
  'Střecha hlavního terminálu Jeppesen je tvořena obřími bílými napnutými stanovými plachtami, které mají připomínat zasněžené vrcholky nedalekých Skalistých hor.': 'The roof of the Jeppesen Terminal is made of giant white fabric tents designed to resemble the snow-capped peaks of the nearby Rocky Mountains.',
  'Největší letiště v USA podle celkového rozlohy území (135 km²). Slouží jako významný vnitrostátní uzel pro United Airlines and Southwest Airlines.': 'The largest airport in the US by total land area (135 sq km). It serves as a major domestic hub for United Airlines and Southwest Airlines.',
  'Letiště San Francisco': 'San Francisco International Airport',
  'San Francisco': 'San Francisco',
  'Dráhy letiště jsou uspořázány do dvou křížících se dvoji, přičemž konce drah vybíhají přímo do vod Sanfranciského zálivu, což vyžaduje vysokou přesnost pilotáže.': 'The airport\'s runways are arranged in two intersecting pairs, with the ends of the runways extending directly into the waters of San Francisco Bay, requiring high-precision piloting.',
  'Významné mezinárodní letiště v Kalifornii, které slouží jako hlavní brána do Silicon Valley a Asie. Je hlavním uzlem společnosti United Airlines.': 'A major international airport in California, serving as the primary gateway to Silicon Valley and Asia. It is the main hub of United Airlines.',
  'Letiště Miami': 'Miami International Airport',
  'Miami': 'Miami',
  'Je největší americkou branou pro lety do Latinské Ameriky a Karibiku a odbavuje více mezinárodního nákladu než téměř jakékoli jiné americké letiště.': 'It is the largest US gateway for flights to Latin America and the Caribbean, and handles more international cargo than almost any other US airport.',
  'Významné mezinárodní letiště na jižní Floridě, které slouží jako klíčový uzel pro American Airlines.': 'A major international airport in South Florida, serving as a key hub for American Airlines.',
  'Letiště Orlando': 'Orlando International Airport',
  'Orlando': 'Orlando',
  'Kód letiště MCO pochází z jeho dřívějšího vojenského názvu McCoy Air Force Base, což byla základna pro strategické bombardéry B-52 během studené války.': 'The MCO airport code originates from its former military name, McCoy Air Force Base, which was a base for B-52 strategic bombers during the Cold War.',
  'Nejrušnější letiště na Floridě, které slouží jako hlavní brána pro miliony turistů mířících do světoznámých zábavních parků jako Walt Disney World a Universal Studios.': 'The busiest airport in Florida, serving as the primary gateway for millions of tourists heading to world-famous theme parks like Walt Disney World and Universal Studios.',
  'Letiště Harry Reid Las Vegas': 'Harry Reid International Airport',
  'Las Vegas': 'Las Vegas',
  'Je jedním z pouhých dvou amerických letišť, které mají hrací automaty přímo v prostorách terminálů, což navozuje atmosféru kasin hned po příletu.': 'It is one of only two US airports that feature slot machines directly inside the terminals, establishing a casino atmosphere right upon arrival.',
  'Hlavní letiště obsluhující světoznámé město hazardu a zábavy Las Vegas v Nevadě. Dříve neslo název McCarran International Airport.': 'The main airport serving the world-famous city of gambling and entertainment, Las Vegas, Nevada. It was formerly named McCarran International Airport.',
  'Letiště Seattle-Tacoma': 'Seattle–Tacoma International Airport',
  'Seattle': 'Seattle',
  'Letiště má rozsáhlou sbírku moderního umění v hodnotě desítek milionů dolarů rozprostřenou po terminálech a pořádá pravidelné živé hudební vystoupení pro cestující.': 'The airport features an extensive collection of modern art worth tens of millions of dollars spread throughout the terminals, and hosts regular live music performances for travelers.',
  'Hlavní letiště na severozápadě USA, obsluhující Seattle a stát Washington. Je hlavním uzlem pro Alaska Airlines a Delta Air Lines.': 'The primary airport in the Pacific Northwest of the US, serving Seattle and the state of Washington. It is the main hub for Alaska Airlines and Delta Air Lines.',
  'Letiště Toronto Pearson': 'Toronto Pearson International Airport',
  'Toronto': 'Toronto',
  'Nese kód YYZ, který se stal celosvětově slavným díky stejnojmenné instrumentální rockové skladbě od legendární kanadské skupiny Rush.': 'It carries the code YYZ, which became world-famous thanks to the instrumental rock song of the same name by the legendary Canadian band Rush.',
  'Největší a nejrušnější mezinárodní letiště v Kanadě, nacházející se u Toronta v provincii Ontario. Slouží jako hlavní globální uzel pro Air Canada.': 'The largest and busiest international airport in Canada, located near Toronto, Ontario. It serves as the primary global hub for Air Canada.',
  'Letiště Vancouver': 'Vancouver International Airport',
  'Vancouver': 'Vancouver',
  'V interiérech letiště se nachází úchvatná sbírka řezbářského a sochařského umění původních obyvatel Severní Ameriky (národů First Nations) včetně dvou obřích akvárií.': 'The airport interiors house a stunning collection of First Nations carvings and sculptures, along with two massive aquariums.',
  'Druhé nejrušnější kanadské letiště, ležící na ostrově Sea Island v Britské Kolumbii. Je považováno za jednu z nejlepších bran do Asie a Pacifiku.': 'The second busiest airport in Canada, located on Sea Island in British Columbia. It is considered one of the best gateways to Asia and the Pacific.',
  'Letiště Tokio Narita': 'Tokyo Narita Airport',
  'Výstavba letiště vyvolala v 70. letech jedny z největších protestů v dějinách Japonska, přičemž dodnes se uprostřed letištní plochy nacházejí farmy, jejichž majitelé odmítli prodat své pozemky.': 'Airport construction in the 1970s triggered some of the largest protests in Japan\'s history, and to this day, farms whose owners refused to sell are still located in the middle of the airfield.',
  'Druhé velké mezinárodní letiště obsluhující aglomeraci Tokia, které se nachází cca 60 km východně od centra v prefektuře Čiba. Odbavuje většinu dálkových mezinárodních spojů.': 'The second-largest international airport serving Tokyo, located about 60 km east of the center in Chiba Prefecture. It handles most long-haul international flights.',
  'Letiště Ósaka Kansai': 'Kansai International Airport',
  'První letiště na světě postavené výhradně na umělém ostrově v moři, který pomalu klesá pod hladinu rychleji, než inženýři původně předpovídali, což vyžaduje neustálé hydraulické vyrovnávání budov.': 'The world\'s first airport built entirely on an artificial island in the sea, which is sinking faster than engineers predicted, requiring constant hydraulic leveling of the buildings.',
  'Unikátní inženýrské dílo v zálivu Ósaky, navržené slavným architektem Renzem Pianem. Obsluhuje region Kansai (Ósaka, Kjóto, Kóbe).': 'A unique engineering marvel in Osaka Bay, designed by the famous architect Renzo Piano. It serves the Kansai region (Osaka, Kyoto, Kobe).',
  'Letiště Dauhá Hamad': 'Hamad International Airport',
  'Dauhá': 'Doha',
  'Katar': 'Qatar',
  'Hlavní atrakcí odletové haly je „Lamp Bear“ – sedm metrů vysoká bronzová socha žlutého plyšového medvěda s lampou na hlavě od švýcarského umělce Urse Fischera, koupená za 6,8 milionu dolarů.': 'The main attraction of the departure hall is the "Lamp Bear" – a seven-meter-tall bronze statue of a yellow teddy bear with a lamp on its head by Swiss artist Urs Fischer, bought for $6.8 million.',
  'Špičkové luxusní mezinárodní letiště v Kataru, které je domovem a prestižní bází pro oceněné aerolinky Qatar Airways. Často soupeří se Singapurem o titul nejlepšího letiště světa.': 'A world-class luxury international airport in Qatar, which is the home and prestigious base of the award-winning Qatar Airways. It often competes with Singapore for the title of world\'s best airport.',
  'Letiště Abú Zabí': 'Abu Dhabi International Airport',
  'Abú Zabí': 'Abu Dhabi',
  'Nově otevřený Terminal A (známý jako Midfield Terminal) má vnitřní rozlohu srovnatelnou se 45 fotbalovými hřišti a hrál klíčovou roli v akčním filmu Mission: Impossible - Odplata.': 'The newly opened Terminal A (known as the Midfield Terminal) has an indoor area comparable to 45 football fields and played a key role in the action film Mission: Impossible – Dead Reckoning.',
  'Druhé největší letiště v SAE, sloužící jako hlavní základna pro národního dopravce Etihad Airways. Je známé svým ultramoderním designem a luxusními salonky.': 'The second-largest airport in the UAE, serving as the main base for the national carrier Etihad Airways. It is famous for its ultra-modern design and luxury lounges.',
  'Letiště Peking Capital': 'Beijing Capital International Airport',
  'Čína': 'China',
  'Obří Terminál 3 byl postaven k příležitosti Olympijských her v Pekingu v roce 2008 a z ptačí perspektivy připomíná letícího draka se střechou vyvedenou v tradičních čínských barvách.': 'The giant Terminal 3 was built for the 2008 Beijing Olympics and, from a bird\'s-eye view, resembles a flying dragon with a roof painted in traditional Chinese colors.',
  'Dlouhodobě hlavní mezinárodní letiště v Číně a jedno z největších na světě podle počtu cestujících. Slouží jako hlavní uzel pro Air China.': 'Long-term primary international airport in China and one of the largest in the world by passenger count. It serves as the primary hub for Air China.',
  'Letiště Peking Daxing': 'Beijing Daxing International Airport',
  'Navrženo legendární architektkou Zaha Hadid. Terminál má tvar obří mořské hvězdice s pěti rameny, což zkracuje docházkové vzdálenosti k odletovým branám na minimum (max 8 minut).': 'Designed by the legendary architect Zaha Hadid. The terminal is shaped like a giant starfish with five arms, minimizing walking distances to departure gates to a maximum of 8 minutes.',
  'Nové super-moderní letiště na jihu Pekingu, které disponuje jedním z největších jednobudovových terminálů na světě. Slouží jako uzel pro China Southern a China Eastern.': 'A brand-new, state-of-the-art airport in the south of Beijing, featuring one of the world\'s largest single-building terminals. It serves as a hub for China Southern and China Eastern.',
  'Letiště Bangkok Suvarnabhumi': 'Suvarnabhumi Airport',
  'Bangkok': 'Bangkok',
  'Thajsko': 'Thailand',
  'Má nejvyšší samostatně stojící řídicí věž na světě s výškou 132 metrů a jeho název „Suvarnabhumi“ znamená v sanskrtu „Zlatá země“ – jméno vybral král Pchúmipchon Adunjadét.': 'It features the world\'s tallest free-standing air traffic control tower at 132 meters, and its name "Suvarnabhumi" means "Golden Land" in Sanskrit – chosen by King Bhumibol Adulyadej.',
  'Hlavní mezinárodní letiště v Thajsku, které nahradilo starší letiště Don Mueang pro mezináležitá lety. Slouží jako klíčový uzel pro Thai Airways.': 'The main international airport in Thailand, which replaced the older Don Mueang Airport for international flights. It serves as a key hub for Thai Airways.',
  'Hlavní mezinárodní letiště v Thajsku, které nahradilo starší letiště Don Mueang pro mezinárodní lety. Slouží jako klíčový uzel pro Thai Airways.': 'The main international airport in Thailand, which replaced the older Don Mueang Airport for international flights. It serves as a key hub for Thai Airways.',
  'Letiště Kuala Lumpur': 'Kuala Lumpur International Airport',
  'Kuala Lumpur': 'Kuala Lumpur',
  'Malajsie': 'Malaysia',
  'Bylo navrženo slavným japonským architektem Kisho Kurokawou pod konceptem „letiště v lese, les na letišti“ a uprostřed terminálu se nachází skutečný kousek malajského deštného pralesa.': 'It was designed by the famous Japanese architect Kisho Kurokawa under the concept of "airport in the forest, forest in the airport," and houses a genuine section of Malaysian rainforest inside.',
  'Největší a nejvýznamnější letiště v Malajsii, nacházející se cca 45 km jižně od Kuala Lumpur. Slouží jako hlavní základna pro Malaysia Airlines a nízkonákladového giganta AirAsia.': 'The largest and most important airport in Malaysia, located about 45 km south of Kuala Lumpur. It serves as the primary base for Malaysia Airlines and low-cost giant AirAsia.',
  'Letiště Indíry Gándhíové Dillí': 'Indira Gandhi International Airport',
  'Dillí': 'Delhi',
  'Indie': 'India',
  'V moderním Terminálu 3 se nachází obří ikonická stěna s bronzovými sochami muder (tradičních posvátných gest rukou v hinduismu a buddhismu), které vítají příchozí cestující.': 'In the modern Terminal 3, there is a giant iconic wall with bronze sculptures of mudras (traditional sacred hand gestures in Hinduism and Buddhism) welcoming arriving passengers.',
  'Nejrušnější letiště v Indii a v celé jižní Asii, pojmenované po bývalé indické premiérce Indíře Gándhíové. Je hlavním uzlem pro Air India a IndiGo.': 'The busiest airport in India and all of South Asia, named after former Indian Prime Minister Indira Gandhi. It is the primary hub for Air India and IndiGo.',
  'Letiště Káhira': 'Cairo International Airport',
  'Egypt': 'Egypt',
  'Vzniklo na základech bývalé vojenské letecké základny americké armády Payne Field z druhé světové války, která sloužila pro spojenecké lety v severní Africe.': 'It was built on the foundations of Payne Field, a former US Army military air base from World War II that served allied flights in North Africa.',
  'Druhé nejrušnější letiště v Africe, sloužící jako hlavní brána do Egypta a domovská základna pro národního dopravce EgyptAir.': 'The second busiest airport in Africa, serving as the primary gateway to Egypt and home base for the national carrier EgyptAir.',
  'Letiště Hurghada': 'Hurghada International Airport',
  'Hurghada': 'Hurghada',
  'Nový terminál letiště ve tvaru stanové střechy byl postaven, aby zvládl dramatický nárůst turistů, a nabízí přímý výhled na Rudé moře během přiblížení na přistání.': 'The airport\'s new tent-roofed terminal was built to handle a dramatic rise in tourism and offers a direct view of the Red Sea during final landing approach.',
  'Velmi frekventované mezinárodní letiště na pobřeží Rudého moře v Egyptě, které slouží téměř výhradně pro charterové lety přivážející turisty do letovisek.': 'A highly busy international airport on the Red Sea coast in Egypt, serving almost exclusively for charter flights bringing tourists to resorts.',
  'Letiště Kapské Město': 'Cape Town International Airport',
  'Jihoafrická republika': 'South Africa',
  'Pravidelně získává ocenění jako nejlepší letiště v Africe díky své vynikající čistotě, bezpečnosti a úchvatným výhledům na Stolovou horu při odletech.': 'It regularly wins awards as the best airport in Africa due to its excellent cleanliness, safety, and stunning views of Table Mountain during departures.',
  'Druhé nejrušnější letiště v Jihoafrické republice, které slouží jako klíčová mezinárodní brána pro turisty navštěvující Kapské Město a okolí.': 'The second busiest airport in South Africa, serving as a key international gateway for tourists visiting Cape Town and its surroundings.',
  'Letiště Melbourne Tullamarine': 'Melbourne Airport',
  'Melbourne': 'Melbourne',
  'Je to jediné letiště obsluhující velkou australskou metropoli, které funguje v nepřetržitém 24hodinovém režimu bez nočního zákazu letů.': 'It is the only airport serving a major Australian metropolis that operates 24/7 with no night curfew.',
  'Druhé nejrušnější letiště v Austrálii, které slouží jako významná základna pro společnost Qantas, Virgin Australia and nízkonákladový Jetstar.': 'The second busiest airport in Australia, serving as an important base for Qantas, Virgin Australia, and low-cost carrier Jetstar.',
  'Druhé nejrušnější letiště v Austrálii, které slouží jako významná základna pro společnost Qantas, Virgin Australia a nízkonákladový Jetstar.': 'The second busiest airport in Australia, serving as an important base for Qantas, Virgin Australia, and low-cost carrier Jetstar.',
  'Letiště Auckland': 'Auckland Airport',
  'Auckland': 'Auckland',
  'V mezinárodní příletové hale jsou cestující vítáni tradiční vyřezávanou dřevěnou bránou maorského kmene Tainui a zvukovými efekty novozélandského lesa a mořského příboje.': 'In the international arrivals hall, passengers are welcomed by a traditional carved wooden gate of the Maori Tainui tribe and sounds of New Zealand forest and ocean surf.',
  'Největší a nejrušnější letiště na Novém Zélandu, které slouží jako hlavní globální uzel pro národního dopravce Air New Zealand.': 'The largest and busiest airport in New Zealand, serving as the primary global hub for the national carrier Air New Zealand.',
  'Letiště São Paulo-Guarulhos': 'São Paulo/Guarulhos International Airport',
  'São Paulo': 'São Paulo',
  'Slouží jako největší uzel dálkové dopravy v celé Jižní Americe a má speciální zabezpečený koridor pro přepravu cenných nákladů a brazilské kávy.': 'It serves as the largest long-haul hub in all of South America, featuring a special secured corridor for transporting high-value cargo and Brazilian coffee.',
  'Nejrušnější mezinárodní letiště v Brazílii a celé Latinské Americe. Slouží jako hlavní základna pro leteckou společnost LATAM Brasil.': 'The busiest international airport in Brazil and all of Latin America. It serves as the main hub for LATAM Brasil.',
  'Letiště Santiago de Chile': 'Arturo Merino Benítez International Airport',
  'Santiago de Chile': 'Santiago',
  'Přílet do Santiaga nabízí jeden z nejkrásnějších leteckých výhledů na světě – letadlo klesá těsně podél strmých stěn zasněžených And.': 'Arriving in Santiago offers one of the most beautiful aerial views in the world – the aircraft descends closely along the steep walls of the snow-covered Andes.',
  'Hlavní mezinárodní brána do Chile, která slouží jako klíčový uzel pro LATAM Airlines a spojuje Jižní Ameriku s Oceánií a Pacifikem.': 'The primary international gateway to Chile, serving as a key hub for LATAM Airlines and connecting South America with Oceania and the Pacific.',
  'Letiště České Budějovice': 'České Budějovice Airport',
  'České Budějovice': 'České Budějovice',
  'Původně vzniklo v roce 1937 pro aeroklub, během studené války sloužilo stíhacímu letectvu a v roce 2023 odtud odletěl první mezinárodní charterový let do Turecka.': 'Originally established in 1937 for an aero club, it served the fighter air force during the Cold War, and in 2023, the first international charter flight departed from here to Turkey.',
  'Regionální mezinárodní letiště v Plané u Českých Budějovic. Slouží pro charterové lety k moři a pro všeobecné letectví (GA).': 'A regional international airport in Planá near České Budějovice. It is used for summer charter flights and general aviation (GA).',
};

// --- TRANSLATION HELPER FUNCTIONS ---

export function translateCategory(category: string, lang: 'CZ' | 'EN'): string {
  if (lang === 'CZ' || !category) return category;
  switch (category) {
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

export function translateTypicalCapacity(capacity: string, lang: 'CZ' | 'EN'): string {
  if (lang === 'CZ' || !capacity) return capacity;
  return capacity
    .replace('třídy', 'classes')
    .replace('třída', 'class')
    .replace('tříd', 'classes');
}

export function translateCountry(country: string, lang: 'CZ' | 'EN'): string {
  if (lang === 'CZ' || !country) return country;
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
    .replace('Německo', 'Germany')
    .replace('Česká republika', 'Czech Republic')
    .replace('Irsko', 'Ireland')
    .replace('Nizozemsko', 'Netherlands')
    .replace('Katar', 'Qatar')
    .replace('Maďarsko', 'Hungary')
    .replace('Singapur', 'Singapore')
    .replace('Portugalsko', 'Portugal')
    .replace('Finsko', 'Finland')
    .replace('Turecko', 'Turkey')
    .replace('Austrálie', 'Australia')
    .replace('Jižní Korea', 'South Korea')
    .replace('Španělsko', 'Spain')
    .replace('Hongkong', 'Hong Kong')
    .replace('Ukrajina', 'Ukraine');
}

// Helper to normalize strings for comparison (strip quotes, whitespace)
function normalizeText(text: string): string {
  return text.replace(/[„“"”’‘]/g, '').replace(/\s+/g, ' ').trim();
}

// Populate a lookup Map once for fast lookup
const textTranslationMap = new Map<string, string>();

for (const aircraft of AIRCRAFT_DATA) {
  const translations = AIRCRAFT_TRANSLATIONS_EN[aircraft.id];
  if (translations) {
    if (aircraft.description && translations.descriptionEn) {
      textTranslationMap.set(normalizeText(aircraft.description), translations.descriptionEn);
    }
    if (aircraft.uniqueness && translations.uniquenessEn) {
      textTranslationMap.set(normalizeText(aircraft.uniqueness), translations.uniquenessEn);
    }
  }
}

export function translateText(text: string, lang: 'CZ' | 'EN', stripQuotes = false): string {
  if (lang === 'CZ' || !text) return text;
  
  const normalized = normalizeText(text);
  let translated = textTranslationMap.get(normalized);
  
  if (translated) {
    if (stripQuotes) {
      translated = translated.replace(/^[„“"”’‘]+|[„“"”’‘]+$/g, '').trim();
    }
    return translated;
  }
  
  return text;
}

export function translateAirportText(text: string, lang: 'CZ' | 'EN'): string {
  if (lang === 'CZ' || !text) return text;
  
  const fullTrimmed = text.trim();
  
  // 1. Check full string against templates first, before removing punctuation/quotes
  // DESCRIPTION template
  const descRegex = /^Regionální mezinárodní letiště obsluhující město (.*?) v zemi (.*?)\. Zajišťuje důležité dopravní spojení v oblasti a nabízí pravidelné i charterové lety\.$/;
  const descMatch = fullTrimmed.match(descRegex);
  if (descMatch) {
    const cityCzech = descMatch[1];
    const countryCzech = descMatch[2];
    const cityEnglish = translateAirportText(cityCzech, 'EN');
    const countryEnglish = translateAirportText(countryCzech, 'EN');
    return `A regional international airport serving the city of ${cityEnglish} in ${countryEnglish}. It provides important transportation links in the region and offers regular and charter flights.`;
  }
  
  // UNIQUENESS template
  const uniqRegex = /^Letiště (.*?) se nachází v nadmořské výšce (.*?) metrů nad mořem a je vybaveno vzletovou a přistávací dráhou o dostatečné délce pro bezpečné odbavení středně velkých letadel\.$/;
  const uniqMatch = fullTrimmed.match(uniqRegex);
  if (uniqMatch) {
    const nameCzech = uniqMatch[1];
    const alt = uniqMatch[2];
    const nameEnglish = translateAirportText(nameCzech, 'EN');
    return `${nameEnglish} Airport is located at an altitude of ${alt} meters above sea level and is equipped with a runway of sufficient length for the safe handling of medium-sized aircraft.`;
  }
  
  // 2. Clean boundaries like punctuation, quotes, etc. for shorter fragments or keys
  const leadingMatch = text.match(/^[\'"„(‘]*/);
  const trailingMatch = text.match(/[.,\\/#!$%\\^&\\*;:{}=\\-_\`~()”?“\'’]*$/);
  
  const leading = leadingMatch ? leadingMatch[0] : '';
  const trailing = trailingMatch ? trailingMatch[0] : '';
  
  const coreText = text.slice(leading.length, text.length - trailing.length);
  const trimmed = coreText.trim();
  
  // 3. Direct match in dictionary
  if (airportTranslations[trimmed]) {
    return leading + airportTranslations[trimmed] + trailing;
  }
  
  // 4. Dynamic prefix matching for names:
  // If starts with "Mezinárodní letiště "
  if (trimmed.startsWith("Mezinárodní letiště ")) {
    const rest = trimmed.slice("Mezinárodní letiště ".length);
    const translatedRest = translateAirportText(rest, 'EN');
    return leading + `${translatedRest} International Airport` + trailing;
  }
  
  // If starts with "Letiště "
  if (trimmed.startsWith("Letiště ")) {
    const rest = trimmed.slice("Letiště ".length);
    const translatedRest = translateAirportText(rest, 'EN');
    return leading + `${translatedRest} Airport` + trailing;
  }
  
  // 5. Diacritics transliteration / normalization fallback for cities and names
  const diacritics: Record<string, string> = {
    'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ů': 'u', 'ý': 'y',
    'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's', 'ť': 't', 'ž': 'z',
    'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ý': 'Y',
    'Č': 'C', 'Ď': 'D', 'Ě': 'E', 'Ň': 'N', 'Ř': 'R', 'Š': 'S', 'Ť': 'T', 'Ž': 'Z'
  };
  
  let replaced = '';
  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];
    replaced += diacritics[char] || char;
  }
  
  return leading + replaced + trailing;
}
