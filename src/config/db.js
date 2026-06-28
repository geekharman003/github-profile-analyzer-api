import mysql from "mysql2/promise";

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;
const DB_SSL_CA = process.env.DB_SSL_CA;
if (
  !DB_HOST ||
  !DB_USER ||
  !DB_NAME ||
  !DB_PASSWORD ||
  !DB_PORT ||
  !DB_SSL_CA
) {
  throw new Error("missing required database environment variables");
}

let pool = null;

async function createConnection() {
  pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
      ca: DB_SSL_CA,
    },
  });

  checkConnection();
}

async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");

    connection.release();
  } catch (error) {
    console.log("Database connection failed", error);
  }
}

export { pool, createConnection };
