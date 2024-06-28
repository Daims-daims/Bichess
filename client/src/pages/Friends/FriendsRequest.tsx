
interface Props{
    expanded:boolean,
    updateExpanded : ()=>void,
}

const FriendsRequest = ({expanded,updateExpanded}:Props)=>{


    return  <div className='menuBox' style={{gap:"10px"}}>
            <p  className='menuBoxHeader' 
                style={{userSelect: 'none',position:"relative",margin:"-20px",marginBottom:"-15px",padding:"20px"}}
                onClick={()=>updateExpanded()}   
                >Demandes d'ami</p>
            {expanded && <p> Expanded</p>}
           </div>
}

export default FriendsRequest