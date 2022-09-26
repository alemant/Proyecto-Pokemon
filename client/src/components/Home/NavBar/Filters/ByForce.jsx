import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByAttack } from '../../../../actions';
import './ByForce.css';

export default function ByForce(){
    const dispatch = useDispatch();
    function handleChange(e){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
    }
    return(
        <div className="div-filters">
            <select className='select' onChange={e => handleChange(e)}>
                <option value="strong">Strong to Weak</option>
                <option value="weak">Weak to Strong</option>
            </select>
        </div>
    )
}