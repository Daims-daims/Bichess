import { FaHistory } from "react-icons/fa"
import LeftBarMenu from "./LeftBarMenu"
import { backEndUrl } from "../../Constante"
import apiCall from "../../lib/api"
import { Friend } from "../../pages/Friends/friendsInterface"


const TestMenu = function(){

    const testOnClic = function(){
        // fetch(backEndUrl+"/testCreateRoom")
        apiCall<Friend[]>("/friends","GET").then(r=>{console.log("friendlist : \n");console.log(r)})
    }

    return <LeftBarMenu Icon={FaHistory} link={location.pathname} onClic={testOnClic} text="Test" isActive={false}  />
     
}

export default TestMenu