const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const PokemonesRoute = require('./pokemons');
const TypesRoute = require('./types');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', PokemonesRoute);
router.use('/types', TypesRoute);
//------------------------------------------

module.exports = router;
