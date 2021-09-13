CREATE TABLE producto(
  id SERIAL,
  producto VARCHAR(100),
  predicio DECIMAL(10,2),
  descripcion VARCHAR(300),
  cantidad INTEGER,
  CONSTRAINT id_pk PRIMARY KEY(id)
);

CREATE TABLE factura(
  id SERIAL,
  cliente VARCHAR(30),
  fecha DATE,
  subtotal DECIMAL(10,2),
  total DECIMAL(10,2),
  CONSTRAINT idfactura_pk PRIMARY KEY(id)
);

CREATE TABLE detalle_factura(
  id_factura INTEGER,
  id_producto INTEGER,
  cantidad INTEGER,
  preciounit INTEGER,
  precio INTEGER,
  CONSTRAINT idfactura_fk FOREIGN KEY(id_factura) REFERENCES producto(id),
  CONSTRAINT idproducto_fk FOREIGN KEY(id_producto) REFERENCES producto(id)
);

CREATE TABLE kardex(
  id SERIAL,
  producto VARCHAR(50),
  fecha DATE,
  accion VARCHAR(200),
  CONSTRAINT idkardex_pk PRIMARY KEY(id)
);

---Vista de la tabla detalle factura------
CREATE VIEW vista_detallefactura AS SELECT f.id_factura, p.id, f.cantidad, f.preciounit, f.precio
FROM detalle_factura as f inner join producto as p on (f.id_producto = p.id)