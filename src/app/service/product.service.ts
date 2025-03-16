import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Instantiating the Http Client for request
  constructor(private http: HttpClient) {}

  // getting all the Product from the API Request
  getAllProducts(): Observable<[]> {
    return this.http.get<[]>('https://fakestoreapi.com/products');
  }
}
