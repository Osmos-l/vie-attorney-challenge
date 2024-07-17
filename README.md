# Attorney Price Management System

## Overview

This project is a web application for managing attorneys and their related price maps per county/court/violation/points. The application is built using Next.js for the frontend, MobX for state management, and Mongoose for database interactions with MongoDB.

## Features

- Manage attorneys and their details.
- Associate attorneys with different prices based on county, court, violation and points.
- Perform CRUD operations on attorneys and prices.
- Data persistence using MongoDB.

## Getting Started

### Prerequisites

- Node.js (version 20.x or later)
- MongoDB (local, remote instance or dockerized)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/samtarbury/attorney-crud.git
   cd attorney-crud
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your MongoDB connection string:

   ```env
   MONGODB_URI=mongodb://your-mongo-db-uri
   ```

4. **Run the application:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

5. ## TODO

### Writing React Components with Next.js

1. **Create Components:**

   - In the `pages` directory, create pages and components to display, create, and edit attorneys and their price maps.
   - Use Next.js features like dynamic routing and API routes to interact with the backend.
   - Some components will be written as classes, feel free to change to function components, if needed.

2. **Use MobX for State Management:**
   - Define MobX stores (using exclusively `mobx-state-tree` syntax) in the `stores` directory to manage the application state.
   - Use the `attorneyStore` to manage attorney data and `attorneyPriceStore` to manage attorney price data.
   - Fetch data from the API and update the stores accordingly.

### Understanding Price Maps

A price map can be either a combination of all the criteria (county, court, violation, and points) or partial criteria (one or more of them). For example, an attorney can have a price per points for a specific county and a specific price per points for a particular court. **The price is always calculated per points**.

### JSON Price Map Example

Below is an example of a JSON price map which shows a mix between a price per court/points, county/points, and violation/points:

```json
{
  "attorneyId": "60c72b2f9b1e8b6a6c8b4567",
  "prices": [
    {
      "courtId": "60c72b2f9b1e8b6a6c8b4568", // Court Name Queens Municipal Court
      "pointsRange": [1, 4],
      "price": 250
    },
    {
      "courtId": "60c72b2f9b1e8b6a6c8b4568", // Court Name Queens Municipal Court
      "pointsRange": [5, 12],
      "price": 350
    },
    {
      "countyId": "60c72b2f9b1e8b6a6c8b4569", // New York
      "pointsRange": [1, 7],
      "price": 150
    },
    {
      "countyId": "60c72b2f9b1e8b6a6c8b4569", // New York
      "pointsRange": [7, 12],
      "price": 150
    },
    {
      "violationId": "60c72b2f9b1e8b6a6c8b456a", // IMPROPER PASSING
      "price": 290
    },
    {
      "violationId": "60c72b2f9b1e8b6a6c8b456a", // DRIVING ON SHOULDER
      "price": 380
    },
    {
      "violationId": "60c72b2f9b1e8b6a6c8b456a", // NO SEAT BELT (MINOR)
      "price": 500
    }
  ]
}
```

### Design Patterns

Feel free to incorporate design patterns into the modelization of this system like factories, observers, singletons...
Using design patterns can improve the code's readability, maintainability, and scalability.

### Additional Steps

- Write tests: Ensure your code is covered by integration tests (optional)
- Add styling: Use @mui/material for components styling (mandatory)
