import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export let toasterInstance:ToastrService;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Creating the Global Toaster instance to access in the reducer
  constructor(private toaster:ToastrService){
    toasterInstance = this.toaster;
  }

  title = 'Shopping-Cart';
}
