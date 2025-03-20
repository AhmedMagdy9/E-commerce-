
import { PlatformService } from './../../../core/services/platform/platform.service';
import { Component,  HostListener,  inject, OnChanges, OnDestroy, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive,  } from '@angular/router';
import { AuthenSerService } from '../../../core/services/authService/authen-ser.service';
import { Subscription } from 'rxjs';
import { DarkmodeService } from '../../../core/services/darkmode/darkmode.service';
import { CountNumService } from '../../../core/services/countNum/count-num.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { MyTranslateService } from '../../../core/services/myTranslate/my-translate.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';





@Component({
  selector: 'app-navbar',
  imports: [ RouterLink  ,RouterLinkActive , TranslatePipe ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit  ,   OnDestroy{
  private authenSerService = inject(AuthenSerService)
 private  myTranslateService = inject(MyTranslateService)

    private router = inject(Router)
    private countNumService = inject(CountNumService)
    private cartService = inject(CartService)
    private darkmodeService:DarkmodeService = inject(DarkmodeService)
    private PlatformService = inject(PlatformService)
    private subscription: Subscription = new Subscription();
  
 

isLogin:WritableSignal<boolean> = signal(false)
isScrolled:WritableSignal<boolean> = signal(false)
lang:WritableSignal<boolean> = signal(true)
logOut:WritableSignal<boolean> = signal(true)
navCountNum:WritableSignal<number> = signal(0)





 
  ngOnInit(): void {

    this.countNav()
   this.navLinksCallCart()
    this.dark()
  }

  navLinksCallCart(){
    let sub2 = this.authenSerService.personData.subscribe((res)=>{
      if (res != null) {
        this.isLogin.set(true) 
        this.getAllCartCount()
      }else{
      this.isLogin.set(false) 
      }
    })

    this.subscription.add(sub2)
  }

  countNav(){
    let sub =   this.countNumService.cartNum.subscribe({
      next:(data)=>{
        this.navCountNum.set(data)
      }
    })
    this.subscription.add(sub)
  }

  disLang(){
    if (this.lang()) {
      this.lang.set(false)
  }else{this.lang.set(true)}
  }
  
  disLog(e:MouseEvent){
    if (this.logOut()) {
      this.logOut.set(false)
    
  }else{this.logOut.set(true)}
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    this.isScrolled.set(scrollPosition > 40); 
  }
  
  changeLang(lang: string) {
    this.myTranslateService.changeLang(lang)
    this.lang.set(true)
  }

 dark(){
  if (this.PlatformService.cheekplatform()) {
    this.darkmodeService.initializeDarkMode();
  }
 }

   toogileMode(){
 
    this.darkmodeService.toggleDarkMode()
  }

  getAllCartCount(){
    
    let sub =   this.cartService.getAllCartapiCount().subscribe({
        next :(res)=>{
          this.countNumService.cartNum.next(res)
        
  
        },
        error :(err)=>{console.log(err)}
      })
      this.subscription.add(sub)
  
   
    }
  
  logout(){
    localStorage.removeItem('userToken')
    this.router.navigate(['/login'])
  this.authenSerService.personData.next(null)
  this.logOut.set(true)
  }

  ngOnDestroy(): void {
  this.subscription.unsubscribe()
  }
  
  

}

