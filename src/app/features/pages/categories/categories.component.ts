import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { Icategory } from '../../../shared/interfaces/brands/interbrands';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-categories',
  imports: [TranslatePipe , RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private categoryService: CategoryService = inject(CategoryService)
  private subscription: Subscription = new Subscription();

  
  allCat:WritableSignal<Icategory[]> = signal([])
  allSubCat:WritableSignal<Icategory[]> = signal([])
  subCat:WritableSignal<boolean> = signal(false)
  catname:WritableSignal<string> = signal('')

  ngOnInit(): void {
    this.getAllCat()
  }
  getAllCat() {
    let sub = this.categoryService.getAllCatApi().subscribe({
      next: (res) => {
        this.allCat.set(res.data)
     
      },
      error: (err) => { console.log(err) }
    })
    this.subscription.add(sub)
  }
  getSpecCat(cartid: string, catname: string) {
    let sub = this.categoryService.getSpecCatApi(cartid).subscribe({
      next: (res) => {
        this.subCat.set(true) 
        this.allSubCat.set(res.data)
        this.catname.set(catname)
    
      },
      error: (err) => { console.log(err) }
    })
    this.subscription.add(sub)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
