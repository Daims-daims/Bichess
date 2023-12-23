

class Tile{
    piece? : Piece
    x:number
    y:number
    color : "w" | "b"

    constructor(x:number,y:number,color:"w" | "b",piece?:Piece){
        this.x=x
        this.y=y
        this.color=color
        this.piece = piece
    }

    addPiece(piece:Piece){
        this.piece=piece
    }
}