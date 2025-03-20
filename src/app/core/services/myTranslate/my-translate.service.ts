import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
 import { TranslateService } from '@ngx-translate/core';
 import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  
  defaultLang = 'en';

  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lng');
      if (savedLang) {
        this.defaultLang = savedLang;
      }
      this.translateService.setDefaultLang(this.defaultLang);
      this.translateService.use(this.defaultLang);
      this.changeDir()
    }
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lng', lang);
      this.changeDir()
    }
  }

  changeDir(){
    const savedLang = localStorage.getItem('lng');
    if(savedLang === 'en'){

      document.body.dir = 'ltr'

    }else if(savedLang === 'ar'){
    document.body.dir = 'rtl'
    }

  }
}

