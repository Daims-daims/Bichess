import "./button.scss"


interface Props{
    clickAction:()=>void,
    disabledStyle?:boolean
    text:string
}

function ClassicButton({clickAction,text,disabledStyle}:Props){
    return <div onClick={(e:React.MouseEvent<HTMLDivElement>)=> {e.stopPropagation()
                                                                    clickAction()}} 
                className={disabledStyle ? "btnDisabled" : "btnClassic"}>
        {text}
    </div>
}

export default ClassicButton