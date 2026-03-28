import { Component, inject, input } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  product=input.required<Product>()
    private readonly cartService=inject(CartService)
   private readonly toastrService=inject(ToastrService)
    addToCart(id:string){
    if(localStorage.getItem('freshToken')){
          this.cartService.addToCart(id).subscribe({
         next:(res)=>{
          this.cartService.cartCount.set(res.numOfCartItems)
 this.toastrService.success(res.message ,"fresh cart",{closeButton:true})
        console.log(res);
      }

    })
    }
    else{
      this.toastrService.warning("login  First","fresh cart",{closeButton:true})
    }
  }

}
