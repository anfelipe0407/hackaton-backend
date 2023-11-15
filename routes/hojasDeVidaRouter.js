var express = require("express");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const HojasDeVidaModel = MODELS.HojasDeVida;

// Middlewares

// router.use(hasValidToken);

router.get("/getall", async (req, res) => {
  const hojaDeVidas = await HojasDeVidaModel.findAll();

  res.status(200).send(hojaDeVidas);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_hojaDeVida = req.params.id;

  const hojaDeVida = await HojasDeVidaModel.findAll({
    where: {
      id: id_hojaDeVida,
    },
  });

  if (hojaDeVida.length > 0) {
    res.status(200).send(hojaDeVida);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body; // id_usuario, perfil, experiencia_laboral
  // formacion_academica, referencias laborales, referencias familiares, eps, seguridad_social,
  // fecha_contratacion, tipo_contrato, adjunto_url

  // verifica q no exista ya una hoja de vida
  const check_data = await HojasDeVidaModel.findAll({
    where: {
      id_usuario: data?.id_usuario,
    },
  });

  if (check_data.length > 0) {
    res.send({ messageError: "El elemento no puede repetirse" });
    return;
  } else {
    try {
      const new_hoja_de_vida = await HojasDeVidaModel.create(data);
      res.status(200).send({ new_hoja_de_vida });
    } catch (err) {
      res.send({ messageError: err.message });
    }
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  try {
    const asoc = await HojasDeVidaModel.update(
      {
        perfil: data.perfil,
        experiencia_larboral: data.experiencia_larboral,
        formacion_academica: data.formacion_academica,
        referencias_laborales: data.referencias_laborales,
        referencias_familiares: data.referencias_familiares,
        eps: data.eps,
        seguridad_social: data.seguridad_social,
        fecha_contratacion: data.fecha_contratacion,
        tipo_contrato: data.tipo_contrato,
        adjunto_url: data.adjunto_url,
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
  const id_hojaDeVida = req.params.id;

  try {
    await HojasDeVidaModel.destroy({
      where: {
        id: id_hojaDeVida,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
