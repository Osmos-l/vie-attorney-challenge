# VIE APPLICATION CHALLENGE

## Overview

This project is a web application for managing attorneys and their related price maps per county/court/violation/points. The application is built using Next.js for the frontend, MobX for state management, and Mongoose for database interactions with MongoDB.

https://youtu.be/cTjC40YlQi0

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

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   Create a `.env` file in the root directory and add your MongoDB connection string:

   ```env
   MONGODB_URI=mongodb://your-mongo-db-uri
   ```

3. **Run the application:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

4.  **Seeding :**
Go to `/api/seeding`
