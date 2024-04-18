import { backBaseUrl } from "../Constante"

interface Player{
    color:"w" | "b",
    idGames : string    
}

function JoinRoom({onChoicePlayer}:{onChoicePlayer:(p:string,c:string,i:string)=>void}){

    const createRoom = async (pseudo:string)=>{
        console.log("http://localhost:3030/room/"+pseudo)
        const cred =  await fetch("http://localhost:3030/room/"+pseudo,{
            method:"GET"
        })
        const res:Player = await cred.json()
        onChoicePlayer(pseudo,res.color,res.idGames)
    }


    return <div>
        <div className="btn" onClick={()=>createRoom("Jean")}>
            Queue for a game (Jean)
        </div>
        <div className="btn" onClick={()=>createRoom("Jhon")}>
            Queue for a game (John)
        </div>
    </div>
}

export {JoinRoom}