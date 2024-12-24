import { Injectable } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Size} from '../../../Models/Size';
import {SKU} from '../../../Models/SKU';
import {Product} from '../../../Models/product';

@Injectable({
  providedIn: 'root'
})
export class SkuService {

  private apiUrl = `${environment.apiBaseUrl}`;
  constructor(private http: HttpClient) {}
  getDetailsSku(productId: number, SkuId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/api/v1/products/${productId}/sku/${SkuId}`);
  }
}
