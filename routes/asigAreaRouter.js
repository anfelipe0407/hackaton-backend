var express = require("express");
const { Op } = require("sequelize");
var router = express.Router();

// MODELS
const MODELS = require("../models");

const AsigAreaModel = MODELS.AsigArea;
const AsignaturaModel = MODELS.Asignatura;
const AreaModel = MODELS.Area;

// Middlewares

// router.use(hasValidToken);

router.post("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await AsigAreaModel.describe();

    let camposDeseados = [
      "id",
      "id_asignatura",
      "id_area",
      "porcentaje",
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
  const asigSubgrupos = await AsigAreaModel.findAll();

  res.status(200).send(asigSubgrupos);
});

router.post("/getall-admin", async (req, res) => {
  const asigAreas = await AsigAreaModel.findAll({
    attributes: [
      "id",
      "id_asignatura",
      "id_area",
      "porcentaje",
      "id_anio_academico",
    ],
  });

  res.status(200).send(asigAreas);
});

router.post("/getbyid", async (req, res) => {
  const id_asig_area = req.body.id;

  const [asigArea, _] = await MODELS.sequelize.query(
    `SELECT asigareas.id, asig.id AS id_asignatura, asig.codigo_asig AS codigo_asignatura,
    asig.nombre_asig AS nombre_asignatura, asig.descripcion_asig AS descripcion_asignatura,
    area.id AS id_area, area.codigo_area AS codigo_area, area.nombre_area AS nombre_area,
    area.descripcion_area, asigareas.porcentaje
    FROM asigareas
    INNER JOIN asignaturas asig ON asigareas.id_asignatura = asig.id
    INNER JOIN areas area on asigareas.id_area = area.id
    WHERE asigareas.id = :id_asig_area`,
    {
      replacements: { id_asig_area },
      type: MODELS.Sequelize.QueryTypes.SELECT,
    }
  );

  if (asigArea) {
    res.status(200).send(asigArea);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

// router.post("/create", async (req, res) => {
//   const data = req.body;
//   // id_asig_area, id_subgrupo, id_docente_asignado, intensidad_horaria, id_anio_academico

//   // res.status(200).send({ data });

//   const check_asoc = await AsigSubGrupoModel.findAll({
//     where: {
//       [Op.and]: [
//         { id_asig_area: data?.id_asig_area },
//         { id_subgrupo: data?.id_subgrupo },
//         { id_docente_asignado: data?.id_docente_asignado },
//       ],
//     },
//   });

//   if (check_asoc.length > 0) {
//     res.send({ messageError: "La asociacion ya existe" });
//     return;
//   } else {
//     try {
//       const new_asig_subgrupo = await AsigSubGrupoModel.create(data);
//       res.status(200).send({ new_asig_subgrupo });
//     } catch (err) {
//       res.send({ messageError: err.message });
//     }
//   }
// });

// router.put("/update", async (req, res) => {
//   const data = req.body;

//   // intensidad_horaria
//   try {
//     const asoc = await AsigSubGrupoModel.update(
//       {
//         intensidad_horaria: data?.intensidad_horaria,
//       },
//       {
//         where: {
//           id: data?.id,
//         },
//       }
//     );

//     res.status(200).send(asoc);
//   } catch (err) {
//     res.send({ messageError: err.message });
//   }
// });

// router.put("/update-admin", async (req, res) => {
//   const data = req.body;

//   // inicial, final, letra, desempenio, id_anio_academico, estado
//   try {
//     const check_asoc = await AsigSubGrupoModel.findAll({
//       where: {
//         [Op.and]: [
//           { id_asig_area: data?.id_asig_area },
//           { id_subgrupo: data?.id_subgrupo },
//           { id_docente_asignado: data?.id_docente_asignado },
//         ],
//       },
//     });

//     // res.status(200).send({ data, check_asoc });
//     if (check_asoc.length > 0 && check_asoc[0].id != data?.id) {
//       res.send({
//         messageError: "La asociacion modificada ya existe",
//       });
//       return;
//     } else {
//       try {
//         const asoc = await AsigSubGrupoModel.update(data, {
//           where: {
//             id: data?.id,
//           },
//         });

//         res.status(200).send({ asoc });
//       } catch (err) {
//         res.send({ messageError: err.message });
//       }
//     }
//   } catch (err) {
//     res.send({ messageError: err.message });
//   }
// });

// router.delete("/delete/:id", async (req, res) => {
//   const id_asigSubgrupo = req.params.id;

//   try {
//     await AsigSubGrupoModel.destroy({
//       where: {
//         id: id_asigSubgrupo,
//       },
//     });
//     res.status(200).send({ message: "Elemento eliminado correctamente" });
//   } catch (err) {
//     res.send({ messageError: err.message });
//   }
// });

module.exports = router;
