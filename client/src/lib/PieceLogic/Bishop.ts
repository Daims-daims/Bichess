import { availableMove, getListPointToTest, tileIsOccupied } from "../Piece"
import { IPiece, coordinate } from "../Type"

function availableMoveBishop(pieceMove:IPiece,{x,y}:coordinate,piecesBoard:IPiece[],ommitAlly=false):boolean{
    if(Math.abs(x-pieceMove.x)!== Math.abs(y-pieceMove.y)) return false // non-diagonal move
    const {listX,listY} = getListPointToTest({x:pieceMove.x,y:pieceMove.y},{x,y})
    for(let i = 0 ; i < listX.length;i++){
        if(tileIsOccupied({x:listX[i],y:listY[i]},pieceMove.color,piecesBoard) !== "free"){
            return false
        }
    }
    return ommitAlly || tileIsOccupied({x:x,y:y},pieceMove.color,piecesBoard) !== "ally"
}

function listAvailableMoveBishop(pieceMove:IPiece,piecesBoard:IPiece[]):coordinate[]{
    const listCoord:coordinate[] = []
    // North-West move i.e. decrese x decrese y
    for(let i = 1; pieceMove.x-i>-1 && pieceMove.y-i>-1;i++){
        listCoord.push({x:pieceMove.x-i,y:pieceMove.y-i})
    }
    // North-East move i.e. increase x decrease y
    for(let i = 1; pieceMove.x+i<8 && pieceMove.y-i>-1;i++){
        listCoord.push({x:pieceMove.x+i,y:pieceMove.y-i})
    }
    // South-West move i.e. decrease x increase y
    for(let i = 1; pieceMove.x-i>-1 && pieceMove.y+i<8;i++){
        listCoord.push({x:pieceMove.x-i,y:pieceMove.y+i})
    }
    // South-East move i.e. increase x increase y
    for(let i = 1; pieceMove.x+i<8 && pieceMove.y+i<8;i++){
        listCoord.push({x:pieceMove.x+i,y:pieceMove.y+i})
    }
    return listCoord.filter(pos=>availableMove(pieceMove,{x:pos.x,y:pos.y},piecesBoard))
}



export  {availableMoveBishop,listAvailableMoveBishop}
