import axios from "axios";

import { ICountryReportsResponse, ICountryReport } from "../types/summary.type";

const API_BASE_URL = "https://covid-api.com/api";

class CountryDataService {
  async getByIso(iso: string): Promise<ICountryReport[]> {
    try {
      const response = await axios.get<ICountryReportsResponse>(
        `${API_BASE_URL}/reports?iso=${iso}`,
      );
      return response.data.data;
    } catch {
      return [];
    }
  }
}

const countryDataService = new CountryDataService();
export default countryDataService;
