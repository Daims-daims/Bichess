import '../App.scss'
import './Component.scss'
import ErrorButton from './Button/ErrorButton'
import SuccessButton from './Button/SuccessButton'

interface Props{
    validationAction:()=>void,
    cancelAction:()=>void,
    isVisible : boolean,
    mainText:string,
    validationText:string,
    cancelText:string
}

function WindowValidation({validationAction,cancelAction,isVisible,mainText,validationText,cancelText}:Props){
    

    return <div className="boxValidation fadeHeight" style={{maxHeight:(isVisible ? "2000px":"0px")}}>
        <p>{mainText}</p>
        <div style={{display:"flex",flexDirection:"row",gap:"10px"}}>
            <SuccessButton clickAction={validationAction} text={validationText}/>
            <ErrorButton clickAction={cancelAction} text={cancelText}/> 
        </div>
    </div>

}



export default WindowValidation