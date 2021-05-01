import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/modules/home/pages/login.vue'
import Home from '@/modules/home/pages/index.vue'
import Teacher from '@/modules/teacher/pages/index.vue'

Vue.use(Router)
console.log('ddd', Login);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Home,
            redirect: '/login',
            children: [
                {
                    path: 'system',
                    name: 'system',
                    component: (() =>
                    import(/* webpackChunkName: 'system' */ '@/modules/system/pages/index.vue')),
                },
                {
                    path: 'teacher',
                    name: 'teacher',
                    component: Teacher,
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            children: [],
        },
    ]
})

