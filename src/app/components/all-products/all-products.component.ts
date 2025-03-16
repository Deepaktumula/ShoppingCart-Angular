import { Component, inject, Input } from '@angular/core';
import { ProductsModel } from '../../model/interface/product';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { decrementCart, incrementCart } from '../../store/shoppingCart.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [FormsModule, MatIcon],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  // Creating the constructor to Inject the Store
  constructor(private store:Store<AppState>, private toaster:ToastrService){

  }

  // Injecting the Router to navigate
  router = inject(Router);

  // Getting the Product Props as Input from Product Component
  @Input() product!: ProductsModel;

  // Variable to apply condition for Description
  showDescription: boolean = false;

  // Variable to store the Quantity
  quantity: string = '';

  // viewFullDescription function to display showLess and showMore button
  viewFullDescription() {
    this.showDescription = !this.showDescription;
  }

  // Creating an Object actually it a map to store the ProductId and Quantity
  cartList = {
    productId : 0,  // Key
    productQuantity : 0 // Value
  }

  // Add to Cart Function
  addToCart(productData: any) { 
    this.cartList = {
      productId : productData.id,
      productQuantity : parseInt(this.quantity)
    }

    if((this.cartList.productQuantity == null) || (isNaN(this.cartList.productQuantity))){
      console.log("Quantity is 0.");
      this.toaster.warning('Quantity is 0.','', {
        timeOut: 2000,
        closeButton:true,
        progressBar:true,
        positionClass:'toast-top-center'
      });
    }else{
      this.store.dispatch(incrementCart({cartList: this.cartList}));    
    }
  }

  // Remove from cart the Function
  removeFromCart(productData: any) {
    this.cartList = {
      productId : productData.id,
      productQuantity : parseInt(this.quantity)
    }
    if((this.cartList.productQuantity == null) || (isNaN(this.cartList.productQuantity))){
      console.log("Quantity is 0.");
      this.toaster.warning('Quantity is 0.','', {
        timeOut: 2000,
        closeButton:true,
        progressBar:true,
        positionClass:'toast-top-center'
      });
    }else{
      this.store.dispatch(decrementCart({cartList: this.cartList}));   
    }
  }

  // Displaying the whole product data in ProductDetails Component
  detailsPage(id: any) {
    this.router.navigateByUrl(`product-details/${id}`);
  }
}
