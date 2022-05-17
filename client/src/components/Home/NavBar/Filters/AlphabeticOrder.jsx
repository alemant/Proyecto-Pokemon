import React from 'react';
import './AlphabeticOrder.css';

export default function AlphabeticOrder(){
    return (
        <div>
            <select>
                <option value="desc">A-Z</option>
                <option value="asc">Z-A</option>
            </select>
        </div>
    )
}