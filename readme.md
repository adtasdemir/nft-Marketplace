# NFT Marketplace - Project Overview

## Table of Contents

- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Backend Design](#backend-design)
  - [Architecture and Design Patterns](#architecture-and-design-patterns)
  - [Middlewares](#middlewares)
  - [Models](#models)
  - [Routes and Validation Logic](#routes-and-validation-logic)
  - [Migrations and Seeders](#migrations-and-seeders)
- [Frontend Design](#frontend-design)
  - [Pages and Technologies Used](#pages-and-technologies-used)
- [Docker Configuration](#docker-configuration)
  - [Running the Project](#running-the-project)
  - [Running Backend and Frontend with Docker](#running-backend-and-frontend-with-docker)
- [API Documentation and Postman Collection](#api-documentation-and-postman-collection)
- [Database Configuration](#database-configuration)
- [ResponseFormatter Class](#responseformatter-class)

## Project Description

The **NFT Marketplace** is a full-stack web application designed to facilitate the buying, selling, and managing of NFTs. Built with a modern tech stack, it provides a clear separation of concerns between the **backend** (API) and **frontend** (user interface). 

- **Backend:** Powered by Node.js with Express.js for API development and MySQL (via Sequelize ORM) for database management.
- **Frontend:** Built using Vue.js (or React.js, depending on your choice), with Axios for making API calls to the backend.

This project uses Docker to containerize the backend, frontend, and database services for easier deployment and consistency across environments.

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MySQL (via Sequelize ORM)
  - Docker
  - Swagger (for API documentation)
  - Postman (for API testing)

- **Frontend:**
  - Vue.js (or React.js, based on your preference)
  - Axios (for API calls)
  - Docker

- **Database:**
  - MySQL (used for both development and testing environments)

## Backend Design

### Architecture and Design Patterns

The backend follows a modular architecture with clear separation of concerns, enabling better maintainability and scalability. The key components include:

- **Repositories:** Provide an abstraction layer for data access logic.
- **Services:** Contain the business logic for handling data processing.
- **Controllers:** Handle incoming requests, invoke service methods, and return responses.
- **DTOs (Data Transfer Objects):** Used for validation and transformation of data between layers.

This design follows the **Service-Repository** pattern to ensure separation of business logic and data access, making the application more maintainable and testable.

### Middlewares

- **Error Handling Middleware:** Captures unhandled errors and ensures a standardized error response format.
- **Validation Middleware:** Ensures that incoming requests conform to predefined validation rules.

### Models

The **NFT Model** represents the structure of NFT data stored in the database, along with its associations, constraints, and relationships.

### Routes and Validation Logic

The API routes are defined using Express.js and are grouped based on their respective functionalities. For example, the **NFT routes** handle operations related to NFTs (such as creating, reading, updating, and deleting).

Validation logic is implemented using **express-validator** to ensure that input data is validated before being processed by the application. This helps prevent invalid or malicious data from being stored or processed.

### Migrations and Seeders

Database migrations and seeders are used to define the database schema and populate it with initial data.

- **Migrations:** Define and update the database schema (tables, fields, constraints).
- **Seeders:** Insert mock data into the database for testing and development.

Run the migrations and seeders with the following commands:

- **Migrations:** `npm run migrate`
- **Seeders:** `npm run seed`

## Frontend Design

### Pages and Technologies Used

The frontend is designed to be responsive and user-friendly, providing an interactive experience for managing and viewing NFTs. Key pages include:

- **Home Page:** Displays featured NFTs and allows users to browse listings.
- **NFT Detail Page:** Shows detailed information about a specific NFT, including images, price, and seller.
- **User Dashboard:** Allows users to manage their owned NFTs, view transaction history, and update account settings.

The frontend uses **Vue.js** (or React.js) for building dynamic components and **Axios** for making API calls to the backend.

### Components

The frontend is structured using reusable components for key UI elements such as the NFT listing, user profile, and NFT detail view. These components help ensure maintainability and scalability of the code.

## Docker Configuration

The project uses **Docker** for containerization of both the backend and frontend. The `docker-compose.yml` file defines all services and their dependencies, including the backend, frontend, and MySQL database.

### Running the Project


1. **Clone the repository:** `git clone <repository-url> cd nft-marketplace`

2. **Build and start the Docker containers:** `docker-compose up --build`

This will start the backend, frontend, and MySQL services.

### Running Backend and Frontend with Docker

- **Backend Docker container** runs on port `3000`.
- **Frontend Docker container** runs on port `8080`.
- The **MySQL** service is configured to run on port `3306`.

You can access the application via:

- **Frontend:** `http://localhost:8080`
- **Backend (API):** `http://localhost:3000`

### Database Configuration

In the backend configuration (`config/database.json`), the following databases are used for different environments:

```json
{
  "development": {
    "username": "root",
    "password": "example",
    "database": "nft_marketplace",
    "host": "mysql",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "example",
    "database": "nft_marketplace_test",
    "host": "mysql",
    "dialect": "mysql"
  }
}
```

## Swagger API Documentation

You can access the **Swagger API documentation** for the backend API at the following URL: http://localhost:3000/api-docs/


This provides detailed information on the available API endpoints, parameters, and responses.

---

## Postman Collection

The **Postman collection** for the API is included in the project as `NFT MARKETPLACE.postman_collection.json`. You can import this collection into Postman to easily test the API endpoints.


## Testing the Application

To ensure the functionality of the application, unit tests are written to verify the behavior of the controllers and the validation logic. I used **express-validator** as the testing framework and **Supertest** for HTTP assertions. The following tests are included:

- **controllerTest.js**: Tests the API endpoints and verifies that the controllers are handling requests correctly.
- **validationTest.js**: Tests the input validation logic to ensure that the data passed to the API is properly validated before being processed.

### Running Tests

To run the tests, use the following command in your terminal: `npm test`

This will execute all tests, including those for controllers and validation logic, and provide a summary of the test results.


