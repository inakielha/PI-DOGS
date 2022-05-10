import React from "react"
import style from "./Paginado.module.css"

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
    const pageNumbers = []

    for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage) - 1; i++) {
        pageNumbers.push(i + 1)
    }
    return (
        <div className={style.lista}>
            <ul className="">
                {pageNumbers && pageNumbers.map(number => (
                    <li className="" key={number}>
                        <a className="" onClick={() => paginado(number)}> -{number}- </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}