var express = require("express");
var router = express.Router();

// MODELS
const MODELS = require("../models");
const AcudienteModel = MODELS.Acudiente;
const TipoAcudienteModel = MODELS.TipoAcudiente;
const ParentescoModel = MODELS.Parentesco;

// db
const db = require("../models");

// Middlewares
// router.use(hasValidToken);

router.get("/getall", async (req, res) => {
  const acudientes = await AcudienteModel.findAll();

  res.status(200).send(acudientes);
});

router.get("/getall-admin", async (req, res) => {
  const acudientes = await AcudienteModel.findAll({
    attributes: [
      "id",
      "id_acudiente",
      "id_parentesco",
      "id_estudiante",
      "id_tipo_acudiente",
    ],
  });

  res.status(200).send(acudientes);

  // const [results, metadata] = await db.sequelize.query(
  //   "SELECT ac.id, u.nombre AS nombre_acudiente, u.p_apellido AS p_apellido_acudiente, pa.parentesco, ta.tipo_acudiente, usu.nombre AS nombre_estudiante, usu.p_apellido AS p_apellido_estudiante FROM usuarios u INNER JOIN acudientes ac ON u.id = ac.id_acudiente INNER JOIN parentescos pa ON ac.id_parentesco = pa.id INNER JOIN tipoacudientes ta ON ta.id = ac.id_tipo_acudiente INNER JOIN estudiantes es ON ac.id_estudiante = es.id INNER JOIN usuarios usu ON usu.id = es.id_usuario"
  // );

  // res.status(200).send(results);
});

router.get("/getbyid/:id", async (req, res) => {
  const id_acudiente = req.params.id;

  const acudiente = await AcudienteModel.findAll({
    where: {
      id: id_acudiente,
    },
  });

  if (acudiente.length > 0) {
    res.status(200).send(grupo);
  } else {
    res.status(400).send({
      message: "Elemento no encontrado",
    });
  }
});

router.post("/create", async (req, res) => {
  const data = req.body?.crearAcudiente; // id_acudiente (id_usuario),id_parentesco, id_estudiante,id_tipo_acudiente

  try {
    const new_acudiente = await AcudienteModel.create(data);
    res.status(200).send({ new_acudiente });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body.editParentesco;

  // id_parentesco, id_estudiante,id_tipo_acudiente
  try {
    const asoc = await AcudienteModel.update(
      {
        id_parentesco: data?.id_parentesco,
        id_estudiante: data?.id_estudiante,
        id_tipo_acudiente: data?.id_tipo_acudiente,
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
  const id_acudiente = req.params.id;

  try {
    await AcudienteModel.destroy({
      where: {
        id: id_acudiente,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

// * TIPO ACUDIENTE
router.get("/getall-tipo-acudiente", async (req, res) => {
  const tipo_acudiente = await TipoAcudienteModel.findAll();

  res.status(200).send(tipo_acudiente);
});

router.post("/create-tipo-acudiente", async (req, res) => {
  const data = req.body; // tipo_acudiente

  try {
    const new_tipo_acudiente = await TipoAcudienteModel.create(data);
    res.status(200).send({ new_tipo_acudiente });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update-tipo-acudiente", async (req, res) => {
  const data = req.body;

  // tipo_acudiente
  try {
    const asoc = await TipoAcudienteModel.update(
      {
        tipo_acudiente: data?.tipo_acudiente,
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

router.delete("/delete-tipo-acudiente/:id", async (req, res) => {
  const id_tipo_acudiente = req.params.id;

  try {
    await TipoAcudienteModel.destroy({
      where: {
        id: id_tipo_acudiente,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

// * PARENTESCO
router.get("/getall-parentescos", async (req, res) => {
  const parentescos = await ParentescoModel.findAll();

  res.status(200).send(parentescos);
});

router.post("/create-parentesco", async (req, res) => {
  const data = req.body; // parentesco

  try {
    const new_parentesco = await ParentescoModel.create(data);
    res.status(200).send({ new_parentesco });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

router.put("/update-parentesco", async (req, res) => {
  const data = req.body;

  // parentesco
  try {
    const asoc = await ParentescoModel.update(
      {
        parentesco: data?.parentesco,
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

router.delete("/delete-parentesco/:id", async (req, res) => {
  const id_parentesco = req.params.id;

  try {
    await ParentescoModel.destroy({
      where: {
        id: id_parentesco,
      },
    });
    res.status(200).send({ message: "Elemento eliminado correctamente" });
  } catch (err) {
    res.send({ messageError: err.message });
  }
});

module.exports = router;
