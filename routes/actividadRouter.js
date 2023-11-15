var express = require("express");
var router = express.Router();

const { Op } = require("sequelize");

// MODELS
const MODELS = require("../models");
const ActividadModel = MODELS.Actividad;

const ActividadAsignacionModel = MODELS.ActividadAsignacion;
const actividadEstudianteModel = MODELS.ActividadEstudiante;

const actividadTipoModel = MODELS.TipoActividad;
const actividadAdjuntoModel = MODELS.ActividadAdjunto;
const actEstAdjuntoModel = MODELS.ActEstAdjunto;

const AsigSubGrupoModel = MODELS.AsigSubGrupo;

// Middlewares

// router.use(hasValidToken);

router.post("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await ActividadModel.describe();

    let camposDeseados = ["id", "id_tipo_actividad", "titulo", "descripcion"]; // Especifica los campos que deseas obtener
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

router.post("/get-all-admin", async (req, res) => {
  const actividades = await ActividadModel.findAll({
    attributes: ["id", "id_tipo_actividad", "titulo", "descripcion"],
  });

  res.status(200).send(actividades);
});

router.get("/getall", async (req, res) => {
  const actividades = await ActividadModel.findAll();

  res.status(200).send(actividades);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_actividad = req.params.id;

  const actividad = await ActividadModel.findAll({
    where: {
      id: id_actividad,
    },
  });

  if (actividad.length > 0) {
    res.status(200).send(actividad);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

// ! RUTAS DOCENTE
router.post("/actividad-asignacion/getbyid-asigsubgrupo", async (req, res) => {
  // try {
  const id_actividad_asig = req.body.id_actividad_asig;

  const [actividad_asig, _] = await MODELS.sequelize.query(
    `SELECT act_asig.*, act.id AS id_actividad, act.id_tipo_actividad, act.titulo, act.descripcion, tipoa.tipo_actividad AS tipo_actividad
      FROM actividadasignacions act_asig
      INNER JOIN actividads act ON act_asig.id_actividad = act.id
      INNER JOIN tipoactividads tipoa ON tipoa.id = act.id_tipo_actividad
      WHERE act_asig.id = :id_actividad_asig`,
    {
      replacements: { id_actividad_asig: id_actividad_asig },
      type: MODELS.Sequelize.QueryTypes.SELECT,
    }
  );

  // res.status(200).send(actividad_asig);

  const [compAsigSubResult, __] = await MODELS.sequelize.query(
    `SELECT id, id_componente, id_asig_subgrupo, porcentaje
    FROM compasigsubs
    WHERE id = :id_asig_subgrupo`,
    {
      replacements: { id_asig_subgrupo: actividad_asig.id_asig_subgrupo },
      type: MODELS.Sequelize.QueryTypes.SELECT,
    }
  );

  // res.status(200).send({ actividad_asig, compAsigSubResult });
  // // Agregar los datos de 'compasigsubs' a los resultados de actividades
  const actividadConCompAsigSub = {
    ...actividad_asig,
    comp_asigsub: compAsigSubResult,
  };

  if (actividadConCompAsigSub) {
    res.status(200).send(actividadConCompAsigSub);
  }
});

router.post(
  "/actividad-asignacion/getall-byid-asigsubgrupo",
  async (req, res) => {
    const id_asig_subgrupo = req.body.id_asig_subgrupo;

    // Consulta para obtener actividades
    const resultados = await MODELS.sequelize.query(
      `SELECT act_asig.*, act.id AS id_actividad, act.id_tipo_actividad, act.titulo, act.descripcion, tipoa.tipo_actividad AS tipo_actividad
      FROM actividadasignacions act_asig
      INNER JOIN actividads act ON act_asig.id_actividad = act.id
      INNER JOIN tipoactividads tipoa ON tipoa.id = act.id_tipo_actividad
      WHERE act_asig.id_asig_subgrupo = :id_asig_subgrupo`,
      {
        replacements: { id_asig_subgrupo: id_asig_subgrupo },
        type: MODELS.Sequelize.QueryTypes.SELECT,
      }
    );

    if (resultados.length > 0) {
      // Consulta para obtener datos de la tabla 'compasigsubs'
      const compAsigSubResults = await MODELS.sequelize.query(
        `SELECT id, id_componente, id_asig_subgrupo, porcentaje
        FROM compasigsubs
        WHERE id_asig_subgrupo = :id_asig_subgrupo;`,
        {
          replacements: { id_asig_subgrupo: id_asig_subgrupo },
          type: MODELS.Sequelize.QueryTypes.SELECT,
        }
      );

      // Agregar los datos de 'compasigsubs' a los resultados de actividades
      const actividadesConCompAsigSub = resultados.map((actividad_asig) => {
        const compAsigSub = compAsigSubResults.find((cas) => {
          // console.log({ cas, id_asig_subgrupo });
          return cas.id_asig_subgrupo == id_asig_subgrupo;
        });

        return {
          ...actividad_asig,
          comp_asigsub: compAsigSub || null,
        };
      });

      // res.status(200).send({
      //   resultados,
      //   compAsigSubResults,
      // });

      res.status(200).send(actividadesConCompAsigSub);
    } else {
      res.status(200).send([]);
    }
  }
);

// router.post("/actividad-asignacion/getbyid-asigsubgrupo", async (req, res) => {
//   const id_asig_subgrupo = req.body.id_asig_subgrupo;

//   const resultados = await MODELS.sequelize.query(
//     `SELECT act_asig.*, act.id AS id_actividad, act.id_tipo_actividad, act.titulo, act.descripcion, tipoa.tipo_actividad AS tipo_actividad
//     FROM actividadasignacions act_asig
//     INNER JOIN actividads act ON act_asig.id_actividad = act.id
//     INNER JOIN tipoactividads tipoa on tipoa.id = act.id_tipo_actividad
//     WHERE act_asig.id_asig_subgrupo = :id_asig_subgrupo`,
//     {
//       replacements: { id_asig_subgrupo: id_asig_subgrupo },
//       type: MODELS.Sequelize.QueryTypes.SELECT,
//     }
//   );

//   if (resultados.length > 0) {
//     res.status(200).send(resultados);
//   } else {
//     res.status(200).send([]);
//   }
// });

router.post("/create", async (req, res) => {
  const data = req.body;
  // id_asig_subgrupo, id_docente(id_usuario), titulo, descripcion, fecha_inicio,
  // fecha_fin, id_comp_asigsub, id_periodo, max_adjuntos

  // Verificaciones de fecha_inicio y fecha_fin validas
  // * Formato de fecha: (año-mes-dia hora:mins:segundos)
  // (Los meses empiezan a contar desde 00 hasta 11)

  const fecha_inicio_obj = new Date(data.fecha_inicio);
  const fecha_fin_obj = new Date(data.fecha_fin);

  if (fecha_inicio_obj < fecha_fin_obj) {
    try {
      const new_actividad = await ActividadModel.create(data);
      res.status(200).send({ new_actividad });
    } catch (err) {
      res.send({ messageError: err.message });
    }
  } else {
    res.send({
      messageError: "La fecha inicial no puede ser mayor o igual que la final",
    });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  // titulo, descripcion, fecha_inicio,
  // fecha_fin, id_comp_asigsub, id_periodo, max_adjuntos
  try {
    const asoc = await ActividadModel.update(
      {
        titulo: data?.titulo,
        descripcion: data?.descripcion,
        fecha_inicio: data?.fecha_inicio,
        fecha_fin: data?.fecha_fin,
        id_comp_asigsub: data?.id_comp_asigsub,
        id_periodo: data?.id_periodo,
        max_adjuntos: data?.max_adjuntos,
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

router.delete("/delete/:id", async (req, res) => {
  const id_actividad = req.params.id;

  try {
    await ActividadModel.destroy({
      where: {
        id: id_actividad,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

// ! TIPO ACTIVIDAD
router.post("/tipo-actividad/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await actividadTipoModel.describe();

    let camposDeseados = ["id", "tipo_actividad"]; // Especifica los campos que deseas obtener
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

router.post("/tipo-actividad/get-all-admin", async (req, res) => {
  const areas = await actividadTipoModel.findAll({
    attributes: ["id", "tipo_actividad"],
  });

  res.status(200).send(areas);
});

router.post("/tipo-actividad/create", async (req, res) => {
  const data = req.body;
  // tipo_actividad

  try {
    const new_actividad_tipo = await actividadTipoModel.create(data);
    res.status(200).send({ new_actividad_tipo });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/tipo-actividad/update-admin", async (req, res) => {
  const data = req.body;
  // tipo_actividad

  try {
    const asoc = await actividadTipoModel.update(data, {
      where: {
        id: data?.id,
      },
    });

    res.status(200).send(asoc);
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

// ! ACTIVIDAD ASIGNACION
router.post("/actividad-asignacion/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await ActividadAsignacionModel.describe();

    let camposDeseados = [
      "id",
      "id_actividad",
      "id_asig_subgrupo",
      "id_docente_asignado",
      "fecha_inicio",
      "fecha_fin",
      "tiempo_max",
      "id_comp_asigsub",
      "max_adjuntos",
      "tiempo_por_pregunta",
      "calificacion_automatica",
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

router.post("/actividad-asignacion/get-all-admin", async (req, res) => {
  const areas = await ActividadAsignacionModel.findAll({
    attributes: ["id", "tipo_actividad"],
  });

  res.status(200).send(areas);
});

router.post("/actividad-asignacion/create", async (req, res) => {
  const data = req.body;
  // tipo_actividad

  try {
    const new_actividad_tipo = await ActividadAsignacionModel.create(data);
    res.status(200).send({ new_actividad_tipo });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/actividad-asignacion/update-admin", async (req, res) => {
  const data = req.body;
  // tipo_actividad

  try {
    const asoc = await ActividadAsignacionModel.update(data, {
      where: {
        id: data?.id,
      },
    });

    res.status(200).send(asoc);
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

// ! Actividad estudiante
router.post("/check-actividad-estudiante", async (req, res) => {
  const data = req.body;
  // id_actividad, id_estudiante

  try {
    const actividadEstudiante = await actividadEstudianteModel.findAll({
      where: {
        [Op.and]: [
          { id_actividad: data.id_actividad },
          { id_estudiante: data.id_estudiante },
        ],
      },
    });

    if (actividadEstudiante.length > 0) {
      res.status(200).send(actividadEstudiante[0]);
    } else {
      res.status(200).send(null);
    }
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
