
import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../../core/services/checkOut/orders.service';
import {  Subscription, timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { AlertComponent } from "../../../shared/reUsable-comp/alerts/alert.component";
import { CountNumService } from '../../../core/services/countNum/count-num.service';


@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule, TranslatePipe, AlertComponent],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnDestroy  {

private order = inject(OrdersService)
private activatedRoute = inject(ActivatedRoute)
private toastrService  = inject(ToastrService)
private router  = inject(Router)
  private countNumService = inject(CountNumService)
private subscription: Subscription = new Subscription();


cartID!:string




checkOutForm:FormGroup = new FormGroup({
  details : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20) , Validators.pattern(/^[a-zA-Z_]{3,20}$/)]),
 phone : new FormControl(null ,[Validators.required , Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
  city : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20) , Validators.pattern(/^[a-zA-Z_]{3,20}$/)]),
})




checkOut() {

  let sub1 = this.activatedRoute.paramMap.subscribe((p) => {
    this.cartID = p.get('cartID')!;
  });
  this.subscription.add(sub1);

 
  if (!this.checkOutForm.valid) {
    this.toastrService.warning('Please enter your details');
    return;
  }

  let sub2 = this.order.checkOutApi(this.cartID, this.checkOutForm.value).subscribe({
    next: (res) => {
      window.location.href = res.session.url;
    },
    error: (err) => {
      console.error(err);
      if (!err.ok) {
        this.toastrService.error('There are no products in the cart.');

        let sub3 = timer(2000).subscribe(() => {
          this.router.navigate(['/cart']);
        });
        this.subscription.add(sub3);
      }
    }
  });

  this.subscription.add(sub2);
}

cashOrder(){
  
let sub1 =  this.activatedRoute.paramMap.subscribe((p)=>{

  this.cartID =  p.get('cartID')!
})
this.subscription.add(sub1)

if (!this.checkOutForm.valid) {
  this.toastrService.warning('Please enter your details');
  return;
}

let sub =  this.order.cashOrderApi(this.cartID , this.checkOutForm.value).subscribe({
    next : (res)=>{
  if(res.status === 'success'){
    this.toastrService.success('It has been paid successfully.')
  this.countNumService.cartNum.next(0)

  let sub2 = timer(3000).subscribe(()=>{
      this.router.navigate(['/allorders'])
     })
      this.subscription.add(sub2)
    }
    },
    error : (err)=>{
      if(err.ok === false)
        {
     this.toastrService.error('There are no products in the cart.')
        
     let sub3 =   timer(3000).subscribe(()=>{
      this.router.navigate(['/home'])
     })
      this.subscription.add(sub3)
        }
    }
  })
  this.subscription.add(sub)
}

ngOnDestroy(): void {
  this.subscription.unsubscribe()

}

}


