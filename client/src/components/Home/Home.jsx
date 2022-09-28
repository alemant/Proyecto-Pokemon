import React, { useState, useEffect } from 'react';
import SearchBar from '../Home/NavBar/SearchBar';
import Cards from './Cards/Cards';
import AlphabeticOrder from './NavBar/Filters/AlphabeticOrder';
import ByCreation from './NavBar/Filters/ByCreation';
import ByForce from './NavBar/Filters/ByForce';
import ByType from './NavBar/Filters/ByType';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, getPokemons } from '../../actions/index.js';
import { Link } from 'react-router-dom';
import './Home.css';
import Paginated from './Paginated';
import Load from '../Loading/Load.jsx';
import poke from '../../images/pokemon.mp3';

export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector (state => state.pokemons); // Esto es lo kismo que hacer el mapStateToProps

    //---------P/Paginado---------
    const [currentPage, setCurrentPage] = useState(1);  // Creamos un estado en el cual el estado de mi pagina actual es 1
    const [pokemonsPerPage] = useState(16);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    
    if (currentPage > Math.ceil(allPokemons.length / pokemonsPerPage) && currentPage !== 1) {
        setCurrentPage(1);
    }

    //Para el paginado
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    //-----------------------------

    useEffect(() => {
        dispatch(getPokemons())  // Esto es lo mismo que hacer el mapDispatchToProps
        dispatch(getTypes())
    }, [dispatch]);
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    return(
        <div className="home">
            <audio controls autoplay="true">
                <source src={poke} type="audio/mpeg">
                </source>
            </audio>
            <div className="search">
                <SearchBar />
            </div>
            {/* <button className="created"> */}
                <Link className="link" to="/pokemon">Pokemon Factory</Link>
            {/* </button> */}
            <div className="reload">
                <button className= "button" onClick={e => handleClick(e)}>Reload Pokemons</button>
            </div>
            <div className="pages">
                <Paginated
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons}
                    paginado={paginado}
                    currentPage={currentPage}
                />
            </div>
            <div className="filters">
                <ByType/>
                <ByForce/>
                <ByCreation/>
                <AlphabeticOrder/>
            </div>
            <div>
                {allPokemons.length === 0 ? <Load /> : <Cards allPokemons= {currentPokemons}/>}
            </div>
        </div>
    )
}