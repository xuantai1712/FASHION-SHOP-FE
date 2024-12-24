import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartOptions, ChartData, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { StatisticsService } from '../service/statistics.service';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'; // Assuming service for API call

// Register required components including PointElement and LineElement
Chart.register(LineController, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement);

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit, AfterViewInit {
  @ViewChild('myChart') chartCanvas: ElementRef | undefined;
  monthlyRevenue: any[] = [];
  chart: any;
  year: number = 2024;  // Default year
  years: number[] = [2022, 2023, 2024, 2025];
  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Doanh thu',
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tháng',
        },
        type: 'category',
      },
      y: {
        title: {
          display: true,
          text: 'Doanh Thu ( VNĐ )',
        },
        beginAtZero: true,
      },
    },
  };

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.getMonthlyRevenue(this.year);
  }

  ngAfterViewInit(): void {
    if (this.chartCanvas) {
      if (this.monthlyRevenue.length > 0) {
        this.createChart();
      }
    }
  }

  getMonthlyRevenue(year: number): void {
    this.statisticsService.getMonthlyRevenue(year).subscribe(
      (data) => {
        console.log('Received data from API:', data);
        this.monthlyRevenue = data;

        const months: string[] = [];
        const revenues: number[] = [];

        for (let i = 0; i < 12; i++) {
          const monthData = this.monthlyRevenue.find((d) => d.month === i + 1);
          months.push(this.getMonthName(i));
          revenues.push(monthData ? monthData.totalRevenue : 0);
        }

        this.chartData.labels = months;
        this.chartData.datasets[0].data = revenues;

        this.createChart();
      },
      (error) => {
        console.error('Error fetching monthly revenue', error);
      }
    );
  }

  onYearChange(): void {
    this.getMonthlyRevenue(this.year); // Fetch data for the selected year
  }

  getMonthName(month: number): string {
    const monthNames = [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
    ];
    return monthNames[month];
  }

  createChart(): void {
    if (this.chartCanvas) {
      const ctx = (this.chartCanvas.nativeElement as HTMLCanvasElement).getContext('2d');
      if (ctx) {
        if (this.chart) {
          this.chart.destroy(); // Destroy any existing chart
        }
        this.chart = new Chart(ctx, {
          type: 'line',
          data: this.chartData,
          options: this.chartOptions,
        });
      } else {
        console.error('Failed to get 2d context for canvas');
      }
    } else {
      console.error('Canvas element not found');
    }
  }
}
