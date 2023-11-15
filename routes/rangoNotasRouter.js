var express = require("express");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const RangoNotaModel = MODELS.RangoNota;
const AnioAcademicoModel = MODELS.AnioAcademico;

// Middlewares
// router.use(hasValidToken);

router.post("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await RangoNotaModel.describe();

    let camposDeseados = [
      "id",
      "inicial",
      "final",
      "letra",
      "desempenio",
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
    res
      .status(200)
      .json({ error: "Error al obtener información de la tabla", err });
  }
});

router.get("/getall", async (req, res) => {
  const rangoNotas = await RangoNotaModel.findAll();

  res.status(200).send(rangoNotas);
});

router.post("/getall-admin", async (req, res) => {
  const areas = await RangoNotaModel.findAll({
    attributes: [
      "id",
      "inicial",
      "final",
      "letra",
      "desempenio",
      "id_anio_academico",
      "estado",
    ],

    include: [
      {
        model: AnioAcademicoModel,
        as: "anio_academico_rn",
        attributes: [
          "id",
          ["inicio_anio", "Inicio año"],
          ["fin_anio", "Fin año"],
          ["tipo_calendario", "Tipo de calendario"],
        ],
      },
    ],
  });

  res.status(200).send(areas);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_rangoNota = req.params.id;

  const rangoNota = await RangoNotaModel.findAll({
    where: {
      id: id_rangoNota,
    },
  });

  if (rangoNota.length > 0) {
    res.status(200).send(grupo);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body; // inicial, final, letra, desempenio, id_anio_academico
  // inicial y final son numeros flotantes (EJ: 2.5) con punto decimal

  data.estado = 1;

  try {
    const new_anio_academico = await RangoNotaModel.create(data);
    res.status(200).send({ new_anio_academico });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  // inicial, final, letra, desempenio
  try {
    const asoc = await RangoNotaModel.update(
      {
        inicial: data?.inicial,
        final: data?.final,
        letra: data?.letra,
        desempenio: data?.desempenio,
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

  // inicial, final, letra, desempenio, id_anio_academico, estado
  try {
    const asoc = await RangoNotaModel.update(data, {
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
  const id_rangoNota = req.params.id;

  try {
    await RangoNotaModel.destroy({
      where: {
        id: id_rangoNota,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
