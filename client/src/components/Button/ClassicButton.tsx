import "./button.scss"


interface Props{
    clickAction:()=>void,
    disabledStyle?:boolean
    text:string
    className?:string
}

function ClassicButton({clickAction,text,disabledStyle,className}:Props){
    return <div onClick={(e:React.MouseEvent<HTMLDivElement>)=> {e.stopPropagation()
                                                                    clickAction()}} 
                className={"button " + (disabledStyle ? "btnDisabled" : (className ? className : "btnClassic"))}>
        {text}
    </div>
}

export default ClassicButton