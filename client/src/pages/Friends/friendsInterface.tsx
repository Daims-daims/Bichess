import { User } from "../../type"

export enum gameResult{
  White,
  Black,
  Draw
}

export interface Friend{
    id:number,
    pseudo : string,
    numberGame : number,
    score : number,
    accepted:boolean,
    pending:boolean,
    isReceiver:boolean
  }

export interface UserRequest extends User{
  statusFriend:"friend" | "pending" | "none"
}

export interface HistoryGame{
  dateGame : Date,
  scoreFirstGame : number,
  scoreSecondGame : number
}


export interface chessRoomHistoryInterface{
  whitePieceId:number,
  blackPieceId:number,
  firstBoardResult:gameResult,
  secondBoardResult:gameResult,
  dateGame:Date,
  gameRoomId:string
}