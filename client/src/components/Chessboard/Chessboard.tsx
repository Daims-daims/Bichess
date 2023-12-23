import { useRef, useState } from "react"
import "./chessboard.css"
import Tile from "./Tile"
import { SIZE_SQUARE } from "../../Constante"

interface Props{
    FEN:string
}

interface coordinate{
    x:number,
    y:number
}


function setStatePiecesFromFEN(FEN:string) : IPiece[]{
    let res:IPiece[]=[]
    let ctrTile=-1
    for(var i =0; i< FEN.length;i++){
        const char = FEN[i]
        if(!isNaN(parseInt(char))){
            ctrTile+=parseInt(char)
        }
        else if(char!=="/"){
            ctrTile+=1
            res.push({
                x:ctrTile%8,
                y:Math.floor(ctrTile/8),
                color:char.toUpperCase()===char ? "w" :"b",
                pathToImg: "img/chessPiece/"+char.toLowerCase()+"_"+(char.toUpperCase()===char ? "w" :"b")+".png"
            })
        }
    }
    return res
}


function selectPiece(piece?:IPiece){
    if(piece!==undefined){

    }
}

function test(pieces:IPiece[],setP:React.Dispatch<React.SetStateAction<IPiece[]>>){
    console.log(pieces[0])
    pieces[0] = {
        ...pieces[0],
        y:5
    }
    const newPieces = pieces.map(p=>p)
    setP(newPieces)
}

export default function({FEN}:Props){

    const [pieces,setPieces] = useState(setStatePiecesFromFEN(FEN))
    const [selectedPiece,setSelectedPiece] = useState<HTMLElement>()
    const [selectedPieceCoord,setSelectedPieceCoord] = useState<coordinate>()
    const boardRef = useRef<HTMLDivElement>(null)

    let board = []


    const onGrabTentative = (coordGrab:coordinate)=>{
        return (e: React.MouseEvent<HTMLDivElement>)=>{
            console.log("down")
            const element = e.currentTarget;
            setSelectedPiece(element)
            setSelectedPieceCoord(coordGrab)
            const x = e.clientX - SIZE_SQUARE / 2;
            const y = e.clientY - SIZE_SQUARE / 2;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
        }
    }

    const onMouseMove = (e:React.MouseEvent)=>{
        if(selectedPiece && boardRef.current) {
            const x = e.clientX - SIZE_SQUARE/2;
            const y = e.clientY - SIZE_SQUARE/2;
            selectedPiece.style.position = "absolute"
            selectedPiece.style.left = `${x}px`;
            selectedPiece.style.top = `${y}px`;
        }
    }

    const onUngrab = (e:React.MouseEvent)=>{
        if(selectedPiece && boardRef){
            const boundingRect = e.currentTarget.getBoundingClientRect()
            console.log("relative",e.clientY-boundingRect.top,e.clientX-boundingRect.left)
            const x = Math.floor((e.clientX-boundingRect.left)/SIZE_SQUARE) 
            const y = Math.floor((e.clientY-boundingRect.top)/SIZE_SQUARE)
            if(x>-1 && x<8 && y>-1 && y<8){                
                setSelectedPiece(undefined)
                setSelectedPieceCoord(undefined)
                if(x!==selectedPieceCoord?.x || y!==selectedPieceCoord?.y){
                    const newPieces = pieces.filter(p=>p.x!==x || p.y!==y).map(p=>{
                        if(p.x!==selectedPieceCoord?.x || p.y!==selectedPieceCoord?.y) return p;
                        p.x = x 
                        p.y = y
                        return p
                    })
                    setPieces(newPieces)            
                }
                selectedPiece.style.position = ""
                console.log("oujou")
            }
        }
    }

    for(var y =0;y<8;y++){
        for(var x = 0 ; x<8;x++){
            const pieceTile = pieces.filter(l=>l.x===x&&l.y===y)
            board.push(<Tile selected={selectedPieceCoord!==undefined && selectedPieceCoord.x === x && selectedPieceCoord.y === y} 
                            key={x+y*8} 
                            grabTentative={onGrabTentative({x,y})} 
                            color={(x+y)%2==0 ? "w" : "b"} 
                            piece={pieceTile.length>0 ? pieceTile[0]:undefined}/>)
        }
    }

    return <><div onMouseUp={onUngrab} onMouseMove={onMouseMove} className="chessboard" ref={boardRef}>{board}
   </div>
   <button onClick={()=>test(pieces,setPieces)}> Appuie ici</button>
   </>
}