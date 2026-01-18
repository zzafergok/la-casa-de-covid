// Types for covid-api.com responses

// Response from /reports/total
export interface IReportsTotalResponse {
  data: IGlobalData;
}

export interface IGlobalData {
  date: string;
  deaths: number;
  active: number;
  recovered: number;
  confirmed: number;
  last_update: string;
  deaths_diff: number;
  active_diff: number;
  fatality_rate: number;
  confirmed_diff: number;
  recovered_diff: number;
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
  deaths: number;
  active: number;
  confirmed: number;
  recovered: number;
  deaths_diff: number;
  last_update: string;
  active_diff: number;
  fatality_rate: number;
  region: IReportRegion;
  confirmed_diff: number;
  recovered_diff: number;
}

export interface IReportRegion {
  iso: string;
  lat: string;
  name: string;
  long: string;
  cities: ICity[];
  province: string;
}

export interface ICity {
  name: string;
  date: string;
  deaths: number;
  confirmed: number;
  lat: string | null;
  fips: number | null;
  long: string | null;
  deaths_diff: number;
  last_update: string;
  confirmed_diff: number;
}

// Combined data structure for the app (backward compatible)
export interface ISummariesData {
  Global: IGlobalData;
  Countries: ICountriesData[];
}

export interface ICountriesData {
  iso: string;
  Date: string;
  Country: string;
  NewDeaths: number;
  TotalDeaths: number;
  NewConfirmed: number;
  TotalConfirmed: number;
}
