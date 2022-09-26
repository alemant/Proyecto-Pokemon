import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterPokemonsByTypes } from '../../../../actions';
import './ByType.css';


export default function ByType(){
    // const allTypes = useSelector (state => state.types);
    const pokemons = useSelector(state => state.allPokemons);
    let array = [];
    const dispatch = useDispatch();

    function handleOnChange(e) {
        e.preventDefault()
        dispatch(filterPokemonsByTypes(e.target.value))
    }
    
    //eslint-disable-next-line 
    const filterTypes = pokemons.map(p => p.types.forEach(e => {
        if(!array.includes(e)){
            if(!e.name){
                array.push({name: e})
            }else {
                array.push(e)
            }
        }
    }))
    
    array = array.filter((value, index, self) => index === self.findIndex(t => t.name === value.name));

    return (
        <div className="div-filters">
            <select className='select' onChange={e => handleOnChange(e)}>
                <option value="All">All</option>
                {array && array.map(t => <option value={t.name} key={t.name}>{t.name}</option>)}
            </select>
        </div>
    )
}