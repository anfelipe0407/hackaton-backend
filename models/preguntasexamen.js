'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreguntasExamen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PreguntasExamen.init({
    id_actividad: DataTypes.INTEGER,
    pregunta: DataTypes.TEXT,
    opcion_multiple: DataTypes.BOOLEAN,
    opcion_correcta: DataTypes.STRING,
    opcion_a: DataTypes.TEXT,
    opcion_b: DataTypes.TEXT,
    opcion_c: DataTypes.TEXT,
    opcion_d: DataTypes.TEXT,
    opcion_e: DataTypes.TEXT,
    opcion_f: DataTypes.TEXT,
    opcion_g: DataTypes.TEXT,
    opcion_h: DataTypes.TEXT,
    opcion_i: DataTypes.TEXT,
    opcion_j: DataTypes.TEXT,
    opcion_a_audio: DataTypes.STRING,
    opcion_b_audio: DataTypes.STRING,
    opcion_c_audio: DataTypes.STRING,
    opcion_d_audio: DataTypes.STRING,
    opcion_e_audio: DataTypes.STRING,
    opcion_f_audio: DataTypes.STRING,
    opcion_g_audio: DataTypes.STRING,
    opcion_h_audio: DataTypes.STRING,
    opcion_i_audio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PreguntasExamen',
  });
  return PreguntasExamen;
};