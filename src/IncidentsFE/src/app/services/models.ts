export type Incident = Earthquake | Volcano;

export interface Volcano {
  id: number;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  elevation: number;
  deathsTotal: number;
  region: string;
  status: string;
  date: Date;
}

export interface Earthquake {
  id: number;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  magnitude: number;
  deaths: number;
  region: string;
}

export interface ControlPanelSavedState {
  mode: ControlPanelModeState;
  phenomenons: ControlPanelPhenomenonsState;
}

export interface ControlPanelPhenomenonsState {
  volcanoes: boolean;
  earthquakes: boolean;
}

export interface ControlPanelModeState {
  mode: 'current' | 'predict';
  dateRange: DateRange;
}

export interface DateRange {
  from: Date;
  to: Date;
}
