import ClassicButton from "./ClassicButton"


interface Props{
    clickAction:()=>void,
    disabledStyle?:boolean
    text:string
}

function ErrorButton({clickAction,text,disabledStyle}:Props){
    return <ClassicButton clickAction={clickAction} text={text} className="btnError"/>
}

export default ErrorButton