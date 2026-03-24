# Ice Cream Inventory

A full-stack application for managing ice cream products, built with .NET 9 WebAPI (PostgreSQL) and Angular 21.

---

## Live Demo

Frontend:
https://icecreaminventory.netlify.app

API:
https://ice-cream-inventory-api-4aedcf1094a7.herokuapp.com/api/products

---

## Project Structure

```
ice-cream-inventory-app/
├── backend/
│   └── README.md
├── frontend/
│   └── README.md
└── README.md
```

---

## Tech Stack

Backend:

- .NET 9 Minimal WebAPI
- Entity Framework Core
- PostgreSQL (Heroku)

Frontend:

- Angular 21
- Tailwind CSS 4
- Chart.js

Deployment:

- Backend: Heroku
- Frontend: Netlify

---

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- Node.js & npm (v20.19+ or v22.12+)
- Angular CLI v21.x
- PostgreSQL v12 or later (for local development)

---

## Setup

### Backend

For detailed backend setup, migrations, and deployment, see:
backend/README.md

### Frontend

For detailed frontend setup, build, and deployment, see:
frontend/README.md

---

## Usage & Features

- Create, read, update, and delete ice cream products
- Dashboard with top-selling products and low-stock alerts
- Modal form for adding products
- Validation and error handling
- Responsive UI

---

## Environment Overview

Local development:

- Frontend -> http://localhost:4200
- Backend -> http://localhost:5000
- Database -> Local PostgreSQL

Production:

- Frontend -> Netlify
- Backend -> Heroku
- Database -> Heroku Postgres

---

## Scripts

Backend:

- dotnet build - Build the backend project
- dotnet run - Run the backend API
- dotnet ef database update - Apply migrations

Frontend:

- npm install - Install dependencies
- npm start - Run development server
- npm run build - Production build

---

## Troubleshooting

- API not connecting in production:
  - Ensure environment.prod.ts has correct Heroku API URL
  - Verify Angular fileReplacements are configured

- CORS errors:
  - Ensure backend allows Netlify domain in WithOrigins(...)

- Database issues:
  - Ensure DATABASE_URL is set in Heroku
  - Ensure migrations run on startup

- Still calling localhost in production:
  - Check environment import path
  - Confirm Netlify rebuilt after changes

---
