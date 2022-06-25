import React, { useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, } from "react-router-dom"
import validate from "../../constantes/validate"
import { cleanResponse, getTemperaments, postDog } from "../../store/actions"
import { Contenedor, h1, h1Class, form, block, label, ul, error, inputw, boke, optionn, errorMsg, errorDiv } from "./CreateDog.module.css"
import axios from "axios"
import Navbar from "../PrincipalRoute/Navbar/Navbar"

export default function CreateDog() {
    const dispatch = useDispatch()
    const dogRes = useSelector((state)=> state.dogCreated)
    const allTemperaments = useSelector((state) => state.getAllTemperaments)
    console.log(dogRes)
    const backToHome = useNavigate()

    const [errors, setErrors] = useState("");

    const [disabled, setDisabled] = useState(true)


    const [input, setInput] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeSpanFrom: "",
        lifeSpanTo: "",
        img: "",
        temperament: []
    })
    
    function handleDeleteBtn(e) {
        let res = input.temperament.filter(temp => temp !== e.target.name)
        setInput({
            ...input,
            temperament: res
        })
    }
    

    function handleInput(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }
        ))
    }
    
    function handleSelect(e) {
        if (input.temperament.indexOf(e.target.value) === -1) {
            
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
        }
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        if (!errors.name && !errors.weightMin && !errors.weightMax && !errors.heightMin && !errors.heightMax && !errors.lifeSpanFrom && !errors.lifeSpanTo && !errors.img) {
            
            dispatch(postDog(input))
            setInput({
                name: "",
                heightMin: "",
                heightMax: "",
                weightMin: "",
                weightMax: "",
                lifeSpanFrom: "",
                lifeSpanTo: "",
                img: "",
                temperament: []
            })
        } else {
            alert("Missing or wrong information, check it please")
        }
    }
    if(dogRes.ok){
        backToHome("/home");
        // alert("There is a new doggy in town")
    }
    
    
    useEffect(() => {
        dispatch(cleanResponse())
        if (input.name && input.weightMin && input.weightMax && input.heightMin && input.heightMax && !errors.name && !errors.weightMin && !errors.weightMax && !errors.heightMin && !errors.heightMax && !errors.lifeSpanFrom && !errors.lifeSpanTo && !errors.img) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [input, errors]);
    
    useEffect(()=>{
        dispatch(cleanResponse())
        dispatch(getTemperaments())
    },[])



    return (
        <div>

            {/* <Link to="/home"><button className={Btn}>Go Back</button></Link> */}
            <Navbar/>
            <div className={Contenedor}>
                <div className={h1}>
                    <h1 className={h1Class}>Create new Doggy</h1>
                </div>
                <form className={form} onSubmit={(e) => handleSubmit(e)}>
                    <div className={block}>
                        <label className={label}> Name:</label>
                        <input
                            className={inputw}
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={(e) => handleInput(e)} />
                        {errors.name && (
                            <p className={error}>{errors.name}</p>
                        )}
                    </div>
                    <div className={boke}>
                        <label className={label}>Height Min:</label>
                        <input
                            className={inputw}
                            type="text"
                            name="heightMin"
                            value={input.heightMin}
                            onChange={(e) => handleInput(e)}
                            placeholder="Min Cm" />
                        {errors.heightMin && (
                            <p className={error}>{errors.heightMin}</p>
                        )}
                    </div>
                    <div className={boke}>
                        <label className={label}> Height Max</label>
                        <input
                            className={inputw}
                            type="text"
                            name="heightMax"
                            value={input.heightMax}
                            onChange={(e) => handleInput(e)}
                            placeholder="Max Cm" />
                        {errors.heightMax && (
                            <p className={error}>{errors.heightMax}</p>
                        )}
                    </div>
                    <div className={boke}>
                        <label className={label}>Weight:</label>
                        <input
                            className={inputw}
                            type="text"
                            name="weightMin"
                            value={input.weightMin}
                            onChange={(e) => handleInput(e)}
                            placeholder={"Kg Min"} />
                        {errors.weightMin && (
                            <p className={error}>{errors.weightMin}</p>
                        )}

                    </div>
                    <div className={boke}>
                        <label className={label} > Weight Max: </label>
                        <input
                            className={inputw}
                            type="text"
                            name="weightMax"
                            value={input.weightMax}
                            onChange={(e) => handleInput(e)}
                            placeholder={"Kg Max"} />
                        {errors.weightMax && (
                            <p className={error}>{errors.weightMax}</p>
                        )}
                    </div>
                    <div className={boke}>
                        <label className={label}>Life Span From:</label>
                        <input type="text"
                            className={inputw}
                            value={input.lifeSpanFrom}
                            name="lifeSpanFrom"
                            placeholder="from"
                            onChange={(e) => handleInput(e)} />
                        {errors.lifeSpanFrom && (
                            <p className={error}>{errors.lifeSpanFrom}</p>
                        )}

                    </div>
                    <div className={boke}>
                        <label className={label} >Life Span To</label>
                        <input type="text"
                            className={inputw}
                            value={input.lifeSpanTo}
                            name="lifeSpanTo"
                            placeholder="to"
                            onChange={(e) => handleInput(e)} />
                        {errors.lifeSpanTo && (
                            <p className={error}>{errors.lifeSpanTo}</p>
                        )}
                    </div>
                    <div className={boke}>
                        <label className={label}>Image Direction:</label>
                        <input
                            placeholder="URL"
                            className={inputw}
                            type="text"
                            value={input.img}
                            name="img"
                            onChange={(e) => handleInput(e)} />
                        {errors.img && (
                            <p className={error}>{errors.img}</p>
                        )}

                    </div>
                    <div className={boke}>
                        <p className={label}>
                            Temperaments:
                        </p>
                        <select className={inputw} onChange={(e) => handleSelect(e)}>
                            {allTemperaments.map((temp) => (
                                <option className={optionn} key={temp.id} value={temp.name}>{temp.name}</option>
                            ))}
                        </select>
                        <ul>
                            <li className={ul}>{input.temperament.map(temp => <li> {temp}
                                <button type="button" name={temp} onClick={(e) => handleDeleteBtn(e)}>X</button>
                            </li>)}
                            </li>
                        </ul>
                    </div>
                    {!dogRes.ok && dogRes.msg && <div className={errorDiv}><p className={errorMsg}>{dogRes.msg}</p></div>}

                    <button type="submit" className={block} disabled={disabled}>Create Dog </button>
                </form>
            </div>
        </div>
    )






}