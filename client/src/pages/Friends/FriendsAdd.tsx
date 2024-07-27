import {useState } from "react"
import {Friend,UserRequest} from "./friendsInterface"
import { color } from "../../Constante"
import "../../components/FormInput/formComponent.scss"
import ClassicButton from "../../components/Button/ClassicButton"

import FriendsUserComponent from "./FriendsUserComponent"
import useSearchUser from "../../hooks/useSearchUser"
import apiCall from "../../lib/api"
interface Props{
    expanded:boolean,
    updateExpanded : ()=>void,
    friendsList:Friend[],
    friendSelected:Friend|null,
    addFriendToList:(friendToAdd: Friend) => void,
}

interface ResultResponseRequest{
    status : 'ok' | 'error'
}

// eslint-disable-next-line @typescrxipt-eslint/no-unused-vars
const FriendsAdd = ({expanded,updateExpanded,friendsList,addFriendToList}:Props)=>{

    const [loading,setLoading] = useState(false)
    const [searchInput,setSearchInput] = useState("")

    const {userListResult,searchUser,updateUserList} = useSearchUser(friendsList)

    const handleSearchChange = (e:React.FormEvent<HTMLInputElement>)=>{
        // setLoading(true)
        searchUser(e.currentTarget.value)
        setSearchInput(e.currentTarget.value)
    }

    const confirmSearch = ()=>{
        searchUser(searchInput)
    }

    const sendFriendRequest =(userToAdd:UserRequest)=>{
        apiCall<ResultResponseRequest>('/sendFriendRequest','POST',{
            "idFriendRequest":userToAdd.id
        }).then(r=>{
            console.log(r)
            if(r.status==='ok'){
                const tmpFriend:Friend = {
                    id : userToAdd.id,
                    pseudo:userToAdd.pseudo,
                    accepted:false,
                    isReceiver:false,
                    pending:true,
                    numberGame:0,
                    score:0
                }
                addFriendToList(tmpFriend)
                userToAdd.statusFriend='pending'
                updateUserList(userToAdd)
            }
        })
    }

    const listUserToDisplay = []   
    for(let i = 0 ; i < userListResult.length;i++){
        listUserToDisplay.push(<FriendsUserComponent key={'friendsAdd- '+userListResult[i].id} userToDisplay={userListResult[i]} selected={false} sendFriendRequest={sendFriendRequest} />)
    }

    return  <div className='menuBox' style={{gap:"20px"}}>
                <p  className='menuBoxHeader' 
                    style={{userSelect: 'none',position:"relative",margin:"-20px",marginBottom:"-15px",padding:"20px"}}
                    onClick={()=>updateExpanded()}   
                    >Ajouter un ami</p>
            <div className="fadeHeight noScrollBar" style={{maxHeight:expanded ? '300px':"0px",overflowY:"scroll",overflowX:"hidden", display:"flex",flexDirection:"column",gap:"20px"}}>
                    {<div style={{display:"flex",gap:"10px",width:"100%"}}>
                        <div style={{backgroundColor:color.primary_color_fade,padding:"10px",borderRadius:"5px",width:"100%"}}>
                            <input  style={{width:"100%",color:color.primary_color,fontSize:"16px",fontWeight:800}}
                                    className="placeHolderPrimary"
                                    type="text" 
                                    placeholder="Nom de l'utilisateur" 
                                    name="SearchUser" 
                                    value={searchInput} 
                                    onChange={handleSearchChange} />
                        </div>
                        <ClassicButton clickAction={confirmSearch} text="Rechercher" />
                    </div>}
                {searchInput!=="" && <p style={{ color: color.primary_color, fontSize: "26px", fontWeight: 700 }}> Résultat de la recherche </p>}
                {searchInput!=="" && !loading && <div>
                    {listUserToDisplay}
                </div>}
                {searchInput!=="" && loading && <p style={{ color: color.primary_color, marginLeft:"20px",fontSize: "18px", fontWeight: 600 }}> Chargement </p>}
                </div>
           </div>
}

export default FriendsAdd