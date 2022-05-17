import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'


export default function LandingPage(){
    return (
        <div className="container">
            <Link to='/home'>
                <button className="btn">ENTER</button>
            </Link>
        </div>
    )
}