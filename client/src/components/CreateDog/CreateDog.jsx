import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, } from "react-router-dom"
import validate from "../../constantes/validate"
import { getTemperaments, postDog } from "../../store/actions"
import style from "./CreateDog.module.css"


export default function CreateDog() {
    const dispatch = useDispatch()
    const allTemperaments = useSelector((state) => state.getAllTemperaments)

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
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("soy input")
        console.log(input)
        console.log("soy error")
        console.log(errors)

        if (!errors.name && !errors.weightMin && !errors.weightMax && !errors.heightMin && !errors.heightMax && !errors.lifeSpanFrom && !errors.lifeSpanTo && !errors.img){

            dispatch(postDog(input))
            alert("There is a new Doggy in town!")
            setInput({
                name: "",
                heightMin: "",
                heightMax:"",
                weightMin: "",
                weightMax: "",
                lifeSpanFrom: "",
                lifeSpanTo: "",
                img: "",
                temperament: []
            })
            backToHome("/home");
        } else {
            alert("Missing or wrong information, check it please")
        }
        }
        

    useEffect(() => {
        dispatch(getTemperaments())
        if(input.name && input.weightMin && input.weightMax && input.heightMin && input.heightMax &&!errors.name && !errors.weightMin && !errors.weightMax && !errors.heightMin && !errors.heightMax && !errors.lifeSpanFrom && !errors.lifeSpanTo && !errors.img){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    }, [input,errors]);



    return (
        <div>
            <Link to="/home"><button>Go Back</button></Link>
            <h1 className="title">Create new Doggy</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label> Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={(e) => handleInput(e)} />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Height (Cm):</label>
                    <input
                        type="text"
                        name="heightMin"
                        value={input.heightMin}
                        onChange={(e) => handleInput(e)}
                        placeholder={"Min"} />
                        {errors.heightMin && (
                        <p className="error">{errors.heightMin}</p>
                    )}
                    <input
                        type="text"
                        name="heightMax"
                        value={input.heightMax}
                        onChange={(e) => handleInput(e)}
                        placeholder={"Max"} />
                        {errors.heightMax && (
                        <p className="error">{errors.heightMax}</p>
                    )}
                </div>
                <div>
                    <label>Weight (Kg):</label>
                    <input
                        type="text"
                        name="weightMin"
                        value={input.weightMin}
                        onChange={(e) => handleInput(e)}
                        placeholder={"Min"} />
                        {errors.weightMin && (
                        <p className="error">{errors.weightMin}</p>
                    )}
                    <input
                        type="text"
                        name="weightMax"
                        value={input.weightMax}
                        onChange={(e) => handleInput(e)}
                        placeholder={"Max"} />
                        {errors.weightMax && (
                        <p className="error">{errors.weightMax}</p>
                    )}

                </div>
                <div>
                    <label>Life Span:</label>
                    <input type="text"
                        value={input.lifeSpanFrom}
                        name="lifeSpanFrom"
                        placeholder="from"
                        onChange={(e) => handleInput(e)} />
                        {errors.lifeSpanFrom && (
                        <p className="error">{errors.lifeSpanFrom}</p>
                    )}

                    <input type="text"
                        value={input.lifeSpanTo}
                        name="lifeSpanTo"
                        placeholder="to"
                        onChange={(e) => handleInput(e)} />
                        {errors.lifeSpanTo && (
                        <p className="error">{errors.lifeSpanTo}</p>
                    )}

                </div>
                <div>
                    <label>Image Direction:</label>
                    <input type="text"
                        value={input.img}
                        name="img"
                        onChange={(e) => handleInput(e)} />
                        {errors.img && (
                        <p className="error">{errors.img}</p>
                    )}

                </div>
                <div>
                    Temperaments:
                    <select onChange={(e) => handleSelect(e)}>
                        {allTemperaments.map((temp) => (
                            <option key={temp.id} value={temp.name}>{temp.name}</option>
                        ))}
                    </select>
                    <ul><li>{input.temperament.map(temp => temp + ", ")}</li></ul>
                </div>

                <button type="submit" className={style.Btn} disabled={disabled}>Create Dog </button>
            </form>
        </div>
    )






}