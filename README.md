# GitHub Profile Analyzer API

A RESTful API built with Express.js and MySQL for storing and retrieving GitHub user profile data. The service accepts profile details, creates the required table if it does not exist, and exposes endpoints to manage saved profiles.

## Features

- Store GitHub profile information in a MySQL database
- Retrieve all saved profiles
- Retrieve a single profile by its database ID
- Create the users table automatically on first insert
- Return clear JSON responses for success and error cases

## Prerequisites

Make sure the following are installed:

- Node.js (v14 or newer)
- npm
- MySQL database

## Installation

1. Clone or open the project folder.
2. Install dependencies:

```bash
npm install
```

3. signup at aiven.io and create a mysql service.obtain the ca certificate
   and add its value as string in DB_SSL_CA environment variable.

## Environment Setup

Create a .env file in the project root and add the following values:

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=github_analyzer
DB_PORT=3306
DB_SSL_CA=your_certificate
PORT=3000
```

The application expects a MySQL database to be reachable using those credentials.

## Running the Application

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

The API will run at:

```text
http://localhost:3000
```

## API Endpoints

### 1. Store a GitHub profile

- Method: POST
- Route: /analyze

Request body:

```json
{
  "username": "octocat",
  "name": "The Octocat",
  "followers": 3938,
  "following": 9,
  "public_repos": 2,
  "bio": "There once was..."
}
```

Success response (201):

```json
{
  "message": "User details added successfully"
}
```

Error response (400):

```json
{
  "message": "All attributes are required"
}
```

### 2. Get all analyzed profiles

- Method: GET
- Route: /analyze

Success response (200):

```json
{
  "users": [
    {
      "id": 1,
      "username": "octocat",
      "name": "The Octocat",
      "public_repos": 2,
      "followers": 3938,
      "following": 9,
      "bio": "There once was..."
    }
  ]
}
```

### 3. Get one profile by ID

- Method: GET
- Route: /analyze/:id

Example:

```bash
GET /analyze/1
```

Success response (200):

```json
{
  "user": {
    "id": 1,
    "username": "octocat",
    "name": "The Octocat",
    "public_repos": 2,
    "followers": 3938,
    "following": 9,
    "bio": "There once was..."
  }
}
```

## Project Structure

```text
GitHub Profile Analyzer API/
├── src/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── analyze.controllers.js
│   └── routes/
│       └── analyze.routes.js
├── package.json
├── .env
└── README.md
```

## Technologies Used

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- nodemon

## Notes

- The API automatically creates a users table on the first insert if it is missing.
- The current implementation expects all requested fields to be present in the request body.

## License

ISC
