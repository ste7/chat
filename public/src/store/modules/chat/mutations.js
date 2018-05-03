import { getUser } from '../../../helper/auth'


export const storeConversations = (state, conversations) => {
    state.conversations = conversations;
}


export const storeUnseenCount = (state, conversations) => {
    state.unseenCount = conversations;
}


export const pushMessage = (state, data) => {
    let index = state.conversations.findIndex(c => c._id === data.id);

    state.conversations[index].messages.push(data.message);
}


export const storeChat = (state, chat) => {
    state.chat = chat;
}



export const addMessage = (state, data) => {
    if (state.chat._id === data.id) {
        let fnd = state.chat.messages.find(m => m._id === data.message._id);
        if (! fnd) {
            state.chat.messages.push(data.message);
        }
    }
}


export const clearChat = (state) => {
    state.chat = null;
}


export const updateConversations = (state, message) => {
    let fnd = state.conversations.find(c => {
        if (c._id === message.id) {
            c.messages.push(message.message);
            c.updatedAt = message.message.createdAt;
        }
    });

    console.log(fnd);
}


export const clearConversations = (state) => {
    state.conversations = null;
}
