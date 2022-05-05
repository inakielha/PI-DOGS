import AlphabeticalOrder from "./AlphabeticalOrder/AlphabeticalOrder";
import Dogs from "./Dogs/Dogs";
import InputBusqueda from "./InputBusqueda/InputBusqueda";
import Paginado from "./Paginado/Paginado";
import TemperSearch from "./TemperSearch/TemperSearch";
import WeightOrder from "./WeightOrder/WeightOrder";

 export default function PrincipalRoute(){
     return (
         <div>
             <InputBusqueda />
             <TemperSearch /> 
             <AlphabeticalOrder /> 
             <WeightOrder />
             <Paginado/>
             <Dogs/>
         </div>
     )
 }