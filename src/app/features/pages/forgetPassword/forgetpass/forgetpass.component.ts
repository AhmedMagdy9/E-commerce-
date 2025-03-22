import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "../../../../shared/reUsable-comp/alerts/alert.component";
import { AuthenSerService } from '../../../../core/services/authService/authen-ser.service';
import { PlatformService } from '../../../../core/services/platform/platform.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-forgetpass',
  imports: [ReactiveFormsModule, AlertComponent , TranslatePipe ],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.scss'
})
export class ForgetpassComponent  implements OnDestroy{
  private authenSerService = inject(AuthenSerService)
  private toastrService = inject(ToastrService)
  private router = inject(Router)
  private subscription: Subscription = new Subscription();
  email:FormControl = new FormControl(null ,[ Validators.required , Validators.email ])
  code:FormControl = new FormControl(null ,[ Validators.required , Validators.pattern(/^[0-9]{6}$/) ])
  changepass:FormGroup = new FormGroup({
    email : new FormControl(null ,[Validators.required , Validators.email]),
    newPassword : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/)]), 
  })

  forget: WritableSignal<string | null> = signal<string | null>(null);
 isLoading:WritableSignal<boolean> = signal(false)
 showPassword = signal(false);


constructor(private PlatformService:PlatformService){
  if (this.PlatformService.cheekplatform()) {
    this.forget.set(sessionStorage.getItem('forgetpass')) 
  }
}
  emailSubmit(){
    this.isLoading.set(true) ;
    let sub =  this.authenSerService.sendEmailApi(this.email.value).subscribe({
      next:(res)=>{
        if (res.statusMsg === 'success') {
          this.isLoading.set(false) ;
          this.forget.set('send code')
          sessionStorage.setItem('forgetpass' , this.forget()!)
          this.toastrService.warning(res.message)
        }
      },
      error:(err)=>{
        console.log(err.error.message)
        this.toastrService.warning(err.error.message)
        this.isLoading.set(false) ;
      }
    })
  this.subscription.add(sub)
  }
  codeSubmit(){
    this.isLoading.set(true) ;
    let sub   =   this.authenSerService.sendCodeApi(this.code.value).subscribe({
      next:(res)=>{
        if (res.status === 'Success') {
          this.isLoading.set(false) ;
          this.forget.set('change pass')
          sessionStorage.setItem('forgetpass' , this.forget()!)
          this.toastrService.success(res.status)
        }
      },
      error:(err)=>{
        console.log(err)
        this.toastrService.warning(err.error.message)
        this.isLoading.set(false) ;
      }
    })
    this.subscription.add(sub)
  }
  sendNewPass(){
    this.isLoading.set(true) ;
    console.log(this.changepass.value)
    let sub  =   this.authenSerService.sendNewPassApi(this.changepass.value).subscribe({
      next : (res)=>{
        if(res.token){
          this.isLoading.set(false) ;
          localStorage.setItem('userToken' , res.token)
          this.authenSerService.saveToken()
          this.router.navigate(['/home'])
          sessionStorage.removeItem('forgetpass')
          this.forget.set(null) 
          }   
      },
      error : (err)=>{
        console.log(err)
        this.isLoading.set(false) ;
      }
    })
    this.subscription.add(sub)
  }
  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }
  reternEmail(){
    this.forget.set(null) 
    sessionStorage.removeItem('forgetpass')
  }
  ngOnDestroy(): void {
   this.subscription.unsubscribe()
  }
}
