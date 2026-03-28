import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
    constructor(private flowbiteService: FlowbiteService) {}
    private readonly authService=inject(AuthService)
    private readonly cartService=inject(CartService)
    private readonly pLATFORM_ID=inject(PLATFORM_ID)

    Logged= computed(()=>
      this.authService.isLogged()
    );
    count= computed(()=>
      this.cartService.cartCount()
    )

  ngOnInit(): void {

  if(isPlatformBrowser(this.pLATFORM_ID)){
     this.getCartCount();
    if(localStorage.getItem('freshToken')){
      this.authService.isLogged.set(true);
    }}


    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

}
signOut():void{
  this.authService.signOut();
}
getCartCount():void{
  this.cartService.getAllCart().subscribe({
    next:(res)=>{
      this.cartService.cartCount.set(res.numOfCartItems)
    }
  })
}

}
