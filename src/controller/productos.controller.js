const { Pool } = require('pg');
const { config } = require('../config/index');
const pool = new Pool(config);

const getProductos = async (req, res) => {
  const result = await pool.query('SELECT * FROM producto ORDER BY id');
  res.status(200).json(result.rows);
};
const getProductoID = async (req, res) => {
  const { id } = req.body;
  const result = await pool.query(`SELECT * FROM producto WHERE id = ${id}`);
  res.status(200).json(result.rows);
};
const createProducto = async (req, res) => {
  const { producto, precio, descripcion, cantidad } = req.body;
  const sql = await pool.query(
    `INSERT INTO producto (producto, precio, descripcion, cantidad) VALUES('${producto}',${precio},'${descripcion}',${cantidad})`
  );
  if (sql) {
    res.json({
      message: 'Producto insertado con éxito',
    });
  }
  if (!sql) {
    res.json({
      message: 'Error de insertado',
    });
  }
};

const updateProducto = async (req, res) => {
  const id = parseInt(req.params.id);
  const { producto, precio, descripcion, cantidad } = req.body;
  const sql = await pool.query(
    `UPDATE producto SET producto = '${producto}', precio = ${precio} , descripcion = '${descripcion}', cantidad = ${cantidad} WHERE id = ${id}`
  );
  if (sql) {
    res.json({
      message: 'Producto modificado con éxito',
    });
  }
  if (!sql) {
    res.json({
      message: 'Error de modificación',
    });
  }
};

const deleteProducto = async (req, res) => {
  const id = parseInt(req.params.id);
  const sql = await pool.query(`DELETE FROM producto WHERE id = ${id}`);
  if (sql) {
    res.json({
      message: 'Producto eliminado con éxito',
    });
  }
  if (!sql) {
    res.json({
      message: 'Error al eliminar',
    });
  }
};

const getTotalProductos = async (req, res) => {
  const result = await pool.query(
    '	SELECT SUM(cantidad) AS TOTAL FROM producto'
  );
  res.status(200).json(result.rows);
};

const getProductoMenosVendido = async (req, res) => {
  const result = await pool.query('', [], {});
  res.status(200).json(result.rows);
};

const getProductoMasVendido = async (req, res) => {
  const result = await pool.query('', [], {});
  res.status(200).json(result.rows);
};
const getTotalVentas = async (req, res) => {
  const result = await pool.query('', [], {});
  res.status(200).json(result.rows);
};

module.exports = {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  getProductoMenosVendido,
  getProductoMasVendido,
  getTotalProductos,
  getTotalVentas,
  getProductoID,
};
