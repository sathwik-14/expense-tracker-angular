import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent{
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions:any;
  user = {
    name:'Lathesh'
  }
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Income',
          data: [44, 55, 57, 56, 61, 58, 63],
        },
        {
          name: 'Expense',
          data: [76, 85, 101, 98, 87, 105, 91],
        },

      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat',
          'Sun'
        ],
      },
      yaxis: {
        title: {
          text: 'Amount',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return 'Rs. ' + val;
          },
        },
      },
    };
  }

  accounts = [
    {
      title: 'income',
      amount: '50',
    },
    {
      title: 'expense',
      amount: '50',
    },
    {
      title: 'deposit',
      amount: '50',
    },
  ];
}
