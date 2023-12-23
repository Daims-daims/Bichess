

interface Props{
    color : "w"|"b"
    piece? : IPiece,
    grabTentative : any,
    selected : boolean
}

export default function Tile({color,piece,selected,grabTentative}:Props){
    return <div className={ (selected ? "grab-tile " : color+"-tile") + " tile"}>
        {piece && <div  onMouseDown={(e)=>grabTentative(e)}className="chess-piece" style={{backgroundImage:`url(${piece?.pathToImg}`}}></div>}
    </div>

}