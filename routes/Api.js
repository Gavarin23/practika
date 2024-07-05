const express = require('express');
const router = express.Router();
const vacanciesController = require('../functional/vacancies');

router.get('/vacancies', vacanciesController.getVacancies);
router.get('/allVacancies', vacanciesController.getAllVacancies);

module.exports = router;