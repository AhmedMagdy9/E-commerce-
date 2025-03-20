import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(  @Inject(PLATFORM_ID) private platformid:object) {}



  cheekplatform():boolean
  {

    if (isPlatformBrowser(this.platformid)) {

      return true
      
    }
    return false

  }



}
