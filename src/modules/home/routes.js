const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/login',
        component:  (() => import(/* webpackChunkName: 'teacher-login' */ './page/login.vue')),
    },
    {
        path: '/login',
        name: 'login',
        component:  (() => import(/* webpackChunkName: 'teacher-login' */ './page/login.vue')),
    }
];

export default routes;
