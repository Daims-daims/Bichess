
import "../../pages/Game/Game.scss"


const LoadingGame = ()=>{
    return <div onClick={(e)=>e.stopPropagation()} style={{display:"flex",alignItems:"center",gap:"0px"}} className="menuBox">
            <p className="menuBoxHeader" style={{fontSize:"20px"}}>En recherche de partie...</p>
            <img style={{width:"200px"}}src="../../../gif/loading.gif" alt="Loading pawn" />
    </div>
}

export default LoadingGame