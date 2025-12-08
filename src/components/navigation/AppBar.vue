<script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router' // <--- 1. Importar Router
  import { useTheme } from 'vuetify'
  import { useAuthStore } from '@/stores/auth' // <--- 2. Importar Auth Store

  const emit = defineEmits(['toggle-drawer'])
  const theme = useTheme()
  const router = useRouter() // <--- 3. Instanciar
  const auth = useAuthStore() // <--- 4. Instanciar

  // Alternar tema oscuro/claro
  function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'
  }

  const isDark = computed(() => theme.global.current.value.dark)

  // --- 5. FUNCIÓN DE LOGOUT ---
  function handleLogout () {
    auth.logout() // Limpia el estado y localStorage
    router.push('/login') // Redirige al login
  }
</script>

<template>
  <v-app-bar
    class="app-bar-glass px-4"
    flat
    height="72"
  >
    <!-- Toggle Drawer Button -->
    <v-btn
      color="secondary"
      icon="mdi-menu"
      variant="text"
      @click="emit('toggle-drawer')"
    />

    <v-spacer />

    <!-- Search Bar -->
    <v-text-field
      bg-color="surface"
      class="mr-4 hidden-xs"
      density="compact"
      hide-details
      placeholder="Buscar..."
      prepend-inner-icon="mdi-magnify"
      rounded="pill"
      style="max-width: 250px;"
      variant="solo"
    />

    <!-- Theme Toggle -->
    <v-btn
      color="secondary"
      :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      variant="text"
      @click="toggleTheme"
    />

    <!-- Notifications -->
    <v-btn class="mr-2" color="secondary" icon="mdi-bell-outline" variant="text">
      <v-badge color="error" content="3" dot>
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn>

    <!-- User Profile Dropdown -->
    <v-menu>
      <template #activator="{ props }">
        <v-avatar
          v-bind="props"
          class="cursor-pointer ml-3 elevation-2"
          image="https://randomuser.me/api/portraits/men/85.jpg"
          size="40"
        />
      </template>
      <v-list class="py-2" width="200">
        <v-list-item
          link
          prepend-icon="mdi-account-outline"
          title="Mi Perfil"
        />
        <v-list-item
          prepend-icon="mdi-cog-outline"
          title="Configuración"
          to="/settings"
        />
        <v-divider class="my-2" />

        <!-- 6. CONECTAR EL EVENTO CLICK AQUÍ -->
        <v-list-item
          color="error"
          prepend-icon="mdi-logout"
          title="Cerrar Sesión"
          variant="flat"
          @click="handleLogout"
        >
          <template #title>
            <span class="text-error font-weight-bold">Cerrar Sesión</span>
          </template>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>

<style scoped>
/* Efecto Glassmorphism Ajustado */
.app-bar-glass {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

/* Ajuste más limpio para modo oscuro */
.v-theme--darkTheme .app-bar-glass {
  background: rgba(30, 41, 59, 0.85) !important; /* Slate-800 con transparencia */
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
</style>
