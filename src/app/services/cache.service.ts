import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  // getCachedData(CACHE_KEY: string, lat: number, lon: number): any {
  //   const cachedData = localStorage.getItem(CACHE_KEY);
  //   if (cachedData) {
  //     const parsedData = JSON.parse(cachedData);
  //     if (parsedData.lat === lat && parsedData.lon === lon) {
  //       return parsedData;
  //     }
  //   }
  //   return null;
  // }

  getCachedData(CACHE_KEY: string, data: any): any {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data: parsedData } = JSON.parse(cachedData);
      if (parsedData.lat === data.lat && parsedData.lon === data.lon) {
        return parsedData;
      }
    }
    return null;
  }

  // cacheData(CACHE_KEY: string, lat: number, lon: number, data: any): void {
  //   const cachedData = {
  //     data: data,
  //     lat: lat,
  //     lon: lon,
  //     timestamp: new Date().getTime(),
  //   };
  //   localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
  // }

  cacheData(CACHE_KEY: string, data: any): void {
    const cachedData = {
      data: data,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
  }

  isDataExpired(timestamp: any): boolean {
    const currentTime = new Date().getTime();
    const dataTimestamp = timestamp;
    // const expirationTime = 2 * 60 * 60 * 1000; // 2 hours
    const expirationTime = 10 * 60 * 1000; // 10 minutes
    // const expirationTime = 1 * 60 * 1000; // 1 minute
    return currentTime - dataTimestamp > expirationTime;
  }
}
