var express = require("express");
const { Op } = require("sequelize");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const UsuarioModel = MODELS.Usuario;
const ClienteModel = MODELS.Cliente;
const CotizacionModel = MODELS.Cotizacion;
const ProductoModel = MODELS.Producto;
const CotizacionProductoModel = MODELS.CotizacionProducto;

// * ASESOR
router.get("/getall-asesores", async (req, res) => {
  const asesores = await UsuarioModel.findAll({
    attributes: ["id", "nombre", "usuario"],
    where: {
      tipo: "asesor",
    },
  });

  res.status(200).send(asesores);
});

router.post("/create-asesor", async (req, res) => {
  const data = req.body;

  try {
    const usuario = await UsuarioModel.create({
      ...data,
      tipo: "asesor",
    });

    res.status(200).send({ usuario });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

// * CLIENTES
router.post("/create-cliente", async (req, res) => {
  const data = req.body;

  try {
    const usuario = await UsuarioModel.create({
      ...data,
      num_identificacion: data.nit,
      tipo: "cliente",
    });
    const cliente = await ClienteModel.create({
      ...data,
      id_usuario: usuario.id,
    });

    res.status(200).send({ usuario, cliente });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.get("/getall-clientes", async (req, res) => {
  const clientes = await MODELS.sequelize.query(
    `SELECT cliente.*, usuarios.nombre, usuarios.num_identificacion AS nit
    FROM clientes AS cliente
    INNER JOIN usuarios ON usuarios.id = cliente.id_usuario`,
    {
      type: MODELS.Sequelize.QueryTypes.SELECT,
    }
  );

  if (clientes) {
    res.status(200).send(clientes);
  } else {
    res.status(200).send({
      message: "Elemento no encontrado",
    });
  }
});

// * Producto
router.get("/getall-productos", async (req, res) => {
  const productos = await ProductoModel.findAll();

  res.status(200).send(productos);
});

router.post("/create-producto", async (req, res) => {
  const data = req.body;

  try {
    const producto = await ProductoModel.create(data);

    res.status(200).send({ producto });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

// router.get("/getall-clientes", async (req, res) => {
//   const clientes = await ClienteModel.findAll({
//     attributes: ["id", "razon_social", "direccion", "estado", "descuento"],
//   });

//   res.status(200).send(clientes);
// });

router.post("/get-cliente-byid", async (req, res) => {
  const id_usuario = req.body.id_usuario;

  const cliente = await ClienteModel.findAll({
    where: {
      id: id_usuario,
    },
  });

  res.status(200).send(cliente);
});

// * COTIZACIONES
router.post("/getall-cotizaciones", async (req, res) => {
  const id_cliente = req.body.id_cliente;

  const cotizaciones = await CotizacionModel.findAll();

  res.status(200).send(cotizaciones);
});

router.post("/cliente/cotizar", async (req, res) => {
  const data = req.body;

  try {
    const cliente = await ClienteModel.findAll({
      where: {
        id_usuario: data.id_cliente,
      },
    });

    // res.status(200).send(cliente);
    const fecha = new Date();

    const cotizacion = await CotizacionModel.create({
      id_cliente: data.id_cliente,
      fecha: fecha,
      descuento: cliente.descuento,
      estado: "Inactiva",
    });

    for (let i = 0; i < data.carrito.length; i++) {
      const prod = data.carrito[i];
      console.log(prod);

      const cliente = await CotizacionProductoModel.create({
        id_producto: prod.id,
        id_cotizacion: cotizacion.id,
      });

      console.log(cliente);
    }

    res.status(200).send(cotizacion);
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
