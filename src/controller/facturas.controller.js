const { Pool } = require('pg');
const { config } = require('../config/index');
const pool = new Pool(config);

const getFactura = async (req, res) => {
  const response = await pool.query('SELECT * FROM factura');
  res.status(200).json(response.rows);
};

const createFactura = async (req, res) => {
  const { cliente, subtotal, total } = req.body;
  const response = await pool.query(`INSERT INTO factura(cliente, fecha, subtotal, total) 
  VALUES('${cliente}', current_date, ${subtotal}, ${total})`);
  if (response) {
    res.json({
      messagge: 'Factura creada exitosamente!',
      body: {
        replies: { cliente, subtotal, total },
      },
    });
  }
  if (!response) {
    res.json({
      message: 'Error de insertado',
    });
  }
};

module.exports = {
  getFactura,
  createFactura,
};
