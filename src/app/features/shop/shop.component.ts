import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../core/models/product.interface';
import { CardComponent } from "../../shared/ui/card/card.component";
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-shop',
  imports: [CardComponent,NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
    private readonly productsService=inject(ProductsService)

   private readonly toastrService=inject(ToastrService)

  productList=signal<Product[]>([])

  pageSize=signal<number>(0)
  p=signal<number>(0)
  total=signal<number>(0)


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllProducts();
  }
  getAllProducts(){
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.productList.set(res.data);
         this.pageSize.set(res.metadata.limit);
         this.p.set(res.metadata.currentPage);
         this.total.set(res.metadata.results);
        console.log(res);

      },
      error:(err)=>{
         this.toastrService.warning(err.message,"fresh cart",{closeButton:true})
      }
    })


  }
  pageChanged(num:number):void{
     this.productsService.getAllProducts(num).subscribe({
      next:(res)=>{
        this.productList.set(res.data);
         this.pageSize.set(res.metadata.limit);
         this.p.set(res.metadata.currentPage);
         this.total.set(res.metadata.results);
        console.log(res);

      },
      error:(err)=>{
         this.toastrService.warning(err.message,"fresh cart",{closeButton:true})
      }
    })

  }
}
