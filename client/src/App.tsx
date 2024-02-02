
import { useState } from 'react'
import './App.css'
import ChessGame from './components/ChessGame'
import { JoinRoom } from './components/JoinRoom'

function App() {

  const [player,setPlayer] = useState<string>()
  const [colorFirstBoard,setColorFirstBoard] = useState<"w"|"b">()
  const [idGames,setIDGames] = useState<string[]>()

  const onChoicePlayer = (pseudo:string,color:string,idGamesWs:string[])=>{
    setPlayer(pseudo)
    if(color==="w" || color==="b") setColorFirstBoard(color)
    setIDGames(idGamesWs)
  }

  return <div className='App'>
    { ! player && <JoinRoom onChoicePlayer={onChoicePlayer}/>}
   { player && colorFirstBoard && idGames && idGames.length===2 &&  <ChessGame key={"chessboard-1"} withPGNViewer={false} invert={colorFirstBoard==="b"} pseudo={player} idGame={idGames[0]} colorPlayer={colorFirstBoard}/>}
   { player && colorFirstBoard&& idGames && idGames.length===2 && <ChessGame key={"chessboard-2"} withPGNViewer={false} invert={colorFirstBoard==="w"} pseudo={player} idGame={idGames[1]} colorPlayer={colorFirstBoard==="w" ? "b" : "w"}/>}
    </div>
}


export default App
