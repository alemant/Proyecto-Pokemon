import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterPokemonsByTypes } from '../../../../actions';


export default function ByType(){
    const allTypes = useSelector (state => state.types)
    console.log(allTypes)

    const dispatch = useDispatch();

    function handleOnChange(e) {
        e.preventDefault()
        dispatch(filterPokemonsByTypes(e.target.value))
    }

    return (
        <div>
            <select onChange={e => handleOnChange(e)}>
                <option value="All">All</option>
                {allTypes && allTypes.map(t => <option value={t.name}>{t.name}</option>)}
            </select>
        </div>
    )
}