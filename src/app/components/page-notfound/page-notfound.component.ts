import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-notfound',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-notfound.component.html',
  styleUrl: './page-notfound.component.css'
})
export class PageNotfoundComponent {

  router = inject(Router);
  // Taking to Home Page
  goToHomePage(){
    this.router.navigateByUrl("products");
  }
}
