import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../products/product.service';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];
  topSellers: Product[] = [];
  lowStock: Product[] = [];

  ngOnInit(): void {
    this.products = this.productService.getAll();

    this.topSellers = [...this.products]
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 3);

    this.lowStock = this.products.filter((p) => p.stock < 5);
  }
}
