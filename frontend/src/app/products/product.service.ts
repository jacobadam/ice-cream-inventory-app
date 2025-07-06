import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Cookies + Cream',
      flavor: 'Cookies & Cream',
      price: 4.99,
      stock: 12,
      sold: 120,
    },
    {
      id: 2,
      name: 'Strawberry Basil',
      flavor: 'Strawberry',
      price: 4.29,
      stock: 4,
      sold: 85,
    },
    {
      id: 3,
      name: 'Tahitian Vanilla',
      flavor: 'Vanilla',
      price: 4.59,
      stock: 8,
      sold: 50,
    },
    {
      id: 4,
      name: 'London Fog',
      flavor: 'Earl Grey Vanilla Cream',
      price: 4.79,
      stock: 7,
      sold: 30,
    },
    {
      id: 5,
      name: 'Cream Cheese',
      flavor: 'New York Cheesecake',
      price: 5.29,
      stock: 7,
      sold: 26,
    },
    {
      id: 6,
      name: 'Milk Chocolate',
      flavor: 'Chocolate',
      price: 5.19,
      stock: 40,
      sold: 60,
    },
    {
      id: 7,
      name: 'Coffee',
      flavor: 'Coffee',
      price: 4.89,
      stock: 2,
      sold: 32,
    },
  ];

  getAll(): Product[] {
    return this.products;
  }
}
