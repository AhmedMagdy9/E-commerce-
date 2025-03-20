import { HttpInterceptorFn } from '@angular/common/http';
import { PlatformService } from '../../../core/services/platform/platform.service';
import { inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
 let platformService = inject(PlatformService)

if (platformService.cheekplatform()) {
if (localStorage.getItem('userToken')) {
  
  let userHeader:any = {token:localStorage.getItem('userToken')}

  
req = req.clone({
  setHeaders :userHeader
})
}
}

  return next(req);

};

