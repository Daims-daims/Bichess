import { availableMove, tileIsOccupied } from "../Piece"
import { IPiece, coordinate } from "../Type"

function availableMoveKnight(pieceMove:IPiece,{x,y}:coordinate,piecesBoard:IPiece[],ommitAlly=false):boolean{
    if((Math.abs(x-pieceMove.x)==1 && Math.abs(y-pieceMove.y)===2) ||
       (Math.abs(x-pieceMove.x)==2 && Math.abs(y-pieceMove.y)===1) ){
        return ommitAlly || tileIsOccupied({x:x,y:y},pieceMove.color,piecesBoard) !== "ally"
       }
    return false   
}


function listAvailableMoveKnight(pieceMove:IPiece,piecesBoard:IPiece[]):coordinate[]{
    let listCoordToTest:coordinate[] = []

    listCoordToTest.push({x:pieceMove.x+2,y:pieceMove.y+1})
    listCoordToTest.push({x:pieceMove.x+2,y:pieceMove.y-1})
    
    listCoordToTest.push({x:pieceMove.x-2,y:pieceMove.y+1})
    listCoordToTest.push({x:pieceMove.x-2,y:pieceMove.y-1})

    listCoordToTest.push({x:pieceMove.x-1,y:pieceMove.y+2})
    listCoordToTest.push({x:pieceMove.x-1,y:pieceMove.y-2})

    listCoordToTest.push({x:pieceMove.x+1,y:pieceMove.y+2})
    listCoordToTest.push({x:pieceMove.x+1,y:pieceMove.y-2})

    listCoordToTest = listCoordToTest.filter(p=>p.x<8 && p.x>=0 && p.y <8 && p.y>=0)

    return listCoordToTest.filter(pos => availableMove(pieceMove,pos,piecesBoard))
    
}

export {availableMoveKnight,listAvailableMoveKnight}
