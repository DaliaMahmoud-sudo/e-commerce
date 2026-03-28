import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { sign } from 'node:crypto';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);

  step = signal<number>(1);

  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  code: FormControl = new FormControl("", [Validators.required]);
  Password: FormControl = new FormControl("", [Validators.required]);

  submitCode(e: Event):void{
    e.preventDefault();
    const data ={
  resetCode:this.code.value
}
this.authService.sendCode(data).subscribe({
  next:(res)=>{
    this.step.set(3);
  }
})




  }
  submitEmail(e: Event):void{
 e.preventDefault();
const data ={
  email:this.email.value
}
this.authService.forgetPassword(data).subscribe({
  next:(res)=>{
    this.step.set(2);
  }
})

  }
  submitPassword(e: Event):void{
 e.preventDefault();
 const data ={
    email:this.email.value,
  newPassword:this.Password.value
}
this.authService.updatePassword(data).subscribe({
  next:(res)=>{
    this.router.navigate(['/login'])
  }
})

  }

}
