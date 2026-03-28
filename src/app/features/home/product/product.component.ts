import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/models/product.interface';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from "../../../shared/ui/card/card.component";

@Component({
  selector: 'app-product',
  imports: [RouterLink, RouterLinkActive, CardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit{
  private readonly productsService=inject(ProductsService)

   private readonly toastrService=inject(ToastrService)

  productList=signal<Product[]>([])

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllProducts();
  }
  getAllProducts(){
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.productList.set(res.data);
        console.log(res);
      },
      error:(err)=>{
         this.toastrService.warning(err.message,"fresh cart",{closeButton:true})
      }
    })


  }

}
