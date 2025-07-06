import { Component, Output, EventEmitter } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  templateUrl: './product-modal.component.html',
  imports: [ProductFormComponent],
  styleUrl: './product-modal.component.css',
})
export class ProductModalComponent {
  @Output() close = new EventEmitter<void>();
}
