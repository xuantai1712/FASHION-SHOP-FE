import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../model/student';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = `${environment.apiBaseUrl}`;
  constructor(private http: HttpClient) { }

  getUrlStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

}
