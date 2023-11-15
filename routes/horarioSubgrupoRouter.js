var express = require("express");
const { Op } = require("sequelize");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const HorarioSubgrupoModel = MODELS.HorarioSubgrupo;

// Middlewares

// router.use(hasValidToken);

router.get("/getall", async (req, res) => {
  const horarios = await HorarioSubgrupoModel.findAll();

  res.status(200).send(horarios);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_horario = req.params.id;

  const horario = await HorarioSubgrupoModel.findAll({
    where: {
      id: id_horario,
    },
  });

  if (horario.length > 0) {
    res.status(200).send(horario);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body; // id_jornada_detalles, id_asig_subgrupo

  data.estado = 1;

  const check_asoc = await HorarioSubgrupoModel.findAll({
    where: {
      [Op.and]: [
        { id_jornada_detalles: data?.id_jornada_detalles },
        { id_asig_subgrupo: data?.id_asig_subgrupo },
      ],
    },
  });

  if (check_asoc.length > 0) {
    res.send({ messageError: "La asociacion ya existe" });
    return;
  } else {
    try {
      const new_horario_subgrupo = await HorarioSubgrupoModel.create(data);
      res.status(200).send({ new_horario_subgrupo });
    } catch (err) {
      res.send({ messageError: err.message });
    }
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  // id_jornada_detalles, id_asig_subgrupo, estado
  try {
    const asoc = await HorarioSubgrupoModel.update(
      {
        id_jornada_detalles: data?.id_jornada_detalles,
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
  const id_horario = req.params.id;

  try {
    await HorarioSubgrupoModel.destroy({
      where: {
        id: id_horario,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
