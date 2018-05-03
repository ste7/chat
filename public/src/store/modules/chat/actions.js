import axios from 'axios'
import pusher from '../../../pusher/pusher'
import * as auth from '../../../helper/auth'

export const getConversations = ({ commit, dispatch },  user_id ) => {
    return axios.get(`http://localhost:8000/api/chat/conversations/${user_id}`).then((response) => {
        commit('storeConversations', response.data)
        // commit('storeUnseenCount', response.data.unseen)
        dispatch('subscribe', response.data);
        dispatch('bind', response.data);

        return Promise.resolve()
    })
}


export const getChat = ({ commit }, id) => {
    return axios.get(`http://localhost:8000/api/chat/conversation/${id}`).then((response) => {
        commit('storeChat', response.data)

        return Promise.resolve(response.data);
    })
}


export const sendMessage = ({ commit, dispatch }, data) => {
    return axios.post('http://localhost:8000/api/chat/send-message', data).then((response) => {
        return Promise.resolve(response.data.message);
    })
}


export const markMessagesAsSeen = ({ commit }, id) => {
    return axios.get(`http://localhost:8000/api/mark-messages-as-seen/${id}`).then((response) => {
    });
}


export const subscribe = ( { commit }, conversations ) => {
    for (var i=0; i<conversations.length; i++) {
        pusher.subscribe(`private-chat-${conversations[i]._id}`);
    }
}


export const bind = ( { commit, dispatch }, data ) => {
    pusher.bind('messages-event', function(data) {
        commit('addMessage', data);
        commit('pushMessage', data);
        commit('updateConversations', data);
    });
}
