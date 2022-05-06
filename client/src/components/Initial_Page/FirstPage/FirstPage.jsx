
import img from "../../../dog.png"
import { Link } from "react-router-dom"

export default function FirstPage(){
    return <div>
        <img src={img} alt="DogImage"/>
        <Link to ="/home"><button> Get in</button> </Link>
    </div>
}