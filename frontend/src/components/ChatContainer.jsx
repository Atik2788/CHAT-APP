import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";

const ChatContainer = () => {

  const {messages, getMessages, isMessagesLoding, selectedUser } = useChatStore();

    
  useEffect(() =>{
    getMessages(selectedUser._id)
  }, [selectedUser._id, getMessages])

  
  if(isMessagesLoding) return (
  <div className="flex-1 flex flex-col overflow-auto">
    <ChatHeader/>
    <MessageSkeleton/>
    <MessageInput/>
  </div>
)

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>

      <p>message...</p>

      <MessageInput/>

    </div>
  )
}

export default ChatContainer