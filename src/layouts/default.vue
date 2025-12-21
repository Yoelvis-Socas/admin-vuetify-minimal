<script setup>
  import { ref, watch } from 'vue' // Importamos watch
  import AppBar from '@/components/navigation/AppBar.vue'
  import AppNavigation from '@/components/navigation/AppNavigation.vue'
  import { useSettingsStore } from '@/stores/settings'

  const settings = useSettingsStore()

  // Estado de visibilidad (Mostrar/Ocultar)
  const drawer = ref(true)

  // Estado local del modo Rail (Delgado/Ancho).
  // Lo iniciamos con el valor del store.
  const localRail = ref(settings.drawerMini)

  // OBSERVAR CAMBIOS EN SETTINGS:
  // Si el usuario cambia la configuración en la página Settings,
  // actualizamos nuestro estado local y aseguramos que el menú sea visible.
  watch(() => settings.drawerMini, newValue => {
    localRail.value = newValue
    if (newValue) {
      drawer.value = true // Si activan modo mini, forzamos que se muestre el menú
    }
  })

  // LÓGICA INTELIGENTE DEL BOTÓN (La solución a tu problema)
  function handleToggle () {
    if (settings.drawerMini) {
      // CASO 1: Configuración "Mini" activada.
      // El botón alterna entre EXPANDIDO y CONTRAÍDO (Rail).
      // No oculta el menú, solo cambia su ancho.
      localRail.value = !localRail.value
    } else {
      // CASO 2: Configuración "Mini" desactivada (Normal).
      // El botón alterna entre VISIBLE y OCULTO.
      drawer.value = !drawer.value
    }
  }
</script>

<template>
  <v-app>
    <!--
      v-model:drawer -> Controla si EXISTE (Visible/Oculto)
      :rail -> Controla el ANCHO (usamos nuestra variable localRail)
    -->
    <AppNavigation
      v-model:drawer="drawer"
      :rail="localRail"
    />

    <!-- Escuchamos el evento y ejecutamos nuestra lógica inteligente -->
    <AppBar @toggle-drawer="handleToggle" />

    <v-main class="main-content">
      <div class="scroll-wrapper">
        <v-container class="pa-6" fluid>
          <router-view />
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
.main-content {
  background-color: rgb(var(--v-theme-background));
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.scroll-wrapper {
  flex: 1;
  overflow-y: auto; /* Scrollea aquí */
  overflow-x: hidden;
  height: 100%;
}
</style>
