<script setup>
  import GlobalSnackbar from '@/components/common/GlobalSnackbar.vue'
  import { useSettingsStore } from '@/stores/settings'

  // Inicializamos el store de configuración
  const settings = useSettingsStore()
  // Cargamos la configuración guardada (si existe)
  settings.loadSettings()
</script>

<template>
  <!-- El router-view carga el Layout (Default o Blank) -->
  <router-view />

  <!-- El Snackbar vive fuera del layout, flotando -->
  <GlobalSnackbar />
</template>

<style lang="scss">
/* --- ESTILOS GLOBALES --- */

/* Aseguramos que el scroll funcione bien */
html {
  overflow-y: auto;
}

/* Sombra suave para modo CLARO */
.v-theme--lightTheme .v-card--shadow {
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05) !important;
  border: 1px solid rgba(0,0,0,0.05);
}

/* Sombra y borde para modo OSCURO */
/* Usamos bordes sutiles porque las sombras no se ven bien en fondos oscuros */
.v-theme--darkTheme .v-card--shadow {
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.3) !important;
  border: 1px solid rgba(255,255,255,0.05);
  background-color: #1E293B !important;
}

/* Scrollbar personalizado para modo oscuro */
.v-theme--darkTheme ::-webkit-scrollbar-thumb {
  background: #334155;
}

/* Scrollbar personalizado para modo claro */
.v-theme--lightTheme ::-webkit-scrollbar-thumb {
  background: #cdd5e0;
}

/* Base del scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
}
</style>
