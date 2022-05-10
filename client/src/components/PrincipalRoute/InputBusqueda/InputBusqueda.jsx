import { useState } from "react";
import { searchDog } from "../../../store/actions";
import { useDispatch } from "react-redux";
import style from "./InputBusqueda.module.css"

export default function InputBusqueda(){

    const[datos,setDatos] = useState("")

    const handleInputChange= (event)=>{
        setDatos(event.target.value)
    }
    let dispatch = useDispatch()
    const sendData = (event) =>{
        event.preventDefault();
        dispatch(searchDog(datos))
    }
    return (
        <div className="">
            <form className="form" onSubmit={sendData}>

            <input 
            type="text" 
            placeholder="Dog Breed "
            className= {style.Input}
            onChange={handleInputChange}
            value= {datos}
            />
            <button className={style.Btn} type="submit">Find Doggy</button>
            </form>
        </div>
    );
}