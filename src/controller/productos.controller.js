const { Pool } = require('pg');
const { config } = require('../config/index');
const pool = new Pool(config);

const getProductos = async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM producto ORDER BY producto."ID"'
  );
  res.status(200).json(result.rows);
};
const getProductoID = async (req, res) => {
  const { id } = req.body;
  const result = await pool.query(
    `SELECT * FROM producto WHERE producto."ID" = ${id}`
  );
  res.status(200).json(result.rows);
};
const createProducto = async (req, res) => {
  const { producto, precio, descripcion, cantidad } = req.body;
  const sql = await pool.query(
    'CALL Insertar_Producto(:producto,:precio,:descripcion,:cantidad)',
    [producto, precio, descripcion, cantidad],
    { autoCommit: true }
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
    'CALL ACTUALIZAR_PRODUCTO(:id,:producto,:precio,:descripcion,:cantidad)',
    [id, producto, precio, descripcion, cantidad],
    { autoCommit: true }
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
  const sql = await pool.query('DELETE PRODUCTO WHERE ID = :id', [id], {
    autoCommit: true,
  });
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

const getProductoMenosVendido = async (req, res) => {
  const result = await pool.query('', [], {});
  res.status(200).json(result.rows);
};
const getProductoMasVendido = async (req, res) => {
  const result = await pool.query('', [], {});
  res.status(200).json(result.rows);
};
const getTotalProductos = async (req, res) => {
  const result = await pool.query(
    'SELECT SUM(producto."CANTIDAD") AS TOTAL FROM PRODUCTO',
    [],
    {}
  );
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
