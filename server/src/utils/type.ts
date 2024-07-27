

export enum gameResult{
    White,
    Black,
    Draw
}

export interface userInterface{
    pseudo:string,
    id:number,
}

export interface friendInterface{
    pseudo : string,
    numberGame : number,
    score : number,
    pending : boolean,
    accepted:boolean,
    isReceiver:boolean
}

export interface chessRoomHistoryInterface{
    whitePieceId:number,
    blackPieceId:number,
    firstBoardResult:gameResult,
    secondBoardResult:gameResult,
    dateGame:Date,
    gameRoomId:string
}
