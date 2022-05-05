import { useDispatch } from "react-redux";
import { ASCENDENTE, DESCENDENTE } from "../../../constantes/sort";
import { sortWeight } from "../../../store/actions";

export default function WeightOrder(){
    const dispatch = useDispatch()
    function onSelectChange(e){
    dispatch(sortWeight(e.target.value))
    }
    return (
        <select name = "select" onChange={onSelectChange} >
            <option value={ASCENDENTE}>{ASCENDENTE}</option>
            <option value= {DESCENDENTE}>{DESCENDENTE}</option>
        </select>
    )
}