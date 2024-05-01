
import { useState } from 'react'
import './App.scss'
import './styles/constante.scss'
import LogInScreen from './components/LogInComponent/LogInScreen'
import { useCookies } from 'react-cookie'
import LeftBar from './components/LeftBar/LeftBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import TestPage from './pages/History'
import Game from './pages/Game/GameFinder'
import Friends from './pages/Friends'
import History from './pages/History'
import Profile from './pages/Profile'
import GameRoom from './pages/Game/GameRoom'

function App() {

  const [cookies,setCookies] = useCookies(['access_token'])
  // const [colorFirstBoard,setColorFirstBoard] = useState<"w"|"b">()
  // const [roomId,setRoomId] = useState<string>()
  const [player,setPlayer] = useState<string>()

  console.log(cookies.access_token)
  if(cookies.access_token && player!==cookies.access_token){
    console.log("logged In : "+cookies.access_token)
    setPlayer(cookies.access_token)
  }

  // const onChoicePlayer = (player : string, color:string,roomId:string)=>{
  //   if(color==="w" || color==="b") setColorFirstBoard(color)
  //   setRoomId(roomId)
  //   setPlayer(player)
  // }

  return <BrowserRouter>
      { ! player && <LogInScreen/>}
      { player && <div className='App'><Routes>
          <Route path="/" element={<Home  player={player}/>}/>
          <Route path="/game" element={<Game pseudo={player}/>}/>
          <Route path="/game/*" element={<GameRoom pseudo={player}/>}/>
          <Route path="/friends" element={<Friends />}/>
          <Route path="/history" element={<History />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="*" element={<Home player={player}/>}/>
        </Routes>
        </div>}
      <LeftBar logOut={()=>{setPlayer(undefined);setCookies("access_token",undefined)}}/>
      </BrowserRouter>
}


export default App
