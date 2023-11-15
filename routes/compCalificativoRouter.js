var express = require("express");
const { Op } = require("sequelize");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const CompCalificativoModel = MODELS.CompCalificativo;
const CompAsigSubModel = MODELS.CompAsigSub; //Componente asignatura subgrupo

const PeriodoModel = MODELS.Periodo;
const AsigSubGrupoModel = MODELS.AsigSubGrupo;

// Middlewares
// router.use(hasValidToken);

router.post("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await CompCalificativoModel.describe();

    let camposDeseados = [
      "id",
      "nombre_comp",
      "id_periodo",
      "porcentaje_estandar",
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
  const compCalificativos = await CompCalificativoModel.findAll();

  res.status(200).send(compCalificativos);
});

router.post("/getall-admin", async (req, res) => {
  const anios = await CompCalificativoModel.findAll({
    attributes: ["id", "nombre_comp", "id_periodo", "porcentaje_estandar"],

    include: [
      {
        model: PeriodoModel,
        as: "periodoComp",
        attributes: [
          "id",
          "nombre",
          ["inicio_periodo", "Inicio periodo"],
          ["fin_periodo", "Fin periodo"],
          ["id_anio_academico", "Id año academico"],
        ],
      },
    ],
  });

  res.status(200).send(anios);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_compCalificativo = req.params.id;

  const compCalificativo = await CompCalificativoModel.findAll({
    where: {
      id: id_compCalificativo,
    },
  });

  if (compCalificativo.length > 0) {
    res.status(200).send(grupo);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body; //nombre_comp, id_periodo, porcentaje_estandar

  data.estado = 1;

  try {
    const new_comp_calificativo = await CompCalificativoModel.create(data);
    res.status(200).send({ new_comp_calificativo });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  //nombre_comp, porcentaje_estandar
  try {
    const asoc = await CompCalificativoModel.update(
      {
        nombre_comp: data?.nombre_comp,
        porcentaje_estandar: data?.porcentaje_estandar,
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

  // nombre_comp, id_periodo, porcentaje_estandar
  try {
    const asoc = await CompCalificativoModel.update(data, {
      where: {
        id: data?.id,
      },
    });

    res.status(200).send(asoc);
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

// ! COMPONENTE ASIG SUBGRUPO
router.post("/asoc-asigsubgrupo/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await CompAsigSubModel.describe();

    let camposDeseados = [
      "id",
      "id_componente",
      "id_asig_subgrupo",
      "porcentaje",
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

router.post("/asoc-asigsubgrupo/get-all-admin", async (req, res) => {
  const compCalificativosAsigSubgrupo = await CompAsigSubModel.findAll({
    attributes: ["id", "id_componente", "id_asig_subgrupo", "porcentaje"],

    include: [
      {
        model: AsigSubGrupoModel,
        as: "AsigSubgrupoComp",
        attributes: ["id", "id_asig_area", "id_subgrupo"],
      },
      {
        model: CompCalificativoModel,
        as: "compCalificativoAsigSub",
        attributes: ["id", "nombre_comp", "id_periodo"],
      },
    ],
  });

  res.status(200).send(compCalificativosAsigSubgrupo);
});

router.post(
  "/asoc-asigsubgrupo/create-comp-asig-subgrupo",
  async (req, res) => {
    const data = req.body; //id_componente, id_asig_subgrupo, porcentaje

    data.estado = 1;

    if (!data.porcentaje) {
      const compCalificativo = await CompAsigSubModel.findAll({
        where: {
          id: data?.id_componente,
        },
      });

      data.porcentaje = compCalificativo[0].porcentaje_estandar;
    }

    // En la tabla CompAsigSub comprobar que los porcentajes de la relacion entre
    // un componente y un registro de asig_subgrupo no sume más de 100%.
    const checkPorcentajes = await CompAsigSubModel.findAll({
      where: {
        id_asig_subgrupo: data?.id_asig_subgrupo,
      },
    });

    let porcentaje_acumulado = Number(data?.porcentaje);
    for (let i = 0; i < checkPorcentajes.length; i++) {
      porcentaje_acumulado += checkPorcentajes[i].porcentaje;
    }

    // res.send({ checkPorcentajes, porcentaje_acumulado });
    // return;

    if (porcentaje_acumulado <= 100) {
      try {
        const new_comp_calificativo_sub = await CompAsigSubModel.create(data);
        res.status(200).send({ new_comp_calificativo_sub });
      } catch (err) {
        res.send({ messageError: err.message });
      }
    } else {
      res.send({
        messageError:
          "Los porcentajes acumulados de la relacion componente-asig_subgrupo suma mas de o igual a 100%",
      });
    }
  }
);

router.put("/asoc-asigsubgrupo/update-comp-asig-subgrupo", async (req, res) => {
  const data = req.body; //id_componente, id_asig_subgrupo, porcentaje, estado

  // En la tabla CompAsigSub comprobar que los porcentajes de la relacion entre
  // un componente y un registro de asig_subgrupo no sume más de 100%.
  const checkPorcentajes = await CompAsigSubModel.findAll({
    where: {
      [Op.and]: [
        {
          id_asig_subgrupo: data?.id_asig_subgrupo,
        },
        {
          id_componente: {
            [Op.ne]: data?.id_componente,
          },
        },
      ],
    },
  });

  let porcentaje_acumulado = Number(data?.porcentaje);
  for (let i = 0; i < checkPorcentajes.length; i++) {
    porcentaje_acumulado += checkPorcentajes[i].porcentaje;
  }

  if (porcentaje_acumulado <= 100) {
    try {
      const asoc = await CompAsigSubModel.update(
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
  } else {
    res.send({
      messageError:
        "Los porcentajes acumulados de la relacion componente-asig_subgrupo suma mas de o igual a 100%",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id_compCalificativo = req.params.id;

  try {
    await CompCalificativoModel.destroy({
      where: {
        id: id_compCalificativo,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
