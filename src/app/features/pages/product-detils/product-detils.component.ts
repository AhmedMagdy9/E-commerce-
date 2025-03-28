import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../../core/services/cart/cart.service';
import { Component, CreateSignalOptions, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/products/product.service';
import { Products } from '../../../shared/interfaces/products';
import { Subscription, switchMap, tap } from 'rxjs';
import { PlatformService } from '../../../core/services/platform/platform.service';
import { CountNumService } from '../../../core/services/countNum/count-num.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TranslatePipe } from '@ngx-translate/core';
import { LoopcrsalComponent } from "../../../shared/reUsable-comp/owlCur/owlcarousel/loopcarousal/loopcrsal/loopcrsal.component";
import { CardComponent } from "../../../shared/card/card/card.component";



@Component({
  selector: 'app-product-detils',
  imports: [CarouselModule, TranslatePipe,  CardComponent]  ,
  templateUrl: './product-detils.component.html',
  styleUrl: './product-detils.component.scss'
})
export class ProductDetilsComponent implements OnInit , OnDestroy  {
  private activatedRoute = inject(ActivatedRoute)
   private ProductService = inject(ProductService)
   private PlatformService = inject(PlatformService)
   private CartService = inject(CartService)
   private ToastrService = inject(ToastrService)
   private countNumService = inject(CountNumService)
    private  router = inject(Router)
    private subscription: Subscription = new Subscription();
     customOptions: OwlOptions = {
       loop: true,
       mouseDrag: true,
       touchDrag: false,
       pullDrag: false,
       rtl : true,
       dots: false,
       navSpeed: 700,
       navText: ['', ''],
       responsive: {
         0: {
           items: 1
         },
         400: {
           items: 1
         },
         740: {
           items: 1
         },
         940: {
           items: 1
         }
       },
       nav: true
     }
     customOptions1: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      rtl : true,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 1
        },
        740: {
          items: 2
        },
        940: {
          items: 4
        }
      },
      nav: true
    }
   


  productscat = signal<Products[]>([]);
  itemDetils: WritableSignal<Products | null> = signal<Products | null>(null);

 ngOnInit(): void {
  this.watchRouteChanges()
 }



watchRouteChanges(){
  let sub = this.activatedRoute.paramMap.pipe(
    switchMap((params) => {
      let productId = params.get('id');
      return this.fetchProductDetails(productId);
    })
  )
  .subscribe();

this.subscription.add(sub);
}

fetchProductDetails(productId: string | null){
  if (!productId || !this.PlatformService.cheekplatform()) {
    return [];
  }
  return this.ProductService.getSpecProduct(productId).pipe(
    tap((res) => {
      this.itemDetils.set(res.data);
      this.relatedProduct();
    })
  );
}

relatedProduct(){

  if (this.PlatformService.cheekplatform()) {
    let sub =    this.ProductService.$product?.subscribe({
      next: (products) => {
       this.productscat.set(products.data.filter((product: any) => product.category._id === this.itemDetils()?.category._id)) 
  

      },
      error: (err) => console.error( err),
    });
  this.subscription.add(sub)  }

}

addToCart(pid:string|undefined){

  if (localStorage.getItem('userToken')) {
 let sub =    this.CartService.addTOCartapi(pid).subscribe({
      next:(res)=>{
      this.ToastrService.success(res.message ,' my cart ')
      this.countNumService.cartNum.next(res.numOfCartItems)
      },
      error:(err)=>{console.log(err)}
    })
    this.subscription.add(sub)
  }else{this.router.navigate(['/login'])
    this.ToastrService.error('Please Login First', 'My Cart');
   }
}

ngOnDestroy(): void {
  this.subscription.unsubscribe()
}

}


