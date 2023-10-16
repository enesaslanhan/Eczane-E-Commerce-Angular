import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  login="Login";
  CartActiveted:string;
  ngOnInit(){
    this.loginControl()
  }
  loginControl(){
    if (sessionStorage.getItem("email")) {
      this.login=sessionStorage.getItem("email")
      this.CartActiveted=sessionStorage.getItem("email")
    }
  }
  
 
  
}
