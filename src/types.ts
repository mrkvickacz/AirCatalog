export type AircraftCategory = 'Úzkotrupá (Single-Aisle)' | 'Širokotrupá (Wide-Body)' | 'Regionální (Regional)' | 'Historická / Nadzvuková';

export interface AircraftSpecs {
  capacityMax: number;          // Maximum passenger capacity
  capacityTypical: string;      // Typical class seating (e.g. "162 (2 třídy)")
  rangeKm: number;              // Cruise range in kilometers
  cruiseSpeedKmh: number;       // Cruise speed in km/h
  cruiseMach: number;           // Cruise speed in Mach
  wingspanM: number;            // Wingspan in meters
  lengthM: number;              // Length in meters
  heightM: number;              // Height in meters
  fuselageWidthM: number;       // Fuselage width in meters
  wingAreaM2: number;           // Wing area in square meters
  mtowTonnes: number;           // Maximum takeoff weight in metric tonnes
  engineCount: number;          // Number of engines
  engineType: string;           // Engine model and manufacturer
  firstFlightYear: number;      // Year of first flight
}

export interface Aircraft {
  id: string;
  name: string;                 // e.g. "Airbus A320neo"
  modelSeries: string;          // e.g. "A320 Family"
  manufacturer: string;         // e.g. "Airbus"
  category: AircraftCategory;
  country: string;              // e.g. "Evropská unie", "USA"
  description: string;          // Czech description of the aircraft
  uniqueness: string;           // Fun fact or unique feature
  imageUrl: string;             // Unsplash photo URL
  authorName: string;           // Photo author credit
  specs: AircraftSpecs;         // Specs object
}

export interface AirlineFleetItem {
  aircraftId: string;
  quantity: number;
}

export interface Airline {
  id: string;
  name: string;
  foundedYear: number;
  country: string;              // e.g. "USA", "Německo"
  hub: string;                  // e.g. "Atlanta (ATL)", "Frankfurt (FRA)"
  alliance: string;             // e.g. "SkyTeam", "Star Alliance"
  description: string;          // Czech description
  logoUrl?: string;             // Optional logo/image
  fleet: AirlineFleetItem[];
  continent: string;            // 'Evropa' | 'Amerika' | 'Asie' | 'Austrálie a Oceánie'
}

export interface Airport {
  id: string;
  name: string;                 // Official name in Czech/English
  code: string;                 // IATA / ICAO code (e.g. "PRG / LKPR")
  city: string;                 // City served
  country: string;              // Country located
  builtYear: number;            // Opening/Construction year
  avgFlightsDaily?: number;     // Average aircraft departures/arrivals daily
  passengersYearlyM: number;    // Yearly passengers in millions
  runwaysCount: number;         // Number of active runways
  altitudeM: number;            // Elevation in meters above sea level
  uniqueness: string;           // Czech unique fact/description
  description: string;          // Czech description
  lat: number;                  // Latitude coordinate (-90 to 90)
  lon: number;                  // Longitude coordinate (-180 to 180)
}


