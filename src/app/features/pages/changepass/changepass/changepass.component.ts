import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "../../../../shared/reUsable-comp/alerts/alert.component";
import { TranslatePipe } from '@ngx-translate/core';
import { AuthenSerService } from '../../../../core/services/authService/authen-ser.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-changepass',
  imports: [AlertComponent , ReactiveFormsModule , TranslatePipe],
  templateUrl: './changepass.component.html',
  styleUrl: './changepass.component.scss'
})
export class ChangepassComponent implements OnDestroy {
  private authenSerService = inject(AuthenSerService)
  private toastrService = inject(ToastrService)
  private router = inject(Router)
  private subscription: Subscription = new Subscription();
  
  updatepass:FormGroup = new FormGroup({
    currentPassword : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/)]), 
    password :new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/)]), 
    rePassword :new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/)]), 
  }, this.confirmPass)

  confirmPass(form:AbstractControl):any
    {
      if (form.get('password')?.value === form.get('rePassword')?.value) {
        return null
      }else{
        return {'missmached' : true}
        }
    }

  sendUpdatePass(){
   let sub =  this.authenSerService.changePassApi(this.updatepass.value).subscribe({
     next : (res)=>{
    if (res.message == 'success') {
      this.toastrService.success('The password has been changed successfully..')
      let isLeave:boolean = window.confirm('Do you want to log out?')
      if (isLeave) {
        localStorage.removeItem('userToken')
        this.router.navigate(['/login'])
      this.authenSerService.personData.next(null)
      }else{
        this.router.navigate(['/home'])
      }
    }
  },
  error : (err)=>{
    console.log(err)
    this.toastrService.warning(err.error.errors.msg)
  }
})
this.subscription.add(sub)
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe()
  }
}
