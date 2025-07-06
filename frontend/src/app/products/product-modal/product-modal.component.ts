import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-modal',
  imports: [],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css',
})
export class ProductModalComponent {
  @Output() close = new EventEmitter<void>();
}
