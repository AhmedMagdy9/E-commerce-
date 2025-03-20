import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../core/services/products/product.service';
import { Products } from '../../../shared/interfaces/products';
import { debounceTime, distinctUntilChanged, Subscription, switchMap } from 'rxjs';
import { CardComponent } from "../../../shared/card/card/card.component";
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { log } from 'node:console';
@Component({
  selector: 'app-product',
  imports: [CardComponent , FormsModule , TranslatePipe , ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  private  ProductService = inject(ProductService)
  private subscription: Subscription = new Subscription();

  priceInput:FormControl = new FormControl()
  allProduct: Products[] =[]
  searchInput: WritableSignal<string> = signal('') 
  pageNum:number = 1
  numberOfPages!:number 


    ngOnInit() {
      this.getProducts(1)
    }

    nextPage(){
   this.pageNum++

 this.getProducts(this.pageNum)

    }
    prevPage(){
      if (this.pageNum > 1 ){
        this.pageNum--
        this.getProducts(this.pageNum)
      }
     
    }
    getProducts(page:number){
      if (this.pageNum < 1) return; 
      if (this.pageNum > this.numberOfPages){
        this.pageNum =this.numberOfPages 
        return;
      } 

      let sub = this.ProductService.getAllProducts(0 , page).subscribe({
        next: (res) => {
          this.allProduct = res.data;
        this.numberOfPages =  res.metadata.numberOfPages
        },
        error: (err) => {
          console.log(err);
        }
      });
      this.subscription.add(sub); 
      const inputSubscription = this.priceInput.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(q => {
          if (!q) {
            return this.ProductService.getAllProducts(0,page);  
          }
          return this.ProductService.getAllProducts(q ,page);
        })
      ).subscribe({
        next: (res) => {
          this.allProduct = res.data;
        },
        error: (err) => {
          console.log(err);
        }
      });
      this.subscription.add(inputSubscription); 
    }
    ngOnDestroy() {
      this.subscription.unsubscribe(); 
    }
}
