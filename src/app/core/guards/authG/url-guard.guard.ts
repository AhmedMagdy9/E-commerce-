import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatformService } from '../../services/platform/platform.service';

export const urlGuardGuard: CanActivateFn = (route, state) => {


  let Platform = inject(PlatformService)


  let router = inject(Router)

  if (Platform.cheekplatform()) {
    
    
  if (localStorage.getItem('userToken') != null) {

    return true
    
  }

  }
  
  router.navigate(['/login'])

  return false

};
