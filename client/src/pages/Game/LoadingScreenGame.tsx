
import logo from "../../../public/gif/loading.gif"

interface Props{
    resetLoading : ()=>void
}


const LoadingScreenGame = ({resetLoading}:Props)=>{

    return <div onClick={()=>resetLoading()}style={{display:"grid",marginLeft:"55px",position:"absolute",top:"0px",left:"0px",backgroundColor:"#FF855133",width:"100%",height:"100%",placeItems:'center'}}>
        <div onClick={(e)=>e.stopPropagation()} style={{display:"flex",alignItems:"center",gap:"0px"}} className="menuBox">
            <p className="menuBoxHeader" style={{fontSize:"20px"}}>En recherche de partie...</p>
            <img style={{width:"200px"}}src="../../../public/gif/loading.gif" alt="Loading pawn" />
        </div>
    </div>
}

export default LoadingScreenGame