import { createRouter, createWebHistory } from 'vue-router';
import login from '../views/login.vue'
import users from '../views/users.vue'
import cabbies from '../views/cabbies.vue';
import cabbie from '../views/cabbie.vue';
import home from '../views/home.vue'

const routes = [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/users',
      name: 'users',
      component: users,
      meta: { requiresAuth: true }
    },
    {
      path: '/cabbies',
      name: 'cabbies',
      component: cabbies,
      meta: { requiresAuth: true }
    },
    {
      path: '/cabbie',
      name: 'cabbie',
      component: cabbie,
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      name: 'home',
      component: home,
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