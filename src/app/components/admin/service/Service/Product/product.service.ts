import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {Observable} from 'rxjs';
import {ProductResponse} from '../../../Models/ProductResponse';
import {Product} from '../../../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {
  }

  // getallProducts(idCategory: number) : Observable<ProductResponse> {
  //   return this.http.get<ProductResponse>(`${this.apiUrl}/api/v1/products?categoryId=${idCategory}`);
  // }

  getAllProducts(
    keyword: string = '',
    page: number = 0,
    size: number = 5,
    sortBy: string = 'name',
    sortDirection: string = ''
  ): Observable<ProductResponse> {
    let params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection);
    return this.http.get<ProductResponse>(`${this.apiUrl}/api/v1/products/AllProducts`, {params});
  }


  addProduct(product: {
    imgs: { thumbnail: boolean; color: { id: number }; imageUrl: string }[];
    skus: {
      qtyInStock: number;
      originalPrice: number;
      color: { id: number };
      size: { id: number };
      salePrice: number
    }[];
    category_id: number | null;
    name: string;
    description: String
  }): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<Product>(`${this.apiUrl}/api/v1/products/addProduct`, product, { headers });
  }
  deleteSku(productId: number, skuId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/v1/products/${productId}/skus/${skuId}`,
      { responseType: 'text' });
  }

  updateProduct(product: {
                  imgs: { thumbnail: boolean; color: { id: number }; imageUrl: string }[];
                  skus: {
                    qtyInStock: number;
                    originalPrice: number;
                    color: { id: number };
                    size: { id: number };
                    salePrice: number
                  }[];
                  category_id: number | null;
                  name: string;
                  description: String
                },
                productId: Number | undefined, skuId: Number | undefined): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // @ts-ignore
    return this.http.put<string>(`${this.apiUrl}/api/v1/products/update/${productId}/${skuId}`, product, {
      headers,
      responseType: 'text' as 'json'
    });
  }

}

