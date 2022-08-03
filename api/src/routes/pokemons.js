const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const router = Router();
const axios = require('axios');

// --------------------Funciones------------------------------

const url = 'https://pokeapi.co/api/v2/pokemon';

const getPokeApi = async () => {
    // const pokeRequest1 = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=17');
    // const allRequest = pokeRequest1.data.results
    const pokeRequest1 = await axios.get(url);
    const pokeRequest2 = await axios.get(pokeRequest1.data.next);
    const pokeRequest3 = await axios.get(pokeRequest2.data.next);
    const pokeRequest4 = await axios.get(pokeRequest3.data.next);
    const pokeRequest5 = await axios.get(pokeRequest4.data.next);
    const pokeRequest6 = await axios.get(pokeRequest5.data.next);
    const pokeRequest7 = await axios.get(pokeRequest6.data.next);
    const pokeRequest8 = await axios.get(pokeRequest7.data.next);
    const pokeRequest9 = await axios.get(pokeRequest8.data.next);
    const pokeRequest10 = await axios.get(pokeRequest9.data.next);
    const pokeRequest11 = await axios.get(pokeRequest10.data.next);
    const pokeRequest12 = await axios.get(pokeRequest11.data.next);
    const allRequest = pokeRequest1.data.results
        .concat(pokeRequest2.data.results)
        .concat(pokeRequest3.data.results)
        .concat(pokeRequest4.data.results)
        .concat(pokeRequest5.data.results)
        .concat(pokeRequest6.data.results)
        .concat(pokeRequest7.data.results)
        .concat(pokeRequest8.data.results)
        .concat(pokeRequest9.data.results)
        .concat(pokeRequest10.data.results)
        .concat(pokeRequest11.data.results)
        .concat(pokeRequest12.data.results);
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

const getApiName = async (name) => {
    try {
        const namesApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const results = namesApi.data;
        const pokemonInfo = {
            id: results.id,
            name: results.name,
            types: results.types.map((t) => t.type.name),
            image: results.sprites.other.home.front_default,
        };
        return pokemonInfo;
    } catch (e){ 
        console.log(e)
        // return null;
    }
};

//------------------------------------------------------------

// router.get('/', async (req, res, next) => {
//     try {
//         const { name } = req.query;
//         if(!name) {
//             return res.status(200).send(await getAllPoke())
//         }else {
//             const allPokemons = await getAllPoke()
//             const pokeName = await allPokemons.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
//             if(pokeName) return res.status(200).json(pokeName)
//         }
//     }catch(err) {
//         next(err);
//     }
// });

router.get("/", async (req, res) => {
    const name = req.query.name;
    if (name) {
        const pokemonName = await getApiName(name.toLowerCase());
        if (pokemonName) {
            return res.status(200).send([pokemonName]);
        } else {
            const pokemonsDb = await getPokeDb();
            const pokemon = pokemonsDb.filter(e => e.name.toLowerCase() === name.toLowerCase());
            return pokemon.length
            ? pokemon
            : res.status(404).send("Pokemon not found");
        }
    } else {
        const pokemonsTotal = await getAllPoke();
        return res.status(200).send(pokemonsTotal);
    }
});

// router.get('/', async (req, res, next) => {
//     const {name} = req.query;
//     const allPokesName = await getAllPoke();
//     try {
//         if (name) {
//             const pokeName = await getApiName(name);
//             if(pokeName){
//                 return pokeName;
//             }else{
//             let poke = allPokesName.filter(e => e.name.toLowerCase() === name.toLowerCase());
//             poke.length ? res.status(200).send(poke) : res.status(404).send('Pokemon not found');} 
//         } else {
//             let pokemons = await getAllPokemon();
//             return res.status(200).send(pokemons);
//         }
//     } catch (err) {
//         next(err);
//     }
// });


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
