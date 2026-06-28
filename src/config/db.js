import mysql from "mysql2/promise";

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;
const DB_SSL_CA = process.env.DB_SSL_CA;
const NODE_ENV = process.env.NODE_ENV || "development";

if (!DB_HOST || !DB_USER || !DB_NAME || !DB_PASSWORD || !DB_PORT) {
  throw new Error("Missing required database environment variables");
}

if (NODE_ENV === "production") {
  if (!DB_SSL_CA) {
    throw new Error("Add your ca certificate");
  }
}

let pool = null;

async function createConnection() {
  const configObj = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  NODE_ENV === "production"
    ? (configObj.ssl = {
        ca: DB_SSL_CA,
      })
    : "";

  pool = mysql.createPool(configObj);

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
