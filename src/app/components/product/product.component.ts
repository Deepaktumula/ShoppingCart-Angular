import { Component, inject, OnInit } from '@angular/core';
import { ProductsModel } from '../../model/interface/product';
import { ProductService } from '../../service/product.service';
import { AllProductsComponent } from '../all-products/all-products.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [AllProductsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  // Creating the ProductsList of type ProductModel Interface
  productsList: ProductsModel[] = [];

  // Injecting the Product Service
  productService = inject(ProductService);

  // On Initializing of Component
  ngOnInit(): void {
    this.fetchProducts();
  }

  // Getting all products from the Product Service method
  fetchProducts() {
    this.productService.getAllProducts().subscribe((res: []) => {
      this.productsList = res;
      localStorage.setItem('products', JSON.stringify(this.productsList));
      console.log('Products Loaded :: ', res);
      console.log('Product List Type :: ', typeof this.productsList);
    });
  }
}
