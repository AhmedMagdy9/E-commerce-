import { CountNumService } from './../../../core/services/countNum/count-num.service';
import {  Component,    inject, Input, OnDestroy, OnInit,  signal, WritableSignal } from '@angular/core';
import { Products } from '../../interfaces/products';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import {  Subscription } from 'rxjs';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { TranslatePipe } from '@ngx-translate/core';
import { PlatformService } from '../../../core/services/platform/platform.service';



@Component({
  selector: 'app-card',
  imports: [ RouterLink , TranslatePipe ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements  OnInit,    OnDestroy {
 private cartService = inject(CartService)
 private wishlistService = inject(WishlistService)
 private toastrService = inject(ToastrService)
 private countNumService = inject(CountNumService)
 private  PlatformService = inject(PlatformService)
 private  router = inject(Router)
 private subscriptions: Subscription = new Subscription();

 @Input() oneproduct!:Products 
 @Input() wishlistProduct: any[] = [];
flagRed:WritableSignal<boolean> = signal(false)





ngOnInit(): void {
 
  
  if (this.PlatformService.cheekplatform()) {
  
    if (localStorage.getItem('userToken')) {
     this.wishlistService.wishlist$.subscribe((wishlist) => {
      this.flagRed.set(wishlist.some((item) => item._id === this.oneproduct._id));
     
    });
  
    }
    }
    
}

addToCart(pid: string) {
  if (localStorage.getItem('userToken')) {
   let sub = this.cartService.addTOCartapi(pid).subscribe({
     next: (res) => {
       this.toastrService.success(res.message, 'My Cart');
       this.countNumService.cartNum.next(res.numOfCartItems);
     },
     error: (err) => console.log(err),
   });
  this.subscriptions.add(sub)
   
  }else{this.router.navigate(['/login'])
   this.toastrService.error('Please Login First', 'My Cart');
  }
 }

toggleWishList(pid: string, ){
  
(this.flagRed())?     this.removeWishlist(pid)    :this.addWishlist(pid) 

}

addWishlist(pid: string, ){

  if (localStorage.getItem('userToken')) {
   let sub =  this.wishlistService.addToWishApi(pid).subscribe({
     next: (res) => {
            this.toastrService.success(res.message, 'My Wish List');
        
           this.flagRed.set(true)
          
          },
          error: (err) => console.log(err),
        });
        this.subscriptions.add(sub)
   
  }else{this.router.navigate(['/login'])
   this.toastrService.error('Please Login First', 'My Wish List');
  }
}

removeWishlist(pid: string, ){

  let sub =  this.wishlistService.deleteWishApi(pid).subscribe({
    next: (res) => {
           this.toastrService.success(res.message, 'My Wish List');
          this.flagRed.set(false)
         
         },
         error: (err) => console.log(err),
       });
       this.subscriptions.add(sub)
}

ngOnDestroy(): void {

  this.subscriptions.unsubscribe()
   

}


}
