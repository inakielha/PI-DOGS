import React from "react"
import { Link } from "react-router-dom"
import style from "./Navbar.module.css" 

export default function Navbar(){
    return (
        <nav className={style.p}>
            <div>
                <h2 className={style.h2} >Welcome to our Doggy family! </h2>
            </div>
            <div className={style.about}>
                <Link className={style.j} to= '/home'>Home</Link>
                <Link className={style.j} to= '/createDog'> Create </Link>
                <Link className={style.j} to= "/about">About </Link>
            </div>
        </nav>
    )
}