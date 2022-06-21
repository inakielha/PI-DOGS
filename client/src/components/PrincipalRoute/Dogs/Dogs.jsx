import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../../store/actions";
import Dog from "../Dog/Dog";
import Paginado from "../Paginado/Paginado";
import { Link } from "react-router-dom";
import style from "./Dogs.module.css"
import InputBusqueda from "../InputBusqueda/InputBusqueda";
import TemperSearch from "../TemperSearch/TemperSearch";


export default function Dogs(props) {

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.filterDogs)
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    const [btn, setbtn] = useState(true)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
          });
    }
    function handleBtn(e) {
        e.preventDefault();
        setbtn(
            !btn
        )
    }

    useEffect(() => {
        dispatch(getDogs())
    }, [btn])
    console.log(currentDogs)

    return (
        <div>
            <InputBusqueda
                setCurrentPage={setCurrentPage}
                currentPage={currentPage} />
            <TemperSearch/>

            <div className={style.Doggys}>
                {typeof (currentDogs) === "object" && currentDogs.map((dog) => {
                    return (
                        <div>
                            <Dog key={dog.id} id={dog.id} temperament={dog.temperament} name={dog.name} img={dog.img} weight={dog.weight} />
                        </div>
                    )
                })}
                <div className={style.hh2}>
                    {currentDogs.length === 0 &&
                        <div className="">
                            <h2 className=""> Loading...</h2>
                        </div>
                    }
                </div>
                <div className={style.hh2}>
                    {currentDogs === "NoName" &&

                        <div>
                            <p className=""> We couldnt find your Dog </p>
                            <button type="submit" onClick={(e) => handleBtn(e)} className={style.Btn}> Go Back </button>
                        </div>
                    }
                </div>
                <div className={style.hh2}>
                    {currentDogs === "NoTemper" &&
                        <div>
                            <p className=""> We couldnt find a dog with this temper </p>
                            <button onClick={(e) => handleBtn(e)} className={style.Btn}> Go Back </button>
                        </div>
                    }
                </div>
                <div className={style.hh2}>
                    {currentDogs === "NoUserDo" &&
                        <div>
                            <p className="">We dont have dogs created by users </p>
                            <button onClick={(e) => handleBtn(e)} className={style.Btn}> Go Back </button>
                        </div>}
                </div>
                {(currentDogs === "NoUserDo" || currentDogs === "NoTemper" || currentDogs === "NoName" || currentDogs.length === 0) ? "" :
                    <div className={style.PrimaryDiv}>
                    <Paginado
                        dogsPerPage={dogsPerPage}
                        allDogs={allDogs.length}
                        paginado={paginado}
                        />
                </div>
                    }
            </div>
        </div>
    )
}