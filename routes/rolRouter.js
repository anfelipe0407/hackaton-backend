var express = require("express");
// var Sequelize = require("sequelize");
const { Op } = require("sequelize");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const RolModel = MODELS.Rol;
const RolUsuarioModel = MODELS.RolesUsuario;
const UsuarioModel = MODELS.Usuario;

// Middlewares
const { hasValidToken } = require("../middlewares/AuthenticationMiddleware");
const db = require("../models");
// router.use(hasValidToken);

// ! CRUD METHODS
router.get("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await RolModel.describe();
    let camposDeseados = ["id", "rol"]; // Especifica los campos que deseas obtener
    let tiposCampos = {};

    camposDeseados.forEach((nombreColumna) => {
      if (tableInfo[nombreColumna]) {
        tiposCampos[nombreColumna] = tableInfo[nombreColumna]?.type;
      }
    });

    // res.status(200).json(tableInfo);
    res.status(200).json(tiposCampos);
  } catch (err) {
    console.error("Error al obtener información de la tabla:", err);
    res.status(500).json({ error: "Error al obtener información de la tabla" });
  }
});

router.get("/getall", async (req, res) => {
  const roles = await RolModel.findAll();

  res.status(200).send(roles);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_rol = req.params?.id;

  const rol = await RolModel.findAll({
    where: {
      id: id_rol,
    },
  });

  if (rol.length > 0) {
    res.status(200).send(rol);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.get("/getall-admin", async (req, res) => {
  const [results, metadata] = await db.sequelize.query(
    "SELECT ru.id, u.nombre, u.p_apellido, u.usuario, r.rol FROM usuarios u INNER JOIN rolesusuarios ru on u.id = ru.id_usuario INNER JOIN rols r on ru.id_rol = r.id"
  );

  res.status(200).send(results);
});

router.post("/create", async (req, res) => {
  const data = req.body;
  data.rol = data.rol.trim();

  try {
    const new_rol = await RolModel.create(data);
    res.status(200).send({ new_rol });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id_rol = req.params?.id;

  try {
    await RolModel.destroy({
      where: {
        id: id_rol,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

// ! ROLES USUARIOS
router.get("/asoc-getall-admin", async (req, res) => {
  const roles_usuarios = await RolUsuarioModel.findAll({
    attributes: ["id", "id_rol", "id_usuario"],

    include: [
      {
        model: RolModel,
        as: "usuario_rol", // Usa el mismo nombre que definiste en la relación del modelo Usuario
        attributes: ["rol"], // Solo incluir el campo 'tipo' del modelo TipoDocumento en el resultado
      },
      {
        model: UsuarioModel,
        as: "usuario_info",
        attributes: [
          "nombre",
          ["p_apellido", "primer apellido"],
          ["s_apellido", "segundo apellido"],
          "num_documento",
        ],
      },
    ],
  });

  res.status(200).send(roles_usuarios);
});

router.post("/asoc-user", async (req, res) => {
  const data = req.body.crearRol;

  const check_asoc = await RolUsuarioModel.findAll({
    where: {
      [Op.and]: [{ id_rol: data?.id_rol }, { id_usuario: data?.id_usuario }],
    },
  });

  if (check_asoc.length > 0) {
    res.send({ messageError: "La asociacion ya existe" });
    return;
  } else {
    try {
      const new_asoc = await RolUsuarioModel.create(data);
      res.status(200).send(new_asoc);
    } catch (err) {
      res.send({ messageError: err.message });
    }
  }
});

router.put("/update-asoc-user", async (req, res) => {
  const data = req.body.updateData;

  try {
    const asoc = await RolUsuarioModel.update(
      {
        id_rol: data?.id_rol,
      },
      {
        where: {
          id: data?.id,
        },
      }
    );

    res.status(200).send(asoc);
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.delete("/delete-asoc-user/:id", async (req, res) => {
  const id = req.params?.id;

  try {
    await RolUsuarioModel.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({ message: "Asociacion eliminada correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
