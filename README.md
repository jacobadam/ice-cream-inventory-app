# Ice Cream Inventory App

A full-stack application for managing ice cream products, built with .NET 9 WebAPI (PostgreSQL) and Angular 20.

---

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli) v20
- PostgreSQL v12 or later

  - Ensure the `psql`, `createdb`, and `dropdb` CLI tools are on your PATH.

---

## Backend Setup

1. **Clone the repo**

   ```bash
   git clone <your-repo-url>
   cd ice-cream-inventory-app/backend
   ```

2. **Create the database**

   ```bash
   createdb icecream
   ```

3. **Configure connection string**

   ```bash
   export ICECREAM_DB="Host=localhost;Database=icecream;Username=<your-db-username>;Password=<your-db-password>"

   ```

4. **Apply EF Core migrations**

   ```bash
   dotnet build
   dotnet ef database update
   ```

5. **Run the API**

   ```bash
   dotnet run
   ```

   The API will listen on:

   - HTTP: `http://localhost:5000`
   - HTTPS: `https://localhost:5001` (redirect only in non-Development)

---

## Frontend Setup

1. **Open a new terminal**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies & start**

   ```bash
   npm install
   npm start
   ```

   The Angular app will run at `http://localhost:4200`.

---

## Endpoint Summary

| Method | URL                  | Description                     |
| ------ | -------------------- | ------------------------------- |
| GET    | `/api/products`      | List all products               |
| GET    | `/api/products/{id}` | Get one product by its ID       |
| POST   | `/api/products`      | Create a new product            |
| PUT    | `/api/products/{id}` | Update an existing product      |
| DELETE | `/api/products/{id}` | Delete a product                |
| GET    | `/api/error`         | Test global error handler (500) |

---

## API test instructions

```bash
# 1) List all products
curl -i http://localhost:5000/api/products

# 2) Test validation error
curl -i -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{}'

# 3) Add Product
curl -i -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Vanilla","flavor":"Vanilla","price":3.5,"stock":10,"sold":0}'

# 4) Update Product
curl -i -X PUT http://localhost:5000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Mint","flavor":"Mint Chocolate","price":4.0,"stock":5,"sold":2}'

# 5) Delete Product
curl -i -X DELETE http://localhost:5000/api/products/1

# 6) Trigger 500 error
curl -i http://localhost:5000/api/error
```
