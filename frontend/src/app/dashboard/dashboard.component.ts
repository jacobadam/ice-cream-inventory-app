import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../products/product.service';
import { Product } from '../products/product.model';
import { Router } from '@angular/router';
import { CardComponent } from '../ui/card/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  products: Product[] = [];
  topSellers: Product[] = [];
  lowStock: Product[] = [];

  ngOnInit(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
      this.topSellers = [...products]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 3);
      this.lowStock = products.filter((p) => p.stock < 5);
    });
  }

  restockProduct(id: number): void {
    this.router.navigate(['/products'], { queryParams: { edit: id } });
  }
}
