var express = require("express");
const { Op } = require("sequelize");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const AsigSubGrupoModel = MODELS.AsigSubGrupo;

const AsigAreaModel = MODELS.AsigArea;
const SubGrupoModel = MODELS.SubGrupo;
const UsuarioModel = MODELS.Usuario;

// Middlewares

// router.use(hasValidToken);

router.post("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await AsigSubGrupoModel.describe();

    let camposDeseados = [
      "id",
      "id_asig_area",
      "id_subgrupo",
      "id_docente_asignado",
      "intensidad_horaria",
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
  const asigSubgrupos = await AsigSubGrupoModel.findAll();

  res.status(200).send(asigSubgrupos);
});

router.post("/getall-admin", async (req, res) => {
  const cargasAcademicas = await AsigSubGrupoModel.findAll({
    attributes: [
      "id",
      "id_asig_area",
      "id_subgrupo",
      "id_docente_asignado",
      "intensidad_horaria",
    ],

    include: [
      {
        model: AsigAreaModel,
        as: "asig_area",
        attributes: [
          "id",
          "id_asignatura",
          "id_area",
          "porcentaje",
          "id_anio_academico",
        ],
      },
      {
        model: SubGrupoModel,
        as: "subgrupo",
        attributes: ["id", "cod_subgrupo", ["nombre_subgrupo", "Nombre"]],
      },
      {
        model: UsuarioModel,
        as: "docente",
        attributes: [
          "id",
          ["num_documento", "Numero de documento"],
          "nombre",
          ["p_apellido", "Primer apellido"],
          "usuario",
        ],
      },
    ],
  });

  res.status(200).send(cargasAcademicas);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_asigSubgrupo = req.params.id;

  const asigSubgrupo = await AsigSubGrupoModel.findAll({
    where: {
      id: id_asigSubgrupo,
    },
  });

  if (asigSubgrupo.length > 0) {
    res.status(200).send(asigSubgrupo);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body;
  // id_asig_area, id_subgrupo, id_docente_asignado, intensidad_horaria, id_anio_academico

  // res.status(200).send({ data });

  const check_asoc = await AsigSubGrupoModel.findAll({
    where: {
      [Op.and]: [
        { id_asig_area: data?.id_asig_area },
        { id_subgrupo: data?.id_subgrupo },
        { id_docente_asignado: data?.id_docente_asignado },
      ],
    },
  });

  if (check_asoc.length > 0) {
    res.send({ messageError: "La asociacion ya existe" });
    return;
  } else {
    try {
      const new_asig_subgrupo = await AsigSubGrupoModel.create(data);
      res.status(200).send({ new_asig_subgrupo });
    } catch (err) {
      res.send({ messageError: err.message });
    }
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  // intensidad_horaria
  try {
    const asoc = await AsigSubGrupoModel.update(
      {
        intensidad_horaria: data?.intensidad_horaria,
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
    const check_asoc = await AsigSubGrupoModel.findAll({
      where: {
        [Op.and]: [
          { id_asig_area: data?.id_asig_area },
          { id_subgrupo: data?.id_subgrupo },
          { id_docente_asignado: data?.id_docente_asignado },
        ],
      },
    });

    // res.status(200).send({ data, check_asoc });
    if (check_asoc.length > 0 && check_asoc[0].id != data?.id) {
      res.send({
        messageError: "La asociacion modificada ya existe",
      });
      return;
    } else {
      try {
        const asoc = await AsigSubGrupoModel.update(data, {
          where: {
            id: data?.id,
          },
        });

        res.status(200).send({ asoc });
      } catch (err) {
        res.send({ messageError: err.message });
      }
    }
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id_asigSubgrupo = req.params.id;

  try {
    await AsigSubGrupoModel.destroy({
      where: {
        id: id_asigSubgrupo,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
