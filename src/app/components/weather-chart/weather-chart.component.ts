import { Component } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';
import { areaChartOptions } from '../../types/areaChartOptions';

@Component({
  selector: 'app-weather-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './weather-chart.component.html',
  styleUrl: './weather-chart.component.css',
})
export class WeatherChartComponent {
  // chart = new Chart({
  //   chart: {
  //     width: null,
  //     height: null,
  //     type: 'spline',
  //     backgroundColor: undefined,
  //   },
  //   tooltip: {
  //     borderColor: 'black',
  //     borderRadius: 3,
  //     borderWidth: 3,
  //     enabled: true,
  //   },

  //   title: {
  //     text: '',
  //   },
  //   xAxis: {
  //     visible: false,
  //   },
  //   yAxis: {
  //     visible: false,
  //   },
  //   credits: {
  //     enabled: false,
  //   },
  //   series: [
  //     {
  //       showInLegend: false,
  //       data: [
  //         6.2,
  //         6.3,
  //         {
  //           y: 6.4,
  //           marker: {
  //             symbol:
  //               'url(https://www.highcharts.com/samples/graphics/sun.png)',
  //           },
  //           accessibility: {
  //             description:
  //               'Sunny symbol, this is the warmest point in the chart.',
  //           },
  //         },
  //         6.7,
  //       ],
  //     } as any,
  //   ],
  // });

  // add point to chart serie
  add() {
    // this.chart.addPoint(Math.floor(Math.random() * 10));
  }

  areaSplineChart = new Chart(areaChartOptions);
}
