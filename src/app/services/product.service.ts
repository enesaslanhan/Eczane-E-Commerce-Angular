import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }
  apiUrl="https://localhost:44398/api/products/";
  getProducts():Observable<SingleResponseModel<Product[]>>{
    return this.httpClient.get<SingleResponseModel<Product[]>>(this.apiUrl+"getall");
  }
  getProductsByCategory(categoryId:number):Observable<SingleResponseModel<Product[]>>{
    return this.httpClient.get<SingleResponseModel<Product[]>>(this.apiUrl+"getbycategory?categoryid="+categoryId);
  }
  add(product:Product):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",product);
  }
  getByProductId(productId:number):Observable<SingleResponseModel<Product>>{
    return this.httpClient.get<SingleResponseModel<Product>>(this.apiUrl+"getbyid?productid="+productId);
  }
}
