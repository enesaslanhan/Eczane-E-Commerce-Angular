import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/AuthService';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit{
  constructor(private formBuilder:FormBuilder,private userService :UserService,
    private toastService:ToastrService,private authService:AuthService, private router:Router){}
  userAddForm:FormGroup;
  userLoginForm:FormGroup;
  log:number=0;
  ngOnInit(){
    this.createLoginForm();
    this.createUserAddForm();
    

  }
  createUserAddForm(){
    this.userAddForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      password:["",Validators.required],
      email:["",Validators.required]
    });
  }
  createLoginForm(){
    this.userLoginForm=this.formBuilder.group({
      password:["",Validators.required],
      email:["",Validators.required]
    })
  }

  add(){
    if(this.userAddForm.valid){
      let userModel=Object.assign({},this.userAddForm.value)
      this.userService.add(userModel).subscribe(response=>{
        this.toastService.success(response.message,"Başarılı");
      })
    } 
    else{
      this.toastService.error("Kullanıcı Eklenemedi");
    }
  }
  userAdd(){
    this.log=1
  }
  userLogin(){
    this.log=0;
  }
  login(){
    if (this.userLoginForm.valid) {
      console.log(this.userLoginForm.value)
      let loginModel=Object.assign({},this.userLoginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.toastService.success("Giriş Başarılı");
        console.log(response);
        localStorage.setItem("token",response.data.token);
        sessionStorage.setItem("email",loginModel.email)
        sessionStorage.setItem("password",loginModel.password)
        this.userLoginForm.reset()
        this.router.navigate([""])
      },responseError=>{
        this.toastService.error(responseError.error)
      })
    }
  }
  register(){
    if (this.userAddForm.valid) {
      let userModel=Object.assign({},this.userAddForm.value)
      this.authService.add(userModel).subscribe(response=>{
        this.toastService.success(response.message,"başarılı")
        this.userAddForm.reset();
        this.log=0;
      },responseError=>{
        this.toastService.error("Kullanıcı Sisteme Eklenemedi","Başarısız!")
      })
    }
  }

}
