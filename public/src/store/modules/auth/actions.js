import axios from 'axios'
import * as auth from '../../../helper/auth'



export const signUp = ({ commit }, data ) => {
    return axios.post('http://localhost:8000/api/signup', data).then((response) => {
        commit('storeMe', response.data)

        window.location.replace('#/');
    })
}


export const signIn = ({ commit }, data ) => {
    return axios.post('http://localhost:8000/api/signin', data).then((response) => {
        commit('storeMe', response.data)

        window.location.replace('#/');
    })
}


export const signOut = ({ commit } ) => {
    commit('clearMe');
    commit('clearChat');
    commit('clearConversations');
    commit('clearUsers');
    window.location.replace('#/signin');
}


export const authenticateUser = ({ commit } ) => {
    auth.setHttpToken();
    return axios.get('http://localhost:8000/api/user/auth');
}


export const getRequests = ({ commit }, id ) => {
    return axios.get(`http://localhost:8000/api/requests/${id}`).then((response) => {
        commit('storeRequests', response.data);
    });
}
