import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useNavigate, } from "react-router-dom"
import validate from "../../constantes/validate"
import { getTemperaments, postDog } from "../../store/actions"


export default function CreateDog() {
    const dispatch = useDispatch()
    const allTemperaments = useSelector((state) => state.getAllTemperaments)

    const backToHome = useNavigate()

    const [errors, setErrors] = useState({
        name: "",
        height: "",
        weight: "",
        lifeSpan: "",
        temperament: []
    });

    const [disabled, setDisabled] = useState(false)

    const [input, setInput] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeSpan: "",
        temperament: []
    })
    /*const [minMax, SetminMax] = useState({
        weightMin: "",
        weightMax: "",
        heightMin: "",
        heightMax: "",
    })
    console.log(minMax)*/

    function handleInput(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        //setErrors(validate(state))
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }
    /*function handleMinMax(e) {
        SetminMax({
            ...minMax,
            [e.target.name]: e.target.value
        })
    }*/

    function handleSubmit(e) {
        e.preventDefault();
        /*setInput({
            ...input,
            weight: minMax.weightMin + "-" + minMax.weightMax,
        })*/

        console.log(input)
        dispatch(postDog(input))
        alert("There is a new Doggy in town!")
        setInput({
            name: "",
            height: "",
            weight: "",
            lifeSpan: "",
            img: "",
            temperament: []
        })
        backToHome("/home");
    }


    useEffect(() => {
        dispatch(getTemperaments())
        /*if(input.name && input.height && input.weight && !errors){
            setDisabled(false)
        }else{
            setDisabled(true)
        }*/
    }, []);



    return (
        <div>
            <Link to="/home"><button>Go Back</button></Link>
            <h1>Create new Doggy</h1>
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
                    <input
                        type="text"
                        name="heightMax"
                        value={input.heightMax}
                        onChange={(e) => handleInput(e)}
                        placeholder={"Max"} />
                </div>
                <div>
                    <label>Weight (Kg):</label>
                    <input
                        type="text"
                        name="weightMin"
                        value={input.weightMin}
                        onChange={(e) => handleInput(e)}
                        placeholder={"Min"} />
                    <input
                        type="text"
                        name="weightMax"
                        value={input.weightMax}
                        onChange={(e) => handleInput(e)}
                        placeholder={"Max"} />

                </div>
                <div>
                    <label>Life Span:</label>
                    <input type="text"
                        value={input.lifeSpan}
                        name="lifeSpan"
                        onChange={(e) => handleInput(e)} />

                </div>
                <div>
                    <label>Image Direction:</label>
                    <input type="text"
                        value={input.img}
                        name="img"
                        onChange={(e) => handleInput(e)} />

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

                <button type="submit" disabled={disabled}>Create Dog </button>
            </form>
        </div>
    )






}