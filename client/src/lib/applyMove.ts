// e4 Ne4 dxe4 Nxc4 0-0 Nce4, ignore +€#

import { dictLetterToCoord } from "../Constante"
import { availableMove } from "./Piece"
import { IPiece } from "./Type"


function applyMove(move:string,playerToPlay:"w" | "b",pieces:IPiece[]):IPiece[]{
    if(move[0]==="O") return applyCastle(move,playerToPlay,pieces)
    if(move[0].toUpperCase()===move[0]) return applyMovePiece(move,playerToPlay,pieces)
    else return applyMovePawn(move,playerToPlay,pieces)
}

// O-O _ O-O-O
function applyCastle(move:string,playerToPlay:"w" | "b",pieces:IPiece[]):IPiece[]{
    const king = pieces.find(p=>playerToPlay==="w" ? p.pieceType==="K" : p.pieceType==="k")
    if( ! king) throw new Error("King not found " + pieces.map(p=>p.pieceType));
    let rook:IPiece | undefined
    if(move.length>3){ // Long castle
        rook = pieces.find(p=>(playerToPlay==="w" ? p.pieceType==="R" : p.pieceType==="r") && p.x===0)
        if(! rook) throw new Error("Rook not found");
        return pieces.map(p=>{
            if (p==rook){
                p.x=3
                p.hasAlreadyMoved=true
            }
            else if(p==king){
                p.x=2
                p.hasAlreadyMoved=true
            }
            return p
        })
    }
    else{
        rook = pieces.find(p=>(playerToPlay==="w" ? p.pieceType==="R" : p.pieceType==="r") && p.x===7)
        console.log(rook)
        if(! rook) throw new Error("Rook not found");
        return pieces.map(p=>{
            if (p==rook){
                p.x=5
                p.hasAlreadyMoved=true
            }
            else if(p==king){
                p.x=6
                p.hasAlreadyMoved=true
            }
            return p
        })
    }
}

// Ne4 Nxed4

function applyMovePiece(move:string,playerToPlay:"w" | "b",pieces:IPiece[]):IPiece[]{
    let colArrive:number, rowArrive:number, colDepart : number, rowDepart:number
    let indexToRead = 0
    const pieceType = playerToPlay === "w" ? move[indexToRead] : move[indexToRead].toLowerCase()
    indexToRead++
    if(move[1]==="x"){
        indexToRead++
    }
    if(dictLetterToCoord[move[indexToRead+1]]){
        if(dictLetterToCoord[move[indexToRead]]) colDepart = dictLetterToCoord[move[indexToRead]]
        else rowDepart = parseInt(move[indexToRead])-1
        indexToRead++
        colArrive = dictLetterToCoord[move[indexToRead]]
        indexToRead++
        rowArrive = parseInt(move[indexToRead])-1
    }
    else{
        colArrive = dictLetterToCoord[move[indexToRead]]
        indexToRead++
        rowArrive = parseInt(move[indexToRead])-1
    }
    const piece = pieces.find(p=>p.pieceType===pieceType && (!colDepart || p.x===colDepart) && (!rowDepart || p.y === rowDepart) && availableMove(p,{x:colArrive,y:rowArrive},pieces,false))
    if( ! piece) throw new Error("Piece not find move : "+move+ " pieces : "+ pieces);
    return pieces.filter(p=>p.x !== colArrive || p.y!==rowArrive).map(p=>{
        if(p!=piece) return p
        p.x=colArrive
        p.y = rowArrive
        p.hasAlreadyMoved=true
        return p
    })
}


// e4 cxd4

function applyMovePawn(move:string,playerToPlay:"w" | "b",pieces:IPiece[]):IPiece[]{
    let colArrive:number, rowArrive:number
    const pieceType = playerToPlay == "w" ? "P" : "p"
    const colDepart = dictLetterToCoord[move[0]]
    let withPromotion = false
    if(move[1]==="x"){
        colArrive = dictLetterToCoord[move[2]]
        rowArrive = parseInt(move[3])-1
    }
    else{
        console.log("ci")
        colArrive = dictLetterToCoord[move[0]]
        rowArrive = parseInt(move[1])-1
        console.log(colArrive,move[0])
    }
    if(move.includes("=")) withPromotion=true
    const piece = pieces.find(p=>p.pieceType===pieceType && colDepart===p.x && availableMove(p,{x:colArrive,y:rowArrive},pieces,false))
    if( ! piece) throw new Error("Piece not find move : "+move+ "col : "+colArrive+" row : "+rowArrive);
    return pieces.filter(p=>p.x !== colArrive || p.y!==rowArrive).map(p=>{
        if(p!=piece) return p
        p.x=colArrive
        p.y = rowArrive
        p.hasAlreadyMoved=true
        if(withPromotion){
            console.log(move,move.slice(-1))
            p.pieceType = p.color === "w" ? move.slice(-1) : move.slice(-1).toLowerCase()
            p.pathToImg = "../../public/img/chessPiece/"+move.slice(-1).toLowerCase()+"_"+p.color+".png"
        }
        return p
    })
}


export {applyMove}