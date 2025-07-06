import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { Product } from '../product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductModalComponent, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.products = this.productService.getAll();
  }

  editingProductId: number | null = null;

  editProduct(id: number): void {
    this.editingProductId = id;
  }

  saveEdit(product: Product): void {
    this.productService.update(product.id, product);
    this.editingProductId = null;
    this.products = this.productService.getAll();
  }

  cancelEdit(): void {
    this.editingProductId = null;
  }

  deleteProduct(id: number): void {
    this.productService.delete(id);
    this.products = this.productService.getAll();
  }

  showModal = false;
}
