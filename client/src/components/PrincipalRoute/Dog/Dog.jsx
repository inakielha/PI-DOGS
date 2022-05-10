import style from "./Dog.module.css"
import { Link } from "react-router-dom"

export default function Dog({name,img,weight,temperament,id}){
    return(
        <div className= {style.Dog}>
        <h3>{name}</h3>
        <img className={style.DogImg} src={img} alt="imagen" />
        <h4>{weight} kG </h4>
        <h4>{temperament}</h4>
        <Link to={"/home/" + id}>
        <button className={style.Btn}> Detail</button>
        </Link>
        </div>
    )
}