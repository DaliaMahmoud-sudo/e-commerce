import { Component } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { SliderComponent } from './slider/slider.component';
import { HomeCategoryComponent } from './home-category/home-category.component';

@Component({
  selector: 'app-home',
  imports: [ProductComponent,SliderComponent,HomeCategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
