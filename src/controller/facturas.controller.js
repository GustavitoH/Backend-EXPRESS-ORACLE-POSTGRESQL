const { Pool } = require('pg');
const { config } = require('../config/index');
const pool = new Pool(config);

const getFactura = async (req, res) => {
  const response = await pool.query('SELECT * FROM factura')
  res.status(200).json(response.rows);
};

const createFactura = async (req, res) => {
  const {cliente, fecha, subtotal, total} = req.body;
  const response = await pool.query(`INSERT INTO factura(cliente, fecha, subtotal, total) 
  VALUES('${cliente}', '${fecha}', ${subtotal}, ${total})`);
  res.json({
    messagge: 'Invoice created successfully!',
      body: {
        replies: {cliente, fecha, subtotal, total}
      }
  })
};

module.exports = {
  getFactura,
  createFactura,
};
