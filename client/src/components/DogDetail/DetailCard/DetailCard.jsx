import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { cleanByid, deleteDog, searchById } from "../../../store/actions"
import { useEffect } from "react"
import style from "./DetailCard.module.css"
import foto from "../../../Assets/fondo.jpg"
export let imgDefault = "data:image/jpeg;base64,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"

export default function DetailCard() {
    const dispatch = useDispatch()
    const params = useParams()
    const backToHome = useNavigate();

    useEffect(() => {
        dispatch(searchById(params.id))
        // return dispatch(cleanByid())
    }, [dispatch])
    
    const allDogs = useSelector((state) => state.dogById)
    console.log(allDogs.img)
    function handleDelete(e) {
        dispatch(deleteDog(e.target.name))
        backToHome("/home");
    }
    return (
        <div className={style.InfoDiv}>
            {
                allDogs.id == params.id ?
                    <div className={style.center}>
                        <div className={style.powBobi}>
                            <h1 className={style.rowDiv}> {allDogs.name}</h1>
                            <img className={style.DogImg} src={allDogs.img ? allDogs.img : imgDefault } alt="imagen" />
                            <h4>{allDogs.height} Cm </h4>
                            <h4>{allDogs.weight} kG </h4>
                            <h4>{allDogs.temperament ? allDogs.temperament : "Temper unknown"}</h4>
                            <h4>{allDogs.lifeSpan}</h4>
                            {(typeof (allDogs.id) === "string") && <button name={allDogs.name} onClick={(e)=>handleDelete(e)} className={style.boton}> Delete Dog</button>}
                        </div>
                    </div>
                    : <h2>Loading...</h2>
            }
            <Link className={style.links} to="/home">
                <button className={style.Btns}>Go Back</button>
            </Link>

        </div>
    )



}