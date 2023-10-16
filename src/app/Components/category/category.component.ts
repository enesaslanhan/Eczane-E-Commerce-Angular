import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  categories:Category[]=[];
  constructor(private categoryService:CategoryService){}
  currentCategory:Category|null;//tsconfig.json da     "strictPropertyInitialization": false, eklenmesi lazım
  ngOnInit(){
    this.getCategories();
  }
  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categories=response.data
    })
  }
  setCurrentCategory(category:Category){
    this.currentCategory=category;
  }
  getCurrentCategoryClass(category:Category){
    if(category==this.currentCategory){
      return "list-group-item active"
    }
    return "list-group-item"
  }
  getAll(){
    if(!this.currentCategory){
      
      return "list-group-item active"
    }
    return "list-group-item"
  }
  clearCurrentCategory(){
    this.currentCategory=null;
  }

}
