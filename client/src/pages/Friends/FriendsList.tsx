import {Friend} from "./friendsInterface"
import FriendsComponent from "./FriendsComponent"

interface Props{
    expanded:boolean,
    updateExpanded : ()=>void,
    friendsList:Friend[],
    friendSelected:Friend|null,
    updateFriendSelected : (f:Friend)=>void
}

const FriendsList = ({expanded,updateExpanded,friendsList,friendSelected,updateFriendSelected}:Props)=>{


     const listFriendsToDisplay = []   
    for(let i = 0 ; i < friendsList.length;i++){
        listFriendsToDisplay.push(<FriendsComponent key={friendsList[i].pseudo} 
                                                    selected={friendSelected !==null && friendSelected.pseudo === friendsList[i].pseudo}
                                                    onClickGeneral={updateFriendSelected} friendToDisplay={friendsList[i]}/>)
    }

    return  <div className='menuBox' style={{gap:"10px"}}>
            <p  className='menuBoxHeader' 
                style={{userSelect: 'none',position:"relative",margin:"-20px",marginBottom:"-15px",padding:"20px"}}
                onClick={()=>updateExpanded()}   
                >Liste d'amis</p>
            <div className="fadeHeight" style = {{maxHeight:expanded ? '300px':"0px",overflow:"scroll"}}>
                {listFriendsToDisplay}
            </div>
           </div>
}

export default FriendsList