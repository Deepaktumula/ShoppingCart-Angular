import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectShoppingCartQuantity } from '../../store/shoppingCart.selector';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, UpperCasePipe, MatIconModule, MatBadgeModule, AsyncPipe],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {

  totalQuantity$: Observable<number> = new Observable<number>;

  constructor(private store:Store<AppState>){
  this.totalQuantity$ = this.store.select(selectShoppingCartQuantity);
  }

  // Title Variable
  title: string = 'Shopping Cart';

  // Injecting the Router Instance to NavigateByUrl
  router = inject(Router);

  // Creating the logOut function
  onLogOut() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('products');
    // localStorage.clear();
    console.log('User logged out');
    this.router.navigateByUrl('login');
  }
}
