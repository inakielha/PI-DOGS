import axios from "axios"
export const GET_DOGS = "GET_DOGS"
export const SEARCH_DOG = "SEARCH_DOG"
export const SEARCH_DOG_FAILER = "SEARCH_DOG_FAILER"
export const SORT = "SORT"
export const SORT_WEIGHT = "SORT_WEIGHT"
export const SEARCH_TEMPER = "SEARCH_TEMPER"
export const SEARCH_ID = "SEARCH_ID"
export const POST_DOG = "POST_DOG"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const CLEAN_BY_ID = "CLEAN_BY_ID"
export const GET_DB_DOGS = "GET_DB_DOGS"
export const DELETE_DOG = "DELETE_DOG"

export function getDogs() {
    return function (dispatch) {
        axios.get("/dogs")
            .then((dogs) => {
                dispatch({
                    type: GET_DOGS,
                    payload: dogs.data
                })

            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export function searchDog(search) {
    return function (dispatch) {
        axios.get("/dogs?name=" + search)
            .then((dog) => {
                dispatch({
                    type: SEARCH_DOG,
                    payload: dog.data
                })
                console.log(dog.data)
            })
            .catch((error) => {
            //  alert("This dog doesnt exist")  
            console.log(error) 
            })
    }
}
export function searchTemper(search) {
    return function (dispatch) {
        axios.get("/dogs?temperament=" + search)
            .then((dog) => {
                dispatch({
                    type: SEARCH_TEMPER,
                    payload: dog.data
                })
                console.log(dog.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export function sort(order) {
    return {
        type: SORT,
        payload: order
    }
}
export function sortWeight(order) {
    return {
        type: SORT_WEIGHT,
        payload: order
    }
}

export function searchById(search) {
    return function (dispatch) {
        axios.get("/dogs/" + search)
            .then((dog) => {
                dispatch({
                    type: SEARCH_ID,
                    payload: dog.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
export function postDog(dogInfo) {
    return async function (dispatch) {
        try {
            const res = await axios.post("/dogs", dogInfo);
            return res
        } catch (error) {
            console.log(error)
        }
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        try {
            const res = await axios.get("/temperament");
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function getDbDogs (info){
    return {
        type: GET_DB_DOGS,
        payload: info
    }
}
export function deleteDog (name){
    return async function (dispatch){
        try {
            const res = await axios.delete("/dogs?name=" + name)
            return dispatch({
                type: DELETE_DOG,
                payload: res.data
            })
        }catch (e){
            console.log(e)
        }
    }
}