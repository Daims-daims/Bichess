
import { useState } from 'react'
import '../App.scss'
import '../styles/constante.scss'
import ChessGame from '../components/ChessGame'
import { JoinRoom } from '../components/JoinRoom'
import LogInScreen from '../components/LogInComponent/LogInScreen'
import { useCookies } from 'react-cookie'
import LeftBar from '../components/LeftBar/LeftBar'

function AppTest() {

  const [cookies,setCookies] = useCookies(['access_token'])
  const [colorFirstBoard,setColorFirstBoard] = useState<"w"|"b">()
  const [roomId,setRoomId] = useState<string>()
  const [player,setPlayer] = useState<string>()

  console.log(cookies.access_token)
  if(cookies.access_token && player!==cookies.access_token){
    console.log("logged In : "+cookies.access_token)
    setPlayer(cookies.access_token)
  }

  const onChoicePlayer = (player : string, color:string,roomId:string)=>{
    if(color==="w" || color==="b") setColorFirstBoard(color)
    setRoomId(roomId)
    setPlayer(player)
  }

  return <div className='App'>
    { ! player && <LogInScreen/>}
    <LeftBar logOut={()=>{setPlayer(undefined);setCookies("access_token",undefined)}}/>
    <p>{player}</p>
    { ! roomId && <JoinRoom onChoicePlayer={onChoicePlayer}/>}
   {player &&  colorFirstBoard && roomId &&  <ChessGame key={"chessboard-1"} pseudo={player} withPGNViewer={false} invert={colorFirstBoard==="b"} roomId={roomId} colorPlayer={colorFirstBoard} indexBoard={1}/>}
   {player &&  colorFirstBoard&& roomId  && <ChessGame key={"chessboard-2"} pseudo={player} withPGNViewer={false} invert={colorFirstBoard==="w"} roomId={roomId} colorPlayer={colorFirstBoard==="w" ? "b" : "w"} indexBoard={2}/>}
    </div>
}


export default AppTest
