import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/login.vue'
import pending_users from '../views/pending_users.vue'

const routes = [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/pending_users',
      name: 'pending_users',
      component: pending_users,
      meta: { requiresAuth: true }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = localStorage.getItem('authToken');
  
    if (requiresAuth && !isAuthenticated) {
      next('/');
    } else {
      next();
    }
  });
  
  export default router;