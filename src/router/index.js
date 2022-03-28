import Vue from 'vue'
import VueRouter from 'vue-router'
import {getToken} from "@/utils/auth";
import {Message} from "element-ui";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/choose',
        name: 'Choose',
        component: () => import('../views/Choose')
    },
    {
        path: `/bookBorrow`,
        name: 'BookBorrow',
        component: () => import('../views/BookBorrow')
    },
    {
        path: '/bookReturn',
        name: 'BookReturn',
        component: () => import('../views/BookReturn')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

// router.beforeEach((to, from,next) =>{
//     if (to.path === '/' || to.path === 'login'){
//         next()
//     }else {
//         const token = getToken()
//         if (token === null || token === ''){
//             Message({
//                 message: '请先登录',
//                 type: 'error',
//                 duration: 5 * 1000
//             })
//             router.push('/login');
//         }else {
//             next()
//         }
//     }
// })

export default router
