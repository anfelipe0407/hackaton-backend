var express = require("express");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const NotificacionModel = MODELS.Notificacion;
const NotificacionesUsuarioModel = MODELS.NotificacionesUsuario;

// Middlewares

// router.use(hasValidToken);

router.get("/getall", async (req, res) => {
  const notificaciones = await NotificacionModel.findAll();

  res.status(200).send(notificaciones);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_notificacion = req.params.id;

  const notificacion = await NotificacionModel.findAll({
    where: {
      id: id_notificacion,
    },
  });

  if (notificacion.length > 0) {
    res.status(200).send(notificacion);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body; // titulo, descripcion, id_usuario,
  // general(bool), id_subgrupo(opcional)

  data.estado = 1;

  try {
    const new_notificacion = await NotificacionModel.create(data);
    res.status(200).send({ new_notificacion });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  // titulo, descripcion,
  // general(bool)
  try {
    const asoc = await NotificacionModel.update(
      {
        titulo: data?.titulo,
        descripcion: data?.descripcion,
        general: data?.general,
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

router.post("/create-notificacion-user", async (req, res) => {
  const data = req.body; // id_notificacion, id_usuario, fecha_visto

  try {
    const new_notificacion_user = await NotificacionesUsuarioModel.create(data);
    res.status(200).send({ new_notificacion_user });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id_notificacion = req.params.id;

  try {
    await NotificacionModel.destroy({
      where: {
        id: id_notificacion,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
