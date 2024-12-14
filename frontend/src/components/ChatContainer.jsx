import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"

const ChatContainer = () => {

  const {messages, getMessages, isMessagesLoding, selectedUser } = useChatStore();

    
  useEffect(() =>{
    getMessages(selectedUser._id)
  }, [selectedUser._id, getMessages])

  
  if(isMessagesLoding) return <div>Loading...</div>

  return (
    <div>Chat Container</div>
  )
}

export default ChatContainer