var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

// MODELS
const MODELS = require("../models");
const UsuarioModel = MODELS.Usuario;
const RolesUsuarioModel = MODELS.RolesUsuario;
const RolModel = MODELS.Rol;

// Middlewares
const {
  hasValidToken,
  testMid,
} = require("../middlewares/AuthenticationMiddleware");
// router.use(hasValidToken);

// Helper functions
const {
  validateEmail,
} = require("../helperFunctions/validationHelperFunctions");

const ClienteModel = MODELS.Cliente;

router.post("/", (req, res) => {
  res.status(200).send({
    message: "Conected to the server",
  });
});

router.post("/register", async (req, res) => {
  const data = req.body;
  // res.send(data);

  const dataCheck = await UsuarioModel.findAll({
    where: {
      num_documento: data?.num_documento,
    },
  });

  if (dataCheck.length > 0) {
    res.status(400).send({
      error: "Usuario con ese numero de identificacion ya existe",
    });
  } else if (dataCheck.length == 0) {
    const new_usuario = await UsuarioModel.create(data);

    res.status(200).send({
      message: "Registro creado correctamente",
      new_usuario,
    });
  }
});

router.post("/login", async (req, res) => {
  const data = req.body;

  const data_check = await UsuarioModel.findAll({
    where: {
      usuario: data?.usuario,
      clave: data?.clave,
      tipo: data?.tipo,
    },
  });

  const cliente = await ClienteModel.findAll({
    where: {
      id_usuario: data_check[0]?.id,
    },
  });

  // res.status(200).send({
  //   data,
  // });

  if (data_check.length > 0) {
    res.status(200).send({
      message: "Inicio sesion correcto",
      login: data_check[0],
      cliente_id: cliente[0]?.id,
    });
  } else {
    res.status(200).send({
      error: "Inicio de sesion incorrecto",
    });
  }
});

module.exports = router;
