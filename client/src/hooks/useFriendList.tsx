import { useCallback, useEffect, useState } from "react"
import { Friend } from "../pages/Friends/friendsInterface"
import apiCall from "../lib/api"




const useFriendList =  ()=>{

    const [friendList,setFriendList] = useState<Friend[]>([])

    useEffect(()=>{
        apiCall<Friend[]>("/friends","GET").then(r=>{console.log("friendlist : \n"+r);setFriendList(r)})
    },[])

    const refreshFriendList = useCallback(() => {
        apiCall<Friend[]>("/friends","GET").then(r=>{console.log("friendlist : \n"+r);setFriendList(r)})
      }, [])


    return {
            friendList,
            refreshFriendList
            } 

}

export default useFriendList