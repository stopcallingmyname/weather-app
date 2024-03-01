import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor(private datePipe: DatePipe) {}

  getCUrrentDateFormatted(format: string): string {
    const date: Date = new Date();
    return this.datePipe.transform(date, format) || '';
  }
}
