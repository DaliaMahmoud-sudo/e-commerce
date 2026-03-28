import { CartService } from './../../core/services/cart.service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-checkout',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  private readonly activatedRoute= inject(ActivatedRoute)
 private readonly fb= inject(FormBuilder)
 private readonly router= inject(Router)
 private readonly cartService= inject(CartService)
  cartId=signal<string>('');
  flag=signal<string>('cash');

  checkOut :FormGroup=this.fb.group({
    shippingAddress:this.fb.group({
      details:["", [Validators.required]],
      phone:["", [Validators.required]],
      city:["", [Validators.required]],
    })
  })


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCartId();
  }

  getCartId():void{
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.cartId.set(params.get('id')!)
    })
  }
  submitForm():void{
   if(this.checkOut.valid){
    if(this.flag()==="cash"){
      this.cartService.cashOrder(this.cartId() ,this.checkOut.value).subscribe({
        next:(res)=>{
          this.router.navigate(['/allorders'])

        }
      })
    }
    else{

        this.cartService.visaOrder(this.cartId() ,this.checkOut.value).subscribe({
        next:(res)=>{
          if(res.status === 'success'){
            window.open(res.session.url , '_self')
          }

        }
      })

    }

   }
  }
  changeFlag(el:HTMLInputElement):void{
    this.flag.set(el.value)

  }

}
