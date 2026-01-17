import axios from 'axios';
import {
  IReportsTotalResponse,
  ISummariesData,
  IGlobalData,
} from '../types/summary.type';

const API_BASE_URL = 'https://covid-api.com/api';
const CACHE_KEY = 'covid_reports_total_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 saat (milisaniye)

interface CacheData {
  data: IGlobalData;
  timestamp: number;
}

class SummariesDataService {
  private getFromCache(): IGlobalData | null {
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

  private saveToCache(data: IGlobalData): void {
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  }

  async getAll(): Promise<ISummariesData> {
    const cachedData = this.getFromCache();
    if (cachedData) {
      return {
        Global: cachedData,
        Countries: [],
      };
    }

    const response = await axios.get<IReportsTotalResponse>(`${API_BASE_URL}/reports/total`);
    const globalData = response.data.data;

    this.saveToCache(globalData);

    return {
      Global: globalData,
      Countries: [],
    };
  }

  clearCache(): void {
    localStorage.removeItem(CACHE_KEY);
  }
}

const summariesDataService = new SummariesDataService();
export default summariesDataService;
