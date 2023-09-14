import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from './pages/LoginPage.vue';
import SignupPage from './pages/SignupPage.vue';
import PostPage from './pages/PostPage.vue';
import store from './store/store';
import { IS_USER_AUTHENTICATE_GETTER } from './store/storeconstants';

const routes = [
    {path: '/login', component: LoginPage, meta: {auth: false}},
    {path: '/signup', component: SignupPage, meta: {auth: false}},
    {path: '/posts', component: PostPage, meta: {auth: true}},
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to,from,next) => {
    if (to.meta.auth && !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]){
        next('/login');
    } else if (!to.meta.auth && store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]){
        next('/posts');
    } else {
        next();
    }
});

export default router;