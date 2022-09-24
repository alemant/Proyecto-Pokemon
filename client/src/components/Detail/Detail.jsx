import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetails } from '../../actions';
import './Detail.css';



export default function Detail(){
    const { id } = useParams();
    const pokemon = useSelector(state => state.details);  // details viene del reducer
    const dispatch = useDispatch();
    //console.log(pokemon);
    const [, setState] = useState('');

    useEffect(() => {
        dispatch(getDetails(id))
        return setState('')
    },[dispatch, id])


    return (
        <div className='detail'>
            <div>
                <h3>
                    <a className="goBack" href="/home">Go back to Home</a>
                </h3>
            </div>
            <div className="image">
                <img src={pokemon.image} alt="No se encontró la imagen"/>
            </div>
            <div id='card'>
                <h1 className="Title">
                    Hi, my name is {pokemon.name?.replace(pokemon.name[0], pokemon.name[0].toUpperCase())}
                </h1>
                <h4>
                    My types: {pokemon.types?.map(t => {
                        return (
                            <span key={t}>
                                <span className="type">
                                    {t.replace(t[0], t[0].toUpperCase())}
                                </span>
                            </span>
                        );
                    })}
                </h4>
                <h4>
                    My life is: {pokemon.hp}
                </h4>
                <h4>
                    My strength is: {pokemon.attack}
                </h4>
                <h4>
                    My defense is: {pokemon.defense}
                </h4>
                <h4>
                    My speed is: {pokemon.speed}
                </h4>
                <h4>
                    My height is: {(pokemon.height / 10)} metros
                </h4>
                <h4>
                    My weight is: {(pokemon.weight / 10)} kilogramos
                </h4>
            </div>
        </div>
    )
};

