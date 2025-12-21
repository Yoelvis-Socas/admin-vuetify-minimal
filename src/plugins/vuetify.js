/**
 * plugins/vuetify.js
 */
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Tema Claro: "Clean & Airy"
const lightTheme = {
  dark: false,
  colors: {
    background: '#eaebed', // Gris muy claro (Gray 100) - Menos cansado que el blanco
    surface: '#FFFFFF',
    primary: '#4F46E5', // Indigo 600 - Un azul púrpura moderno y vibrante
    secondary: '#64748B', // Slate 500 - Texto secundario legible
    error: '#EF4444',
    info: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
  },
}

// Tema Oscuro: "Professional Dark" (Slate/Carbon)
const darkTheme = {
  dark: true,
  colors: {
    background: '#0F172A', // Slate 900 - Oscuro profundo pero no negro puro
    surface: '#1E293B', // Slate 800 - Ligeramente más claro para tarjetas
    primary: '#818CF8', // Indigo 400 - Más brillante para resaltar sobre fondo oscuro
    secondary: '#94A3B8', // Slate 400 - Buen contraste para texto secundario
    error: '#F87171',
    info: '#60A5FA',
    success: '#34D399',
    warning: '#FBBF24',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme,
    },
  },
  // Defaults para mantener consistencia
  defaults: {
    VCard: {
      elevation: 0,
      rounded: 'lg',
      class: 'v-card--shadow',
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
      hideDetails: 'auto',
    },
    VBtn: {
      rounded: 'lg',
      height: 44,
      fontWeight: '600',
      elevation: 0,
    },
  },
})
