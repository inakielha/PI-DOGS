import { useDispatch } from "react-redux"
import { useState } from "react/cjs/react.production.min"
import { getDbDogs } from "../../../store/actions"
import style from "./DbDogs.module.css"



export default function DbDogs() {

const dispatch = useDispatch()
    
function handleBtn(e){
dispatch (getDbDogs(e.target.value))
}


    return (
        <div className={style.FilterDiv}>
            Dogs Origin:
            <select onChange={handleBtn}>
                <option value="All"> All </option>
                <option value="dbDogs">User dogs</option>
                <option value="apiDogs">Dogs by default</option>
            </select>
        </div>
    )
}