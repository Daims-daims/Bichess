

const mapResultToScore={
    "white":1,
    "draw":0.5,
    "black":0,
}

const invertScore = function(score:number){
    return (score-1)*(-1)
}
const getScorePlayer = function (player:1|2,resultBoard_1:"white"|"draw"|"black"|"",resultBoard_2:"white"|"draw"|"black"|""){
        let result = 0
        if(resultBoard_1!=""){
            result+= player==1 ? mapResultToScore[resultBoard_1] : invertScore(mapResultToScore[resultBoard_1]) 
        }
        if(resultBoard_2!=""){
            result+= player==2 ? mapResultToScore[resultBoard_2] : invertScore(mapResultToScore[resultBoard_2]) 
        }
        return result
    }

export default getScorePlayer