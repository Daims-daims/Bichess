import { IPiece } from "./Type"

function setStatePiecesFromFEN(FEN:string) : IPiece[]{
    const res:IPiece[]=[]
    let ctrTile=-1
    for(let i =0; i< FEN.length;i++){
        const char = FEN[i]
        if(!isNaN(parseInt(char))){
            ctrTile+=parseInt(char)
        }
        else if(char!=="/"){
            ctrTile+=1
            res.push({
                x:ctrTile%8,
                y:Math.abs(Math.floor(ctrTile/8)-7),
                color:char.toUpperCase()===char ? "w" :"b",
                pieceType:char,
                hasAlreadyMoved:false,
                pathToImg: "img/chessPiece/"+char.toLowerCase()+"_"+(char.toUpperCase()===char ? "w" :"b")+".png"
            })
        }
    }
    return res
}
 
export {setStatePiecesFromFEN}