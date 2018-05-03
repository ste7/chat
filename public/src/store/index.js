import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


import auth from './modules/auth'
import users from './modules/users'
import chat from './modules/chat'


export default new Vuex.Store({
    modules: {
        auth,
        users,
        chat
    }
})
