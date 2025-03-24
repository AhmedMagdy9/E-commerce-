import { Component, inject, OnDestroy, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { CardComponent } from "../../../shared/card/card/card.component";
import { ProductService } from '../../../core/services/products/product.service';
import { Subscription } from 'rxjs';
import { Products } from '../../../shared/interfaces/products';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlcarouselComponent } from "../../../shared/reUsable-comp/owlCur/owlcarousel/owlcarousel.component";
import { LoopcrsalComponent } from "../../../shared/reUsable-comp/owlCur/owlcarousel/loopcarousal/loopcrsal/loopcrsal.component";
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { Iwish, Product } from '../../../shared/interfaces/icart';
import { PlatformService } from '../../../core/services/platform/platform.service';
@Component({
  selector: 'app-home',
  imports: [CardComponent, FormsModule, OwlcarouselComponent,  ReactiveFormsModule] ,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy {
 private  ProductService = inject(ProductService)
 private  wishlistService = inject(WishlistService)
 private  PlatformService = inject(PlatformService)
 private subscriptions: Subscription = new Subscription();


allProduct: Products[] =[]
wishlistProduct: Iwish[] = []
isLogin:WritableSignal<boolean> = signal(false)
 
ngOnInit(): void {
   this.getAllProd();

   if (this.PlatformService.cheekplatform()) {
      this.getwishList()
    }

  }

 getAllProd(){
 let sub = this.ProductService.getAllProductsHome().subscribe({
      next : (res)=>{
        this.allProduct = res.data
       
      },
      error : (err)=>{console.log(err)}
    })
    this.subscriptions.add(sub)
  }

  getwishList(){
    if (localStorage.getItem('userToken')) { 
      this.isLogin.set(true)
      let sub =   this.wishlistService.wishlist$.subscribe((wishlist) => {
        this.wishlistProduct = wishlist;
    });
    this.subscriptions.add(sub)
    }

  }



  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
