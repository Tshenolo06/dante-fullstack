import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../service/api';


interface CategoryComp{

  id : string,
  name: string

}

@Component({
  selector: 'app-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {

  categories: CategoryComp[] =[];
  categoryName:string = '';
  message: string = '';
  isEditing: boolean = false;
  isEditingCategoryId: string | null = null;

  constructor(private api: Api, private cdr: ChangeDetectorRef){}

  ngOnInit(): void{
    this.getCategories();

  }

  //GET ALL CATEGORIES
  getCategories(){
    this.api.getAllCategory().subscribe({
      next:(res:any) =>{
        if (res.status === 200) {
          this.categories = res.categories;
          this.cdr.detectChanges();
        }
      },error:(error) =>{
        this.showMessage(error?.error?.message || error?.message || "Unable to get all categories" + error)
      }


    })
  }

  //ADD NEW CATEGORIES
   addCategory():void{
    if (!this.categoryName) {
      this.showMessage("Category name is required");
      return;
    }
    this.api.createCategory({name:this.categoryName}).subscribe({
      next:(res:any) =>{
        if (res.status === 200) {
          this.showMessage("Category added successfully")
          this.categoryName = '';
          this.getCategories();
          this.cdr.detectChanges();
        }
      },
      error:(error) =>{
        this.showMessage(error?.error?.message || error?.message || "Unable to save category" + error)
      }
    })
  }

  // EDIT CATEGORY
  editCategory():void{
    if (!this.isEditingCategoryId || !this.categoryName) {
      return;
    }
    this.api.updateCategory(this.isEditingCategoryId, {name:this.categoryName}).subscribe({
      next:(res:any) =>{
        if (res.status === 200) {
          this.showMessage("Category updated successfully")
          this.categoryName = '';
          this.isEditing = false;
          this.getCategories();
          this.cdr.detectChanges();
        }
      },
      error:(error) =>{
        this.showMessage(error?.error?.message || error?.message || "Unable to edit category" + error)
      }
    })
  }

   //set the category to edit
  handleEditCategory(category:CategoryComp):void{
    this.isEditing = true;
    this.isEditingCategoryId = category.id;
    this.categoryName = category.name
  }


  //Delete a caetgory
  handleDeleteCategory(caetgoryId: string):void{
    if (window.confirm("Are you sure you want to delete this categoy?")) {
      this.api.deleteCategory(caetgoryId).subscribe({
        next:(res:any) =>{
          if (res.status === 200) {
            this.showMessage("Category deleted successfully")
            this.getCategories(); //reload the category
            this.cdr.detectChanges();
          }
        },
        error:(error) =>{
          this.showMessage(error?.error?.message || error?.message || "Unable to Delete category" + error)
        }
      })
    }
  }






  showMessage(message:string){
    this.message = message;
    setTimeout(() =>{
      this.message = ''
    }, 4000)
  }






}
