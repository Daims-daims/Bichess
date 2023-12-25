import { availableMove, getListPointToTest, tileIsOccupied } from "../Piece"
import { IPiece, coordinate } from "../Type"

function availableMoveRook(pieceMove:IPiece,{x,y}:coordinate,piecesBoard:IPiece[],ommitAlly=false):boolean{
    if(x!==pieceMove.x && y!==pieceMove.y) return false // non-Lateral/horizontal move
    const {listX,listY} = getListPointToTest({x:pieceMove.x,y:pieceMove.y},{x,y})
    if(listX.length>0){
        for(let i = 0 ; i < listX.length;i++){
            if(tileIsOccupied({x:listX[i],y:pieceMove.y},pieceMove.color,piecesBoard) !== "free"){
                return false
            }
        }
    }
    if(listY.length>0){
        for(let i = 0 ; i < listY.length;i++){
            if(tileIsOccupied({x:pieceMove.x,y:listY[i]},pieceMove.color,piecesBoard) !== "free"){
                return false
            }
        }
    }
    return ommitAlly || tileIsOccupied({x:x,y:y},pieceMove.color,piecesBoard) !== "ally"
}

function listAvailableMoveRook(pieceMove:IPiece,piecesBoard:IPiece[]):coordinate[]{
    const listCoord:coordinate[] = []
    // North move
    for(let i = 1 ; pieceMove.y-i>-1 ; i++){
        listCoord.push({x:pieceMove.x,y:pieceMove.y-i})
    }
    // West move
    for(let i = 1 ; pieceMove.x-i>-1 ; i++){
        listCoord.push({x:pieceMove.x-i,y:pieceMove.y})
    }
    // South move
    for(let i = 1 ; pieceMove.y+i<8 ; i++){
        listCoord.push({x:pieceMove.x,y:pieceMove.y+i})
    }
    // East move
    for(let i = 1 ; pieceMove.x+i<8 ; i++){
        listCoord.push({x:pieceMove.x+i,y:pieceMove.y})
    }
    return listCoord.filter(pos=>availableMove(pieceMove,{x:pos.x,y:pos.y},piecesBoard))
}

export {availableMoveRook,listAvailableMoveRook}
