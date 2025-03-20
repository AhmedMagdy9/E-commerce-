import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { Icart } from '../../../shared/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CountNumService } from '../../../core/services/countNum/count-num.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [ RouterLink , TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit , OnDestroy {
 private cartService = inject(CartService)
 private toastrService = inject(ToastrService)
 private countNumService = inject(CountNumService)
 private subscriptions: Subscription = new Subscription();


 allCartProducts:WritableSignal<Icart[]> = signal([])
 totalCartPrice:WritableSignal<number> = signal(0)
 cartID:WritableSignal<string> = signal('')
 numOfCartItems:WritableSignal<string> = signal('')
 CartInf:WritableSignal<boolean> = signal(false)



ngOnInit(): void {
  this.getAllCart()
}

toggleCart(){
 
  this.CartInf.set(!this.CartInf()); // عند الضغط على الزرار يتم التبديل بين الإظهار والإخفاء
 
}


getAllCart(){
  
let sub =  this.cartService.getAllCartapi().subscribe({
  next :(res)=>{
this.totalCartPrice.set(res.data.totalCartPrice) 
this.allCartProducts.set(res.data.products) 
this.cartID.set(res.cartId) 
this.numOfCartItems.set(res.numOfCartItems)
console.log(res)
  },
  error :(err)=>{console.log(err)}
})
this.subscriptions.add(sub)
}

removeProduct(pid:string){
  let sub = this.cartService.removeProductApi(pid).subscribe({
    next:(res)=>{
      this.toastrService.success('Deleted product is sucessfuly' , 'Delete')
      
   if (res.status = 'success') {
    this.getAllCart()
    this.countNumService.cartNum.next(res.numOfCartItems)
 
    
   }

    },
    error:(err)=>{console.log(err)}
  })
  this.subscriptions.add(sub)
}

updateProduct( pid:string , count:number){
  let sub = this.cartService.updateProductApi(pid , count).subscribe({
    next : (res)=>{
      if (res.status == 'success') {
        this.toastrService.success('your product updated' , 'my cart')
        this.getAllCart()
      }
    },
    error : (err)=>{console.log(err)}
  })
  this.subscriptions.add(sub)
}

clearAllProduct(){

  let sub = this.cartService.clearCart().subscribe({
    next : (res)=>{
      if (res.message == 'success') {
        this.toastrService.success('your cart cleared' , 'my cart')
        this.getAllCart()
        this.countNumService.cartNum.next(0)
      }

    },
    error : (err)=>{console.log(err)}
  })
  this.subscriptions.add(sub)
 
}

ngOnDestroy(): void {
  this.subscriptions.unsubscribe()
}

}