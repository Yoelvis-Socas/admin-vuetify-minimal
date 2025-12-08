// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null) // Recuperar si recarga la página

  // Acción de Login simulada
  function login (email, password) {
    return new Promise((resolve, reject) => {
      // Simulamos petición al backend
      setTimeout(() => {
        if (email === 'admin@test.com' && password === 'admin') {
          // ÉXITO
          token.value = 'fake-jwt-token-123456' // Simulamos un token
          user.value = {
            id: 1,
            name: 'Admin User',
            email,
            avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
          }

          // Guardamos en LocalStorage para persistencia
          localStorage.setItem('token', token.value)
          localStorage.setItem('user', JSON.stringify(user.value))

          resolve(true)
        } else {
          // ERROR
          reject('Credenciales incorrectas (Usa: admin@test.com / admin)')
        }
      }, 1000)
    })
  }

  // Acción de Logout
  function logout () {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    // Redirigir al login (esto lo manejaremos mejor en la vista, pero por si acaso)
  }

  // Verificar si está autenticado
  function isAuthenticated () {
    return !!token.value // Devuelve true si hay texto en token
  }

  return { user, token, login, logout, isAuthenticated }
})
