
import { useEffect, useState } from 'react'
import './App.scss'
import './styles/constante.scss'
import LogInScreen from './components/LogInComponent/LogInScreen'
import { useCookies } from 'react-cookie'
import LeftBar from './components/LeftBar/LeftBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game/GameFinder'
import FriendsPage from './pages/Friends/FriendsPage'
import History from './pages/History'
import Profile from './pages/Profile'
import GameRoom from './pages/Game/GameRoom'
import useAccountStore from './hooks/useAccountStore'
import {useAuth} from './hooks/useAuth'

function App() {

  const [cookies,_] = useCookies(['access_token'])
  // const [colorFirstBoard,setColorFirstBoard] = useState<"w"|"b">()
  // const [roomId,setRoomId] = useState<string>()
  const { account } = useAccountStore();
  const { logout } = useAuth()

  const { authenticate } = useAuth();

  useEffect(() => authenticate(), [])

  console.log("cookies",cookies.access_token)


  // const onChoicePlayer = (player : string, color:string,roomId:string)=>{
  //   if(color==="w" || color==="b") setColorFirstBoard(color)
  //   setRoomId(roomId)
  //   setPlayer(player)
  // }

  return <BrowserRouter>
      { (account?.status ==="guest" || !account?.pseudo) && <LogInScreen/>}
      { account?.status ==="authenticated" && account?.pseudo && <div className='App'><Routes>
          <Route path="/" element={<Home  player={account.pseudo}/>}/>
          <Route path="/game" element={<Game pseudo={account.pseudo}/>}/>
          <Route path="/game/*" element={<GameRoom pseudo={account.pseudo}/>}/>
          <Route path="/friends" element={<FriendsPage pseudo={account.pseudo} />}/>
          <Route path="/history" element={<History />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="*" element={<Home player={account.pseudo}/>}/>
        </Routes>
        </div>}
      <LeftBar logOut={logout}/>
      </BrowserRouter>
}


export default App
