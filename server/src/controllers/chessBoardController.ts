import chessBoard from "../models/chessBoard.model"


const updatePGNBoard = async function (boardId: number, PGN: string) {
    chessBoard.update({ PGN: PGN }, { where: { id: boardId } })
}

const updateResultBoard = async function (boardId: number, result: 'white' | 'draw' | 'black') {
    chessBoard.update({ result: result }, { where: { id: boardId } })
}

export {updatePGNBoard,updateResultBoard}