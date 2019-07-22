import Vue from 'vue';
import Router from 'vue-router';
import UserList from '@/pages/UserList';
import UserForm from '@/pages/UserForm';

Vue.use(Router);

export default new Router({
  routes: [
    {
        path: '/',
        name: 'Users',
        component: UserList
    },
    {
        path: '/new',
        name: 'CreateUser',
        component: UserForm
    },
      {
        path: '/edit/:id',
        name: 'EditUser',
        component: UserForm
    },
  ]
});
