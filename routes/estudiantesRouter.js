var express = require("express");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const EstudianteModel = MODELS.Estudiante;
const SubGrupoModel = MODELS.SubGrupo;
const AnioAcademicoModel = MODELS.AnioAcademico;

const db = require("../models");

// Middlewares
// router.use(hasValidToken);

router.get("/getall", async (req, res) => {
  const estudiantes = await EstudianteModel.findAll();

  res.status(200).send(estudiantes);
});

router.get("/getall-admin", async (req, res) => {
  const [estudiantes, _] = await db.sequelize.query(
    "SELECT est.id, est.cod_matricula, us.cedula, us.nombre, us.p_apellido, us.s_apellido, us.correo, sub.cod_subgrupo, sub.nombre_subgrupo FROM estudiantes est INNER JOIN usuarios us ON est.id_usuario = us.id INNER JOIN subgrupos sub ON est.id_subgrupo = sub.id"
  );

  res.status(200).send(estudiantes);

  // const estudiantes = await EstudianteModel.findAll({
  //   attributes: [
  //     "id",
  //     "cod_matricula",
  //     "id_usuario",
  //     "id_subgrupo",
  //   ],
  // });

  // res.status(200).send(estudiantes);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_estudiante = req.params.id;

  const estudiante = await EstudianteModel.findAll({
    where: {
      id: id_estudiante,
    },
  });

  if (estudiante.length > 0) {
    res.status(200).send(estudiante[0]);
  } else {
    res.status(200).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/getacademicdata/:id", async (req, res) => {
  const id_estudiante = req.params.id;

  const estudiante = await EstudianteModel.findAll({
    where: {
      id_usuario: id_estudiante,
    },
  });

  const anioAcademico = await AnioAcademicoModel.findAll({
    where: {
      estado: true,
    },
  });

  const data = {
    id_estudiante: estudiante[0]?.id,
    id_subgrupo: estudiante[0]?.id_subgrupo,
    id_anio_academico: anioAcademico[0]?.id,
  };

  if (estudiante.length > 0) {
    res.status(200).send(data);
  } else {
    res.status(200).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body;
  //id_usuario, id_subgrupo, fecha_promocion, id_anio_academico

  const check_data = await EstudianteModel.findAll({
    where: {
      id_usuario: data.id_usuario,
    },
  });

  if (check_data.length > 0) {
    res.send({
      messageError: "El usuario ya cuenta con un registro estudiantil",
    });
    return;
    // (en la tabla estudiantes)
  }

  // ---------------------
  // Esta parte del codigo se encarga de generar el cod de matricula automaticamente
  // toma como primeros 3 digitos el cod de subgrupo, despues el dia, mes, y año,
  // y los tres digitos finales es el num del estudiante en el subgrupo
  // * EJEMPLO: 101(subgrupo)04/07/2022(fecha)001(num estudiante)
  // * resultado 10104072022001
  const cod_subgrupo = (
    await SubGrupoModel.findAll({
      where: {
        id: data.id_subgrupo,
      },
    })
  )[0].cod_subgrupo;

  const date = new Date();

  const year = date.getFullYear();

  let month = date.getMonth() + 1;
  month = month.toString().padStart(2, "0");

  let day = date.getDate();
  day = day.toString().padStart(2, "0");

  const n_estudiantes =
    (await EstudianteModel.count({
      where: {
        id_subgrupo: data.id_subgrupo,
      },
    })) + 1;

  let cero_opcional = "";
  if (n_estudiantes > 9 && n_estudiantes <= 99) cero_opcional = "0";
  if (n_estudiantes <= 9) cero_opcional = "00";

  data.cod_matricula = `${cod_subgrupo}${day.toString()}${month.toString()}${year.toString()}${cero_opcional}${n_estudiantes}`;
  // -------- FIN GENERACION MATRICULA AUTOMATICO -------------

  data.estado = 1;

  try {
    const new_grupo = await EstudianteModel.create(data);
    res.status(200).send({ new_grupo });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  try {
    const asoc = await EstudianteModel.update(
      {
        id_subgrupo: data.id_subgrupo,
        fecha_promocion: data.fecha_promocion,
        estado: data.estado,
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
  const id_estudiante = req.params.id;

  try {
    await EstudianteModel.destroy({
      where: {
        id: id_estudiante,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
