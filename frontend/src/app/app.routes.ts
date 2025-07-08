import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./products/product-list/product-list.component').then(
            (m) => m.ProductListComponent
          ),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./products/product-list/product-list.component').then(
            (m) => m.ProductListComponent
          ),
      },
    ],
  },
];
