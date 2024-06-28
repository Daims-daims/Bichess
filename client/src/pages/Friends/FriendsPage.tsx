
import { useEffect, useState } from 'react'
import '../../App.scss'
import ClassicButton from '../../components/Button/ClassicButton'
import '../../styles/constante.scss'
import { backEndUrl } from '../../Constante'
import {Friend} from "./friendsInterface"
import FriendsList from './FriendsList'
import FriendsRequest from './FriendsRequest'
import FriendsAdd from './FriendsAdd'
import { testFriendsList } from './friendsDataExample'
import FriendsHistory from './FriendsHistory'

interface Props{
  pseudo : string
}



function Friends({pseudo}:Props) {

  const [friendSelected,setFriendSelected] = useState<Friend|null>(null)

  const [friendsList, setFriendsList] = useState<Friend[]>(testFriendsList)

  const [expandedMenu,setExpandedMenu] = useState('friends')


  const updateExpand = (expandMenu:string)=>{
    if(expandedMenu===expandMenu)
      setExpandedMenu("")
    else
      setExpandedMenu(expandMenu)
  }


  // useEffect(() => {
  //   const responseFriendsList = fetch(backEndUrl+"/friends/"+pseudo)
  //   responseFriendsList.then(response=>{
  //     response.json().then(friends=>setFriendsList(friends))
  //   })
  // },[])

  const updateFriendSelected=(friendClicked:Friend)=>{
    if(! friendSelected)
      setFriendSelected(friendClicked)
    else if(friendSelected.pseudo === friendClicked.pseudo)
      setFriendSelected(null)
    else 
    setFriendSelected(friendClicked)
    }

  return <div style={{width:"100%",display:"flex",flexDirection:"row",margin:"50px  100px",alignItems:'start', gap:"50px",justifyContent:"space-around",boxSizing:'content-box',overflow:"hidden"}}>
           <div style={{width:"100%",display:"flex",flexDirection:"column",gap:"30px",maxHeight:"100%", overflow:"hidden"}}>
            <FriendsList  expanded={expandedMenu==="friends"} updateExpanded={()=>updateExpand("friends")} friendSelected={friendSelected} friendsList={friendsList} updateFriendSelected={updateFriendSelected} />
            <FriendsRequest expanded={expandedMenu==="request"} updateExpanded={()=>updateExpand("request")} />
            <FriendsAdd  expanded={expandedMenu==="search"} updateExpanded={()=>updateExpand("search")} friendsList={[]} friendSelected={null}/>
           </div>
           <div style={{width:"100%"}}>
            {friendSelected!==null && 
             <FriendsHistory friendSelected={friendSelected}/>
            }
          </div>
        </div>
}


export default Friends
