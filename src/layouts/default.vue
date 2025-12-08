<script setup>
  import { ref } from 'vue'
  import AppBar from '@/components/navigation/AppBar.vue'
  // Asegúrate de que estas rutas sean correctas
  import AppNavigation from '@/components/navigation/AppNavigation.vue'

  // Estado del menú lateral
  const drawer = ref(true)
</script>

<template>
  <v-app>
    <!-- Navegación Lateral -->
    <AppNavigation v-model:drawer="drawer" />

    <!-- Barra Superior -->
    <AppBar @toggle-drawer="drawer = !drawer" />

    <!--
      Contenido Principal
      Usamos la variable CSS del tema para el fondo para asegurar que cambie en modo oscuro
    -->
    <v-main calss="main-content">
      <v-container class="pa-6" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
/* Estilos específicos para este layout si es necesario */
.main-content {
  background-color: rgb(var(--v-theme-background));
  min-height: 100vh;
}
</style>
