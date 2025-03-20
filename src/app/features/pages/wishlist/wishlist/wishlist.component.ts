import { Component, inject, Input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';
import {  Iwish } from '../../../../shared/interfaces/icart';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../../core/services/cart/cart.service';
import { CountNumService } from '../../../../core/services/countNum/count-num.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  imports: [TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit , OnDestroy {
private wishlistService:WishlistService = inject(WishlistService)
private toastrService = inject(ToastrService)
private CartService = inject(CartService)
private countNumService = inject(CountNumService)
private subscriptions: Subscription = new Subscription();


wishlistProduct:WritableSignal<Iwish[]> = signal([])
totalItem:WritableSignal<number> = signal(0)

ngOnInit(): void {

  let sub = this.wishlistService.wishlist$.subscribe({
    next: (wishlist) => {
      this.wishlistProduct.set(wishlist) ;
      this.totalItem.set(wishlist.length);
    },
    error: (err) => console.log(err),
  });

  this.subscriptions.add(sub);
  this.wishlistService.getWishApi().subscribe({
    error: (err) => console.log("Error fetching wishlist:", err),
  });
}

deleteWishProduct(pid: string) {
  let sub =  this.wishlistService.deleteWishApi(pid).subscribe({
    next: (res) => {
      if (res.status === 'success') {
        this.toastrService.error(res.message);
      }
    },
    error: (err) => console.log(err)
  });
  this.subscriptions.add(sub)
}

addToCart(pid: string) {
  let sub =  this.CartService.addTOCartapi(pid).subscribe({
    next: (res) => {
      this.toastrService.success(res.message, 'My Cart');
      this.deleteWishProduct(pid);
      this.countNumService.cartNum.next(res.numOfCartItems);
    },
    error: (err) => console.log(err)
  });
  this.subscriptions.add(sub)
}

ngOnDestroy(): void {

  this.subscriptions.unsubscribe()
   

}

}
