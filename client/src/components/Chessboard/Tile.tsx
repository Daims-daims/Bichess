import { IPiece, coordinate } from "../../lib/Type"


interface Props{
    color : "w"|"b"
    piece? : IPiece,
    coord:coordinate,
    attacked:boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    grabTentative : (e: any) => void,
    selected : boolean
}

export default function Tile({color,piece,selected,attacked,grabTentative,coord}:Props){
    let className = "tile"
    if(selected) className="grab-tile " +className
    else if(attacked) className="attack-tile " + className
    else className  = color+"-tile "+ className 
    return <div  className={className}>
        {true && <span style={{position:"absolute",color:"black"}}>{"x:" +coord.x + "-y:"+coord.y}</span>}
        {piece && <div  color={piece.color} onMouseDown={(e)=>grabTentative(e)}className="chess-piece" style={{backgroundImage:`url(${piece?.pathToImg}`}}></div>}
    </div>

}