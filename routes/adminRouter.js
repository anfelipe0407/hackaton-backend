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

router.post("/getall-asesores", async (req, res) => {
  const asesores = await UsuarioModel.findAll({
    attributes: ["id", "nombre", "usuario", "tipo"],
  });

  res.status(200).send(asesores);
});

router.post("/getall-clientes", async (req, res) => {
  const clientes = await ClienteModel.findAll({
    attributes: ["id", "razon_social", "direccion", "estado"],
  });

  res.status(200).send(clientes);
});

router.post("/get-cliente-byid", async (req, res) => {
  const id_usuario = req.body.id_usuario;

  const cliente = await ClienteModel.findAll({
    where: {
      id: id_usuario,
    },
  });

  res.status(200).send(cliente);
});

module.exports = router;
