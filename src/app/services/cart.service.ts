import { Injectable } from '@angular/core';
import { cartItems } from '../models/cartItems';
import { Product } from '../models/product';
import { CartItem } from '../models/cartItem';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { Cart } from '../models/cart';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }
  apiUrl="https://localhost:44398/api/carts/";

  addToCart(cart:Cart):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",cart);
  }
  getByUserId(userId:number):Observable<SingleResponseModel<Cart[]>>{
    return this.httpClient.get<SingleResponseModel<Cart[]>>(this.apiUrl+"getbyuserid?userId="+userId);
  }
  getAll():Observable<SingleResponseModel<Cart[]>>{
    return this.httpClient.get<SingleResponseModel<Cart[]>>(this.apiUrl+"getall");
  }
  update(cart:Cart):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",cart);
  }
  delete(cart:Cart):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"delete",cart);
  }
  /*
  addToCart(product:Product){
    let item= cartItems.find(c=>c.product.id===product.id)
    if(item){
      item.quantity+=1;
    }
    else{
      let cartItem= new CartItem();
      cartItem.product=product;
      cartItem.quantity=1;
      cartItems.push(cartItem);
    }
  }
  
  */
  list():CartItem[]{
    return cartItems;
  }
  removeFromCart(product:Product){
    let item= cartItems.find(c=>c.product.id===product.id)
    cartItems.splice(cartItems.indexOf(item),1)
  }
}
