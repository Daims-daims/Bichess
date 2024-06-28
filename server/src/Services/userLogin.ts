import { Model } from "sequelize";
import User from "../models/user.model";
import { addDaysToDate } from "../utils/date"
const { v4: uuidv4 } = require('uuid');

export function generateSession(){

    const endDate = addDaysToDate(new Date(),1)
    const tokenId = uuidv4()

    return {tokenId,endDate}
}

interface returnRetrieveSession{
    status:number
    message:string
    user?:Model<any, any>
}

export async function retrieveSession(sessionToken: string):Promise<returnRetrieveSession>{

    const userQuery = await User.findAll({
        where:{
          tokenId:sessionToken
        } })
    if(userQuery.length===0){
        return {
                status:401,
                message:"no_user_with_token"
            }
    }
    else{
        const user = userQuery[0]
        if(user.getDataValue("tokenValidity")<new Date()){
            user.update({tokenId:null,tokenValidity:null})
            return {
                status:401,
                message:"token_outdated"
            }
        }
        else{
            return {
                status:200,
                message:"ok",
                user:user
            }
        }
    }
}