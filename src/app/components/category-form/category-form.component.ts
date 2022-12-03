import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {
categoryForm!: FormGroup;
categoryToUpdate: Category|null=null;

get isEditting():boolean{
  return this.categoryToUpdate!==null;
}
constructor(
  private formBuilder:FormBuilder,
  private categoriesService:CategoriesService,
  private toastrService:ToastrService,
  private activatedRoute: ActivatedRoute,
  private router:Router,
){}
ngOnInit(){
  this.createCategoryForm();
  this.getCategoryIdFromRoute();
}

  createCategoryForm() {
    this.categoryForm=this.formBuilder.group({
      name:['',Validators.required],
      description:['',Validators.required],
    })
  }
  getCategoryIdFromRoute() {
   this.activatedRoute.params.subscribe((params)=>{
    if (params['categoryId']) this.getCategoryById(params['categoryId'])
   });
  }
  getCategoryById(categoryId: number) {
    this.categoriesService.getById(categoryId).subscribe({
      next:(response)=>{
        this.categoryToUpdate=response;
        this.categoryForm.patchValue(this.categoryToUpdate);
      },
      error: () => {
        this.toastrService.error('Category not found');
        this.router.navigate(['/dashboard', 'categories']);
      },
    })
  }
  onCategoryFromSubmit():void{
    if(this.categoryForm.invalid){
      this.toastrService.error('Please fill in the form correctly');
      return;
    }
    if(this.isEditting) this.update();
    else this.add();
  }
  onDeleteProduct():void{
    if(confirm('Are you sure you want to delete this category?')===false)
    return;
    this.delete();
  };
  update():void {
   const request:Category={
    id:this.categoryToUpdate!.id,
    name:this.categoryForm.value.name,
    description:this.categoryForm.value.name,
   };
   this.categoriesService.update(request).subscribe((response)=>{
    this.categoryToUpdate=response;
    this.toastrService.success("Category updated succesfully");
   })
  }
  add():void {
    const request:Category={
      ...this.categoryForm.value,
      name:this.categoryForm.value.name.trim(),
    };
    this.categoriesService.add(request).subscribe((response)=>{
      this.toastrService.success('Category added succesfully.');
      this.router.navigate(['/dashboard','categories','edit',response.id])
    });
  }
  
  delete() {
    this.categoriesService.delete(this.categoryToUpdate!.id).subscribe(()=>{
      this.toastrService.success("Category deleted succesfully");
      this.router.navigate(['/dashboard','categories']);
    })
  }
  
}