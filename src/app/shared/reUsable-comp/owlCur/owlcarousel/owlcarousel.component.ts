import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Products } from '../../../interfaces/products';
@Component({
  selector: 'app-owlcarousel',
  imports: [CarouselModule],
  templateUrl: './owlcarousel.component.html',
  styleUrl: './owlcarousel.component.scss'
})
export class OwlcarouselComponent {

   @Input() allProduct: Products[] =[]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    rtl : true,
    navSpeed: 300,
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


}
