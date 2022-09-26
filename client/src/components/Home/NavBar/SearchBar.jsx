import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SearchBar.css';
import { getPokeByName } from '../../../actions/index.js';


export default function SearchBar(){
    const [pokemon, setPokemon] = useState('');
    const dispatch = useDispatch();
    

    function handleInputChange(e) {
        e.preventDefault();
        setPokemon(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getPokeByName(pokemon));
        setPokemon('')
    };

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    return (
        <div>
            <h1 className="title">Pokemon App</h1>
            <input
                type="text"
                placeholder="Pokemon search..."
                value={pokemon}
                onChange={(e) => handleInputChange(e)}
                onKeyPress={e => handleKeyPress(e)}>
            </input>
            <button
                className="buttonSearchBar"
                type="submit"
                onClick={(e) => handleSubmit(e)}
            >Search</button>
        </div>
    )
}