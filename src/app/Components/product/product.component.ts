import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import {HttpClient} from '@angular/common/http'
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products:Product[]=[];
  productAddCart:Product[]=[];
  filterText="";
  totalPrice:number=0;
  cart:Cart
    
  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService,private cartService:CartService,private userService:UserService){}
  ngOnInit(): void {
    //Component ilk açıldığında çalışan method
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getProductsByCategory(params["id"]);
      }
      else{
        this.getProducts();
      }
    })
    var a=this.products.length/3;
    if(this.products.length%3>0){
      a=a+1;
    }

    
  }
  getProducts() {
    this.productService.getProducts().subscribe(response=>{
      this.products = response.data;
    })   
  }
  getProductsByCategory(categoryId:number) {
    this.productService.getProductsByCategory(categoryId).subscribe(response=>{
      this.products = response.data;
    })   
  }
  addToCart(product:Product){
    this.cart = {
      productId: 0,
      quantity: 0, 
      userId: 0 ,
      id:0
    };
    const userEmail = sessionStorage.getItem("email");
    this.productAddCart.push(product);
   
    console.log(this.productAddCart);
    
    this.cart.productId=product.id;
    this.cart.quantity=1;
    if (userEmail!=null) {
      this.userService.getByEmail(userEmail).subscribe(response=>{
        this.cart.userId=response.data.userId;
        this.cartService.addToCart(this.cart).subscribe(response=>{
          this.toastrService.success(response.message,"Başarılı");
        },responseError=>{
          this.toastrService.error("Ürün sepete Eklenemedi")
        })
      },errorResponse=>{
        this.toastrService.error("kullanıcı bulunamadı")
      })  
    }
    else{
      this.toastrService.error("Giriş yapmalısınız");
    }
   
    
  }
}
