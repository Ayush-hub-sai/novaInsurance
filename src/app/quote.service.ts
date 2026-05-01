import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  insuranceType: string;
  details: any;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private http: HttpClient) { }

  submitQuote(quote: QuoteRequest): Observable<any> {
    // In a real app, this would post to a backend API
    // For now, we'll simulate with a delay
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({ success: true, message: 'Quote submitted successfully' });
        observer.complete();
      }, 1000);
    });
  }
}