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
        <div className='cards'>
            <div>
                <h3>
                    <a className="name" href="/home">Go back to Home</a>
                </h3>
            </div>
            <div className="img">
                <img src={pokemon.image} alt="No se encontró la imagen"/>
            </div>
            <div className='card'>
                <h4 className="id">
                    ID N°: {pokemon.id}
                </h4>
                <h1 className="card-title">
                    Hi, my name is {pokemon.name}
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

