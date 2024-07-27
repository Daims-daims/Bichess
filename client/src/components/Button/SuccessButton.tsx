import ClassicButton from "./ClassicButton"


interface Props{
    clickAction:()=>void,
    disabledStyle?:boolean
    text:string
}

function SuccessButton({clickAction,text,disabledStyle}:Props){
    return <ClassicButton clickAction={clickAction} text={text} className="btnSuccess"/>
}

export default SuccessButton