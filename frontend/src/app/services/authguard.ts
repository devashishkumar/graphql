// auth.guard.ts

import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanActivateFn, CanLoad, Router } from '@angular/router';
import { LOGIN_KEY, StorageService } from './../services/storage.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(StorageService);
//   const router = inject(Router);
//   console.log(authService.hasData(LOGIN_KEY));
//   if (authService.hasData(LOGIN_KEY)) {
//     // router.navigate(['/home']);
//     return true;
//   }
//   router.navigate(['/auth']);
//   return true;
// };

@Injectable({
  providedIn: 'root'
})
export class AuthGuard
  implements
    CanActivate,
    CanActivateChild
{
  constructor(private storageServiceObj: StorageService, private router: Router) {}

  canActivate(): boolean {
    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }

  canLoad(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (this.storageServiceObj.hasData(LOGIN_KEY)) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
