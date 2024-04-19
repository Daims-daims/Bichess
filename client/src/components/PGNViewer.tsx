import "./Chessboard/chessboard.scss"

interface Props{
    listMove : string[]
}



function PNGMove({move}:{move:string}){
    return <div style={{display:"flex"}} className="PGNMove">
        {move}
    </div>
}

function PGNViewer({listMove}:Props){
    const body = []
    for(let i = 0 ; i < listMove.length/2;i++){
        body.push(<div style={{display:"flex"}}> 
            <div style={{paddingRight:"20px"}}>{i+1}.</div> <PNGMove move={listMove[i*2]}/> {listMove.length>i*2+1 &&  <PNGMove move={listMove[i*2+1]}/>}
        </div>)
    }

    return <div  className="PGNViewer">{body}</div>
}

export default PGNViewer