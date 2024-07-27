import FriendsDuplicate from "./FriendsRequestComponent"
import { Friend, UserRequest } from "./friendsInterface"

interface Props{
    expanded:boolean,
    updateExpanded : ()=>void,
    friendsList:Friend[],
    addFriendToList:(friendToAdd: Friend) => void,
    deleteFriendFromList:(friendToAdd: Friend) => void

}

const FriendsRequest = ({expanded,updateExpanded,addFriendToList,deleteFriendFromList,friendsList}:Props)=>{


    const listFriendsComponent = []

    for(var i = 0 ; i < friendsList.length; i++){
        listFriendsComponent.push(
            <FriendsDuplicate friendToDisplay={friendsList[i]} addFriendToList={addFriendToList} deleteFriendFromList={deleteFriendFromList}
            selected={false} 
            key={"friendRequest-"+friendsList[i].pseudo}    />
        )
    }

    return  <div className='menuBox' style={{gap:"10px"}}>
            <p  className='menuBoxHeader' 
                style={{userSelect: 'none',position:"relative",margin:"-20px",marginBottom:"-15px",padding:"20px"}}
                onClick={()=>updateExpanded()}   
                >Demandes d'ami</p>
            <div className="fadeHeight noScrollBar" style={{maxHeight:expanded ? '300px':"0px",overflowY:"scroll",overflowX:"hidden", display:"flex",flexDirection:"column",gap:"10px"}}>
                {listFriendsComponent}
            </div>
           </div>
}

export default FriendsRequest