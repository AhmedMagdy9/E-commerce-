import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../core/services/products/product.service';
import { Products } from '../../../../shared/interfaces/products';
import { TranslatePipe } from '@ngx-translate/core';
import { CardComponent } from "../../../../shared/card/card/card.component";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-productcat',
  imports: [ CardComponent , TranslatePipe ],
  templateUrl: './productcat.component.html',
  styleUrl: './productcat.component.scss'
})
export class ProductcatComponent implements OnInit , OnDestroy{
  private productService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);
  private subscriptions: Subscription = new Subscription(); 
  
  catid = signal<string | null>(null);
  productscat = signal<Products[]>([]);
  catName = signal<string>('Loading...');
  
  ngOnInit(): void {
    let sub = this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('catid');
      if (id) {
        this.catid.set(id);
        
        this.loadProducts(id);
      }
    });
    this.subscriptions.add(sub);
  }
  
  private loadProducts(catid: string) {
    let sub = this.productService.getProductsCatapi(catid).subscribe({
      next: (res) => {
        this.productscat.set(res);
        this.catName.set(res.length ? res[0]?.category?.name:'');
      },
      error: (err) => console.error('Error loading products:', err),
    });
    this.subscriptions.add(sub); 
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); 
  }
}





