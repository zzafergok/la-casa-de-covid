// Types for covid-api.com responses

// Response from /reports/total
export interface IReportsTotalResponse {
  data: IGlobalData;
}

export interface IGlobalData {
  date: string;
  last_update: string;
  confirmed: number;
  confirmed_diff: number;
  deaths: number;
  deaths_diff: number;
  recovered: number;
  recovered_diff: number;
  active: number;
  active_diff: number;
  fatality_rate: number;
}

// Response from /regions
export interface IRegionsResponse {
  data: IRegion[];
}

export interface IRegion {
  iso: string;
  name: string;
}

// Response from /reports?iso=XXX
export interface ICountryReportsResponse {
  data: ICountryReport[];
}

export interface ICountryReport {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  confirmed_diff: number;
  deaths_diff: number;
  recovered_diff: number;
  last_update: string;
  active: number;
  active_diff: number;
  fatality_rate: number;
  region: IReportRegion;
}

export interface IReportRegion {
  iso: string;
  name: string;
  province: string;
  lat: string;
  long: string;
  cities: ICity[];
}

export interface ICity {
  name: string;
  date: string;
  fips: number | null;
  lat: string | null;
  long: string | null;
  confirmed: number;
  deaths: number;
  confirmed_diff: number;
  deaths_diff: number;
  last_update: string;
}

// Combined data structure for the app (backward compatible)
export interface ISummariesData {
  Global: IGlobalData;
  Countries: ICountriesData[];
}

export interface ICountriesData {
  iso: string;
  Country: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  Date: string;
}
