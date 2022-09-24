import React from 'react';
import './ByForce.css';

export default function ByForce(){
    return(
        <div>
            <select className='select'>
                <option value="strong">Strong to Weak</option>
                <option value="weak">Weak to Strong</option>
            </select>
        </div>
    )
}