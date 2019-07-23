import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout';
import Login from '@/pages/Login';
import UserList from '@/pages/UserList';
import UserForm from '@/pages/UserForm';

Vue.use(Router);

const router = new Router({
  routes: [
    {
        path: '/',
        redirect: '/users',
        component: Layout,
        beforeEnter: function (to, from, next) {
            const serialized = localStorage.getItem('authorization');

            if (!serialized) {
                localStorage.setItem('rollback-uri', to.fullPath);
                next('/login');
            } else {
                next();
            }
        },
        children: [
            {
                path: '/users',
                name: 'Users',
                component: UserList,
            },
            {
                path: '/users/new',
                name: 'CreateUser',
                component: UserForm
            },
            {
                path: '/users/edit/:id',
                name: 'EditUser',
                component: UserForm
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: function (to, from, next) {
            const serialized = localStorage.getItem('authorization');

            if (serialized) {
                next('/users');
            } else {
                next();
            }
        },
    },
  ]
});

export default router;