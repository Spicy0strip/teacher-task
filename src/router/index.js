import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/modules/home/pages/login.vue'
import Home from '@/modules/home/pages/index.vue'
import Teacher from '@/modules/teacher/pages/index.vue'

Vue.use(Router)
// const es6Unwrap = (mod) => {
//     return mod.__esModule ? mod.default : mod;
// };

// const context = require.context('./modules', true, /([\w\d-]+)\/routes\.js/);

// const routes = context
//     .keys()
//     .map(id => es6Unwrap(context(id)))
//     .reduce((pre, list) => pre.concat(list), []);
console.log('ddd', Login);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Home,
            redirect: '/teacher',
            children: [
                {
                    path: 'teacher',
                    name: 'teacher',
                    component: Teacher,
                }
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

