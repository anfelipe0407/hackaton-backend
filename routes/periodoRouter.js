var express = require("express");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const PeriodoModel = MODELS.Periodo;
const AnioAcademicoModel = MODELS.AnioAcademico;

// Middlewares
// router.use(hasValidToken);

router.post("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await PeriodoModel.describe();

    let camposDeseados = [
      "id",
      "nombre",
      "inicio_periodo",
      "fin_periodo",
      "id_anio_academico",
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
  const periodos = await PeriodoModel.findAll();

  res.status(200).send(periodos);
});

router.post("/getall-admin", async (req, res) => {
  const anios = await PeriodoModel.findAll({
    attributes: [
      "id",
      "nombre",
      "inicio_periodo",
      "fin_periodo",
      "id_anio_academico",
    ],

    include: [
      {
        model: AnioAcademicoModel,
        as: "anio_academico_periodo",
        attributes: [
          "id",
          ["inicio_anio", "Inicio año"],
          ["fin_anio", "Fin año"],
          ["tipo_calendario", "Tipo de calendario"],
        ],
      },
    ],
  });

  res.status(200).send(anios);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_periodo = req.params.id;

  const periodo = await PeriodoModel.findAll({
    where: {
      id: id_periodo,
    },
  });

  if (periodo.length > 0) {
    res.status(200).send(grupo);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body; // id_anio_academico, inicio_periodo (fecha), fin_periodo (fecha)

  try {
    const new_anio_academico = await PeriodoModel.create(data);
    res.status(200).send({ new_anio_academico });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  // inicio_periodo (fecha), fin_periodo (fecha)
  try {
    const asoc = await PeriodoModel.update(
      {
        nombre: data?.nombre,
        inicio_periodo: data?.inicio_periodo,
        fin_periodo: data?.fin_periodo,
        // estado: data?.estado,
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

  // nombre, inicio_periodo, fin_periodo, id_anio_academico
  try {
    const asoc = await PeriodoModel.update(data, {
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
  const id_periodo = req.params.id;

  try {
    await PeriodoModel.destroy({
      where: {
        id: id_periodo,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
