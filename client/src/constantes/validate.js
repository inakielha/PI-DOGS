import { createRoutesFromChildren } from "react-router-dom";


export default function validate(input) {
    const errors = {};
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const validateURL = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

    if (!input.name) {
        errors.name = "Name is require"
    } else if (!regexName.test(input.name)) errors.name = "Name cant be a number or contain special characters"
    else if (input.name.length > 45) errors.name = "the name cannot contain more than 45 characters"
    else if (input.name[0] !== input.name[0].toUpperCase()) errors.name = "The first letter must be a capital letter"

    if (!input.heightMin) {
        errors.heightMin = "Height is require"
    }
    else if (input.heightMin != Number(input.heightMin)) errors.heightMin = "Height must be a number"
    else if (input.heightMin > 90) errors.heightMin = "its not possible that Min height, has to be lower than 90"
    else if (input.heightMin <= 5) errors.heightMin = "its not possible that Min height, has to be greater than 5"
    else if (Number(input.heightMin[0]) === 0) errors.heightMin = "this value cant start with 0"
    else if (input.heightMin >= 10 && input.heightMin.length >= 6) errors.heightMin = "Only include two decimals"
    else if (input.heightMin < 10 && input.heightMin.length > 4) errors.heightMin = "Only include two decimals"


    if (!input.heightMax) {
        errors.heightMax = "Maximum height is require"
    }
    else if (input.heightMax != Number(input.heightMax)) errors.heightMax = "Height must be a number"
    else if (input.heightMax > 104) errors.heightMax = "Max height has to be lower than 104"
    else if (input.heightMax < 30) errors.heightMax = "Max height has to be greater than 30"
    else if (Number(input.heightMax[0]) === 0) errors.heightMax = "this value cant start with 0"
    else if (input.heightMax < 100 && input.heightMax.length >= 6) errors.heightMax = "Only include two decimals"
    else if (input.heightMax >= 100 && input.heightMax.length >= 7) errors.heightMax = "Only include two decimals"
    else if (Number(input.heightMin) > Number(input.heightMax)) errors.heightMax = "Minimun height must be lower than maximum height"
    else if (input.heightMin === input.heightMax) errors.heightMax = "Min and Max height cant be the same value"

    if (!input.weightMin) errors.weight = "Min weight is require"
    else if (input.weightMin != Number(input.weightMin)) errors.weightMin = "Min weight must be a number"
    else if (input.weightMin < 0.2) errors.weightMin = "its not possible that Min weight"
    else if (input.weightMin > 70) errors.weightMin = "its not possible that Min weight"
    else if (Number(input.weightMin[0]) === 0 && input.weightMin >= 1) errors.weightMin = "this value cant start with 0"
    else if (input.weightMin >= 10 && input.weightMin.length >= 6) errors.weightMin = "Only include two decimals"
    else if (input.weightMin < 10 && input.weightMin.length > 4) errors.weightMin = "Only include two decimals"


    if (!input.weightMax) errors.weight = "Max weight is require"
    else if (input.weightMax != Number(input.weightMax)) errors.weightMax = "Max weight must be a number"
    else if (input.weightMax < 2) errors.weightMax = "its not possible that Min weight"
    else if (input.weightMax > 115) errors.weightMax = "its not possible that Max weight"

    else if (Number(input.weightMax[0]) === 0) errors.weightMax = "this value cant start with 0"
    else if (input.weightMax < 10 && input.weightMax.length >= 4) errors.weightMax = "Only include two decimals"
    else if (input.weightMax >= 10 && input.weightMax < 100 && input.weightMax.length >= 6) errors.weightMax = "Only include two decimals"
    else if (input.weightMax >= 100 && input.weightMax.length >= 7) errors.weightMax = "Only include two decimals"
    else if (Number(input.weightMin) > Number(input.weightMax)) errors.weightMax = "Minimun weight must be lower than maximum weight"
    else if (input.heightMin === input.heightMax) errors.weightMax = "Min and Max weight cant be the same value"

    if (input.lifeSpanFrom) {
        if (input.lifeSpanFrom != Number(input.lifeSpanFrom)) errors.lifeSpanFrom = "life span information must be a number"
        else if (input.lifeSpanFrom != parseInt(input.lifeSpanFrom)) errors.lifeSpanFrom = "life span information must be an integer number"
        else if (Number(input.lifeSpanFrom[0]) === 0) errors.lifeSpanFrom = "this value cant start with 0"
        else if (input.lifeSpanFrom < 3) errors.lifeSpanFrom = "the min life span cant be that low"
        else if (input.lifeSpanFrom > 20) errors.lifeSpanFrom = "the min life span cant be that high"
    }
    if (input.lifeSpanTo) {
        if (input.lifeSpanTo != Number(input.lifeSpanTo)) errors.lifeSpanTo = "life span information must be a number"
        else if (input.lifeSpanTo != parseInt(input.lifeSpanTo)) errors.lifeSpanTo = "life span information must be an integer number"
        else if (Number(input.lifeSpanTo[0]) === 0) errors.lifeSpanTo = "this value cant start with 0"
        else if (input.lifeSpanTo < 5) errors.lifeSpanTo = "the max life span cant be that low"
        else if (input.lifeSpanTo > 30) errors.lifeSpanTo = "the max life span cant be that high"
        else if (input.lifeSpanFrom === input.lifeSpanTo) errors.lifeSpanTo = "Min and max life span cant be the same value"
        else if (Number(input.lifeSpanFrom) > Number(input.lifeSpanTo)) errors.lifeSpanTo = "Minimun age must be lower than maximum age"
    }
    if ((input.lifeSpanFrom && !input.lifeSpanTo) || (input.lifeSpanTo && !input.lifeSpanFrom)) errors.lifeSpanTo = "Life span information is incomplete"

    if (input.img) {
        if (!validateURL.test(input.img)) errors.img = "the image require a URL format"
    }

    return errors
}