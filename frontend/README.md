# Frontend README

The frontend is an Angular 20 application providing a user interface for managing ice cream inventory.

## Features

- Product list table with inline edit and delete
- Modal form for adding products
- Dashboard with charts, top selling products and low-stock alerts
- Responsive layout with Tailwind CSS 4

## Prerequisites

- [Node.js](https://nodejs.org/) & npm (v18 or later)
- [Angular CLI](https://angular.io/cli) v20.x

## Setup & Run

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:

   ```bash
   npm start
   ```

The app will run at `http://localhost:4200`.

## Configuration

- **API base URL**: In `src/environments/environment.ts`, set `apiUrl` to your backend URL (e.g., `https://localhost:5001/api`).

## Scripts

| Command       | Description            |
| ------------- | ---------------------- |
| `npm install` | Install dependencies   |
| `npm start`   | Run development server |

## Troubleshooting

- **Port conflicts**: Ensure nothing else runs on port 4200.
- **API errors**: Verify `apiUrl` matches backend URL and CORS policy allows requests.

---

_End of Frontend README_
