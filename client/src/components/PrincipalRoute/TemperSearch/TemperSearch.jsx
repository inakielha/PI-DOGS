import { searchTemper } from "../../../store/actions"
import { useState } from "react"
import { useDispatch } from "react-redux"


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
        <div>
            <form className="form" onSubmit={sendData}>

            <input 
            type="text" 
            placeholder="Dog Temper "
            className="typeControl"
            onChange={handleInputChange}
            value= {datos}
            />
            <button className="button" type="submit">Search</button>
            </form>
        </div>
    );
}