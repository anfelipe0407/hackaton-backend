// Eventos institucionales router

var express = require("express");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const EventoInstitucionalModel = MODELS.EventoInstitucional;
const AnioAcademicoModel = MODELS.AnioAcademico;

// Middlewares

// router.use(hasValidToken);

router.post("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await EventoInstitucionalModel.describe();

    let camposDeseados = [
      "id",
      "titulo_evento",
      "descripcion",
      "fecha_inicial",
      "fecha_final",
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
  const eventoIntitucionales = await EventoInstitucionalModel.findAll();

  res.status(200).send(eventoIntitucionales);
});

router.post("/getall-admin", async (req, res) => {
  const anios = await EventoInstitucionalModel.findAll({
    attributes: [
      "id",
      "titulo_evento",
      "descripcion",
      "fecha_inicial",
      "fecha_final",
      "img_url",
      "estado",
      "id_anio_academico",
    ],

    include: [
      {
        model: AnioAcademicoModel,
        as: "anio_academico_evento_ins",
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
  const id_eventoIntitucional = req.params.id;

  const eventoIntitucional = await EventoInstitucionalModel.findAll({
    where: {
      id: id_eventoIntitucional,
    },
  });

  if (eventoIntitucional.length > 0) {
    res.status(200).send(eventoIntitucional);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body; // id_anio_academico, titulo_evento, descripcion, img_url
  //  fecha_inicial, fecha_final, estado

  data.estado = 1;

  try {
    const new_evento = await EventoInstitucionalModel.create(data);
    res.status(200).send({ new_evento });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  try {
    const asoc = await EventoInstitucionalModel.update(
      {
        titulo_evento: data?.titulo_evento,
        descripcion: data?.descripcion,
        img_url: data?.img_url,
        fecha_inicial: data?.fecha_inicial,
        fecha_final: data?.fecha_final,
        img_url: data?.img_url,
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

  // titulo_evento, descripcion, fecha_inicial, fecha_final, img_url, estado
  try {
    const asoc = await EventoInstitucionalModel.update(data, {
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
  const id_eventoIntitucional = req.params.id;

  try {
    await EventoInstitucionalModel.destroy({
      where: {
        id: id_eventoIntitucional,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
