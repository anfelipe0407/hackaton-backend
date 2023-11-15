var express = require("express");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const SubGrupoModel = MODELS.SubGrupo;
const GrupoModel = MODELS.Grupo;

const db = require("../models");

// Middlewares
// router.use(hasValidToken);

router.post("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await SubGrupoModel.describe();

    let camposDeseados = ["id", "cod_subgrupo", "id_grupo", "nombre_subgrupo"]; // Especifica los campos que deseas obtener
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
  const subGrupos = await SubGrupoModel.findAll();

  res.status(200).send(subGrupos);
});

router.post("/getall-admin", async (req, res) => {
  const subgrupos = await SubGrupoModel.findAll({
    attributes: ["id", "cod_subgrupo", "nombre_subgrupo", "id_grupo"],

    include: [
      {
        model: GrupoModel,
        as: "grupo",
        attributes: ["id", "cod_grupo", ["nombre_grupo", "Nombre grupo"]],
      },
    ],
  });

  res.status(200).send(subgrupos);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_subgrupo = req.params.id;

  const subgrupo = await SubGrupoModel.findAll({
    where: {
      id: id_subgrupo,
    },
  });

  if (subgrupo.length > 0) {
    res.status(200).send(grupo);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body; // id_grupo, nombre_subgrupo

  // * --------------
  // esta parte se encarga de generar el codigo del subgrupo automaticamente
  // estructura: [codigo del grupo][numero de subgrupos para ese grupo]
  // ejemplo, primero a: 101, primero b: 102
  const cod_grupo = (
    await GrupoModel.findAll({
      where: {
        id: data.id_grupo,
      },
    })
  )[0]?.cod_grupo;

  data.cod_subgrupo = await SubGrupoModel.count({
    where: {
      id_grupo: data.id_grupo,
    },
  });

  const cero_opcional = data?.cod_subgrupo > 9 ? "" : "0";

  data.cod_subgrupo = `${cod_grupo}${cero_opcional}${data?.cod_subgrupo + 1}`;
  // * --------------

  data.estado = 1;

  try {
    const new_subgrupo = await SubGrupoModel.create(data);
    res.status(200).send({ new_subgrupo });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  try {
    const asoc = await SubGrupoModel.update(
      {
        nombre_subgrupo: data?.nombre_subgrupo,
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

  // cod_subgrupo, id_grupo, nombre_subgrupo, estado
  try {
    const asoc = await SubGrupoModel.update(data, {
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
  const id_subgrupo = req.params.id;

  try {
    await SubGrupoModel.destroy({
      where: {
        id: id_subgrupo,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
