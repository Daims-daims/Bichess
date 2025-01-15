import { dictCoordToLetter } from "../Constante";
import { availableMoveBishop, listAvailableMoveBishop } from "./PieceLogic/Bishop";
import { availableMoveKing, listAvailableMoveKing } from "./PieceLogic/King";
import { availableMoveKnight, listAvailableMoveKnight } from "./PieceLogic/Knight";
import {availableMovePawn, listAvailableMovePawn} from "./PieceLogic/Pawn"
import { availableMoveQueen,listAvailableMoveQueen } from "./PieceLogic/Queen";
import {availableMoveRook, listAvailableMoveRook} from "./PieceLogic/Rook";
import { IPiece, coordinate } from "./Type"



function availableMove(pieceMove:IPiece|undefined,{x,y}:coordinate,piecesBoard:IPiece[],ommitAlly=false):boolean{
    if(!pieceMove) throw new Error("Piece de départ introuvable");
    let isMoveLegallyCorrect 
    switch(pieceMove.pieceType.toLowerCase()){
        case("p"):
            isMoveLegallyCorrect = availableMovePawn(pieceMove,{x,y},piecesBoard,ommitAlly)
            break
        case("b"):
            isMoveLegallyCorrect = availableMoveBishop(pieceMove,{x,y},piecesBoard,ommitAlly)
            break
        case("n"):
            isMoveLegallyCorrect = availableMoveKnight(pieceMove,{x,y},piecesBoard,ommitAlly)
            break
        case("r"):
            isMoveLegallyCorrect = availableMoveRook(pieceMove,{x,y},piecesBoard,ommitAlly)
            break
        case("q"):
            isMoveLegallyCorrect = availableMoveQueen(pieceMove,{x,y},piecesBoard,ommitAlly)
            break
        case("k"):
            isMoveLegallyCorrect = availableMoveKing(pieceMove,{x,y},piecesBoard,ommitAlly)
            break
    }
    if( ! isMoveLegallyCorrect) return false
    piecesBoard = piecesBoard.filter(p=>p.x!==x || p.y!==y)
    if(piecesBoard.filter(p=>p.pieceType==="K"||p.pieceType==="k").length<2) return true
    const oldPosPiece = {x:pieceMove.x,y:pieceMove.y}
    pieceMove.x = x
    pieceMove.y = y
    const res = ! isKingAttacked(pieceMove.color,piecesBoard)
    pieceMove.x = oldPosPiece.x
    pieceMove.y = oldPosPiece.y
    return res

}

function listAvailableMove(pieceMove:IPiece|undefined,piecesBoard:IPiece[]):coordinate[]{
    if(!pieceMove) throw new Error("Piece de départ introuvable");
    switch(pieceMove.pieceType.toLowerCase()){
        case("p"):
            return listAvailableMovePawn(pieceMove,piecesBoard)
        case("b"):
            return listAvailableMoveBishop(pieceMove,piecesBoard)
        case("n"):
            return listAvailableMoveKnight(pieceMove,piecesBoard)
        case("r"):
            return listAvailableMoveRook(pieceMove,piecesBoard)
        case("q"):
            return listAvailableMoveQueen(pieceMove,piecesBoard)
        case("k"):
            return listAvailableMoveKing(pieceMove,piecesBoard)
        default:
            return []
    }
}

function getListPointToTest(departure:coordinate,arrival:coordinate):{listX:number[],listY:number[]}{
    const listX:number[] = [],listY:number[]=[]
    if(departure.x !== arrival.x){
        const sensX = departure.x < arrival.x ? 1 : -1
        for(let i = departure.x + 1 * sensX ; i!== arrival.x ; i = i + 1 * sensX){ // we go back/forward regarding sensX
            listX.push(i)
        }
    }
    if(departure.y!==arrival.y){
        const sensY = departure.y < arrival.y ? 1 : -1
        for(let i = departure.y + 1 * sensY ; i!==arrival.y ; i = i + 1 * sensY){ // we go back/forward regarding sensX
            listY.push(i)
        }
    }         
    return {listX:listX,listY:listY}
}

/**
 * 
 * @param param0 coordinate to check
 * @param pieces list of pieces to test, if to check only ennemy pieces filter before function call
 * @param color piece's color
 * @returns "ally" if occupied by ally | "ennemy" if occupied by ennemy | "free" if no piece
 */

function tileIsOccupied({x,y}:coordinate,color:"w"|"b",pieces:IPiece[]):string{
    const listPiecesCoordinate = pieces.filter(p=>p.x===x&&p.y===y)
    if(listPiecesCoordinate.length===0) return "free"
    return listPiecesCoordinate[0].color === color ? "ally" : "ennemy"
}

/**
 * 
 * @param param0 tile's coordinate
 * @param color player color
 * @param pieces pieces Board 
 * @returns is the tile attacked
 */
function tileIsAttacked({x,y}:coordinate,color:"w"|"b",pieces:IPiece[]):boolean{
    return pieces.filter(p=>p.color!==color && availableMove(p,{x:x,y:y},pieces,true)).length>0
}

/**
 * 
 * @param color player color
 * @param piecesBoard piecesBoard
 */
function isKingAttacked(color:"w"|"b",piecesBoard:IPiece[]):boolean{
    const charToSearch = color==="w" ? "K" : "k"
    const king = piecesBoard.filter(p=>p.pieceType===charToSearch)
    if( king.length===0 )throw new Error("King "+color+" not found");
    return tileIsAttacked({x:king[0].x,y:king[0].y},color,piecesBoard)
}

function playerStillHasMove(color:"w"|"b",piecesBoard:IPiece[]):boolean{
    const piecesPlayer = piecesBoard.filter(p=>p.color===color)
    for(let i = 0 ; i < piecesPlayer.length ; i ++) {
        if(listAvailableMove(piecesPlayer[i],piecesBoard).length>0){ 
            console.log(piecesPlayer[i],listAvailableMove(piecesPlayer[i],piecesBoard))
            return true}
    }
    return false
}

function specialMove(pieceMove:IPiece,{x,y}:coordinate,piecesBoard:IPiece[]):string|null{
    let res
    if(pieceMove.pieceType.toLowerCase()=="k"){
        if(Math.abs(pieceMove.x-x)===2){
            if(x<pieceMove.x){
                // piecesBoard = piecesBoard.map((p)=>{
                //     if(p.y === pieceMove.y && p.x === 0){
                //         p.x= pieceMove.x-1
                //         p.hasAlreadyMoved=true
                //     }
                //     return p
                // })
                return "O-O-O"
            }
            if(x>pieceMove.x){
                // piecesBoard = piecesBoard.map((p)=>{
                //     if(p.y === pieceMove.y && p.x === 7){
                //         p.x= pieceMove.x+1
                //         p.hasAlreadyMoved=true
                //     }
                //     return p
                // })
                return "O-O"
            }
        }
    }
    if(pieceMove.pieceType.toLowerCase()=="p"){
        if(y===0 || y === 7){
            res = piecesBoard.find(p=>p.x===x && p.y === y) ? dictCoordToLetter[pieceMove.x]+"x" : ""
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            piecesBoard = piecesBoard.map((p)=>{
                if(p.x === pieceMove.x && p.y===pieceMove.y){
                    p.pieceType = p.color === "w" ? "Q" : "q"
                    p.pathToImg =  "../../public/img/chessPiece/q_"+p.color+".png"
                }
                return p
            })
            return res+dictCoordToLetter[x]+Math.abs(y-8)+"=Q"
        }
    }
    return null
}

function moveToString(pieceMove:IPiece,{x,y}:coordinate,piecesBoard:IPiece[]):string{
    let res = pieceMove.color
    if(pieceMove.pieceType.toLowerCase()!=="p") res += pieceMove.pieceType.toUpperCase()
    let otherPiece
    if(pieceMove.pieceType.toLowerCase()!=="p") otherPiece= piecesBoard.find(p=>p!=pieceMove && p.pieceType === pieceMove.pieceType && availableMove(p,{x:x,y:y},piecesBoard,true))
    if(otherPiece){
        if(otherPiece.y===y) res+= dictCoordToLetter[x]
        else res+= y+1
    }
    if(piecesBoard.find(p=>p.x===x && p.y === y)){
        if(pieceMove.pieceType.toLowerCase()==="p") res+=dictCoordToLetter[pieceMove.x]
        res+="x"
    }
    res+=dictCoordToLetter[x]
    res+=y+1
    if(isKingAttacked(pieceMove.color==="w" ? "b" : "w" ,piecesBoard)) res+="+"
    console.log(res)
    return res
}

export {moveToString,isKingAttacked, availableMove, getListPointToTest,tileIsOccupied,listAvailableMove,tileIsAttacked,playerStillHasMove,specialMove }
