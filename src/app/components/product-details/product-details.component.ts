import { Component, inject, OnInit } from '@angular/core';
import { ProductsModel } from '../../model/interface/product';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { decrementCart, incrementCart } from '../../store/shoppingCart.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, MatIcon],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  // Creating the constructor to Inject the Store
  constructor(private store:Store<AppState>, private toaster: ToastrService){
    
  }

  // Injecting ActivatedRoute to fetch Id from Active Route
  route = inject(ActivatedRoute);

  // Creating a Selected Product Variable
  selectedProduct!: any;

  // Creating the Product List Variable to store all products present in Products
  productList: ProductsModel[] = [];

  // Variable to apply condition for Description
  showDescription: boolean = false;

  // Variable to store the Quantity
  quantity: string = '';

  // On Instanting the Component/ onMount of the Component
  ngOnInit(): void {
    const storedList = localStorage.getItem('products');
    if (storedList) {
      this.productList = JSON.parse(storedList);
    } else {
      console.log('Data is no present');
    }

    // Extracting the Id from the Preset Active URL Route
    let productId = this.route.snapshot.paramMap.get('id');
    let n=productId!=null?parseInt(productId):0;

    // Finding the Product through the Route Param productId
    this.selectedProduct = this.productList.find(p=>p.id==n);
  }

  // Creating an Object actually it a map to store the ProductId and Quantity
  cartList = {
    productId : 0,      // Key
    productQuantity : 0 // Value
  }

  // Add to Cart Function
  addToCart(productData: any) { 
    this.cartList = {
      productId : productData.id,
      productQuantity : parseInt(this.quantity)
    }
    if((this.cartList.productQuantity == null) || (isNaN(this.cartList.productQuantity))){
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
}
