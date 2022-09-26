const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    details: {},
    filters: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
            };
        case "GET_POKE_BY_NAME":
            return {
                ...state,
                pokemons: action.payload,
            };
        case "GET_TYPES":
            return {
                ...state,
                types: action.payload,
            };
        case "POST_POKEMON":
            return {
                ...state,
            };
        case "FILTER_POKEMONS_BY_TYPES":
            const allPokemons = state.allPokemons;
            const typesFiltered =
                action.payload === "All"
                ? allPokemons
                : allPokemons.filter((el) => el.types.includes(action.payload));
                return {
                    ...state,
                    pokemons: typesFiltered,
                    filters: typesFiltered,
                };
        case "FILTER_CREATED":
            let filter;
            if(state.filters.length === 0){
                let allPokes = [...state.allPokemons];
                filter = action.payload === "api" ? allPokes.filter(e => !e.created) : [...state.allPokemons].filter(e => e.created)
                return{
                    ...state,
                    pokemons: action.payload === "all" ? allPokes : filter
                }
            } else{
                let allPokes = [...state.filters];
                filter = action.payload === "api" ? allPokes.filter(e => !e.created) : allPokes.filter(e => e.created)
                return {
                    ...state,
                    pokemons: action.payload === "all" ? allPokes : filter,
                }
            }
        case "ORDER_BY_NAME":
            let allPokes = [...state.pokemons];
            allPokes = allPokes.sort((a, b) =>{
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return action.payload === "asc" ? -1 : 1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return action.payload === "desc" ? -1 : 1;
                }
                return 0;
            })
            return {
                ...state,
                pokemons:  allPokes,
            }
        case "GET_DETAILS":
            return {
                ...state,
                details: action.payload,
            };
        case "ORDER_BY_ATTACK":
            let allPoks = [...state.pokemons];
            allPoks = allPoks.sort((a, b) => {
                if (a.attack < b.attack) {
                    return action.payload === "weak" ? -1 : 1;
                }
                if (a.attack > b.attack) {
                    return action.payload === "strong" ? -1 : 1;
                }
                return 0;
            });
            return {
                ...state,
                pokemons: allPoks,
            };
        default:
            return state;
    }
}

export default rootReducer;