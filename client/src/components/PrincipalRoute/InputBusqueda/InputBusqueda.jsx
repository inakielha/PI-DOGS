import { useState } from "react";
import { searchDog } from "../../../store/actions";
import { useDispatch } from "react-redux";


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
        <div>
            <form className="form" onSubmit={sendData}>

            <input 
            type="text" 
            placeholder="Dog Breed "
            className="typeControl"
            onChange={handleInputChange}
            value= {datos}
            />
            <button className="button" type="submit">Find Doggy</button>
            </form>
        </div>
    );
}