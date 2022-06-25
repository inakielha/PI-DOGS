import { ASCENDENTE } from "../../constantes/sort";
import { CLEAN_RESPONSE, GET_DB_DOGS, GET_DOGS, GET_TEMPERAMENTS, POST_DOG, SEARCH_DOG, SEARCH_ID, SEARCH_TEMPER, SORT, SORT_WEIGHT } from "../actions";

const initialState = {
    dogs: [],
    tempers: [],
    filterDogs: [],
    newDogs: [],
    dogById: [],
    getAllTemperaments: [],
    searchError: [],
    dogsOrigin: [],
    dogCreated: {ok:""}
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                filterDogs: action.payload
            }
        case SEARCH_DOG:
            return {
                ...state,
                filterDogs: action.payload
            }
        case SORT:
            let orderedDogs = [...state.filterDogs];
            orderedDogs = orderedDogs.sort((a, b) => {
                if (a.name < b.name) {
                    return action.payload === ASCENDENTE ? -1 : 1;
                }
                if (a.name > b.name) {
                    return action.payload === ASCENDENTE ? 1 : -1;
                }
                return 0;
            })
            return {
                ...state,
                filterDogs: orderedDogs
            }
        case SORT_WEIGHT:
            let orderedWeight = [];
            let arrNaN = [];
            let arr = [...state.filterDogs];
            arr.forEach(ele => {
                if (ele.weight.indexOf("NaN") === -1) orderedWeight.push(ele)
                else arrNaN.push(ele)
            })
            orderedWeight = orderedWeight.sort((a, b) => {
                let splitWeightA = a.weight.split("- ")
                let weightPromA = splitWeightA[(splitWeightA.length) - 1]

                let splitWeightB = b.weight.split("- ")
                let weightPromB = splitWeightB[(splitWeightB.length) - 1]

                if (parseInt(weightPromA) < parseInt(weightPromB)) {
                    return action.payload === ASCENDENTE ? -1 : 1;
                }
                if (parseInt(weightPromA) > parseInt(weightPromB)) {
                    return action.payload === ASCENDENTE ? 1 : -1
                }
                if (parseInt(weightPromA) === parseInt(weightPromB)) {
                    if (parseInt(splitWeightA[0]) < parseInt(splitWeightB[0])) {
                        return action.payload === ASCENDENTE ? -1 : 1;
                    }
                    if (parseInt(splitWeightA[0]) > parseInt(splitWeightB[0])) {
                        return action.payload === ASCENDENTE ? 1 : -1;
                    }
                    return 0;
                }
            })
            arrNaN.forEach(e => {
                orderedWeight.push(e);
            })
            console.log(orderedWeight)
            return {
                ...state,
                filterDogs: orderedWeight
            }
        case SEARCH_TEMPER:
            return {
                ...state,
                filterDogs: action.payload
            }
        case SEARCH_ID:
            return {
                ...state,
                dogById: action.payload
            }
        case POST_DOG:
            return {
                ...state,
                dogCreated: action.payload
            }
        case CLEAN_RESPONSE:
            return {
                ...state,
                dogCreated: action.payload
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                getAllTemperaments: action.payload
            }
        case GET_DB_DOGS:
            let allDogs = [...state.dogs];
            let resp = []
            if (action.payload === "dbDogs") {
                allDogs.forEach(dog => {
                    if (dog.id.length > 6) resp.push(dog)
                })
            }
            else if (action.payload === "apiDogs") {

                allDogs.forEach(dog => {
                    if (typeof(dog.id) === "number") resp.push(dog)
                })
            } else {
                resp = allDogs;
            }
            if (!resp.length) resp = "NoUserDogs"
            return {
                ...state,
                filterDogs: resp
            }

        default:
            return state
    }
}
