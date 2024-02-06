

function roomRequest(_:Request,res:Response){
  let id:string  = ""
  let pseudo : string | null = null
  for (let [key, value] of l_ws) {
    console.log(key,value)
    if(value.length===1){
      console.log(value)
      if(!pseudo){
          pseudo = value[0][0]
          console.log(pseudo)
          id = key
      }
      else if (pseudo === value[0][0]){
        console.log({
          pseudo:"azeaze",
          color:"b",
          idGames : [id,key]     
        })
        console.log([id,key] )
        res.status(200).json({
          pseudo:"azeaze",
          color:"b",
          idGames : [id,key]     
        })
        break
      }
    }
  }
}