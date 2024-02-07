
import {wssList} from "../index"


function roomRequest(_:Request,res:Response){
  const {pseudo,color,roomId} = wssList.requestRoom()

}

export {roomRequest}