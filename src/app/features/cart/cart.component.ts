import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/models/cart.interface';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService=inject(CartService);
  private readonly pLATFORM_ID=inject(PLATFORM_ID);
  cartDetails = signal<Cart>({} as Cart);

  ngOnInit(): void {
    if(isPlatformBrowser(this.pLATFORM_ID)){
        this.getAllCart();
    }

  }
  getAllCart():void{
   this.cartService.getAllCart().subscribe({
        next:(res)=>{

        console.log(res.data);
        this.cartDetails.set(res.data)
      }


    });

  }
  removeItem(id:string):void{
       this.cartService.removeProduct(id).subscribe({
        next:(res)=>{
          this.cartService.cartCount.set(res.numOfCartItems)
        console.log(res.data);
         this.cartDetails.set(res.data)

      }


    });

  }

  update(id:string,count:number):void{
           this.cartService.updateCart(id,count).subscribe({
        next:(res)=>{

        console.log(res.data);
         this.cartDetails.set(res.data)

      }


    });

  }


  clear():void{
           this.cartService.clearCart().subscribe({
        next:(res)=>{

        console.log(res.data);
         this.cartDetails.set(res.data)

      }


    });

  }

}
