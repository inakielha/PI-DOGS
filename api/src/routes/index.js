const { Router } = require('express');
const razeRoute = require ("./raze");
const temperRoute = require ("./temper")
const emailRoute = require ("./email")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use("/dogs",razeRoute);
router.use("/temperament",temperRoute);
router.use("/sendEmail",emailRoute)

module.exports = router;
