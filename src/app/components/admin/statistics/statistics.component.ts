import {Component, OnInit} from '@angular/core';
import {ExtendedTopSellingResponse, StatisticsService} from '../service/statistics.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit{
  selectedMonth!: number;  // The `!` tells TypeScript it's initialized later
  selectedYear!: number;
  months: { value: number, label: string }[] = [];
  years: number[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;
  topSellingProducts: any[] = [];

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit() {
    // Thiết lập các tháng (1-12)
    this.months = [
      { value: 1, label: 'Tháng 1' },
      { value: 2, label: 'Tháng 2' },
      { value: 3, label: 'Tháng 3' },
      { value: 4, label: 'Tháng 4' },
      { value: 5, label: 'Tháng 5' },
      { value: 6, label: 'Tháng 6' },
      { value: 7, label: 'Tháng 7' },
      { value: 8, label: 'Tháng 8' },
      { value: 9, label: 'Tháng 9' },
      { value: 10, label: 'Tháng 10' },
      { value: 11, label: 'Tháng 11' },
      { value: 12, label: 'Tháng 12' }
    ];

    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

    // Initialize selectedMonth and selectedYear after component load
    this.selectedMonth = new Date().getMonth() + 1;
    this.selectedYear = currentYear;
    this.loadTopSellingProducts();
  }

  loadTopSellingProducts(): void {
    this.loading = true;
    this.errorMessage = null;

    this.statisticsService.getTopSellingSKU(this.selectedMonth, this.selectedYear).subscribe(
      (data) => {
        this.topSellingProducts = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Error loading data';
        this.loading = false;
      }
    );
  }
}
