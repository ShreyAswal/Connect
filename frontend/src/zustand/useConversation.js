import {create} from 'zustand';

// Creates a store for conversation to be accessed by other components globally using zustand hook
const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation : (selectedConversation) => set({selectedConversation}),
    messages:[],
    setMessages: (messages) => set({messages}),
}))

export default useConversation;