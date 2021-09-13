const { Pool } = require('pg');
const { config } = require('../config/index');
const pool = new Pool(config);

const getDetalle_Factura = async (req, res) => {
  const response = await pool.query('SELECT * FROM vista_detallefactura')
  res.status(200).json(response.rows);
};

const getIdFactura = async (req, res) => {
  const response = await pool.query('SELECT id FROM (SELECT id FACTURA ORDER BY id DESC) WHERE rownum <= 1')
  res.status(200).json(response.rows);
};

const createDetalle_Factura = async (req, res) => {
  const {id_factura, id_producto, cantidad, preciounit, precio} = req.body;
  const response = await pool.query(`INSERT INTO detalle_factura(id_factura, id_producto, cantidad, preciounit, precio) 
  VALUES('${id_factura}', '${id_producto}', ${cantidad}, ${preciounit}, ${precio})`);
  if (response) {
    res.json({
      message: 'Detalle de factura insertado con éxito',
    });
  }
  if (!response) {
    res.json({
      message: 'Error de insertado',
    });
  }
};

module.exports = {
  getDetalle_Factura,
  getIdFactura,
  createDetalle_Factura,
};
