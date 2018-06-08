const mongoose = require('mongoose');
const Database = require('../services/Database');
const db = new Database();

const FANCY_TIMER = 1000;

module.exports = (app) => {
  app.get('/info', (req, res) => {
    res.send("<h2>Patient Card</h2>");
  })
};