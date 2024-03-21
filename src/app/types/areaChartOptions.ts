import { Options } from 'highcharts';

export const areaChartOptions: Options = {
  chart: {
    styledMode: true,
    // height: 300,
  },
  plotOptions: {
    series: {
      marker: {
        enabled: false,
      },
    },
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  title: {
    text: '',
  },
  yAxis: {
    visible: false,
    enabled: false,
    type: 'linear',
    labels: { reserveSpace: false },
  },

  xAxis: {
    visible: false,
    crosshair: { snap: false },

    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },

  defs: {
    gradient0: {
      tagName: 'linearGradient',
      id: 'gradient-0',
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 1,
      children: [
        {
          tagName: 'stop',
          offset: 0,
        },
        {
          tagName: 'stop',
          offset: 1,
        },
      ],
    },
  } as any,

  series: [
    {
      type: 'areaspline',
      keys: ['y', 'selected'],
      data: [
        [106.4, false],
        [144.0, false],
        [176.0, false],
        [135.6, false],
        [148.5, false],
      ],
    },
  ],
};
