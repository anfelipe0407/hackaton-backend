var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

// MODELS
const MODELS = require("../models");
const UserSesionModel = MODELS.UserSesion;
const UserLogModel = MODELS.UserLog;

// Middlewares
// router.use(hasValidToken);

// constantes
const {
  DURACION_SESION_ESTANDAR,
  EXTENSION_SESION_ESTANDAR,
} = require("../constants");

// helper functions
const { addDaysToDate } = require("../helperFunctions/dateHelperFunctions");

router.get("/getall", async (req, res) => {
  const userSesions = await UserSesionModel.findAll();

  res.status(200).send(userSesions);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_userSesion = req.params.id;

  const userSesion = await UserSesionModel.findAll({
    where: {
      id: id_userSesion,
    },
  });

  if (userSesion.length > 0) {
    res.status(200).send(userSesion);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body; //id_usuario, tipo_dispositivo, ip, ciudad

  const salt = bcrypt.genSaltSync(5); // data random para añadir seguridad
  data.token = (Math.random() + 1).toString(36).substring(2); // (10 caracteres)
  let tokenEncriptado = bcrypt.hashSync(data.token, salt);

  let dateTime = new Date();
  data.inicio_sesion = dateTime;

  //se añade un dia (duracion de la sesion)
  let dateTimeEnd = addDaysToDate(dateTime, DURACION_SESION_ESTANDAR);
  data.fin_sesion = dateTimeEnd;

  data.estado = true;

  try {
    const new_sesion = await UserSesionModel.create(data);
    res.status(200).send({ new_sesion, tokenEncriptado });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.post("/check-if-active", async (req, res) => {
  const data = req.body; //token

  if (!data.hasOwnProperty("token")) {
    res.status(200).send("Autenticacion invalida: Token no proveido");
    return;
  }

  const sesiones = await UserSesionModel.findAll({
    where: {
      estado: true,
    },
  });

  let i = 0;
  let sesionActiva = false;
  sesiones.some((sesion, index) => {
    if (bcrypt.compareSync(sesion.token, data.token)) {
      i = index;
      sesionActiva = true;
      return true;
    }
  });

  if (sesionActiva) {
    res.status(200).send(sesiones[i]);
  } else {
    res.status(200).send(null);
  }
});

router.put("/extender", async (req, res) => {
  const id_userSesion = req.body.id;

  const userSesion = await UserSesionModel.findAll({
    where: {
      id: id_userSesion,
    },
  });

  // res.send(userSesion);
  // return;

  try {
    const sesion = await UserSesionModel.update(
      {
        fin_sesion: addDaysToDate(
          userSesion[0].fin_sesion,
          EXTENSION_SESION_ESTANDAR
        ),
      },
      {
        where: {
          id: id_userSesion,
        },
      }
    );

    res.status(200).send(sesion);
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/cerrar", async (req, res) => {
  const id_userSesion = req.body?.id;

  try {
    const sesion = await UserSesionModel.update(
      {
        estado: false,
      },
      {
        where: {
          id: id_userSesion,
        },
      }
    );

    res.status(200).send(sesion);
  } catch (err) {
    res.send(null);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id_userSesion = req.params.id;

  try {
    await UserSesionModel.destroy({
      where: {
        id: id_userSesion,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
