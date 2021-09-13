const { Pool } = require('pg');
const { config } = require('../config/index');
const pool = new Pool(config);

const getKardex = async (req, res) => {
  const result = await pool.query('SELECT * FROM KARDEX');
  res.status(200).json(result.rows);
};

module.exports = {
  getKardex,
};
