import { useEffect, useState } from "react"
import { Friend, HistoryGame } from "./friendsInterface"
import { backEndUrl, color } from "../../Constante"


interface Props{
    friendSelected : Friend
}

const FriendsHistory = ({friendSelected}:Props)=>{

    const [listGame,setListGame] = useState<HistoryGame[]>([])

    useEffect(()=>{
        const response = fetch(backEndUrl+"/history?=userSelected="+friendSelected.pseudo)
        response.then(l=>l.json().then(({gameHistory})=>setListGame(gameHistory)))
    },[friendSelected])

    const gameToShow =[]

    for(let i = 0 ; i < listGame.length;i++){
        gameToShow.push(
            <p>listGame[i].scoreFirstGame</p>
        )
    }

    return <div className='menuBox'>
            <p className='menuBoxHeader'>Historique des parties : {friendSelected.pseudo}</p>
            {listGame.length>0 && gameToShow}
            {listGame.length===0 && <p style={{color:color.primary_color,fontSize:"18px"}}>Aucune partie jouée avec cet ami pour le moment </p>}
          </div>

}

export default FriendsHistory