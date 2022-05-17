const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const router = Router();
const axios = require('axios');

// --------------------Funciones------------------------------

const url = 'https://pokeapi.co/api/v2/pokemon';

const getPokeApi = async () => {
    const pokeRequest1 = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=17');
    const allRequest = pokeRequest1.data.results
    // const pokeRequest1 = await axios.get(url);
    // const pokeRequest2 = await axios.get(pokeRequest1.data.next);
    // const allRequest = pokeRequest1.data.results.concat(pokeRequest2.data.results);
    /* ------------------- */
    // allRequest nos devuelve un array de objetos -- name y url
    /* ------------------- */
    // La línea de abajo nos devuelve todas las promesas
    const promises = allRequest.map(e => axios.get(e.url));
    const allData = await Promise.all(promises);
    const pokeData = await allData.map((e) => {
        return {
            id: e.data.id,
            name: e.data.name,
            hp: e.data.stats[0]["base_stat"],
            attack: e.data.stats[1]["base_stat"],
            defense: e.data.stats[2]["base_stat"],
            speed: e.data.stats[5]["base_stat"],
            height: e.data.height,
            weight: e.data.weight,
            image: e.data.sprites.other.home.front_default,
            types: e.data.types.map(e => e.type.name)
        };
    });
    return pokeData;
};

// const getPokeDb = async () => {
//     return await Pokemon.findAll({
//         include: {
//             model: Type,
//             attributes: ['name'],
//             through: {
//                 attributes: []
//             }
//         }
//     })
// };


const getPokeDb= async () => {
    try {
        const pokemons = await Pokemon.findAll({
            include: {
                model: Type,
                through: {
                attributes: [],
                },
            },
            attributes: ["id","name","hp","attack","defense","speed","height","weight","image","created"],
        });
        return pokemons.map((e) => ({
            id: e.id,
            name: e.name,
            hp: e.hp,
            attack: e.attack,
            defense: e.defense,
            speed: e.speed,
            height: e.height,
            weight: e.weight,
            image: e.image,
            created: e.created,
            types: e.types.map((e) => e.name)
        }));
    } catch (e) {
        console.log(e);
    }
};


const getAllPoke = async () => {
    const apitotalInfo = await getPokeApi();
    const dbtotalInfo = await getPokeDb();
    const totalInfo = apitotalInfo.concat(dbtotalInfo);
    return totalInfo;
};

const getPokeByIdApi = async (id) => {
    const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeData = {
        id: apiUrl.data.id,
        name: apiUrl.data.name,
        hp: apiUrl.data.stats[0]["base_stat"],
        attack: apiUrl.data.stats[1]["base_stat"],
        defense: apiUrl.data.stats[2]["base_stat"],
        speed: apiUrl.data.stats[5]["base_stat"],
        height: apiUrl.data.height,
        weight: apiUrl.data.weight,
        image: apiUrl.data.sprites.other.home.front_default,
        types: apiUrl.data.types.map(e => e.type.name)
    };
    return pokeData;
};

//------------------------------------------------------------

router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query;
        if(!name) {
            return res.status(200).send(await getAllPoke())
        }else {
            const allPokemons = await getAllPoke()
            const pokeName = await allPokemons.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            if(pokeName) return res.status(200).json(pokeName)
        }
    }catch(err) {
        next(err);
    }
});


router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        if(isNaN(id)){
            const player = await Pokemon.findByPk(id);
            res.json(player);
        }else{
            res.json(await getPokeByIdApi(id));
        }
    }catch(err) {
        next(err)
    }
});


router.post('/', async (req, res, next) => {
    const { name, life, attack, defense, speed, height, weight, image, created, type } = req.body;
    try {
        const newPokemon = await Pokemon.create({
            name,
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            image,
            created
        });
        const typeDb = await Type.findAll({
            where: {
                name: type
            }
        });
        newPokemon.addType(typeDb)
        res.send('New Pokemon created');
    }catch(err) {
        next(err)
    }
});

module.exports = router
