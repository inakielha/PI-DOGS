import HomeButton from "../homeButton/HomeButton"
import img from "../../../dog.png"

export default function FirstPage(){
    return <div>
        <img src={img} alt="DogImage"/>
        <HomeButton/>
    </div>
}