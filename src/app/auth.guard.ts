import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token')
  
  const path = route.routeConfig?.path;
  
  if( !path && !token ) { // inventory
    router.navigate(['/login'])
    return false;
  }
  
  if( path == 'login' && token ) {
    router.navigate([''])
    return false;
  }

  return true
};



