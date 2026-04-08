const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 6543,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

module.exports = pool;
