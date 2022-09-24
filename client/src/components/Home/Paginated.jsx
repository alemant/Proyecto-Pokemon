import React from "react";
import "./Paginated.css";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado, currentPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className="pagination">
            {pageNumbers &&
            pageNumbers.map((number) => (
                // <div className="page" key={number}>
                    <button className={currentPage === number ? "pagin" : ""} onClick={() => paginado(number)}>{number}</button>
                // </div>
            ))}
        </nav>
    );
}