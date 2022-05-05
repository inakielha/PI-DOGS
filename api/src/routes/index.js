const { Router } = require('express');
const razeRoute = require ("./raze");
const temperRoute = require ("./temper")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use("/dogs",razeRoute);
router.use("/temperament",temperRoute);


module.exports = router;
