import { getUser } from '../../../helper/auth'


export const storeUsers = (state, users) => {
    state.users = users;
}


export const storeUser = (state, user) => {
    state.user = user;
}


export const clearUsers = (state, user) => {
    state.users = null;
    state.user = null;
}
