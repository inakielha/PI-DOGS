import React from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { searchById} from "../../../store/actions"
import { useEffect } from "react"

export default function DetailCard(){
const dispatch = useDispatch()
const params = useParams()
useEffect(()=>{
    dispatch(searchById(params.id))
},[dispatch])
console.log(params.id)
const allDogs = useSelector ((state)=>state.dogById)
console.log(allDogs)
return (
    <div>
        {
        typeof(allDogs)==="object" ? 
        <div>
            <h1> {allDogs.name}</h1>
            <img src={allDogs.img} alt="imagen" />
            <h4>{allDogs.height} Cm </h4>
            <h4>{allDogs.weight} kG </h4>
            <h4>{allDogs.temperament}</h4>
            <h4>{allDogs.lifeSpan}</h4>
            </div> : <p>Loading...</p>
    }
    <Link to= "/home">
        <button>Go Back</button>
    </Link>

    </div>
)



}