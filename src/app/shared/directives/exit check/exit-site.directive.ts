import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appExitSite]'
})
export class ExitSiteDirective {

  constructor() { }


@HostListener('click' , ['$event']) onclick(e:any){
 let urlIcon:string = e.target.getAttribute('href')


 let isLeave:boolean = window.confirm('are your sure to leave this website')
    
if (isLeave) {

  window.open(urlIcon)
  
}



  }

}
