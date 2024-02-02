import { useEffect, useRef, useState } from "react";



function useWebhook(url:string) {
    const [isReady, setIsReady] = useState(false);
    const [lastMove,setLastMove] = useState("");
    const [newMessage,setNewMessage] = useState(false)

    const ws = useRef<WebSocket>()

    useEffect(() => {
      const socket = new WebSocket(url)
      
      setIsReady(false)
  
      socket.onopen = () => setIsReady(true)
      socket.onclose = () => setIsReady(false)
      socket.onmessage = (event) => {
        setLastMove(event.data)
        setNewMessage(true)
        
    }
    
    ws.current = socket
    
    return () => {
        socket.close()
        setIsReady(false)
      }
    }, [])
  
    return [isReady, lastMove,newMessage,setNewMessage, ws.current?.send.bind(ws.current)];
  }

  export {useWebhook}