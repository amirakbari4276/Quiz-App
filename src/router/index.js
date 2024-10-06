import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import store from '../store/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) {
          next('/login'); // If not authenticated, redirect to login
        } else {
          next(); // Continue to home
        }
      },
    },
    {
      path: '/exam/:id',
      name: 'exam',
      component: () => import('../views/Exam.vue'),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) {
          next('/login'); // If not authenticated, redirect to login
        } else {
          next(); // Continue to exam
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next('/'); // If already authenticated, redirect to home
        } else {
          next(); // Continue to login
        }
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ],
});

export default router;
