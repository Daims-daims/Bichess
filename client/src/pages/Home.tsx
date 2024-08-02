
import { useState } from 'react'
import '../App.scss'
import '../styles/constante.scss'
import ChessGame from '../components/ChessGame'

interface Props{
  player:string
}


function Home({player}:Props) {

  return <div style={{height:"100%",width:"100%",display:"flex",flexDirection:"row",gap:"50px",justifyContent:"center"}}>
   <ChessGame onlineGame={false} key={"chessboard-1"} pseudo={player} withPGNViewer={false} invert={false}  colorPlayer={"w"} indexBoard={1}/>
   <ChessGame onlineGame={false} key={"chessboard-2"} pseudo={player} withPGNViewer={false} invert={true} colorPlayer={"b"} indexBoard={2}/>
    </div>
}


export default Home
