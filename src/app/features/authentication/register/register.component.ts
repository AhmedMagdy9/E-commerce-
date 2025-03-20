import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthenSerService } from '../../../core/services/authService/authen-ser.service';
import { Router } from '@angular/router';
import { AlertComponent } from "../../../shared/reUsable-comp/alerts/alert.component";
import { Subscription } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, AlertComponent , TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
private authenSerService = inject(AuthenSerService)
private router = inject(Router)


 isLoading:WritableSignal<boolean> = signal(false)
errorMessage:WritableSignal<string> = signal('')

private subscription: Subscription = new Subscription();
  registerForm:FormGroup = new FormGroup({
    name : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20) , Validators.pattern(/^[a-zA-Z_]{3,20}$/)]),
    email : new FormControl(null ,[Validators.required , Validators.email]),
    password : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/)]),
    rePassword : new FormControl(null ,[Validators.required , Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/)]) ,
    phone : new FormControl(null ,[Validators.required , Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
  } , this.confirmPass)
  confirmPass(form:AbstractControl):any
  {
    if (form.get('password')?.value === form.get('rePassword')?.value) {
      return null
    }else{
      return {'missmached' : true}
      }
  }
  registerSubmit(){
   if(this.registerForm.valid){
    this.isLoading.set(true) ;
    let sub = this.authenSerService.sendRegAPI(this.registerForm.value).subscribe({
    next : (res)=>{
      this.isLoading.set(false) ; 
    if(res.message == 'success'){
    this.router.navigate(['/login'])
    }
    } ,
    error : (err)=>{
    this.errorMessage.set(err.error.message)  
    this.isLoading.set(false) ;
    },
  })
    this.subscription.add(sub)
   }
  }
  ngOnDestroy(): void {
  this.subscription.unsubscribe()
  }
}
