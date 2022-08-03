import React from 'react';
import Card from './Card/Card';
import './Cards.css';
import Load from '../../Loading/Load';


export default function Cards({allPokemons}){
    //console.log(allPokemons);
    return (
        <div className='cards'>
            {allPokemons?.map(pokemon => (
                !pokemon.image ? <Load /> :
                <Card
                    key={pokemon.id}
                    id={pokemon.id}
                    image={pokemon.image}
                    name={pokemon.name}
                    types={pokemon.types}
                />
            ))}
        </div>
    )
}