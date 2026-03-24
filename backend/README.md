# Backend README

The backend provides a RESTful API built with .NET 9 Minimal WebAPI and Entity Framework Core, backed by a PostgreSQL database.

## Features

- CRUD endpoints for managing ice cream products
- Validation using DataAnnotations
- Global error handling
- Database seeding on startup
- EF Core migrations applied automatically on startup

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- PostgreSQL v12 or later
  - Ensure `psql`, `createdb`, and `dropdb` CLI tools are on your PATH

## Setup & Run (Local)

1. Navigate to the backend folder:

   cd backend

2. Set your local database connection:

```
export ICECREAM_DB="Host=localhost;Database=icecream;Username=<your-db-username>;Password=<your-db-password>"
```

3. Reset, migrate and seed the database:

   dropdb --if-exists icecream
   createdb icecream
   dotnet build
   dotnet ef database update
   dotnet run

4. On startup, the app will:

- apply migrations
- run `SeedData.Initialize(...)`
- insert sample products if the table is empty

## Environment

The API supports both local and production database configurations.

### Local development

Uses `ICECREAM_DB`:

```
export ICECREAM_DB="Host=localhost;Database=icecream;Username=<your-db-username>;Password=<your-db-password>"
```

### Production (Heroku)

Heroku provides a `DATABASE_URL` environment variable automatically.

The application reads:

- `DATABASE_URL` in production
- `ICECREAM_DB` locally

## Deployment (Heroku)

The backend is deployed on Heroku using the .NET buildpack.

- Buildpack: `heroku/dotnet`
- Runtime: .NET 9
- Database: Heroku Postgres

Key setup:

- `DATABASE_URL` is provided by Heroku
- EF Core migrations run automatically on startup
- Seed data is applied if the database is empty

## Live API

https://ice-cream-inventory-api-4aedcf1094a7.herokuapp.com/api/products

## Endpoints

| Method | Route              | Description                 |
| ------ | ------------------ | --------------------------- |
| GET    | /api/products      | List all products           |
| GET    | /api/products/{id} | Get product by ID           |
| POST   | /api/products      | Create a new product        |
| PUT    | /api/products/{id} | Update an existing product  |
| DELETE | /api/products/{id} | Delete a product            |
| GET    | /api/error         | Trigger 500 error (testing) |

## Testing

```
curl -i http://localhost:5000/api/products
```

## Troubleshooting

- CORS: Ensure the frontend origin is allowed in the backend CORS policy
- DB Connection: Verify `ICECREAM_DB` is set locally or `DATABASE_URL` is available in Heroku
- Migrations: Ensure migrations exist and are applied on startup
