import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { ProductsModel } from '../../model/interface/product';
import { selectShoppingCart } from '../../store/shoppingCart.selector';
import { Router } from '@angular/router';
import { orderSuccess } from '../../store/shoppingCart.action';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  // Injecting the Store
  store = inject(Store<AppState>)
  
  // Injecting the Router to navigate
  router = inject(Router);

  // Creating the ProductList to store localStorage Data
  productList:ProductsModel[] = [];

  // Creating the CartProducts List to store the macthed CartList Products/Items
  cartProducts:ProductsModel[] = [];
  
  // on Instantiating of the Cart Component
  ngOnInit(): void {
      const storedList = localStorage.getItem('products');
      if(storedList){
        this.productList = JSON.parse(storedList); 
      }
      this.store.select(selectShoppingCart).subscribe(cart =>{
        cart.forEach((productQuantity, productId )=>{
          console.log("Key(ProductId):",productId,"=>","Value(ProductQuantity):",productQuantity);
          const product = this.productList.find((p) => p.id === productId);
          if(product){
            product.quantity = productQuantity;
            this.cartProducts.push(product);
          }
        })
      })
  }

  // Calculating the Total price of the product throught its quantity
  getTotalPriceOfProduct(product:ProductsModel): string{
    if(product.quantity && product.price){
      return (product.quantity * (product.price * 80)).toFixed(2);
    }
    return '0.00';
  }

  // Calculating the Total Price of the Products in the cart
  getTotalCartPrice() : number {
    return this.cartProducts.reduce((total, product) =>{
      const price = product?.price * 80 || 0;
      const quantity = product?.quantity || 0;
      return total + (price * quantity)
    }, 0);
  }

  // SuccessMessage
  orderSuccessMessage(){
    Swal.fire({
      title: 'Success!',
      text: 'Order Placed Successfully',
      icon: 'success',
      confirmButtonText: 'Cool'
    })
    this.router.navigateByUrl('order-success');
    this.store.dispatch(orderSuccess());
  }


  payment(){
    this.router.navigateByUrl('payment');
  }

}
