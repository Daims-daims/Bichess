import "./button.scss"


interface Props{
    text:string
}

function ClassicButton({text}:Props){
    return <div className="btnClassic">
        {text}
    </div>
}

export default ClassicButton