import { Component, Output, EventEmitter, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  @Output() formSubmit = new EventEmitter<void>();

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    flavor: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sold: [0, [Validators.required, Validators.min(0)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const newProduct: Product = {
      id: 0,
      ...this.form.value,
    };

    this.productService.add(newProduct).subscribe(() => {
      this.form.reset({
        name: '',
        flavor: '',
        price: 0,
        stock: 0,
        sold: 0,
      });
      this.formSubmit.emit();
    });
  }
}
