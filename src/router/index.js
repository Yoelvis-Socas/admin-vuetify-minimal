// src/router/index.js

import { setupLayouts } from 'virtual:generated-layouts' // <--- 1. IMPORTANTE: Traemos la magia de los layouts
import { createRouter, createWebHistory } from 'vue-router'

// Definimos tus rutas manuales
const manualRoutes = [
  {
    path: '/login',
    component: () => import('@/pages/login.vue'),
    meta: { requiresAuth: false, layout: 'blank' }, // layout blank para login
  },
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    component: () => import('@/pages/users.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    component: () => import('@/pages/settings.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // 2. IMPORTANTE: Aquí envolvemos las rutas con setupLayouts
  // Esto le dice: "Antes de usar estas rutas, ponles el layout default alrededor"
  routes: setupLayouts(manualRoutes),
})

// --- EL GUARDIA DE SEGURIDAD (Esto déjalo igual, funcionaba bien) ---
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
