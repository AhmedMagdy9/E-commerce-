import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Products } from '../../../../../interfaces/products';

@Component({
  selector: 'app-loopcrsal',
  imports: [ CarouselModule],
  templateUrl: './loopcrsal.component.html',
  styleUrl: './loopcrsal.component.scss'
})
export class LoopcrsalComponent   {
  @Input() allProduct: Products[] =[]
  onecat!:Products[]




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
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }


}
