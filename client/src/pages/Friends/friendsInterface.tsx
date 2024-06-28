
interface Friend{
    pseudo : string,
    numberGame : number,
    score : number
  }

interface UserRequest extends Friend{
  requestSent:boolean
}

interface HistoryGame{
  dateGame : Date,
  scoreFirstGame : number,
  scoreSecondGame : number
}



export type {Friend,UserRequest,HistoryGame}