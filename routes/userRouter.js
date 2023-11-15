var express = require("express");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const UsuarioModel = MODELS.Usuario;
const RolesUsuarioModel = MODELS.RolesUsuario;
const RolModel = MODELS.Rol;
const EstudianteModel = MODELS.Estudiante;
const SubgrupoModel = MODELS.SubGrupo;
const AnioAcademicoModel = MODELS.AnioAcademico;
const TipoDocumentoModel = MODELS.TipoDocumento;

// Middlewares
// const { hasValidToken } = require("../middlewares/AuthenticationMiddleware");
// router.use(hasValidToken);

// Heleper functions
const {
  validateEmail,
} = require("../helperFunctions/validationHelperFunctions");

// ! ------------ TABLA USUARIOS ------------------
router.get("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await UsuarioModel.describe();
    let camposDeseados = [
      "id",
      "id_tipo_documento",
      "num_documento",
      "tipo_sangre",
      "nombre",
      "p_apellido",
      "s_apellido",
      "usuario",
      "correo",
      "sexo",
      "direccion",
      "barrio",
      "num_celular",
      "num_telefono",
      "fecha_nacimiento",
      "lugar_nacimiento",
      "estrato",
      "padres_separados",
      "vives_con",
      "discapacidad",
      "familias_en_accion",
      "victima_conflicto",
      "etnia",
      "sisben",
      "eps",
      "desplazado",
    ]; // Especifica los campos que deseas obtener
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

router.post("/getall", async (req, res) => {
  const users = await UsuarioModel.findAll();

  res.status(200).send(users);
});

router.post("/getall-admin", async (req, res) => {
  const users = await UsuarioModel.findAll({
    attributes: {
      exclude: [
        "clave",
        "clave_anterior",
        "clave_sin_encriptar",
        "bloqueo_total",
        "bloqueo_parcial",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    },
    include: [
      {
        model: TipoDocumentoModel,
        as: "tipo_documento", // Usa el mismo nombre que definiste en la relación del modelo Usuario
        attributes: ["tipo"], // Solo incluir el campo 'tipo' del modelo TipoDocumento en el resultado
      },
    ],
  });

  res.status(200).send(users);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_user = req.params.id;

  const user = await UsuarioModel.findAll({
    where: {
      id: id_user,
    },
  });

  // Buscar rol usuario
  const rolId = await RolesUsuarioModel.findAll({
    where: {
      id_usuario: id_user,
    },
  });

  const rol = await RolModel.findAll({
    where: {
      id: rolId[0]?.id_rol,
    },
  });

  // * DATA ACADEMICA (id_estudiante, id_subgrupo, id_anio_academico)
  // Buscar id estudiante
  const estudiante = await EstudianteModel.findAll({
    where: {
      id_usuario: id_user,
    },
  });

  const academicUserData = {
    id_estudiante: estudiante[0].id,
    id_subgrupo: estudiante[0].id_subgrupo,
    id_anio_academico: estudiante[0].id_anio_academico,
  };

  user[0].id_estudiante = estudiante[0].id;
  user[0].id_subgrupo = estudiante[0].id_subgrupo;
  user[0].id_anio_academico = estudiante[0].id_anio_academico;

  if (user.length > 0) {
    res.status(200).send({ ...user[0], rol: rol[0].rol, ...academicUserData });
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.put("/update-admin", async (req, res) => {
  const data = req.body.updateData;

  // titulo, descripcion, fecha_inicio,
  // fecha_fin, id_comp_asigsub, id_periodo, max_adjuntos
  try {
    const asoc = await UsuarioModel.update(data, {
      where: {
        id: data?.id,
      },
    });

    res.status(200).send(asoc);
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id_user = req.params.id;

  try {
    await UsuarioModel.destroy({
      where: {
        id: id_user,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

// ! AUX
router.get("/tipo_documento/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await TipoDocumentoModel.describe();

    let camposDeseados = ["id", "tipo"]; // Especifica los campos que deseas obtener
    let tiposCampos = {};

    camposDeseados.forEach((nombreColumna) => {
      if (tableInfo[nombreColumna]) {
        tiposCampos[nombreColumna] = tableInfo[nombreColumna]?.type;
      }
    });

    res.status(200).json(tiposCampos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener información de la tabla" });
  }
});

router.post("/tipo_documento/getall-admin", async (req, res) => {
  const data = await TipoDocumentoModel.findAll({
    attributes: ["id", "tipo"],
  });

  res.status(200).send(data);
});

// ! ------------------- TABLA ROLES USUARIOS ----------------------------
router.get("/roles-usuarios/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await RolesUsuarioModel.describe();
    let camposDeseados = ["id", "id_rol", "id_usuario"]; // Especifica los campos que deseas obtener
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

module.exports = router;
