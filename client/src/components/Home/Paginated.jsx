import React from "react";
import "./Paginated.css";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className="pagination">
            {pageNumbers &&
            pageNumbers.map((number) => (
                <div className="page" key={number}>
                    <button className="pagin" onClick={() => paginado(number)}>{number}</button>
                </div>
            ))}
        </nav>
    );
}