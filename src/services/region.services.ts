import axios from "axios";

import { IRegionsResponse, IRegion } from "../types/summary.type";

const CACHE_KEY = "covid_regions_cache_v2";
const API_BASE_URL = "https://covid-api.com/api";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 saat (milisaniye)

interface CacheData {
  data: IRegion[];
  timestamp: number;
}

class RegionDataService {
  private getFromCache(): IRegion[] | null {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp }: CacheData = JSON.parse(cached);
      const now = Date.now();

      if (now - timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return data;
    } catch {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
  }

  private saveToCache(data: IRegion[]): void {
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  }

  async getAll(): Promise<IRegion[]> {
    const cachedData = this.getFromCache();
    if (cachedData) {
      return cachedData;
    }

    const response = await axios.get<IRegionsResponse>(
      `${API_BASE_URL}/regions`,
    );
    const rawData = response.data.data;

    // Deduplicate based on ISO to prevent "duplicate key" errors
    const uniqueMap = new Map<string, IRegion>();
    rawData.forEach((item) => {
      if (!uniqueMap.has(item.iso)) {
        uniqueMap.set(item.iso, item);
      }
    });

    const data = Array.from(uniqueMap.values());

    this.saveToCache(data);

    return data;
  }

  clearCache(): void {
    localStorage.removeItem(CACHE_KEY);
  }
}

const regionDataService = new RegionDataService();
export default regionDataService;
