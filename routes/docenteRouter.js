var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");

// MODELS
const MODELS = require("../models");
const UsuarioModel = MODELS.Usuario;

const AnioAcademicoModel = MODELS.AnioAcademico;
const AsigSubGrupoModel = MODELS.AsigSubGrupo;

const TipoActividadModel = MODELS.TipoActividad;
const ActividadModel = MODELS.Actividad;
const ActividadAsignacionModel = MODELS.ActividadAsignacion;

// * FOROS
const HiloModel = MODELS.Hilo;
const RespuestaHiloModel = MODELS.RespuestaHilo;

// ! ------------ DOCENTES (TABLA USUARIOS con ROl 'docente') ------------------
router.post("/getall-admin", async (req, res) => {
  const [docentes, _] = await MODELS.sequelize.query(
    "SELECT u.* FROM usuarios u INNER JOIN rolesusuarios ru ON u.id = ru.id_usuario INNER JOIN rols r ON ru.id_rol = r.id WHERE r.rol = 'docente'"
  );
  // "SELECT u.id, u.nombre, u.num_documento, u.p_apellido, u.s_apellido, u.cedula FROM usuarios u INNER JOIN rols r ON u.id_rol = r.id WHERE r.rol = 'docente'"

  res.status(200).send(docentes);
});

router.post("/get-academic-data", async (req, res) => {
  const anioAcademico = await AnioAcademicoModel.findAll({
    where: {
      estado: true,
    },
  });

  const data = {
    id_anio_academico: anioAcademico[0]?.id,
  };

  if (anioAcademico.length > 0) {
    res.status(200).send(data);
  } else {
    res.status(200).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/get-asignaturas", async (req, res) => {
  const id_docente = req.body.id_docente;

  const asignaturas_docente = await MODELS.sequelize.query(
    `SELECT ASG.id AS id_asigsubgrupo, A.id AS id_area, ASI.id AS id_asignatura,
    ASI.nombre_asig AS nombre_asignatura, S.nombre_subgrupo
    FROM asigsubgrupos AS ASG
    INNER JOIN asigareas AS AA ON ASG.id_asig_area = AA.id
    INNER JOIN areas AS A ON AA.id_area = A.id
    INNER JOIN asignaturas AS ASI ON AA.id_asignatura = ASI.id
    INNER JOIN subgrupos AS S ON ASG.id_subgrupo = S.id
    WHERE ASG.id_docente_asignado = :id_docente_asignado;`,
    {
      replacements: { id_docente_asignado: id_docente },
      type: MODELS.Sequelize.QueryTypes.SELECT,
    }
  );

  if (asignaturas_docente) {
    res.status(200).send(asignaturas_docente);
  } else {
    res.status(200).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/get-asignaturas-fullinfo-byid", async (req, res) => {
  const id_asig_subgrupo = req.body.id_asig_subgrupo;

  const [asigArea, _] = await MODELS.sequelize.query(
    `SELECT asigsub.id, asigsub.id_docente_asignado, asigareas.id AS id_asigarea, areas.id AS id_area, asig.id AS id_asignatura,
    asigareas.porcentaje, asigareas.id_anio_academico,
    areas.codigo_area, areas.nombre_area, areas.descripcion_area,
    asig.codigo_asig, asig.nombre_asig, asig.descripcion_asig,
    asigsub.intensidad_horaria
    FROM asigsubgrupos AS asigsub
    INNER JOIN asigareas ON asigsub.id_asig_area = asigareas.id
    INNER JOIN areas ON asigareas.id_area = areas.id
    INNER JOIN asignaturas AS asig ON asigareas.id_asignatura = asig.id
    INNER JOIN subgrupos ON asigsub.id_subgrupo = subgrupos.id
    WHERE asigsub.id = :id_asig_subgrupo;`,
    {
      replacements: { id_asig_subgrupo },
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

router.post("/create-actividad", async (req, res) => {
  const data = req.body;
  // calificacion_automatica, descripcion, fecha_fin, fecha_inicio, id, id_asig_subgrupo,
  // id_comp_asigsub, id_docente_asignado, id_tipo_actividad, max_adjuntos, tiempo_max,
  // tiempo_por_pregunta, titulo, tipo_actividad (string)

  const [tipoActividad, _] = await TipoActividadModel.findAll({
    where: {
      tipo_actividad: data.tipo_actividad,
    },
  });

  // res.status(200).send({ data, tipoActividadId });

  // Verificaciones de fecha_inicio y fecha_fin validas
  // * Formato de fecha: (año-mes-dia hora:mins:segundos)
  // (Los meses empiezan a contar desde 00 hasta 11)
  const fecha_inicio_obj = new Date(data.fecha_inicio);
  const fecha_fin_obj = new Date(data.fecha_fin);

  if (fecha_inicio_obj < fecha_fin_obj && tipoActividad.id) {
    try {
      const new_actividad = await ActividadModel.create({
        ...data,
        id_tipo_actividad: tipoActividad.id,
      });
      const new_actividad_asignacion = await ActividadAsignacionModel.create({
        id_actividad: new_actividad["id"],
        ...data,
      });

      res.status(200).send({ new_actividad, new_actividad_asignacion });
    } catch (err) {
      res.send({ messageError: err.message });
    }
  } else {
    res.send({
      messageError: "La fecha inicial no puede ser mayor o igual que la final",
    });
  }
});

router.put("/update-actividad", async (req, res) => {
  const data = req.body;

  try {
    const actividad = await ActividadModel.update(
      {
        titulo: data.titulo,
        descripcion: data.descripcion,
      },
      {
        where: {
          id: data?.id_actividad,
        },
      }
    );

    const actividad_asig = await ActividadAsignacionModel.update(
      {
        fecha_inicio: data?.fecha_inicio,
        fecha_fin: data?.fecha_fin,
        tiempo_max: data?.tiempo_max,
        tiempo_por_pregunta: data?.tiempo_por_pregunta,
        max_adjuntos: data?.max_adjuntos,
        calificacion_automatica: data?.calificacion_automatica,
      },
      {
        where: {
          id: data?.id,
        },
      }
    );

    res.status(200).send({ actividad, actividad_asig });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

// ! FOROS
router.post("/foro/get-all-hilo-admin", async (req, res) => {
  const id_foro = req.body.id_actividad_asig;

  const hilos = await MODELS.sequelize.query(
    `SELECT h.id, h.id_actividad_asig, h.id_usuario, h.titulo, h.respuesta, h.createdAt,
    usu.nombre, usu.p_apellido, usu.s_apellido, usu.foto_url
    FROM hilos AS h
    INNER JOIN usuarios AS usu ON h.id_usuario = usu.id
    WHERE h.id_actividad_asig = :id_foro;`,
    {
      replacements: { id_foro },
      type: MODELS.Sequelize.QueryTypes.SELECT,
    }
  );

  if (hilos) {
    res.status(200).send(hilos);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/foro/get-respuesta-hilo-byid", async (req, res) => {
  const id_hilo = req.body.id_hilo;

  const respuestas_hilo = await MODELS.sequelize.query(
    `SELECT resh.id, resh.id_hilo, resh.respuesta, resh.id_respuesta, resh.createdAt,
    usu.nombre, usu.p_apellido, usu.s_apellido, usu.foto_url
    FROM respuestahilos AS resh
    INNER JOIN usuarios AS usu ON usu.id = resh.id_usuario
    WHERE resh.id_hilo = :id_hilo;`,
    {
      replacements: { id_hilo },
      type: MODELS.Sequelize.QueryTypes.SELECT,
    }
  );

  if (respuestas_hilo) {
    res.status(200).send(respuestas_hilo);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

// ! HILOS
router.post("/foro/get-info-tabla-hilo", async (req, res) => {
  try {
    const tableInfo = await HiloModel.describe();

    let camposDeseados = [
      "id",
      "id_actividad_asig",
      "id_usuario",
      "titulo",
      "respuesta",
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

router.post("/foro/create-hilo", async (req, res) => {
  const data = req.body;
  // id_actividad_asig , id_usuario, titulo, respuesta

  try {
    const new_hilo = await HiloModel.create(data);

    res.status(200).send({ new_hilo });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.post("/foro/get-info-tabla-respuesta-hilo", async (req, res) => {
  try {
    const tableInfo = await RespuestaHiloModel.describe();

    let camposDeseados = [
      "id",
      "id_hilo",
      "id_usuario",
      "respuesta",
      "id_respuesta",
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

router.post("/foro/create-respuesta-hilo", async (req, res) => {
  const data = req.body;
  // id_hilo, id_usuario, titulo, id_respuesta

  try {
    const new_respuesta_hilo = await RespuestaHiloModel.create(data);

    res.status(200).send({ new_respuesta_hilo });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
