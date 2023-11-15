var express = require("express");
var path = require("path");
var cors = require("cors");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var logger = require("morgan");

// Routers
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRouter");
var docenteRouter = require("./routes/docenteRouter");
var asigAreaRouter = require("./routes/asigAreaRouter");
var rolRouter = require("./routes/rolRouter");
var gruposRouter = require("./routes/gruposRouter");
var subgruposRouter = require("./routes/subgruposRouter");
var estudianteRouter = require("./routes/estudiantesRouter");
var acudienteRouter = require("./routes/acudienteRouter");
var cargaAcademicaRouter = require("./routes/cargaAcademicaRouter");
var anioAcademicoRouter = require("./routes/anioAcademicoRouter");
var compCalificativoRouter = require("./routes/compCalificativoRouter");
var periodoRouter = require("./routes/periodoRouter");
var rangoNotasRouter = require("./routes/rangoNotasRouter");
var userSesionRouter = require("./routes/userSesionRouter");
var jornadaRouter = require("./routes/jornadaRouter");
var asigSubgrupoRouter = require("./routes/asigSubgrupoRouter");
var actividadRouter = require("./routes/actividadRouter");
var areaRouter = require("./routes/areaRouter");
var asignaturaRouter = require("./routes/asignaturaRouter");
var hojasDeVidaRouter = require("./routes/hojasDeVidaRouter");
var departamentoRouter = require("./routes/departamentoRouter");
var notificacionRouter = require("./routes/notificacionRouter");
var horarioSubgrupoRouter = require("./routes/horarioSubgrupoRouter");
var eventosInsRouter = require("./routes/eventosInsRouter");

// Middlewares
const { hasValidToken } = require("./middlewares/AuthenticationMiddleware");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set("port", port);

app.listen(port, () => console.log("Server listening on port 8000"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/docente", docenteRouter);
app.use("/asig-area", asigAreaRouter);
app.use("/rol", rolRouter);
app.use("/grupo", gruposRouter);
app.use("/subgrupo", subgruposRouter);
app.use("/estudiante", estudianteRouter);
app.use("/acudiente", acudienteRouter);
app.use("/carga-academica", cargaAcademicaRouter);
app.use("/anio-academico", anioAcademicoRouter);
app.use("/comp-calificativo", compCalificativoRouter);
app.use("/periodo", periodoRouter);
app.use("/rango-notas", rangoNotasRouter);
app.use("/user-sesion", userSesionRouter);
app.use("/jornada", jornadaRouter);
app.use("/asig-subgrupo", asigSubgrupoRouter);
app.use("/actividad", actividadRouter);
app.use("/area", areaRouter);
app.use("/asignatura", asignaturaRouter);
app.use("/hoja-de-vida", hojasDeVidaRouter);
app.use("/departamento", departamentoRouter);
app.use("/notificacion", notificacionRouter);
app.use("/horario-subgrupo", horarioSubgrupoRouter);
app.use("/eventos-ins", eventosInsRouter);

module.exports = app;
