import { useDispatch } from "react-redux";
import { ASCENDENTE, DESCENDENTE } from "../../../constantes/sort";
import { sortWeight } from "../../../store/actions";
import style from "./WeightOrder.module.css"

export default function WeightOrder(){
    const dispatch = useDispatch()
    function onSelectChange(e){
    dispatch(sortWeight(e.target.value))
    }
    return (
        <div className={style.FilterDiv}> 
            Sort by weight:
        <select className={style.OrderDivSelect} name = "select" onChange={onSelectChange} >
            <option>Select</option>
            <option value={ASCENDENTE}>Light</option>
            <option value= {DESCENDENTE}>Heavy</option>
        </select>
        </div>
    )
}