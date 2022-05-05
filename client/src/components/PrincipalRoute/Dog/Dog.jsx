

export default function Dog({name,img,weight,temperament}){
    return(
        <div>
        <h3>{name}</h3>
        <img src={img} alt="imagen" />
        <h4>{weight} kG </h4>
        <h4>{temperament}</h4>    
        </div>
    )
}