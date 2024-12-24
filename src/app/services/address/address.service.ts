import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Order} from '../../model/order/order';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = `${environment.apiBaseUrl}/api/v1/addresses`;
  constructor(private http: HttpClient) {
  }

  getAddressesByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }


  createAddress(address: any): Observable<any> {
    console.log("log arderr:   " + JSON.stringify(address));

    return this.http.post<any>(this.apiUrl, address);
  }

  updateAddress(id: number, address: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, address);
  }

  setDefaultAddress(addressId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/set-default/${addressId}`, null);
  }

  deleteAddress(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
