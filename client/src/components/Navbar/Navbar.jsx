import { Link } from "react-router-dom";


export default function Navbar() {
    <>
    <nav>
        <Link to={"/home"}> Go Home </Link>
        <Link to={"/createDog"}>New Doggy</Link>
    </nav>
    </>
}