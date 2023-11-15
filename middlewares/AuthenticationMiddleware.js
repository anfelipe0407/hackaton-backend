var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

// MODELS
const MODELS = require("../models");
const UserSesionModel = MODELS.UserSesion;

// LogMiddleware
const { logUserAction } = require("./LogMiddleware");

async function hasValidToken(req, res, next) {
  const data = req.headers.authData; //token,userIdRequest

  if (!data.hasOwnProperty("token") || !data.hasOwnProperty("userIdRequest")) {
    res.status(401).send("Autenticacion invalida: Infomacion faltante");
    return;
  }

  const sesion = await UserSesionModel.findAll({
    where: {
      [Op.and]: [{ estado: true }, { id_usuario: data.userIdRequest }],
    },
  });

  let indexSesion = 0;
  let tokenEsValido = false;

  if (sesion.length > 0) {
    tokenEsValido = sesion.some((elem, i) => {
      //elem.token: TEXTO PLANO (base de datos). --- data.token: ECRIPTADO (cliente)
      let valido = bcrypt.compareSync(elem.token, data.token);
      if (valido) {
        indexSesion = i;
        return true;
      }

      return false;
    });
  }

  // res.send(sesion[0]);

  if (tokenEsValido) {
    // USER ACTION LOG
    const actionData = {
      id_usuario: data.userIdRequest,
      id_sesion: sesion[indexSesion]?.id,
      accion: data?.userAction,
      modulo: data?.userActionModule,
      categoria: data?.categoria,
    };

    await logUserAction(actionData);
    next();
  } else {
    res.status(403).send("La sesion ha cerrado");
  }
}

module.exports = { hasValidToken };
