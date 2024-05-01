import GameFinder from "./GameFinder"

interface Props{
    player : string
}


const Game = ({player}:Props)=>{

    const selectedRoom = location.pathname.split("/")
    console.log(selectedRoom)

    return <GameFinder pseudo={player}/>
}


export default Game