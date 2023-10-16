import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit{
  constructor(private formBuilder:FormBuilder , private productService:ProductService,private toastService:ToastrService){}
  productAddForm:FormGroup;
  ngOnInit(){
    this.createProductAddForm();
  }
  createProductAddForm(){
    this.productAddForm=this.formBuilder.group({
      name:["",Validators.required],
      desc:["",Validators.required],
      price:["",Validators.required],
      categoryId:["",Validators.required],
      quantity:["",Validators.required]
    });
  }
  add(){
    if(this.productAddForm.valid){

      let productModel=Object.assign({},this.productAddForm.value)
      this.productService.add(productModel).subscribe(respose=>{
        this.toastService.success(respose.message,"Başarılı");
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }   
        } 
      })
    }
    else{
      this.toastService.error("Ürün Eklenemedi!");
    }
    
  }
}
