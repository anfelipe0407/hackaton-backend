var express = require("express");
const { Op } = require("sequelize");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const AreaModel = MODELS.Area;
const AsigAreaModel = MODELS.AsigArea;

// Middlewares

// router.use(hasValidToken);

router.post("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await AreaModel.describe();

    let camposDeseados = [
      "id",
      "codigo_area",
      "nombre_area",
      "descripcion_area",
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
  const areas = await AreaModel.findAll();

  res.status(200).send(areas);
});

router.post("/getall-admin", async (req, res) => {
  const areas = await AreaModel.findAll({
    attributes: [
      "id",
      "codigo_area",
      "nombre_area",
      "descripcion_area",
      "estado",
    ],
  });

  res.status(200).send(areas);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_area = req.params.id;

  const area = await AreaModel.findAll({
    where: {
      id: id_area,
    },
  });

  if (area.length > 0) {
    res.status(200).send(area);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body; // codigo_area, nombre_area, descripcion_area

  data.estado = 1;

  try {
    const new_area = await AreaModel.create(data);
    res.status(200).send({ new_area });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  // codigo_area, nombre_area, descripcion_area
  try {
    const asoc = await AreaModel.update(
      {
        codigo_area: data?.codigo_area,
        nombre_area: data?.nombre_area,
        descripcion_area: data?.descripcion_area,
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

  // codigo_area, descripcion_area, estado
  try {
    const asoc = await AreaModel.update(data, {
      where: {
        id: data?.id,
      },
    });

    res.status(200).send(asoc);
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

// ! METODOS DE ASOSIACION
router.post("/asoc-asignatura", async (req, res) => {
  const data = req.body; //id_asignatura, id_area, porcentaje, id_anio_academico

  data.estado = 1;

  const check_asoc = await AsigAreaModel.findAll({
    where: {
      [Op.and]: [
        { id_asignatura: data?.id_asignatura },
        { id_area: data?.id_area },
      ],
    },
  });

  if (check_asoc.length > 0) {
    res.send({ messageError: "La asociacion ya existe" });
    return;
  } else {
    try {
      const new_asoc = await AsigAreaModel.create(data);
      res.status(200).send(new_asoc);
    } catch (err) {
      res.send({ messageError: err.message });
    }
  }
});

router.put("/update-asoc-asignatura", async (req, res) => {
  const data = req.body; //id, porcentaje, estado

  try {
    const asoc = await AsigAreaModel.update(
      {
        porcentaje: data?.porcentaje,
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

router.delete("/delete-asoc-asignatura/:id", async (req, res) => {
  const id = req.params?.id;

  try {
    await AsigAreaModel.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({ message: "Asociacion eliminada correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id_area = req.params.id;

  try {
    await AreaModel.destroy({
      where: {
        id: id_area,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
