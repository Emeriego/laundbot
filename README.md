

# Laundbot API

## Overview

Laundbot is a laundry service management system API that provides endpoints for managing shops, customers, items, treatments, orders, and users. The API is built using Node.js, Express, TypeScript, and PostgreSQL. It offers functionalities like creating shops, managing orders, handling packages, and more.

## Features

- **User Management**: Register, login, and manage user accounts.
- **Shop Management**: Create and manage shops associated with users.
- **Customer Management**: Add and manage customers within shops.
- **Item Management**: Define and manage laundry items.
- **Package Management**: Create and manage service packages for items.
- **Treatment Management**: Define and manage treatments and associated costs for items.
- **Order Management**: Create, update, and manage laundry orders.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **TypeScript**: Typed superset of JavaScript for better code quality and maintainability.
- **PostgreSQL**: Relational database management system.
- **TypeORM**: ORM for TypeScript and JavaScript.
- **Swagger**: API documentation.
- **Docker**: Containerization for development and deployment.
- **Jest**: Testing framework for JavaScript.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [PostgreSQL](https://www.postgresql.org/) (version 12 or later)
- [Docker](https://www.docker.com/) (optional, for containerized development)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/emeriego/laundbot-api.git
   cd laundbot-api
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/laundbot
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Database Migrations**

   If you're using TypeORM, run the migrations to set up the database schema:

   ```bash
   npm run typeorm migration:run
   ```

5. **Start the Application**

   ```bash
   npm run dev
   ```

   The API should now be running at `http://localhost:3000`.

### Running with Docker

1. **Build the Docker Image**

   ```bash
   docker build -t laundbot-api .
   ```

2. **Run the Container**

   ```bash
   docker run -p 3000:3000 --env-file .env laundbot-api
   ```

   The API should now be running at `http://localhost:3000`.

### API Documentation

The API is documented using Swagger. Once the server is running, you can access the API documentation at:

```
http://localhost:3000/api-docs
```

## API Endpoints

### User Endpoints

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login a user.

### Shop Endpoints

- `POST /api/shops/create`: Create a new shop.
- `GET /api/shops`: Get all shops.

### Customer Endpoints

- `POST /api/customers/create`: Create a new customer.
- `GET /api/customers`: Get all customers.

### Item Endpoints

- `POST /api/items/create`: Create new items.
- `GET /api/items`: Get all items.

### Package Endpoints

- `POST /api/packages/create`: Create new packages.
- `GET /api/packages`: Get all packages.

### Treatment Endpoints

- `POST /api/treatments/create`: Create new treatments.
- `GET /api/treatments`: Get all treatments.

### Order Endpoints

- `POST /api/orders/create`: Create a new order.
- `GET /api/orders`: Get all orders.
- `GET /api/orders/:orderId`: Get an order by ID.
- `PUT /api/orders/:orderId`: Update an order.
- `PUT /api/orders/:orderId/status`: Update an order's status.

## Project Structure

```bash
laundbot-api/
├── src/
│   ├── controllers/         # Request handlers for routes
│   ├── routes/              # API routes definitions
│   ├── services/            # Business logic
│   ├── models/              # Database models (TypeORM entities)
│   ├── middlewares/         # Custom middlewares
│   ├── utils/               # Utility functions
│   ├── data-source.ts       # TypeORM data source configuration
│   ├── app.ts               # Express app initialization
│   └── server.ts            # Server entry point
├── .env                     # Environment variables
├── package.json             # NPM dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Testing

Run unit tests using Jest:

```bash
npm test
```

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to [Godwin Ojukwu](mailto:emeriego@gmail.com).

