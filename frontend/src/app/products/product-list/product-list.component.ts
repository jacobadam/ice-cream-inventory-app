import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getAll();
  }
}
