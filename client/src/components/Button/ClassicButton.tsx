import "./button.scss"


interface Props{
    clickAction:()=>void,
    text:string
}

function ClassicButton({clickAction,text}:Props){
    return <div onClick={()=>clickAction()} className="btnClassic">
        {text}
    </div>
}

export default ClassicButton