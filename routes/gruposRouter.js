var express = require("express");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const GrupoModel = MODELS.Grupo;

// Middlewares
// router.use(hasValidToken);

router.post("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await GrupoModel.describe();

    let camposDeseados = ["id", "cod_grupo", "nombre_grupo"]; // Especifica los campos que deseas obtener
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
  const grupos = await GrupoModel.findAll();

  res.status(200).send(grupos);
});

router.post("/getall-admin", async (req, res) => {
  const anios = await GrupoModel.findAll({
    attributes: ["id", "cod_grupo", "nombre_grupo"],
  });

  res.status(200).send(anios);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_grupo = req.params.id;

  const grupo = await GrupoModel.findAll({
    where: {
      id: id_grupo,
    },
  });

  if (grupo.length > 0) {
    res.status(200).send(grupo);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body; // nombre_grupo

  data.estado = 1;

  try {
    const new_grupo = await GrupoModel.create(data);
    res.status(200).send({ new_grupo });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body; //nombre_grupo, estado

  try {
    const asoc = await GrupoModel.update(
      {
        nombre_grupo: data?.nombre_grupo,
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

  // cod_grupo, nombre_grupo, estado
  try {
    const asoc = await GrupoModel.update(data, {
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
  const id_grupo = req.params.id;

  try {
    await GrupoModel.destroy({
      where: {
        id: id_grupo,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
