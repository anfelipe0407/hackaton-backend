var express = require("express");
const { Op } = require("sequelize");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const JornadaModel = MODELS.Jornada;
const JornadaDetalleModel = MODELS.JornadaDetalle;
const AnioAcademicoModel = MODELS.AnioAcademico;

// Middlewares

// router.use(hasValidToken);

router.post("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await JornadaModel.describe();

    let camposDeseados = ["id", "hora_inicio", "hora_fin", "id_anio_academico"]; // Especifica los campos que deseas obtener
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
  const jornadas = await JornadaModel.findAll();

  res.status(200).send(jornadas);
});

router.post("/getall-admin", async (req, res) => {
  const roles_usuarios = await JornadaModel.findAll({
    attributes: ["id", "hora_inicio", "hora_fin", "id_anio_academico"],

    include: [
      {
        model: AnioAcademicoModel,
        as: "anio_academico_jornada",
        attributes: [
          "id",
          ["inicio_anio", "Inicio año"],
          ["fin_anio", "Fin año"],
          ["tipo_calendario", "Tipo de calendario"],
        ],
      },
    ],
  });

  res.status(200).send(roles_usuarios);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_jornada = req.params.id;

  const jornada = await JornadaModel.findAll({
    where: {
      id: id_jornada,
    },
  });

  if (jornada.length > 0) {
    res.status(200).send(jornada);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body; // hora_inicio,hora_fin,id_anio_academico

  data.estado = 1;

  // ------- INICIO VALIDACIONES POR CASOS ----------------
  // Se crean arr de la forma [horas, minutos, segundos]; (aunque solo se usan las horas y los mins)
  let hora_inicio_arr = data.hora_inicio.split(":");
  let hora_fin_arr = data.hora_fin.split(":");

  // Metodo añadido al prototipo del objeto Date para añadir n horas de manera sencilla
  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };

  // Objetos date, necesarios para comparar las fechas ingresadas por el usuario con las de la base de datos
  const hora_inicio_obj = new Date(
    2020,
    0,
    1,
    hora_inicio_arr[0],
    hora_inicio_arr[1]
  );

  const hora_fin_obj = new Date(2020, 0, 1, hora_fin_arr[0], hora_fin_arr[1]);

  // Por temas de zona horaria, se resta una hora, de lo contrario las comparaciones fallan
  hora_inicio_obj.addHours(-1);
  hora_fin_obj.addHours(-1);

  // Consulta que verifica que la jornada ingresada por el usuario no se sobreponga a otra ya en la base de datos
  // Está repartida en 3 casos:
  // CASO 1: Verifica que la hora inicial en la base de datos no se encuentre entre la hora inicio y hora final
  // recibidas por la API   ej: BD: h_i: 6am; API: h_i: 5am, h_f: 7am.
  // CASO 2: Verifica que la hora final en la base de datos no se encuentre entre la hora inicio y hora final
  // recibidas por la API   ej: BD: h_f: 2pm; API: h_i: 1pm, h_f: 3pm.
  // CASO 3: Verifica que las horas recibidas por la api no esten DENTRO de una jornada ya existente.
  // EJ: BD: h_i: 6am, h_f: 2pm; API: h_i: 8am, h_f: 11am

  // OTROS CASOS TAMBIEN ESTÁN CUBIERTOS POR LOS 3 CASOS, A VECES EN COMBINACION.

  // NOTA: la consulta tambien verifica el año_academico enviado en la api
  const checkValidData = await JornadaModel.findAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            {
              [Op.or]: [
                {
                  // * CASO 1
                  [Op.and]: [
                    {
                      hora_inicio: {
                        [Op.gte]: hora_inicio_obj,
                      },
                    },
                    {
                      hora_inicio: {
                        [Op.lt]: hora_fin_obj,
                      },
                    },
                  ],
                },
                {
                  // * CASO 2
                  [Op.and]: [
                    {
                      hora_fin: {
                        [Op.gt]: hora_inicio_obj,
                      },
                    },
                    {
                      hora_fin: {
                        [Op.lte]: hora_fin_obj,
                      },
                    },
                  ],
                },
              ],
            },
            {
              // * CASO 3
              [Op.and]: [
                {
                  hora_inicio: {
                    [Op.lte]: hora_inicio_obj,
                  },
                },
                {
                  hora_fin: {
                    [Op.gte]: hora_fin_obj,
                  },
                },
              ],
            },
          ],
        },
        { id_anio_academico: data.id_anio_academico },
      ],
    },
  });

  if (checkValidData.length === 0) {
    try {
      const new_jornada = await JornadaModel.create(data);
      res.status(200).send({ new_jornada });
    } catch (err) {
      res.send({ messageError: err.message });
    }
  } else {
    res.send({ messageError: "La jornada ya existe o se interpone con otra" });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  // hora_inicio,hora_fin
  try {
    const asoc = await JornadaModel.update(
      {
        hora_inicio: data?.hora_inicio,
        hora_fin: data?.hora_fin,
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

  // hora_inicio, hora_fin, id_anio_academico
  try {
    const asoc = await JornadaModel.update(data, {
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
  const id_jornada = req.params.id;

  try {
    await JornadaModel.destroy({
      where: {
        id: id_jornada,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.post("/create-jornada-detalles", async (req, res) => {
  const data = req.body; // id_jornada,hora_inicio,hora_fin, descanso(bool)

  data.estado = 1;

  try {
    const new_jornada_detalles = await JornadaDetalleModel.create(data);
    res.status(200).send({ new_jornada_detalles });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update-jornada-detalles", async (req, res) => {
  const data = req.body;

  // id_jornada,hora_inicio,hora_fin, descanso(bool)
  try {
    const asoc = await JornadaDetalleModel.update(
      {
        hora_inicio: data?.hora_inicio,
        hora_fin: data?.hora_fin,
        descanso: data?.descanso,
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

module.exports = router;
