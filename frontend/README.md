# Frontend README

The frontend is an Angular 21 application providing a user interface for managing ice cream inventory.

## Features

- Product list table with inline edit and delete
- Modal form for adding products
- Dashboard with charts, top selling products and low-stock alerts
- Responsive layout with Tailwind CSS 4

## Prerequisites

- Node.js (v20.19+ or v22.12+)
- Angular CLI v21.x

## Setup & Run (Local)

1. Navigate to the frontend folder:

   cd frontend

2. Install dependencies:

   npm install

3. Start development server:

   npm start

The app runs at:

```
http://localhost:4200
```

## Configuration

### Environment files

Angular uses environment-based configuration:

- src/environments/environment.ts (development)
- src/environments/environment.prod.ts (production)

Example:

Development:

```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
};
```

Production:

```
export const environment = {
  production: true,
  apiUrl: 'https://ice-cream-inventory-api-4aedcf1094a7.herokuapp.com/api',
};
```

Angular automatically replaces environment files during production builds.

## Build

```
npm run build
```

This runs:

```
ng build --configuration production
```

## Deployment (Netlify)

The frontend is deployed on Netlify.

- Build command:

  npm run build

- Publish directory:

  dist/ice-cream-inventory/browser

The production build connects to the Heroku API.

## Live App

https://icecreaminventory.netlify.app

## Scripts

- npm install: Install dependencies
- npm start: Run development server
- npm run build: Production build

## Troubleshooting

- API errors:
  - Check correct environment file is used
  - Verify API URL matches backend
  - Ensure backend CORS allows Netlify domain

- Still calling localhost in production:
  - Check angular.json fileReplacements
  - Ensure correct environment import is used

- CORS errors:
  - Ensure backend includes Netlify domain in WithOrigins(...)
