var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");

// MODELS
const MODELS = require("../models");
const AsignaturaModel = MODELS.Asignatura;
const EstudianteModel = MODELS.Estudiante;
const AinoAcademicoModel = MODELS.AnioAcademico;
const AsigSubGrupoModel = MODELS.AsigSubGrupo;

// Middlewares
const { hasValidToken } = require("../middlewares/AuthenticationMiddleware");
// router.use(hasValidToken);

router.post("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await AsignaturaModel.describe();

    let camposDeseados = [
      "id",
      "codigo_asig",
      "nombre_asig",
      "descripcion_asig",
    ]; // Especifica los campos que deseas obtener
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

router.get("/getall", async (req, res) => {
  const asignaturas = await AsignaturaModel.findAll();

  res.status(200).send(asignaturas);
});

router.post("/getall-admin", async (req, res) => {
  const areas = await AsignaturaModel.findAll({
    attributes: [
      "id",
      "codigo_asig",
      "nombre_asig",
      "descripcion_asig",
      // "id_area",
      // "porcentaje",
      // "id_anio_academico",
      // "estado",
    ],
  });

  res.status(200).send(areas);
});

router.post("/getbyid/:id", async (req, res) => {
  const id_asignatura = req.params.id;

  const asignatura = await AsignaturaModel.findAll({
    where: {
      id: id_asignatura,
    },
  });

  if (asignatura.length > 0) {
    res.status(200).send(asignatura[0]);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/getbyuserid", async (req, res) => {
  const id_usuario = req.body.userIdRequest;

  const subgrupoUsuario = await EstudianteModel.findAll({
    where: {
      id_usuario: id_usuario,
    },
  });

  // En la tabla anioAcademico solo debe haber un registro con estado valor 1. Ese es el activo actual
  const anioAcademicoActivo = await AinoAcademicoModel.findAll({
    where: {
      estado: 1,
    },
  });

  // Listado de id's de asignaturas
  const asignaturaSubgrupos = await AsigSubGrupoModel.findAll({
    where: {
      [Op.and]: [
        {
          id_subgrupo: subgrupoUsuario[0].id_subgrupo,
        },
        {
          id_anio_academico: anioAcademicoActivo[0].id,
        },
      ],
    },
  });

  const asignaturas = [];
  for (let i = 0; i < asignaturaSubgrupos.length; i++) {
    let asignatura = await AsignaturaModel.findAll({
      where: {
        id: asignaturaSubgrupos[i].id_asignatura,
      },
    });

    asignaturas.push(asignatura[0]);
  }

  if (asignaturaSubgrupos.length > 0) {
    // res.status(200).send({
    //   id_subgrupo: subgrupoUsuario[0].id_subgrupo,
    //   id_anio_academico: anioAcademicoActivo[0].id,
    // });
    res.status(200).send(asignaturas);
    // res.status(200).send(asignaturaSubgrupos);
  } else {
    res.status(200).send({
      message: "Elementos no encontrados",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body; // codigo_asig, nombre_asig, descripcion_asig

  data.estado = 1;

  try {
    const new_asignatura = await AsignaturaModel.create(data);
    res.status(200).send({ new_asignatura });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  // codigo_asig, nombre_asig, descripcion_asig
  try {
    const asoc = await AsignaturaModel.update(
      {
        codigo_asig: data?.codigo_asig,
        nombre_asig: data?.nombre_asig,
        descripcion_asig: data?.descripcion_asig,
        estado: data?.estado,
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

router.put("/update-admin", async (req, res) => {
  const data = req.body;

  // codigo_asig, nombre_asig, descripcion_asig, estado
  try {
    const asoc = await AsignaturaModel.update(data, {
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
  const id_asignatura = req.params.id;

  try {
    await AsignaturaModel.destroy({
      where: {
        id: id_asignatura,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
