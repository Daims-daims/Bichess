function ResultGame({result}:{result:string}){
    let txt =""
    if(result ==="draw"){
        txt="1/2-1/2"
    }
    else if (result==="white"){
        txt = "1-0"
    }
    else{
        txt = "0-1"
    }
    return <div className="winnerDiv" >
                <div className="resultGame">{txt}</div> 
            </div>
}

export {ResultGame}