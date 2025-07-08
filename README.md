# Ice Cream Inventory App

A full-stack application for managing ice cream products, built with .NET 9 WebAPI (PostgreSQL) and Angular 20.

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

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) & npm (v22 or later)
- [Angular CLI](https://angular.io/cli) v20.x
- PostgreSQL v12 or later

  - Ensure the `psql`, `createdb`, and `dropdb` CLI tools are on your PATH.

---

## Setup

### Backend

For detailed backend setup, migrations, and testing, see [backend/README.md](backend/README.md).

### Frontend

For detailed frontend setup, build, and deployment, see [frontend/README.md](frontend/README.md).

---

## Usage & Features

- Create, read, update, and delete ice cream products
- Dashboard with top-selling products and low-stock alerts
- Modal form for adding products
- Error handling and validation

---

## Scripts

| Command                     | Description                            |
| --------------------------- | -------------------------------------- |
| `dotnet build`              | Build the backend project              |
| `dotnet run`                | Run the backend API                    |
| `dotnet ef database update` | Apply Entity Framework Core migrations |
| `npm install`               | Install frontend dependencies          |
| `npm start`                 | Run the Angular development server     |

---

## Troubleshooting

- **CORS errors**: Verify the API URL in `frontend/src/environments/environment.ts` matches `https://localhost:5001`.
- **Port conflicts**: Update `applicationUrl` in `backend/Properties/launchSettings.json` or adjust Angular's `proxy.conf.json`.
- **Database connection issues**: Ensure the `ICECREAM_DB` environment variable is correctly set and the database is created.

---
