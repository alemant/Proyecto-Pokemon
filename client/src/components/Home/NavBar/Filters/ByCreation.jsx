import React from 'react';
import { useDispatch } from 'react-redux';
import { filterCreated } from '../../../../actions';
import './ByCreation.css';

export default function ByCreation(){
    const dispatch = useDispatch();
    
    function handleChange(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
    }
    return(
        <div className="div-filters">
            <select className="select" onChange={e => handleChange(e)}>
                <option value="all">All</option>
                <option value="api">API</option>
                <option value="created">BD</option>
            </select>
        </div>
    )
}