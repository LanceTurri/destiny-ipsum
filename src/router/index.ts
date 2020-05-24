import Vue from 'vue';
import VueRouter from 'vue-router';
import Selection from '../views/Selection.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Selection',
        component: Selection,
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/:character',
        name: 'Character',
        component: () => import(/* webpackChunkName: "character" */ '../views/Ipsum.vue'),
    },
    {
        // will match everything
        path: '*',
        redirect: '/',
    },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
