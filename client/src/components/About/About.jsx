import Navbar from "../PrincipalRoute/Navbar/Navbar"
import style from "./About.module.css"
import image from "./../../Assets/githubLogo.png"
import imageMail from "./../../Assets/gmailLogo.png"
import imageLinkedin from "./../../Assets/linkedinLogo.png"
import imageHuella from "./../../Assets/dog-footprint.png"

export default function About() {
    return (
        <div>
            <Navbar />
            <div className={style.container}>
                <h1 className={style.text}>About</h1>
                <p className={style.microTitle}> This app was built with the next technologies: </p>
                <ul>
                    <p className={style.list}>
                        Frontend
                    </p>
                    <li className={style.listP}>- React / Redux</li>
                    <li className={style.listPe}>- HTML + CSS </li>
                    <li className={style.listP}> (no external frameworks like bootstrap were allowed)</li>
                    <p className={style.list}> Backend</p>
                    <li className={style.listP}>- Node / ExpressJS </li>
                    <li className={style.listP}>- Postgres </li>
                    <li className={style.listP}>- Sequelize</li>
                </ul>
                <p className={style.listPa}>This was an individual final project of the Henry's bootcamp. The tematic is about showing dogs of an external API and dogs created by users and saving all the changes in the database.</p>
                <p className={style.listChange}> Contact</p>
                    <div className={style.containerImage}>
                        <a className={style.link} href="https://www.linkedin.com/in/i%C3%B1aki-elhaiek/" target="_blank" rel="noopener noreferrer">
                            <img className={style.image} src={imageLinkedin} alt="Linkedin" />
                            <p className={style.link}> Iñaki Elhaiek</p>
                        </a>
                        <a className={style.link} href="https://github.com/inakielha" target="_blank" rel="noopener noreferrer">
                            <img className={style.image} src={image} alt="gitHub" />
                            <p className={style.link}> inakielha</p>
                        </a>
                        <div className={style.link2}>
                            <img className={style.image} src={imageMail} alt="Mail" />
                            <p > inakielhaiek@gmail.com</p>
                        </div>

                    </div>
                    <p className={style.listChange2}>Thank you very much for visiting my website!</p>
                    <img className={style.image2} src={imageHuella} alt="huella" />
            </div>
        </div>
    )
}