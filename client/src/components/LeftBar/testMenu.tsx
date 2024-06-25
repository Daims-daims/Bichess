import { FaHistory } from "react-icons/fa"
import LeftBarMenu from "./LeftBarMenu"
import { backEndUrl } from "../../Constante"


const TestMenu = function(){

    const testOnClic = function(){
        fetch(backEndUrl+"/testCreateRoom")
    }

    return <LeftBarMenu Icon={FaHistory} link={location.pathname} onClic={testOnClic} text="Test" isActive={false}  />
     
}

export default TestMenu