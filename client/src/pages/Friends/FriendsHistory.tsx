import { useEffect, useState } from "react"
import { chessRoomHistoryInterface, Friend, gameResult, HistoryGame } from "./friendsInterface"
import { backEndUrl, color } from "../../Constante"


interface Props{
    friendSelected : Friend,
    historyGames:chessRoomHistoryInterface[]
}

const formatResultGame = (result:gameResult,userColor:"w"|"b")=> {
    if(result=== gameResult.White && userColor=="w" || result === gameResult.Black && userColor=="b")
        return "1 - 0"
    else if (result === gameResult.Draw)
        return "0.5 - 0.5"
    return "0 - 1"
}

const FriendsHistory = ({friendSelected,historyGames}:Props)=>{

    const gameToShow =[]

    for(let i = 0 ; i < historyGames.length;i++){
        const resultFirstBoard = formatResultGame(historyGames[i].firstBoardResult,historyGames[i].blackPieceId=== friendSelected.id ? "w":"b")
        const resultSecondBoard = formatResultGame(historyGames[i].secondBoardResult,historyGames[i].whitePieceId=== friendSelected.id ? "w":"b")
        const totalResult = parseFloat(resultFirstBoard.split(" - ")[0]) + parseFloat(resultSecondBoard.split(" - ")[0])
        gameToShow.push(
            <p key ={"gameHistory"+i} >{historyGames[i].dateGame.toString()} : {totalResult}/2 <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                Partie 1 : {resultFirstBoard}&nbsp;&nbsp;&nbsp;
                Partie 2 : {resultSecondBoard}
            </p>
        )
    }

    return <div className='menuBox'>
            <p className='menuBoxHeader'>Historique des parties : {friendSelected.pseudo}</p>
            {historyGames.length>0 && gameToShow}
            {historyGames.length===0 && <p style={{color:color.primary_color,fontSize:"18px"}}>Aucune partie jouée avec cet ami pour le moment </p>}
          </div>

}

export default FriendsHistory