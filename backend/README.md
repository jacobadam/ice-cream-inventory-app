# Backend README

The backend provides a RESTful API built with .NET 9 Minimal WebAPI and Entity Framework Core, backed by a PostgreSQL database.

## Features

- CRUD endpoints for managing ice cream products
- Validation using DataAnnotations
- Global error handling

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- PostgreSQL v12 or later

  - Ensure `psql`, `createdb`, and `dropdb` CLI tools are on your PATH

## Setup & Run

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Create the database:

   ```bash
   createdb icecream
   ```

3. Set the connection string environment variable:

   ```bash
   export ICECREAM_DB="Host=localhost;Database=icecream;Username=<your-db-username>;Password=<your-db-password>"
   ```

4. Apply EF Core migrations and build:

   ```bash
   dotnet build
   dotnet ef database update
   ```

5. Run the API:

   ```bash
   dotnet run
   ```

The API will listen on:

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

- **CORS**: Ensure Angular proxy or CORS policy matches frontend URL.
- **DB Connection**: Verify `ICECREAM_DB` and that the `icecream` database exists.
