import { useDispatch } from "react-redux"
import { ASCENDENTE, DESCENDENTE } from "../../../constantes/sort"
import { sort } from "../../../store/actions"
import style from "./AlphabeticalOrder.module.css"

export default function AlphabeticalOrder (){
    const dispatch = useDispatch()
    function onSelectChange(e) {
        dispatch(sort(e.target.value))  
    }
return(
    <div className = {style.FilterDiv}>
        Alphabetical order:
    <select name="select" onChange={onSelectChange}>
        <option value={ASCENDENTE}> A-Z</option>
        <option value={DESCENDENTE}>Z-A</option>
    </select>
    </div>
)
}