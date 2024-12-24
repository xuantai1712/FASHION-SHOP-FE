import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {Color} from '../../../Models/Color';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private apiUrl = `${environment.apiBaseUrl}`;
  constructor(private http: HttpClient) {

  }
  getAllColors(): Observable<Color[]> {
    return this.http.get<Color[]>(`${this.apiUrl}/api/v1/colors`);
  }

}
