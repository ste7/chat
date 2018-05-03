import * as auth from '../../../helper/auth'


export const storeMe = (state, me) => {
    state.me.authenticated = true;
    state.me.data = me;

    auth.storeUser(me);
}


export const clearMe = (state) => {
    state.me.authenticated = false;
    state.me.data = null;

    auth.removeUser();
}


export const storeRequests = (state, requests) => {
    state.me.requests = requests;
}
