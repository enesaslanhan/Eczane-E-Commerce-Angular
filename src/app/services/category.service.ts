import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }
  apiUrl="https://localhost:44398/api/categorys/";
  getCategories():Observable<SingleResponseModel<Category[]>>{
    return this.httpClient.get<SingleResponseModel<Category[]>>(this.apiUrl+"getall")
  }
}
