require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  localport: process.env.LOCALPORT || 3000,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT,
};

module.exports = { config };
