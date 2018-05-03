export const isAuthenticated = (state) => {
    return state.me.authenticated;
}


export const getMe = (state) => {
    return state.me.data;
}


export const getRequests = (state) => {
    return state.me.requests;
}
