# GitHub Profile Analyzer API

A RESTful API built with Express.js and MySQL to analyze and store GitHub user profiles. This application allows you to retrieve, store, and manage information about GitHub users including their repositories, followers, and biographical data.

## Features

- **Store GitHub Profiles**: Save user profile information to a MySQL database
- **Retrieve All Profiles**: Fetch a list of all analyzed GitHub profiles
- **Retrieve Single Profile**: Get detailed information about a specific user profile by ID
- **Data Validation**: Ensures all required user fields are provided before storing
- **Error Handling**: Comprehensive error responses for API requests
- **Environment Configuration**: Secure configuration management with environment variables

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MySQL](https://www.mysql.com/) (v5.7 or higher)

## Installation

1. **Clone the repository** (or download the project files)
   ```bash
   cd "github-profile-analyzer-api"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Environment Setup

1. **Create a `.env` file** in the root directory of the project
   ```bash
   touch .env
   ```

2. **Add the following environment variables** to your `.env` file:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=github_analyzer
   PORT=3000
   ```

3. **Configure MySQL**
   - Create a MySQL database named `github_analyzer`
   - Create a `users` table with the following structure:
     ```sql
     CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(20) UNIQUE NOT NULL,
       name VARCHAR(30) NOT NULL,
       public_repos SMALLINT(5) NOT NULL,
       followers MEDIUMINT(8) NOT NULL,
       following MEDIUMINT(8) NOT NULL,
       bio TEXT,
     );
     ```

## Running the Application

### Development Mode
Start the application with automatic reloading using Nodemon:
```bash
npm run dev
```

### Production Mode
Run the application directly:
```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### 1. Store a GitHub Profile
- **Endpoint**: `POST /analyze`
- **Description**: Add a new GitHub user profile to the database
- **Request Body**:
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
- **Success Response** (201):
  ```json
  {
    "message": "User details added successfully"
  }
  ```
- **Error Response** (400):
  ```json
  {
    "message": "All attributes are required"
  }
  ```

### 2. Get All Analyzed Profiles
- **Endpoint**: `GET /analyze`
- **Description**: Retrieve all stored GitHub user profiles
- **Success Response** (200):
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
        "bio": "There once was...",
      }
    ]
  }
  ```

### 3. Get a Specific Profile
- **Endpoint**: `GET /analyze/:id`
- **Description**: Retrieve a specific user profile by their database ID
- **URL Parameters**:
  - `id` (integer): The database ID of the user
- **Success Response** (200):
  ```json
  {
    "user": {
      "id": 1,
      "username": "octocat",
      "name": "The Octocat",
      "public_repos": 2,
      "followers": 3938,
      "following": 9,
      "bio": "There once was...",
    }
  }
  ```

## Project Structure

```
GitHub Profile Analyzer API/
├── src/
│   ├── server.js                 # Express server entry point
│   ├── config/
│   │   ├── db.js                 # Database connection configuration
│   ├── routes/
│   │       └── analyze.routes.js # API route definitions
│   └── controllers/
│       └── analyze.controllers.js # Business logic and handlers
├── package.json                   # Project dependencies and scripts
├── .env                          # Environment variables (create this file)
└── README.md                     
```

## Technologies Used

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/) - Lightweight web framework
- **Database**: [MySQL](https://www.mysql.com/) - Relational database
- **ORM/Driver**: [mysql2](https://github.com/sidorares/node-mysql2) - MySQL client
- **Environment Variables**: [dotenv](https://github.com/motdotla/dotenv)
- **Development**: [Nodemon](https://nodemon.io/) - Auto-reload during development

## Error Handling

The API returns appropriate HTTP status codes:
- **200**: Successful GET request
- **201**: Successful resource creation (POST)
- **400**: Bad request (missing or invalid data)
- **500**: Server error

## License

ISC
