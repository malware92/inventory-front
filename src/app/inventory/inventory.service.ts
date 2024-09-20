import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductData } from './interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<Product[]>(`${environment.apiUrl}/inventory`)
  }

  uploadItem(productData: ProductData){
    return this.http.post(`${environment.apiUrl}/inventory`, productData)
  }

}
