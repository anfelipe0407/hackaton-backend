var express = require("express");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const AnioAcademicoModel = MODELS.AnioAcademico;

// Middlewares
// router.use(hasValidToken);

// const numero = 1;

router.post("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await AnioAcademicoModel.describe();

    let camposDeseados = ["id", "inicio_anio", "fin_anio", "tipo_calendario"]; // Especifica los campos que deseas obtener
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
  const anioAcademicos = await AnioAcademicoModel.findAll();

  res.status(200).send(anioAcademicos);
});

router.post("/getall-admin", async (req, res) => {
  const anios = await AnioAcademicoModel.findAll({
    attributes: ["id", "inicio_anio", "fin_anio", "tipo_calendario"],
  });

  res.status(200).send(anios);
});

router.post("/create", async (req, res) => {
  let data = req.body; // inicio_anio, fin_anio, tipo_calendario (a/b)
  data.estado = 1;

  try {
    const new_anio_academico = await AnioAcademicoModel.create(data);
    res.status(200).send({ new_anio_academico });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  // inicio_anio, fin_anio, tipo_calendario, estado
  try {
    const asoc = await AnioAcademicoModel.update(
      {
        inicio_anio: data?.inicio_anio,
        fin_anio: data?.fin_anio,
        tipo_calendario: data?.tipo_calendario,
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

  // inicio_anio, fin_anio, tipo_calendario, estado
  try {
    const asoc = await AnioAcademicoModel.update(data, {
      where: {
        id: data?.id,
      },
    });

    res.status(200).send(asoc);
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.get("/getbyid/:id", async (req, res) => {
  const id_anioAcademico = req.params.id;

  const anioAcademico = await AnioAcademicoModel.findAll({
    where: {
      id: id_anioAcademico,
    },
  });

  if (anioAcademico.length > 0) {
    res.status(200).send(grupo);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id_anioAcademico = req.params.id;

  try {
    await AnioAcademicoModel.destroy({
      where: {
        id: id_anioAcademico,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
