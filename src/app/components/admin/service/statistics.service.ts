import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExtendedTopSellingResponse {
  productId: number;
  productName: string;
  skuId: number;
  colorName: string;
  size: string;
  productImage: string;
  totalSold: number;
}

export interface MonthlyRevenueResponse {
  month: number;
  totalRevenue: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:8080/api/v1/statistics'; // Thay bằng URL API thực tế

  constructor(private http: HttpClient) {}

  getTopSellingSKU(month: number, year: number): Observable<ExtendedTopSellingResponse[]> {
    const params = new HttpParams().set('month', month).set('year', year);
    return this.http.get<ExtendedTopSellingResponse[]>(`${this.apiUrl}/top-selling-sku`, { params });
  }

  getMonthlyRevenue(year: number): Observable<MonthlyRevenueResponse[]> {
    const params = new HttpParams().set('year', year);
    return this.http.get<MonthlyRevenueResponse[]>(`${this.apiUrl}/monthly-revenue`, { params });
  }
}
