// import { getListPointToTest } from "../Piece"
import { availableMove, tileIsOccupied } from "../Piece"
import { IPiece, coordinate } from "../Type"

function availableMovePawn(pieceMove:IPiece,{x,y}:coordinate,piecesBoard:IPiece[],ommitAlly=false):boolean{
    const sens = pieceMove.color === "w" ? 1 : -1
    const backRow = pieceMove.color === "w" ? 1 : 6
    if((pieceMove.y-y) * sens >= 0 ) return false // pawn is not moving forward
    if(Math.abs(pieceMove.y-y) > 2 || (Math.abs(pieceMove.y-y)== 2 &&  pieceMove.y !==backRow )) return false // pawn moving forward too much
    if(Math.abs(pieceMove.x-x)>1) return false // pawn is trying to move sideway
    if(Math.abs(pieceMove.y-y)== 2 && tileIsOccupied({x:pieceMove.x,y:pieceMove.y+sens},pieceMove.color,piecesBoard)!=="free") return false
    if(pieceMove.x!==x){
        return tileIsOccupied({x:x,y:y},pieceMove.color,piecesBoard) === "ennemy" || (ommitAlly && tileIsOccupied({x:x,y:y},pieceMove.color,piecesBoard)==='ally' )
    }
    return tileIsOccupied({x:x,y:y},pieceMove.color,piecesBoard) === "free"
}

function listAvailableMovePawn(pieceMove:IPiece,piecesBoard:IPiece[]):coordinate[]{
    const sens = pieceMove.color === "w" ? 1 : -1
    const listCoordToTest: coordinate[]=[]
    if( pieceMove.y !== 7 && pieceMove.y !== 0 ){
        if(pieceMove.x!==0) listCoordToTest.push({x:pieceMove.x-1,y:pieceMove.y+sens}) // piece on the left of the board
        if(pieceMove.x!==7) listCoordToTest.push({x:pieceMove.x+1,y:pieceMove.y+sens}) // piece on the right of the board
        listCoordToTest.push({x:pieceMove.x,y:pieceMove.y+sens}) // piece on the left of the board
    }
    const backRow = pieceMove.color === "w" ? 1 : 6
    if(pieceMove.y===backRow) listCoordToTest.push({x:pieceMove.x,y:pieceMove.y+2*sens})
    return listCoordToTest.filter(pos => availableMove(pieceMove,pos,piecesBoard))
    
}

export {availableMovePawn,listAvailableMovePawn }
