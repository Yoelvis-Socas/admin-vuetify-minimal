// src/stores/settings.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  // Estado
  const snackbarDuration = ref(3000)
  const primaryColor = ref('#4318FF') // Color default
  const secondaryColor = ref('#8592A3')

  // Acciones
  function setPrimaryColor (color) {
    primaryColor.value = color
    // Aquí podríamos guardar en localStorage
    localStorage.setItem('primaryColor', color)
  }

  function loadSettings () {
    const savedPrimary = localStorage.getItem('primaryColor')
    if (savedPrimary) {
      primaryColor.value = savedPrimary
    }
  }

  return {
    snackbarDuration,
    primaryColor,
    secondaryColor,
    setPrimaryColor,
    loadSettings,
  }
})
