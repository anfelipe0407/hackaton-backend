var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");

// MODELS
const MODELS = require("../models");
const UserLog = MODELS.UserLog;

async function logUserAction(data) {
  const action = await UserLog.create(data);

  return action;
}

module.exports = { logUserAction };
