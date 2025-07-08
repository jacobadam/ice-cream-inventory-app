import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
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
  editingProductId: number | null = null;
  showModal = false;

  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  ngOnInit(): void {
    this.loadProducts();
    this.route.paramMap.subscribe((map) => {
      this.editingProductId = map.has('id') ? Number(map.get('id')) : null;
    });
  }

  private loadProducts(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/products', id, 'edit'], { replaceUrl: true });
  }

  saveEdit(product: Product): void {
    this.productService.update(product).subscribe(() => {
      this.loadProducts();
      this.editingProductId = null;
      this.location.replaceState('/products');
    });
  }

  cancelEdit(): void {
    this.editingProductId = null;
    this.location.replaceState('/products');
  }

  deleteProduct(id: number): void {
    this.productService.delete(id).subscribe(() => {
      this.loadProducts();
    });
  }

  onFormSubmit(): void {
    this.loadProducts();
    this.showModal = false;
    this.location.replaceState('/products');
  }
}
