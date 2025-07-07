import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { Product } from '../product.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductModalComponent, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  editingProductId: number | null = null;
  showModal = false;

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadProducts();

    this.route.queryParamMap.subscribe((params) => {
      const editId = params.get('edit');
      if (editId) {
        this.editingProductId = Number(editId);
        history.replaceState(null, '', '/products');
      }
    });
  }

  private loadProducts(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  editProduct(id: number): void {
    this.editingProductId = id;
  }

  saveEdit(product: Product): void {
    this.productService.update(product).subscribe(() => {
      this.editingProductId = null;
      this.loadProducts();
    });
  }

  cancelEdit(): void {
    this.editingProductId = null;
  }

  deleteProduct(id: number): void {
    this.productService.delete(id).subscribe(() => {
      this.loadProducts();
    });
  }

  onFormSubmit(): void {
    this.loadProducts();
    this.showModal = false;
  }
}
