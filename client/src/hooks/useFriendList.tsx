import { useCallback, useEffect, useState } from "react"
import { Friend } from "../pages/Friends/friendsInterface"
import apiCall from "../lib/api"




const useFriendList =  ()=>{

    const [friendList,setFriendList] = useState<Friend[]>([])

    useEffect(()=>{
        apiCall<Friend[]>("/friends","GET").then(r=>setFriendList(r.sort(sortFunctionFriendList)))
    },[])

    const refreshFriendList = useCallback(() => {
        apiCall<Friend[]>("/friends","GET").then(r=>setFriendList(r.sort(sortFunctionFriendList)))
      }, [])

    const addFriendToList = useCallback((friendToAdd:Friend) => {
      console.log("adding friend to list");
      console.log([...friendList,friendToAdd].sort());
      
      
      setFriendList(l=>[...l.filter(elem=>elem.id!==friendToAdd.id),friendToAdd].sort())
    }, [])

    const deleteFriendFromList = useCallback((friendToDelete:Friend) => {
      setFriendList(list=>[...list.filter(l=>l.id!==friendToDelete.id)])
    }, [])

    return {
            friendList,
            refreshFriendList,
            addFriendToList,
            deleteFriendFromList
            } 

}

const sortFunctionFriendList=(friendA:Friend,friendB:Friend)=>{
  const scoreFriendA = getScoreFriend(friendA)
  const scoreFriendB = getScoreFriend(friendB)
 
  if(scoreFriendA!=scoreFriendB)
    return scoreFriendA - scoreFriendB
 
  if(friendA.numberGame!=friendB.numberGame)
    return friendB.numberGame - friendA.numberGame
 
  return friendA.pseudo.localeCompare(friendB.pseudo)

  
}

const getScoreFriend=(friend:Friend)=>{
  if(!friend.pending && friend.accepted)
    return 0
  else if (friend.pending)
    return friend.isReceiver ? 1 : 2
  return 3
}

export default useFriendList