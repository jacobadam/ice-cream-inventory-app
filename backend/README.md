# Backend README

The backend provides a RESTful API built with .NET 9 Minimal WebAPI and Entity Framework Core, backed by a PostgreSQL database.

## Features

- CRUD endpoints for managing ice cream products
- Validation using DataAnnotations
- Global error handling
- Database seeding on startup

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- PostgreSQL v12 or later
  - Ensure `psql`, `createdb`, and `dropdb` CLI tools are on your PATH

## Setup & Run

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Reset, migrate and seed the database in one step:

   ```bash
   dropdb --if-exists icecream
   createdb icecream
   dotnet build
   dotnet ef database update
   dotnet run
   ```

   On startup the app will run `SeedData.Initialize(...)` and insert sample products.

3. (Optional) If you need to reseed without rebuilding the app, run the same commands above.

## Environment

Set the connection string environment variable before running:

```bash
export ICECREAM_DB="Host=localhost;Database=icecream;Username=<your-db-username>;Password=<your-db-password>"
```

## Listening URLs

By default, the API listens on:

- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`

## Endpoints

| Method | Route                | Description                 |
| ------ | -------------------- | --------------------------- |
| GET    | `/api/products`      | List all products           |
| GET    | `/api/products/{id}` | Get product by ID           |
| POST   | `/api/products`      | Create a new product        |
| PUT    | `/api/products/{id}` | Update an existing product  |
| DELETE | `/api/products/{id}` | Delete a product            |
| GET    | `/api/error`         | Trigger 500 error (testing) |

## Testing

Use `curl` or Postman to test endpoints. Example:

```bash
curl -i http://localhost:5000/api/products
```

## Troubleshooting

- **CORS**: Ensure the Angular frontend is running on `http://localhost:4200` or update the CORS policy.
- **DB Connection**: Verify `ICECREAM_DB` is set and that the `icecream` database exists.
