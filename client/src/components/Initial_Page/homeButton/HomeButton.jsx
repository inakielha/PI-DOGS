
function log(){
    return window.location= "http://localhost:3000/dogs"
}
export default function HomeButton() {
    return (
        <div>
            <button className="button" onClick={log}>
                Get in
            </button>
        </div>
    )
}
