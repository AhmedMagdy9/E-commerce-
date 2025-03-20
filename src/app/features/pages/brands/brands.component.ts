import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../../core/services/checkOut/brands/brands.service';
import { Interbrands } from '../../../shared/interfaces/brands/interbrands';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-brands',
  imports: [ TranslatePipe , DatePipe ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit , OnDestroy {
  private brandsService:BrandsService = inject(BrandsService)
  private subscription: Subscription = new Subscription();


  allBrands:WritableSignal<Interbrands[]> = signal([])
  specBrands: WritableSignal<Interbrands> = signal<Interbrands>({} as Interbrands);
  iscome: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.getAllBrands()
  }
  getAllBrands(){
  let sub = this.brandsService.getAllBrandsApi().subscribe({
      next : (res)=>{
        this.allBrands.set(res.data) 
      },
      error : (err)=>{console.log(err)}
    })
    this.subscription.add(sub)
  }
  getSpecBrand(brandID:any){
    let sub =  this.brandsService.getSpecBrandsApi(brandID).subscribe({
    next : (res)=>{
    this.specBrands.set(res.data) 
    this.iscome.set( true)
      },
      error : (err)=>{console.log(err)}
    })
    this.subscription.add(sub)
  }
  cancelSpec(){
    this.iscome.set( false)
  }
ngOnDestroy(): void {
 this.subscription.unsubscribe()
}
}
