import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Injecting the Router Instance
  const router = inject(Router);

  // Fetching LoggedIn user data from Local Sorage
  const loggedInUser = localStorage.getItem('userEmail');

  // Checking whether the data is present of not
  if (loggedInUser != null) {
    return true;
  } else {
    router.navigateByUrl('login');
    return false;
  }
};
