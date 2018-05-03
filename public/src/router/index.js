import Vue from 'vue'
import Router from 'vue-router'

import Signup from '@/components/auth/Signup'
import Signin from '@/components/auth/Signin'
import NotFound from '@/components/templates/NotFound'
import Chat from '@/components/chat/Chat'

Vue.use(Router);

import * as beforeEnter from './beforeEnter'


const router = new Router({
    routes: [
        {
            path: '/',
            name: 'chat',
            component: Chat,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup,
            beforeEnter: (to, from, next) => {
                beforeEnter.isAuthenticated(to, from, next)
            }
        },
        {
            path: '/signin',
            name: 'signin',
            component: Signin,
            beforeEnter: (to, from, next) => {
                beforeEnter.isAuthenticated(to, from, next)
            }
        },
        {
            path: '*',
            name: 'notfound',
            component: NotFound
        }
    ]
})


export default router
