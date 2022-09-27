import React from 'react';
import pica from '../../images/loading.gif'
import './Load.css'

export default function Load() {
    return (
        <div className="pica">
            <img className="img-pica" src={pica} alt="Pikachu durmiendo" />
        </div>
    )
}
