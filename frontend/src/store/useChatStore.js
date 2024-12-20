import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoding: false,


  getUsers: async () => {
    set({isUsersLoading: true})
    try {
        const res = await axiosInstance.get("/messages/users");
        set({users: res.data});
    } catch (error) {
        toast.error(error.response.data.message);
    } finally{
        set({isUsersLoading: false})
    }
  },

  getMessages: async (userId) => {
    set({isMessagesLoding: true});
    try {
        const res = await axiosInstance.get(`/messages/${userId}`)
        set({messages: res.data})
        // console.log(res.data);
    } catch (error) {
        toast.error("get Message", error.response.data.message);
    } finally {
        set({isMessagesLoding: false})
    }
  },

  sendMessage: async(messageData) =>{
    const {selectedUser, messages } = get();
    // console.log(selectedUser);
    
    try {
      const res = await axiosInstance.post(`messages/send/${selectedUser._id}`, messageData);
      set({messages: [...messages,res.data]})
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () =>{
      const {selectedUser} = get();
      if(!selectedUser) return;

      const socket = useAuthStore.getState().socket;

      // optimizse this one letter
      socket.on("newMessage", (newMessage) =>{
        set({
          messages: [...get().messages, newMessage],
        });
      }) 
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser : (selectedUser) => set({selectedUser})

}));
