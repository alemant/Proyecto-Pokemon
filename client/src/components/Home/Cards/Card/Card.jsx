import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({image, name, types, id, attack}){
    // console.log(types)
    return(
        <div className='card'>
            <nav className='card-body'>
                <Link className="link-title" to={`pokemons/${id}`}>
                    <h1 className="card-title">{name.replace(name[0], name[0].toUpperCase())}</h1>
                </Link>
            </nav>
            <div>
                {types?.map(t => {
                    return (
                        <span key={t}>
                            <span className="type">
                                {t.replace(t[0], t[0].toUpperCase())}
                            </span>
                        </span>
                    );
                })}
            </div>
            <div>Strenght: 💪🏼{attack}</div>
            <div>
                <img className="img" src={image} alt="Imagen de un Pokemon" width="230px" height="230px" />
            </div>
        </div>
    )
};
