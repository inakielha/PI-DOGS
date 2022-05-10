import { searchTemper } from "../../../store/actions"
import { useState } from "react"
import { useDispatch } from "react-redux"
import style from "./TemperSearch.module.css"


export default function TemperSearch(){

    const[datos,setDatos] = useState("")

    const handleInputChange= (event)=>{
        setDatos(event.target.value)
    }
    let dispatch = useDispatch()
    const sendData = (event) =>{
        event.preventDefault();
        dispatch(searchTemper(datos))
    }
    return (
        <div className= "">
            <form className="form" onSubmit={sendData}>

            <input
            className={style.Input}
            type="text" 
            placeholder="Dog Temper "
            onChange={handleInputChange}
            value= {datos}
            />
            <button className={style.Btn} type="submit">Search</button>
            </form>
        </div>
    );
}