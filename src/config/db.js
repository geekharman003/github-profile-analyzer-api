import mysql from "mysql2/promise";

const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

if (!DB_HOST || !DB_USERNAME || !DB_NAME || !DB_PASSWORD) {
  throw new Error("missing required database environment variables");
}

let pool = null;

async function createConnection() {
  pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  checkConnection();
}

async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");

    connection.release();
  } catch (error) {
    console.log("Database connection failed");
  }
}

export { pool, createConnection };
