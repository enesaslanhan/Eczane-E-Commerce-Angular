import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit{
  carts:Cart[]=[]
  cartItems:Product[]=[]
  totalPrice:number=0;
  userId:number=null
  sepet:CartItem[]=[]

  constructor(private cartService:CartService,private toastrService:ToastrService,private productService:ProductService,private userService:UserService,private router:Router){}
  ngOnInit():void{
    this.getCart();
    
  }
  getCart(){
    this.totalPrice=0;
    
    
    //this.cartItems=this.cartService.list();
    //this.setTotalPrice();

    this.userService.getByEmail(sessionStorage.getItem("email")).subscribe(user=>{
      console.log(user);
      
      this.cartService.getByUserId(user.data.userId).subscribe(carts=>{
        carts.data.forEach(cart=>{
          this.carts.push(cart);
          this.productService.getByProductId(cart.productId).subscribe(response=>{
            const newCartItem: CartItem = {
              product: response.data,
              quantity: cart.quantity
            };
            this.sepet.push(newCartItem);
            console.log(this.sepet)
            this.totalPrice += response.data.price * cart.quantity;
            
          })
        })
        
      })
    })
    
    
  }
  increase(cartItem:CartItem){
    this.carts.forEach(cart => {
      if (cart.productId==cartItem.product.id) {
        cart.quantity++;
        this.cartService.update(cart).subscribe(response=>{
          this.toastrService.success("Sepet güncellendi");
          location.reload();

        },errorResponse=>{
          this.toastrService.error("sepet güncellenemedi.")
        })
      }
    });
  }
  decrease(cartItem:CartItem){
    this.carts.forEach(cart=>{
      if (cart.productId==cartItem.product.id) {
        if (cartItem.quantity>1) {
          cart.quantity--;
          this.cartService.update(cart).subscribe(response=>{
            location.reload();
            this.toastrService.success("sepet güncellendi");
            
          },errorResponse=>{
            this.toastrService.error("sepet güncellenemedi.")
          })
        }
      }
    })
    
  }
  removeCart(cartItem:CartItem){
    this.carts.forEach(cart => {
      if (cart.productId==cartItem.product.id) {
        this.cartService.delete(cart).subscribe(response=>{
          location.reload();
          this.toastrService.success("Sepet güncellendi");
          

        },errorResponse=>{
          this.toastrService.error("sepet güncellenemedi.")
        })
      }
    });
  }
  completion(){
    this.router.navigate(['finish-shopping'])
  }


    
  
  
}
