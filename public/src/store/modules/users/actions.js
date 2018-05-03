import axios from 'axios'
import pusher from '../../../pusher/pusher'
import * as auth from '../../../helper/auth'


export const getUsers = ({ commit }, id ) => {
    return axios.get(`http://localhost:8000/api/users/${id}`).then((response) => {
        commit('storeUsers', response.data)

        return Promise.resolve(response);
    })
}

export const getUser = ({ commit }, user) => {
    return axios.get(`http://localhost:8000/api/user/${user.user_one}/${user.user_two}`).then((response) => {
        commit('storeUser', response.data)

        return Promise.resolve(response.data);
    })
}


export const searchUsers = ({ commit }, data ) => {
    return axios.post(`http://localhost:8000/api/search`, data).then((response) => {
        console.log(response.data);
        commit('storeUsers', response.data)
    });
}


export const sendRequest = ({ commit, dispatch }, user ) => {
    return axios.get(`http://localhost:8000/api/send-request/${user.user_one}/${user.user_two}`).then((response) => {
        dispatch('getUser', user);
    });
}


export const acceptRequest = ({ commit, dispatch }, user ) => {
    return axios.get(`http://localhost:8000/api/accept-request/${user.user_one}/${user.user_two}`).then((response) => {
        dispatch('getUser', user);
        dispatch('getRequests', user.user_one);
        pusher.subscribe(`private-chat-${response.data._id}`);
    });
}



export const unseenRequest = ({ commit }, id ) => {
    return axios.get(`http://localhost:8000/api/unseen-requests/${id}`);
}


export const markRequestAsSeen = ({ commit }, id ) => {
    return axios.get(`http://localhost:8000/api/mark-requests-as-seen/${id}`);
}
