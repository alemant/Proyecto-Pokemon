import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByName } from '../../../../actions';
import './AlphabeticOrder.css';

export default function AlphabeticOrder(){
    const dispatch = useDispatch();

    function handleOnChange(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
    };
    return (
        <div className="div-filters">
            <select className="select" onChange={e => handleOnChange(e)}>
                {/* <option value="defect">Defect</option> */}
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>
        </div>
    )
}