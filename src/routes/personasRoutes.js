// personasRoutes.js

const express = require('express');
const router = express.Router();
const personasController = require('../controllers/personasController');

router.post('/', personasController.agregarPersona);

module.exports = router;