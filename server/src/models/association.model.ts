import chessBoard from "./chessBoard.model"
import chessRoomModel from "./chessRoom.model"
import User from "./user.model"

User.belongsToMany(User, { through: 'Friends', as: 'friends', foreignKey: 'userId' })

User.belongsTo(chessRoomModel,{as:"firstPlayer"})
User.belongsTo(chessRoomModel,{as:"secondPlayer"})
chessRoomModel.hasOne(User,{as : "firstPlayer"})
chessRoomModel.hasOne(User,{as : "secondPlayer"})

chessBoard.belongsTo(chessRoomModel,{as:"firstBoard"})
chessBoard.belongsTo(chessRoomModel,{as:"secondBoard"})
chessRoomModel.hasOne(chessBoard,{as : "firstBoard"})
chessRoomModel.hasOne(chessBoard,{as : "secondBoard"})