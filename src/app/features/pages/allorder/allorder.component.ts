import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { OrdersService } from '../../../core/services/checkOut/orders.service';
import { AuthenSerService } from '../../../core/services/authService/authen-ser.service';
import { Iuserorder } from '../../../shared/interfaces/userorders/userorders';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-allorder',
  imports: [ TranslatePipe , DatePipe ],
  templateUrl: './allorder.component.html',
  styleUrl: './allorder.component.scss'
})
export class AllorderComponent implements OnInit , OnDestroy {
  private OrdersService = inject(OrdersService)
  private authenSerService = inject(AuthenSerService)
  private subscription: Subscription = new Subscription();


  userOrder:WritableSignal<Iuserorder[]> = signal([])

ngOnInit(): void {
this.getAllOrder()
}
getAllOrder(){
 let sub =  this.OrdersService.getuserOrders(this.authenSerService.personData.value.id).subscribe({
    next : (res)=>{
      this.userOrder.set(res) 
    },
    error : (err)=>{console.log(err)}
  })
  this.subscription.add(sub)
}
ngOnDestroy(): void {
  this.subscription.unsubscribe()
}
}
