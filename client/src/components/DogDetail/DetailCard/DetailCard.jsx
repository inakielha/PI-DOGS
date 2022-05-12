import React from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { cleanByid, searchById } from "../../../store/actions"
import { useEffect } from "react"
import style from "./DetailCard.module.css"

export default function DetailCard() {
    const dispatch = useDispatch()
    const params = useParams()
    useEffect(() => {
        dispatch(searchById(params.id))
        // return dispatch(cleanByid())
    }, [dispatch])

    const allDogs = useSelector((state) => state.dogById)
    console.log(allDogs)
    return (
        <div className={style.InfoDiv}>
            {
                allDogs.id == params.id ?
                    <div className={style.powBobi}>
                        <h1 className={style.rowDiv}> {allDogs.name}</h1>
                        <img className={style.DogImg} src={allDogs.img} alt="imagen" />
                        <h4>{allDogs.height} Cm </h4>
                        <h4>{allDogs.weight} kG </h4>
                        <h4>{allDogs.temperament}</h4>
                        <h4>{allDogs.lifeSpan}</h4>
                    </div>
                    : <h2>Loading...</h2>
            }
            <Link to="/home">
                <button className={style.Btns}>Go Back</button>
            </Link>

        </div>
    )



}