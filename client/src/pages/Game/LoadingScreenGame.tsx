
import LoadingGame from "../../components/Loading/loadingGame"

interface Props{
    resetLoading : ()=>void
}


const LoadingScreenGame = ({resetLoading}:Props)=>{

    return <div onClick={()=>resetLoading()}style={{display:"grid",marginLeft:"55px",position:"absolute",top:"0px",left:"0px",backgroundColor:"#FF855133",width:"100%",height:"100%",placeItems:'center'}}>
        <LoadingGame/>
    </div>
}

export default LoadingScreenGame