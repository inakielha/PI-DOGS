import AlphabeticalOrder from "./AlphabeticalOrder/AlphabeticalOrder";
import Dogs from "./Dogs/Dogs";
import InputBusqueda from "./InputBusqueda/InputBusqueda";
import Paginado from "./Paginado/Paginado";
import TemperSearch from "./TemperSearch/TemperSearch";
import WeightOrder from "./WeightOrder/WeightOrder";
import { Link } from "react-router-dom";
import style from "./PrincipalRoute.module.css"

 export default function PrincipalRoute(){
     return (
         <div>
             <h1 className="title">Welcome to our Doggy family!</h1>
             <InputBusqueda />
             <TemperSearch /> 
             <AlphabeticalOrder /> 
             <WeightOrder />
             <Link to="/createDog"><button className={style.Btn}>Create New Doggy</button></Link>
             <Paginado/>
             <Dogs/>
         </div>
     )
 }