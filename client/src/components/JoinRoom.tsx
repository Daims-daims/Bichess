
interface Player{
    pseudo:string,
    color:"w" | "b",
    idGames : string[]    
}

function JoinRoom({onChoicePlayer}:{onChoicePlayer:(p:string,c:string,i:string[])=>void}){

    const createRoom = async ()=>{
        const cred =  await fetch("http://localhost:3030/room",{
            method:"POST"
        })
        console.log(cred)
        console.log(cred.body)
        const res:Player = await cred.json()
        console.log(res)
        onChoicePlayer(res.pseudo,res.color,res.idGames)
    }

    const joinRoom = async ()=>{
        const cred =  await fetch("http://localhost:3030/room",{
            method:"GET"
        })
        const res:Player = await cred.json()
        console.log(res)
        onChoicePlayer(res.pseudo,res.color,res.idGames)
    }

    return<div  >
        <div className="btn" onClick={createRoom}>
            Create a room
        </div>
        <div className="btn" onClick={joinRoom}>
            Join a room
        </div>
    </div>
}

export {JoinRoom}