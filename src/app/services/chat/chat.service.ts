import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Standalone Service
})
export class ChatService {
  private apiUrl = 'http://localhost:8080/api/v1/chat-ai'; // Thay bằng IP và port của Spring Boot

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<{ content: string }> {
    return this.http.get<{ content: string }>(`${this.apiUrl}?message=${(message)}`);
  }
}
