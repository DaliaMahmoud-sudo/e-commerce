import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories.service';
import { ICategory } from '../../../core/models/product.interface';

@Component({
  selector: 'app-home-category',
  imports: [],
  templateUrl: './home-category.component.html',
  styleUrl: './home-category.component.css',
})
export class HomeCategoryComponent implements OnInit{
  private readonly categoriesService=inject(CategoriesService);
  categoryList=signal<ICategory[]>([] )
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoryList.set(res.data);

      },
      error:(err)=>{

      }
    })

  }

}
