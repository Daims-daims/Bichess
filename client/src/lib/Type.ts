
interface IPiece{
    x:number
    y:number
    color: "w" | "b",
    hasAlreadyMoved:boolean,
    pieceType:string,
    pathToImg : string,
}
interface coordinate{
    x:number,
    y:number
}

export type {IPiece,coordinate}