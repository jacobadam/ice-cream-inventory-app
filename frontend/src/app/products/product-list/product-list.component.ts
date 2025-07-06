import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductModalComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.products = this.productService.getAll();
  }

  deleteProduct(id: number): void {
    this.productService.delete(id);
    this.products = this.productService.getAll();
  }

  showModal = false;
}
