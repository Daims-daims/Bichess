class ChessboardSolid {
    board: Tile[]

    constructor(FEN : String){
        this.board=[]
        let ctrTile:number = -1
        for(var i =0; i< FEN.length;i++){
            ctrTile+=1
            const char = FEN[i]
            if(!isNaN(parseInt(char))){
                for(var j=0;j<parseInt(char);j++){
                    this.board.push(new Tile(ctrTile%8,Math.floor(ctrTile/8),ctrTile%2==0 ? "w":'b'))
                    ctrTile+=1
                }
            }
            else if(char!=="/"){
                const pieceTmp= this.createPieceFromType(char,ctrTile)
                this.board.push(new Tile(ctrTile%8,ctrTile/8,ctrTile%2==0 ? "w":'b',pieceTmp))
            }
        }

        
        if(this.board.length!=64){
            throw new Error("Wrong board length on initialization : "+this.board.length);
            
        }
    }

    private createPieceFromType(pieceType:string,ctrTile:number){
        const x  = ctrTile%8
        const y  = Math.floor(ctrTile/8)
        switch(pieceType.toLowerCase()){
            case "p":{
                return new Pawn(pieceType,x,y)
            }
            case "k":{
                return new Pawn(pieceType,x,y)
            }
            case "q":{
                return new Pawn(pieceType,x,y)
            }
            case "r":{
                return new Pawn(pieceType,x,y)
            }
            case "k":{
                return new Pawn(pieceType,x,y)
            }
            case "b":{
                return new Pawn(pieceType,x,y)
            }
            default:
                throw new Error("Piece's type not supported : "+pieceType+" at tile #"+ctrTile);
        }

    }
}
