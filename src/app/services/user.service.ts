import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  apiUrl:"https://localhost:44398/api/users/";
  add(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>("https://localhost:44398/api/users/add",user);
  }
  getByEmail(email:string):Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>("https://localhost:44398/api/users/getbyemail?email="+email);
  }
  
}
