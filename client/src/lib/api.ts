

const apiCall = async function<T>(endpoint:string,method:"GET"|"POST"|"DELETE",bodyRequest?:Object) : Promise<T>{



    const response = await fetch("http://localhost:3030"+endpoint,{
        method:method,
        body: bodyRequest ? JSON.stringify(bodyRequest) : null ,
        credentials: 'include',
        headers:{
            "content-type":"application/json"
        }
    })
    return response.json()
    
}

export default apiCall