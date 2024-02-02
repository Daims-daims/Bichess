import { availableMove, tileIsAttacked, tileIsOccupied } from "../Piece"
import { IPiece, coordinate } from "../Type"

function availableMoveKing(pieceMove:IPiece,{x,y}:coordinate,piecesBoard:IPiece[],ommitAlly:boolean):boolean{
    if(y===pieceMove.y && Math.abs(pieceMove.x-x)===2 && ! pieceMove.hasAlreadyMoved){
        if(tileIsAttacked({x:pieceMove.x,y:pieceMove.y},pieceMove.color,piecesBoard)) return false
        if(x<pieceMove.x){
            for(let i = pieceMove.x-1 ; i >0;i--){
                if(tileIsOccupied({x:i,y:y},pieceMove.color,piecesBoard)!=="free" ) return false
            }
            const rook =  piecesBoard.find(p=>(p.pieceType==="R" || p.pieceType==="r") 
                                                && p.color===pieceMove.color 
                                                && !p.hasAlreadyMoved
                                                && p.x === 0)
            if(!rook) return false
            if(tileIsAttacked({x:pieceMove.x-1,y:pieceMove.y},pieceMove.color,piecesBoard)) return false
            if(tileIsAttacked({x:pieceMove.x-2,y:pieceMove.y},pieceMove.color,piecesBoard)) return false
            return true
        }
        if(x>pieceMove.x){
            for(let i = pieceMove.x+1 ; i <7;i++){
                if(tileIsOccupied({x:i,y:y},pieceMove.color,piecesBoard)!=="free" ) return false
            }
            const rook =  piecesBoard.find(p=>(p.pieceType==="R" || p.pieceType==="r") 
                                                && p.color===pieceMove.color 
                                                && !p.hasAlreadyMoved
                                                && p.x === 7)
            if(!rook) return false
            if(tileIsAttacked({x:pieceMove.x+1,y:pieceMove.y},pieceMove.color,piecesBoard)) return false
            if(tileIsAttacked({x:pieceMove.x+2,y:pieceMove.y},pieceMove.color,piecesBoard)) return false
            return true
        }

    }
    if(Math.abs(x-pieceMove.x)>1 || Math.abs(y-pieceMove.y)>1) return false
    if(tileIsAttacked({x:x,y:y},pieceMove.color,piecesBoard)) return false
    return ommitAlly ||  tileIsOccupied({x:x,y:y},pieceMove.color,piecesBoard) !== "ally" // must add is targeted Cell to prevent lose move
}


function listAvailableMoveKing(pieceMove:IPiece,piecesBoard:IPiece[]):coordinate[]{
    let listCoordToTest:coordinate[] = []

    //North move
    listCoordToTest.push({x:pieceMove.x-1,y:pieceMove.y-1})
    listCoordToTest.push({x:pieceMove.x,y:pieceMove.y-1})
    listCoordToTest.push({x:pieceMove.x+1,y:pieceMove.y-1})
    //Lateral move
    listCoordToTest.push({x:pieceMove.x-1,y:pieceMove.y})
    listCoordToTest.push({x:pieceMove.x+1,y:pieceMove.y})
    //South move
    listCoordToTest.push({x:pieceMove.x-1,y:pieceMove.y+1})
    listCoordToTest.push({x:pieceMove.x,y:pieceMove.y+1})
    listCoordToTest.push({x:pieceMove.x+1,y:pieceMove.y+1})

    if( ! pieceMove.hasAlreadyMoved ){
        listCoordToTest.push({x:pieceMove.x+2,y:pieceMove.y})
        listCoordToTest.push({x:pieceMove.x-2,y:pieceMove.y})
    }

    listCoordToTest = listCoordToTest.filter(p=>p.x<8 && p.x>=0 && p.y <8 && p.y>=0)
    return listCoordToTest.filter(pos => availableMove(pieceMove,pos,piecesBoard,false))
}



export {availableMoveKing,listAvailableMoveKing}
