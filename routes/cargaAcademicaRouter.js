var express = require("express");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const CargaAcademicaModel = MODELS.CargaAcademica;
const CargaAcademicaHistoricoModel = MODELS.CargaAcadHistorico;

// Middlewares
// router.use(hasValidToken);

router.get("/getall", async (req, res) => {
  const cargaAcademicas = await CargaAcademicaModel.findAll();

  res.status(200).send(cargaAcademicas);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_cargaAcademica = req.params.id;

  const cargaAcademica = await CargaAcademicaModel.findAll({
    where: {
      id: id_cargaAcademica,
    },
  });

  if (cargaAcademica.length > 0) {
    res.status(200).send(grupo);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

// * Se obtienen todas las asignaturas de todos los docentes
router.post("/get-asignaturas-docentes", async (req, res) => {
  const asignaturas_docente = await MODELS.sequelize.query(
    "SELECT cacad.id, cacad.id_user_docente, asigs.id_asignatura, asigs.id_subgrupo, asigs.id_anio_academico, asigs.intensidad_horaria FROM cargaacademicas cacad INNER JOIN asigsubgrupos asigs ON asigs.id = cacad.id_asig_subgrupo INNER JOIN usuarios usu ON usu.id = cacad.id_user_docente"
  );

  res.status(200).send(asignaturas_docente);
});

router.post("/create", async (req, res) => {
  const data = req.body; // id_user_docente, id_asig_subgrupo, intensidad_horaria,

  data.estado = 1;

  try {
    const new_carga_academica = await CargaAcademicaModel.create(data);
    res.status(200).send({ new_carga_academica });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  // id_user_docente, id_asig_subgrupo, estado
  try {
    const asoc = await CargaAcademicaModel.update(
      {
        id_user_docente: data?.id_user_docente,
        id_asig_subgrupo: data?.id_asig_subgrupo,
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
  const id_cargaAcademica = req.params.id;

  try {
    await CargaAcademicaModel.destroy({
      where: {
        id: id_cargaAcademica,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.post("/create-carga-acad-historico", async (req, res) => {
  const data = req.body; // id_carga_academica, id_user_docente (no FK), id_periodo

  data.estado = 1;

  try {
    const new_carga_academica_historico =
      await CargaAcademicaHistoricoModel.create(data);
    res.status(200).send({ new_carga_academica_historico });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update-carga-acad-historico", async (req, res) => {
  const data = req.body;

  // id_carga_academica, id_user_docente (no FK), id_periodo
  try {
    const asoc = await CargaAcademicaHistoricoModel.update(
      {
        id_carga_academica: data?.id_carga_academica,
        id_user_docente: data?.id_user_docente,
        id_periodo: data?.id_periodo,
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

router.delete("/delete-carga-acad-historico/:id", async (req, res) => {
  const id_cargaAcademica = req.params.id;

  try {
    await CargaAcademicaHistoricoModel.destroy({
      where: {
        id: id_cargaAcademica,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
