import chessBoard from "./chessBoard.model"
import chessRoomModel from "./chessRoom.model"
import User from "./user.model"

User.belongsToMany(User, { through: 'Friends', as: 'friends', foreignKey: 'userId' })

User.hasMany(chessRoomModel,{
    foreignKey:'whitePiecesId',
    as:'whitePieces'
})
chessRoomModel.belongsTo(User,{
    as:"whitePieces"
})

User.hasMany(chessRoomModel,{
    foreignKey:'blackPiecesId',
    as:'blackPieces'
})
chessRoomModel.belongsTo(User,{
    as:"blackPieces"
})


chessRoomModel.belongsTo(chessBoard,{as : "firstBoard"})
chessRoomModel.belongsTo(chessBoard,{as : "secondBoard"})
chessBoard.hasOne(chessRoomModel,{foreignKey:"firstBoardId",as:"firstBoard"})
chessBoard.hasOne(chessRoomModel,{foreignKey:"secondBoardId",as:"secondBoard"})
