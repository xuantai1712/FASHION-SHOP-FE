import { Injectable } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Color} from '../../../Models/Color';
import {Size} from '../../../Models/Size';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private apiUrl = `${environment.apiBaseUrl}`;
  constructor(private http: HttpClient) {}
  getAllSize(): Observable<Size[]> {
    return this.http.get<Size[]>(`${this.apiUrl}/api/v1/size`);
  }
}
