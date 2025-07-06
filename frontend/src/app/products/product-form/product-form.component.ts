import { Component, Output, EventEmitter, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    id: [Date.now()],
    name: ['', Validators.required],
    flavor: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sold: [0, [Validators.required, Validators.min(0)]],
  });

  @Output() formSubmit = new EventEmitter<void>();

  private productService = inject(ProductService);

  onSubmit(): void {
    if (this.form.valid) {
      this.productService.add(this.form.value);
      this.formSubmit.emit();
    }
  }
}
