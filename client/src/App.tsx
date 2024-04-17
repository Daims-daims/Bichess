
import { useState } from 'react'
import './App.scss'
import './styles/constante.scss'
import ChessGame from './components/ChessGame'
import { JoinRoom } from './components/JoinRoom'
import LogInScreen from './components/LogInComponent/LogInScreen'

function App() {

  const [colorFirstBoard,setColorFirstBoard] = useState<"w"|"b">()
  const [roomId,setRoomId] = useState<string>()
  const [player,setPlayer] = useState<string>()

  const onChoicePlayer = (player : string, color:string,roomId:string)=>{
    if(color==="w" || color==="b") setColorFirstBoard(color)
    setRoomId(roomId)
    setPlayer(player)
  }

  return <div className='App'>
    { ! player && <LogInScreen/>}
    { ! roomId && <JoinRoom onChoicePlayer={onChoicePlayer}/>}
   {player &&  colorFirstBoard && roomId &&  <ChessGame key={"chessboard-1"} pseudo={player} withPGNViewer={false} invert={colorFirstBoard==="b"} roomId={roomId} colorPlayer={colorFirstBoard} indexBoard={1}/>}
   {player &&  colorFirstBoard&& roomId  && <ChessGame key={"chessboard-2"} pseudo={player} withPGNViewer={false} invert={colorFirstBoard==="w"} roomId={roomId} colorPlayer={colorFirstBoard==="w" ? "b" : "w"} indexBoard={2}/>}
    </div>
}


export default App
