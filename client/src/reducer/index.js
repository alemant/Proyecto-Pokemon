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
            let sortedArr =
                action.payload === "asc"
                ? state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                    })
                    : state.pokemons.sort(function (a, b) {
                        if (a.name < b.name) {
                            return 1;
                        }
                        if (a.name > b.name) {
                            return -1;
                        }
                        return 0;
                    });
                    return {
                        ...state,
                        pokemons: sortedArr,
                    };

        case "GET_DETAILS":
            return {
                ...state,
                details: action.payload,
            };
        case "ORDER_BY_ATTACK":
            let sortedArr2 =
                action.payload === "desc"
                ? state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return 1;
                    }
                    if (a.attack < b.attack) {
                        return -1;
                    }
                    return 0;
                })
                : state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return -1;
                    }
                    if (a.attack < b.attack) {
                        return 1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    pokemons: sortedArr2,
                };

        default:
            return state;
    }
}

export default rootReducer;