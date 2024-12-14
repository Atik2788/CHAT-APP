import { useChatStore } from "../store/useChatStore"

const ChatContainer = () => {

  const {messages, getMessages, isUsersLoading } = useChatStore();

  return (
    <div>Chat Container</div>
  )
}

export default ChatContainer