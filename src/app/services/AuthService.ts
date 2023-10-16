import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';
import { TokenResponseModel } from '../models/tokenResponsenModel';
import { User } from '../models/user';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  apiUrl = "https://localhost:44398/api/auth/";

  login(loginModel: LoginModel) {
    return this.httpClient.post<TokenResponseModel<TokenModel>>(this.apiUrl + "login", loginModel);
  }
  isAuthenticated() {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }
  add(user:User){
    return this.httpClient.post<TokenResponseModel<User>>(this.apiUrl+"register",user)
  }
}
