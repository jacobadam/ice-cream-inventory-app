import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

import { ProductService } from '../products/product.service';
import { Product } from '../products/product.model';
import { CardComponent } from '../ui/card/card.component';

interface DashboardProduct extends Product {
  badge: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, BaseChartDirective],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  products: Product[] = [];
  topSellers: DashboardProduct[] = [];
  lowStock: Product[] = [];
  lowStockCount = 0;
  inStockCount = 0;

  private rankBadges = [
    '/gold-badge.png',
    '/silver-badge.png',
    '/bronze-badge.png',
  ];

  public pieType: 'pie' = 'pie';
  public pieData: ChartData<'pie'> = { labels: [], datasets: [] };
  public pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public barType: 'bar' = 'bar';
  public barData: ChartData<'bar'> = { labels: [], datasets: [] };
  public barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  ngOnInit(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;

      this.topSellers = [...products]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 3)
        .map((p, i) => ({ ...p, badge: this.rankBadges[i] }));

      this.lowStock = products.filter((p) => p.stock < 5);
      this.lowStockCount = this.lowStock.reduce((sum, p) => sum + p.stock, 0);
      const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
      this.inStockCount = totalStock - this.lowStockCount;

      const totalSold = products.reduce((sum, p) => sum + p.sold, 0) || 1;

      this.pieData = {
        labels: products.map((p) => p.name),
        datasets: [
          {
            label: '% of Total Sales',
            data: products.map((p) => Math.round((p.sold / totalSold) * 100)),
          },
        ],
      };

      this.barData = {
        labels: products.map((p) => p.name),
        datasets: [
          {
            label: 'Units in Stock',
            data: products.map((p) => p.stock),
          },
        ],
      };
    });
  }

  restockProduct(id: number): void {
    this.router.navigate(['/products'], { queryParams: { edit: id } });
  }
}
