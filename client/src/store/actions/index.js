import axios from "axios"
export const GET_DOGS = "GET_DOGS"
export const SEARCH_DOG = "SEARCH_DOG"
export const SORT = "SORT"
export const SORT_WEIGHT = "SORT_WEIGHT"
export const SEARCH_TEMPER = "SEARCH_TEMPER"
export const SEARCH_ID = "SEARCH_ID"
export const POST_DOG = "POST_DOG"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"


export function getDogs() {
    return function (dispatch) {
        axios.get("http://localhost:3001/dogs")
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
        axios.get("http://localhost:3001/dogs?name=" + search)
            .then((dog) => {
                dispatch({
                    type: SEARCH_DOG,
                    payload: dog.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
export function searchTemper(search) {
    return function (dispatch) {
        axios.get("http://localhost:3001/dogs?temperament=" + search)
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
        axios.get("http://localhost:3001/dogs/" + search)
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
            const res = await axios.post("http://localhost:3001/dogs", dogInfo);
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
        }
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        try {
            const res = await axios.get("http://localhost:3001/temperament");
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}