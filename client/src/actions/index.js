import axios from "axios";


export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get("/pokemons");
    //console.log(json)
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}


export function getPokeByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/pokemons?name=${name}`);
      return dispatch({
        type: "GET_POKE_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      alert('Pokemon not found')
      console.log(error);
    }
  };
}


export function getTypes(){
  return async function(dispatch){
    try {
      let allTypes = await axios.get('/types');
      return dispatch({
        type: 'GET_TYPES',
        payload: allTypes.data
      }); 
    }catch(err){
      console.log(err)
    };
  }
}


export function filterPokemonsByTypes(payload) {
  return {
    type: "FILTER_POKEMONS_BY_TYPES",
    payload,
  };
}

export function filterCreated(payload) {
  try{
    return {
      type: "FILTER_CREATED",
      payload,
    };
  }
  catch(e){
    alert("No Pokemon created");
  }
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}


export function postPokemon(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "/pokemons",
      payload
    );
    return response;
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/pokemons/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderByAttack(payload) {
  return {
    type: "ORDER_BY_ATTACK",
    payload,
  };
}