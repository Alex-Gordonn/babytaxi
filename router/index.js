import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/login.vue'
import users from '../views/users.vue'
import pending_cabbies from '../views/pending_cabbies.vue';

const routes = [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/users',
      name: 'users',
      component: users,
      meta: { requiresAuth: true }
    },
    {
      path: '/pending_cabbies',
      name: 'pending_cabbies',
      component: pending_cabbies,
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