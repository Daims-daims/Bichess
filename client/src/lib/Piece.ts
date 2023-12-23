interface IPiece{
    x:number
    y:number
    color: "w" | "b"
    pathToImg : string
}



class Piece implements IPiece{
    x:number
    y:number
    color: "w" | "b"

    constructor(typePiece:string,x:number,y:number){
        const toUpperCasePiece = typePiece.toUpperCase()
        this.color = toUpperCasePiece===typePiece ? "w" :"b"
        this.x=x
        this.y=y
    }
} 