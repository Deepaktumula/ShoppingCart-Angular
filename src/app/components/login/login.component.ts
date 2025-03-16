import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 // Creating the Reactive Form to link with login-form
  productForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  // Creatin the instance of the Router to navigate through Url
  router = inject(Router)

  // Login Method
  onLogin(){
    
    if(this.productForm.value.email == "admin@gmail.com" && this.productForm.value.password == "1234"){
      Swal.fire({
        title: 'Success!',
        text: 'LoggedIn Success',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      this.router.navigateByUrl("/products");
      localStorage.setItem("userEmail", JSON.stringify(this.productForm.value.email));
      console.log("User Logged IN");
    }else{
      alert("Log In Credentials are invalid");
      this.router.navigateByUrl("login");
    }
  }
}
