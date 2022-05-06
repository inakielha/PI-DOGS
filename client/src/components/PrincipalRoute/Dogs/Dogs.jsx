import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../../store/actions";
import Dog from "../Dog/Dog";
import Paginado from "../Paginado/Paginado";
import { Link } from "react-router-dom";

export default function Dogs(props) {
    /*let dogs = useSelector((state)=> state.filterDogs)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDogs())
    }, [])
    */
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.filterDogs)
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDogs())
    }, [])

    return (
        <div>
            <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
            />
            <div>
                {currentDogs.map((dog) => {
                    return (

                        <Link to={"/home/" + dog.id}>
                            <Dog key={dog.id} temperament={dog.temperament} name={dog.name} img={dog.img} weight={dog.weight} />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}