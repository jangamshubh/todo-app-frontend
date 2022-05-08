import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/auth/Login.vue'),
    },

    {
        path: '/profile',
        name: 'profile',
        component: () => import('./pages/profile/Profile.vue'),
    },
    {
        path: '/profile/edit',
        name: 'profile.edit',
        component: () => import('./pages/profile/EditProfile.vue'),
    },
    {
        path: '/users',
        name: 'users.index',
        component: () => import('./pages/users/Index.vue'),
    },
    {
        path: '/users/create',
        name: 'users.create',
        component: () => import('./pages/users/Create.vue'),
    },
    {
        path: '/users/:id/edit',
        name: 'users.edit',
        component: () => import('./pages/users/Edit.vue'),
    },
    {
        path: '/users/:id/show',
        name: 'users.show',
        component: () => import('./pages/users/Show.vue'),
    },
    {
        path: '/users/import',
        name: 'users.import',
        component: () => import('./pages/users/Import.vue'),
    },
    {
        path: '/users/update-roll-numbers',
        name: 'users.update-roll-numbers',
        component: () => import('./pages/users/UpdateRollNumberImport.vue'),
    },
    {
        path: '/roles',
        name: 'roles.index',
        component: () => import('./pages/roles/Index.vue'),
    },
    {
        path: '/roles/create',
        name: 'roles.create',
        component: () => import('./pages/roles/Create.vue'),
    },
    {
        path: '/roles/:id/edit',
        name: 'roles.edit',
        component: () => import('./pages/roles/Edit.vue'),
    },
    {
        path: '/roles/:id/show',
        name: 'roles.show',
        component: () => import('./pages/roles/Show.vue'),
    },
    {
        path: '/todos',
        name: 'todos.index',
        component: () => import('./pages/todos/Index.vue'),
    },
    {
        path: '/todos/create',
        name: 'todos.create',
        component: () => import('./pages/todos/Create.vue'),
    },
    {
        path: '/todos/:id/edit',
        name: 'todos.edit',
        component: () => import('./pages/todos/Edit.vue'),
    },
    {
        path: '/todos/:id/show',
        name: 'todos.show',
        component: () => import('./pages/todos/Show.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
