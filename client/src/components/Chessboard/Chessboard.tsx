import { useRef, useState } from "react"
import "./chessboard.css"
import Tile from "./Tile"
import { availableMove, listAvailableMove, moveToString, playerStillHasMove, specialMove } from "../../lib/Piece"
import { IPiece, coordinate } from "../../lib/Type"

interface Props{
    onGameOver : (n:string)=>void
    onPieceMove: (n:string,s:"w"|"b")=>void
    pieces : IPiece[],
    playerToPlay : "w" | "b"
    updatePieces : (p:IPiece[])=>void
    invert : boolean
}





function Chessboard({onGameOver,onPieceMove,pieces,playerToPlay,updatePieces,invert}:Props){

    const [selectedPiece,setSelectedPiece] = useState<HTMLElement>()
    const [selectedPieceCoord,setSelectedPieceCoord] = useState<coordinate>()
    const [listTileAttacked,setListTileAttacked] = useState<coordinate[]>([])
    const boardRef = useRef<HTMLDivElement>(null)


    const board=[]

    const onGrabTentative = (coordGrab:coordinate)=>{
        return (e: React.MouseEvent<HTMLDivElement>)=>{
            console.log("down")
            if(!boardRef.current) return
            const element = e.currentTarget;
            if(element.getAttribute("color") !== playerToPlay) return 
            setSelectedPiece(element)
            setSelectedPieceCoord(coordGrab)
            setListTileAttacked(listAvailableMove(pieces.find(p=>p.x===coordGrab.x && p.y === coordGrab.y),pieces))
            const squareSize = boardRef.current?.getBoundingClientRect().width/8
            const x = e.clientX - squareSize / 2;
            const y = e.clientY - squareSize / 2;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            element.style.width = `${squareSize}px`;
            element.style.height = `${squareSize}px`;
        }
    }

    const onMouseMove = (e:React.MouseEvent)=>{
        if(selectedPiece && boardRef.current) {
            const squareSize = boardRef.current?.getBoundingClientRect().width/8
            const x = e.clientX - squareSize/2;
            const y = e.clientY - squareSize/2;
            selectedPiece.style.position = "absolute"
            selectedPiece.style.left = `${x}px`;
            selectedPiece.style.top = `${y}px`;
        }
    }

    const onUngrab = (e:React.MouseEvent)=>{
        if(selectedPiece && boardRef.current){
            const boundingRect = e.currentTarget.getBoundingClientRect()
            const squareSize = boardRef.current?.getBoundingClientRect().width/8
            const x = invert ? Math.abs(Math.floor((e.clientX-boundingRect.left)/squareSize)-7) : Math.floor((e.clientX-boundingRect.left)/squareSize) 
            const y = !invert ? Math.abs(Math.floor((e.clientY-boundingRect.top)/squareSize)-7) : Math.floor((e.clientY-boundingRect.top)/squareSize)
            console.log(x,y,Math.floor((e.clientX-boundingRect.left)/squareSize),Math.floor((e.clientY-boundingRect.top)/squareSize))
            if(x>-1 && x<8 && y>-1 && y<8){     
                if(selectedPieceCoord && (x!==selectedPieceCoord?.x || y!==selectedPieceCoord?.y)){
                    const pieceMove = pieces.find((l=>l.x===selectedPieceCoord?.x&&l.y===selectedPieceCoord.y))
                    console.log(pieceMove)
                    if(pieceMove && availableMove(pieceMove,{x,y},pieces)){
                        const tmpRes = specialMove(pieceMove,{x:x,y:y},pieces)
                        const newPieces = pieces.filter(p=>p.x!==x || p.y!==y).map(p=>{
                            if(p.x!==selectedPieceCoord.x || p.y!==selectedPieceCoord.y) {
                                return p;
                            }
                            p.x = x 
                            p.y = y
                            p.hasAlreadyMoved=true
                            return p
                        })
                        onPieceMove(tmpRes ? tmpRes : moveToString(pieceMove,selectedPieceCoord,pieces,newPieces.length!==pieces.length),pieceMove.color)
                        updatePieces(newPieces)          
                    }
                }           
                if(! playerStillHasMove(playerToPlay,pieces)) onGameOver(playerToPlay)
                setSelectedPiece(undefined)
                setSelectedPieceCoord(undefined)
                setListTileAttacked([])
                selectedPiece.style.position = ""
                console.log("oujou")
            }
        }
    }

    
    for(let y = !invert ? 7 : 0 ; !invert ? y>-1 : y<8; !invert ? y--:y++){
        for(let x = invert ? 7 : 0 ; invert ? x>-1 : x<8;invert ? x-- : x++){
            const pieceTile = pieces.filter(l=>l.x===x&&l.y===y)
            board.push(<Tile selected={selectedPieceCoord!==undefined && selectedPieceCoord.x === x && selectedPieceCoord.y === y} 
                            key={x+y*8} 
                            grabTentative={onGrabTentative({x,y})} 
                            color={(x+y)%2==1 ? "w" : "b"} 
                            coord = {{"x" : x , "y":y}}
                            attacked = {listTileAttacked.filter(p=>p.x===x && p.y===y).length>0}
                            piece={pieceTile.length>0 ? pieceTile[0]:undefined}/>)
        }
    }


    return <><div onMouseUp={onUngrab} onMouseMove={onMouseMove} className="chessboard" ref={boardRef}>{board}
   </div>
   </>
}

export default Chessboard;