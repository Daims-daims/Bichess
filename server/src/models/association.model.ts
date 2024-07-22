import chessBoard from "./chessBoard.model"
import chessRoomModel from "./chessRoom.model"
import Friend from "./friends.model";
import User from "./user.model"

User.hasMany(Friend, { as: 'SentRequests', foreignKey: 'requestSenderId' });
User.hasMany(Friend, { as: 'ReceivedRequests', foreignKey: 'requestReceiverId' });
Friend.belongsTo(User, { as: 'Sender', foreignKey: 'requestSenderId' });
Friend.belongsTo(User, { as: 'Receiver', foreignKey: 'requestReceiverId' });

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
