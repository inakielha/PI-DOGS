
import { Link } from "react-router-dom"
import style from "./FirstPage.module.css"

export default function FirstPage() {
    return (
        <body className={style.divs}>
            <div className="">
                <Link to="/home"><button className={style.btn}> Get in</button> </Link>
            </div>
        </body>
    )   
}