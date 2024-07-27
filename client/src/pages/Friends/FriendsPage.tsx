
import { useState } from 'react'
import '../../App.scss'
import '../../styles/constante.scss'
import {chessRoomHistoryInterface, Friend} from "./friendsInterface"
import FriendsList from './FriendsList'
import FriendsRequest from './FriendsRequest'
import FriendsAdd from './FriendsAdd'
import FriendsHistory from './FriendsHistory'
import useFriendList from '../../hooks/useFriendList'
import apiCall from '../../lib/api'

interface Props{
  pseudo : string
}



function Friends({pseudo}:Props) {

  const [friendSelected,setFriendSelected] = useState<Friend|null>(null)

  // const [friendsList, setFriendsList] = useState<Friend[]>(testFriendsList)

  const {friendList,addFriendToList,deleteFriendFromList} = useFriendList()

  const [expandedMenu,setExpandedMenu] = useState('friends')

  const [historyWithUser,setHistoryWithUser] = useState<chessRoomHistoryInterface[]>([])


  const updateExpand = (expandMenu:string)=>{
    if(expandedMenu===expandMenu)
      setExpandedMenu("")
    else
      setExpandedMenu(expandMenu)
  }

  

  const updateFriendSelected=(friendClicked:Friend)=>{
    if(! friendSelected || friendSelected.pseudo !== friendClicked.pseudo){
      setFriendSelected(friendClicked)
      getHistoryFriend(friendClicked)
    }
    else if(friendSelected.pseudo === friendClicked.pseudo)
      setFriendSelected(null)
  }

  const getHistoryFriend=(friend:Friend)=>{
    apiCall<chessRoomHistoryInterface[]>("/historyUser/"+friend.id,"GET")
      .then(r=>{console.log(r),setHistoryWithUser(r)})
  }

  console.log("friendsList",friendList)
  return <div style={{width:"100%",display:"flex",flexDirection:"row",margin:"50px  100px",alignItems:'start', gap:"50px",justifyContent:"space-around",boxSizing:'content-box',overflow:"hidden"}}>
           <div style={{width:"100%",display:"flex",flexDirection:"column",gap:"30px",maxHeight:"100%", overflow:"hidden"}}>
            <FriendsList  expanded={expandedMenu==="friends"} updateExpanded={()=>updateExpand("friends")} friendSelected={friendSelected} friendsList={friendList.filter(l=>l.accepted && ! l.pending)} updateFriendSelected={updateFriendSelected} />
            <FriendsRequest expanded={expandedMenu==="request"} friendsList={friendList.filter(l=>l.pending)} updateExpanded={()=>updateExpand("request")} addFriendToList={addFriendToList} deleteFriendFromList={deleteFriendFromList} />
            <FriendsAdd  expanded={expandedMenu==="search"} updateExpanded={()=>updateExpand("search")} friendsList={friendList} addFriendToList={addFriendToList} friendSelected={null}/>
           </div>
           <div style={{width:"100%"}}>
            {friendSelected!==null && 
             <FriendsHistory friendSelected={friendSelected} historyGames={historyWithUser}/>
            }
          </div>
        </div>
}


export default Friends
