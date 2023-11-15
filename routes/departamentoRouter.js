var express = require("express");
const { Op } = require("sequelize");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const DepartamentoModel = MODELS.Departamento;
const DepartamentoCargoModel = MODELS.DepartamentoCargo;
const DepartamentoUsuarioModel = MODELS.DepartamentoUsuario;

// Middlewares

// router.use(hasValidToken);

router.post("/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await DepartamentoModel.describe();

    let camposDeseados = ["id", "nombre", "descripcion"]; // Especifica los campos que deseas obtener
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
  const departamentos = await DepartamentoModel.findAll();

  res.status(200).send(departamentos);
});

router.post("/getall-admin", async (req, res) => {
  const anios = await DepartamentoModel.findAll({
    attributes: ["id", "nombre", "descripcion", "estado"],
  });

  res.status(200).send(anios);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_departamento = req.params.id;

  const departamento = await DepartamentoModel.findAll({
    where: {
      id: id_departamento,
    },
  });

  if (departamento.length > 0) {
    res.status(200).send(departamento);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body; // nombre, descripcion

  data.estado = 1;

  try {
    const new_grupo = await DepartamentoModel.create(data);
    res.status(200).send({ new_grupo });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;

  try {
    const asoc = await DepartamentoModel.update(data, {
      where: {
        id: data?.id,
      },
    });

    res.status(200).send(asoc);
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update-admin", async (req, res) => {
  const data = req.body;

  // nombre, descripcion, estado
  try {
    const asoc = await DepartamentoModel.update(data, {
      where: {
        id: data?.id,
      },
    });

    res.status(200).send(asoc);
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

// ! DEPARTAMENTO CARGOS
router.post("/dept-cargo/get-info-tabla", async (req, res) => {
  try {
    const tableInfo = await DepartamentoCargoModel.describe();

    let camposDeseados = ["id", "cargo", "id_departamento"]; // Especifica los campos que deseas obtener
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

router.post("/dept-cargo/getall-admin", async (req, res) => {
  const areas = await DepartamentoCargoModel.findAll({
    attributes: ["id", "cargo", "id_departamento"],

    include: [
      {
        model: DepartamentoModel,
        as: "departamento",
        attributes: ["id", "nombre", "descripcion"],
      },
    ],
  });

  res.status(200).send(areas);
});

router.post("/dept-cargo/create", async (req, res) => {
  const data = req.body; // id_departamente, cargo

  data.estado = 1;

  try {
    const new_grupo = await DepartamentoCargoModel.create(data);
    res.status(200).send({ new_grupo });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/dept-cargo/update", async (req, res) => {
  const data = req.body;

  try {
    const asoc = await DepartamentoCargoModel.update(
      {
        cargo: data.cargo,
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

router.put("/dept-cargo/update-admin", async (req, res) => {
  const data = req.body;

  try {
    const asoc = await DepartamentoCargoModel.update(data, {
      where: {
        id: data?.id,
      },
    });

    res.status(200).send(asoc);
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.post("/create-dept-usuario", async (req, res) => {
  const data = req.body; // id_usuario, id_cargo, fecha_inicio_cargo

  // verifica q no exista ya una asociacion departamento-usuario
  const check_asoc = await DepartamentoUsuarioModel.findAll({
    where: {
      [Op.and]: [
        { id_usuario: data?.id_usuario },
        { id_cargo: data?.id_cargo },
      ],
    },
  });

  if (check_asoc.length > 0) {
    res.send({ messageError: "La asociacion ya existe" });
    return;
  } else {
    try {
      const new_asoc = await DepartamentoUsuarioModel.create(data);
      res.status(200).send(new_asoc);
    } catch (err) {
      res.send({ messageError: err.message });
    }
  }

  try {
    const new_grupo = await DepartamentoUsuarioModel.create(data);
    res.status(200).send({ new_grupo });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update-dept-usuario", async (req, res) => {
  const data = req.body;

  try {
    const asoc = await DepartamentoUsuarioModel.update(
      {
        id_usuario: data.id_usuario,
        id_cargo: data.id_cargo,
        fecha_inicio_cargo: data.fecha_inicio_cargo,
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
  const id_departamento = req.params.id;

  try {
    await DepartamentoModel.destroy({
      where: {
        id: id_departamento,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
