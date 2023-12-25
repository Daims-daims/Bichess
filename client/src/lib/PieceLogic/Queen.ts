import { IPiece, coordinate } from "../Type"
import {availableMoveBishop, listAvailableMoveBishop} from "./Bishop"
import {availableMoveRook, listAvailableMoveRook} from "./Rook"

function availableMoveQueen(pieceMove:IPiece,{x,y}:coordinate,piecesBoard:IPiece[],ommitAlly=false):boolean{
    if(Math.abs(x-pieceMove.x)=== Math.abs(y-pieceMove.y)) // diagonal move
        return availableMoveBishop(pieceMove,{x:x,y:y},piecesBoard,ommitAlly) 
    if(x===pieceMove.x || y===pieceMove.y)
        return availableMoveRook(pieceMove,{x:x,y:y},piecesBoard,ommitAlly) 
    return false
}

function listAvailableMoveQueen(pieceMove:IPiece,piecesBoard:IPiece[]):coordinate[]{
    return listAvailableMoveRook(pieceMove,piecesBoard).concat(listAvailableMoveBishop(pieceMove,piecesBoard))
}


export  {availableMoveQueen,listAvailableMoveQueen}
