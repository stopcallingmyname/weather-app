import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  storeData(STORE_KEY: string, data: any): void {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  }

  getStoredData(STORE_KEY: string): any {
    const storedData = localStorage.getItem(STORE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  }

  clearData(STORE_KEY: string): void {
    localStorage.removeItem(STORE_KEY);
  }
}
