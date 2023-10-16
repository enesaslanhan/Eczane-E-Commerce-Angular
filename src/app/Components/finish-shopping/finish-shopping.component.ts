import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup,FormControl,Validators} from '@angular/forms';


@Component({
  selector: 'app-finish-shopping',
  templateUrl: './finish-shopping.component.html',
  styleUrls: ['./finish-shopping.component.css']
})
export class FinishShoppingComponent implements OnInit {
constructor(private formBuilder:FormBuilder){}
addressForm:FormGroup
ngOnInit(){
  this.createAddress();
}

createAddress(){
  this.addressForm=this.formBuilder.group({
    şehir:["",Validators.required],
    ilçe:["",Validators.required],
    sokak:["",Validators.required],
    bina:["",Validators.required]
  });
}
  
openModal() {
  const modelDiv=document.getElementById('myModal')
  if (modelDiv!=null) {
    modelDiv.style.display='block'
  }
}
closeModal() {
  const modelDiv=document.getElementById('myModal')
  if (modelDiv!=null) {
    modelDiv.style.display='none'
  }
}
addAddress(){
  const modelDiv=document.getElementById('myModal')
  if (modelDiv!=null) {
    modelDiv.style.display='none'
  }
  let addressModel=Object.assign({},this.addressForm.value)
  console.log(addressModel)
  this.addressForm.reset();
}


}
