import { useCallback, useEffect, useState } from "react"
import apiCall from "../lib/api"
import { Friend, UserRequest } from "../pages/Friends/friendsInterface"




const userSearchUser =  (listFriends:Friend[])=>{

    const [userListResult,setUserListResult] = useState<UserRequest[]>([])


    const searchUser = useCallback((pseudo : string) => {
        apiCall<UserRequest[]>("/searchUser/"+pseudo,"GET").then(r=>setUserListResult(r.map(l=>
           {
            const friendInList = listFriends.find(f=>f.pseudo===l.pseudo)
            let status : "friend" | "pending" | "none" ="none"
            console.log("pseudo",pseudo)
            console.log(friendInList)
            console.log(listFriends)
            if(friendInList?.accepted) status = "friend"
            if(friendInList?.pending) status = "pending"
            return {
                ...l,
                statusFriend : status
            }
        }).filter(l=>l.statusFriend!=="friend")    
    ))
      }, [listFriends])

      const updateUserList = useCallback((userToUpdate:UserRequest)=>{
        setUserListResult(l=>[...l.map(elem=>{
            if(elem.id!== userToUpdate.id)
                return elem
            return {
                ...elem,
                statusFriend:userToUpdate.statusFriend
            }
        })])
      },[])


    return {
        userListResult,
        searchUser,
        updateUserList
        } 

}

export default userSearchUser