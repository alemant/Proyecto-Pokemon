const { Router } = require('express');
const { Type } = require('../db');
const router = Router();
const axios = require('axios');

const url = "https://pokeapi.co/api/v2/type";

router.get('/', async (req, res, next) => {
    try {
        const typesRequest = await axios.get(url);
        const typesArrayData = typesRequest.data.results;
        typesArrayData.forEach(e => {
            Type.findOrCreate({
                where: {
                    name: e.name
                }
            })
        });
        const allTypes = await Type.findAll();
        res.send(allTypes);
    }catch(e) {
        next(e);
    }
});

module.exports = router