import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css',
  providers: [DateService],
})
export class DateComponent implements OnInit {
  currentDate: string;

  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    this.currentDate = this.dateService.getCUrrentDateFormatted('EEE, dd MMM');
  }
}
