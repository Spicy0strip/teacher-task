import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/modules/home/pages/login.vue'
import Home from '@/modules/home/pages/index.vue'

Vue.use(Router)

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
                    component: (() =>
                    import(/* webpackChunkName: 'teacher' */ '@/modules/teacher/pages/index.vue')),
                },
                {
                    path: 'college',
                    name: 'college',
                    component: (() =>
                    import(/* webpackChunkName: 'college' */ '@/modules/college/pages/index.vue')),
                    children: [
                        {
                            path: 'teacher',
                            name: 'college-teacher',
                            component: (() =>
                    import(/* webpackChunkName: 'college' */ '@/modules/college/pages/college-teacher.vue')),
                        },
                        {
                            path: 'task',
                            name: 'college-task',
                            component: (() =>
                    import(/* webpackChunkName: 'college' */ '@/modules/college/pages/college-task.vue')),
                        },
                        {
                            path: 'assess',
                            name: 'college-assess',
                            component: (() =>
                    import(/* webpackChunkName: 'college' */ '@/modules/college/pages/college-assess.vue')),
                        },
                        {
                            path: 'appeal',
                            name: 'college-appeal',
                            component: (() =>
                    import(/* webpackChunkName: 'college' */ '@/modules/college/pages/college-appeal.vue')),
                        }
                    ]
                },
                {
                    path: 'department',
                    name: 'department',
                    component: (() =>
                    import(/* webpackChunkName: 'department' */ '@/modules/department/pages/index.vue')),
                    children: [
                        {
                            path: 'assign-task',
                            name: 'assign-task',
                            component: (() =>
                    import(/* webpackChunkName: 'department' */ '@/modules/department/pages/assign-task.vue')),
                        },
                        {
                            path: 'unassign-task',
                            name: 'unassign-task',
                            component: (() =>
                    import(/* webpackChunkName: 'department' */ '@/modules/department/pages/unassign-task.vue')),
                        },
                        {
                            path: 'department-assess',
                            name: 'department-assess',
                            component: (() =>
                    import(/* webpackChunkName: 'department' */ '@/modules/department/pages/department-assess.vue')),
                        }
                    ]
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

