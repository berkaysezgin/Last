import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-categories-list',
  templateUrl: './dashboard-categories-list.component.html',
  styleUrls: ['./dashboard-categories-list.component.scss']
})
export class DashboardCategoriesListComponent {
categories!:Category[];
constructor(
  private categoriesService:CategoriesService,
) {}
getCategoriesList():void{
  this.categoriesService.getList().subscribe({
    next:(response)=>{
      this.categories=response;
    },
  })
}
ngOnInit():void{
  this.getCategoriesList();
}
}
