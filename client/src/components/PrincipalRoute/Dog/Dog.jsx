import style from "./Dog.module.css"
import { Link } from "react-router-dom"
import { imgDefault } from "../../DogDetail/DetailCard/DetailCard"

export default function Dog({name,img,weight,temperament,id}){
    return(
        <div className= {style.Dog}>
        <h3>{name}</h3>
        <img className={style.DogImg} src={img ? img : imgDefault} alt="imagen" />
        <h4>{weight} kG </h4>
        <h4>{temperament ? temperament : "Temper unknown"}</h4>
        <Link to={"/home/" + id}>
        <button className={style.Btn}> Detail</button>
        </Link>
        </div>
    )
}