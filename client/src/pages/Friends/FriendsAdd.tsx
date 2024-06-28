import {useState } from "react"
import {Friend,UserRequest} from "./friendsInterface"
import { backEndUrl, color } from "../../Constante"
import "../../components/FormInput/formComponent.scss"
import ClassicButton from "../../components/Button/ClassicButton"

import { testUserList } from "./friendsDataExample"

import FriendsUserComponent from "./FriendsUserComponent"
interface Props{
    expanded:boolean,
    updateExpanded : ()=>void,
    friendsList:Friend[],
    friendSelected:Friend|null
}

// eslint-disable-next-line @typescrxipt-eslint/no-unused-vars
const FriendsAdd = ({expanded,updateExpanded,friendsList}:Props)=>{

    const [loading,setLoading] = useState(false)
    const [requestUserList,setRequestUserList] = useState<UserRequest[]>(testUserList)
    const [searchInput,setSearchInput] = useState("")

    

    const searchUser = ()=>{
        if(searchInput===""){
            setLoading(false)
            return 
        }
        const response = fetch(backEndUrl+"/searchUser?searchInput="+searchInput)
        response.then(r=>
                r.json().then(({listUser})=>
                    {setLoading(false)
                    setRequestUserList(listUser)}
                )
        )
    }

    const handleSearchChange = (e:React.FormEvent<HTMLInputElement>)=>{
        // setLoading(true)
        setSearchInput(e.currentTarget.value)
        searchUser()
    }

    const listUserToDisplay = []   
    for(let i = 0 ; i < requestUserList.length;i++){
        listUserToDisplay.push(<FriendsUserComponent userToDisplay={requestUserList[i]} selected={false} updateUserRequest={function (userToUpdate: UserRequest): void {
            setRequestUserList([...requestUserList.map(l=>{
                if(l.pseudo===userToUpdate.pseudo)
                    l.requestSent = true
                return l
            })])
        } } />)
    }

    return  <div className='menuBox' style={{gap:"20px"}}>
                <p  className='menuBoxHeader' 
                    style={{userSelect: 'none',position:"relative",margin:"-20px",marginBottom:"-15px",padding:"20px"}}
                    onClick={()=>updateExpanded()}   
                    >Ajouter un ami</p>
                    {expanded && <div style={{display:"flex",gap:"10px",width:"100%"}}>
                        <div style={{backgroundColor:color.primary_color_fade,padding:"10px",borderRadius:"5px",width:"100%"}}>
                            <input  style={{width:"100%",color:color.primary_color,fontSize:"16px",fontWeight:800}}
                                    className="placeHolderPrimary"
                                    type="text" 
                                    placeholder="Nom de l'utilisateur" 
                                    name="SearchUser" 
                                    value={searchInput} 
                                    onChange={handleSearchChange} />
                        </div>
                        <ClassicButton clickAction={searchUser} text="Rechercher" />
                    </div>}
                {expanded && searchInput!=="" && <p style={{ color: color.primary_color, fontSize: "26px", fontWeight: 700 }}> Résultat de la recherche </p>}
                {expanded && searchInput!=="" && !loading && <div className="fadeHeight" style={{ maxHeight: expanded ? '300px' : "0px", overflow: "scroll" }}>
                    {listUserToDisplay}
                </div>}
                {expanded && searchInput!=="" && loading && <p style={{ color: color.primary_color, marginLeft:"20px",fontSize: "18px", fontWeight: 600 }}> Chargement </p>}
           </div>
}

export default FriendsAdd