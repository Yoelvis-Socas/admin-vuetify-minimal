<script setup>
  import { computed } from 'vue'
  import { useDisplay } from 'vuetify'

  // Definimos props para recibir el estado del drawer desde el padre
  const props = defineProps({
    drawer: {
      type: Boolean,
      required: true,
    },
  })

  const emit = defineEmits(['update:drawer'])

  // Proxy para manejar v-model con props
  const drawerModel = computed({
    get: () => props.drawer,
    set: val => emit('update:drawer', val),
  })

  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard-outline',
      to: '/',
    },
    {
      title: 'Usuarios',
      icon: 'mdi-account-group-outline',
      to: '/users',
    },
    { type: 'divider' }, // Separador visual
    { type: 'subheader', title: 'OTROS' },
    {
      title: 'Configuración',
      icon: 'mdi-cog-outline',
      to: '/settings',
    },
    {
      title: 'Login (Demo)',
      icon: 'mdi-login',
      to: '/login',
    },
  ]
</script>

<template>
  <v-navigation-drawer
    v-model="drawerModel"
    class="app-navigation"
    color="surface"
    elevation="0"
    floating
    width="260"
  >
    <!-- Logo Area -->
    <div class="px-6 py-5 d-flex align-center">
      <v-img
        alt="Logo"
        class="mr-3"
        max-width="40"
        src="@/assets/logo.svg"
      />
      <span class="text-h6 font-weight-bold text-primary">VueAdminMinimal</span>
    </div>

    <v-divider class="mb-2 border-opacity-50" />

    <!-- Menu List -->
    <v-list class="pa-2">
      <template v-for="(item, i) in menuItems" :key="i">
        <!-- Subheader -->
        <v-list-subheader
          v-if="item.type === 'subheader'"
          class="text-uppercase text-caption font-weight-bold text-medium-emphasis mt-4 mb-2"
        >
          {{ item.title }}
        </v-list-subheader>

        <!-- Divider -->
        <v-divider v-else-if="item.type === 'divider'" class="my-2" />

        <!-- Menu Item -->
        <v-list-item
          v-else
          active-class="nav-item-active"
          class="mb-1"
          color="primary"
          :prepend-icon="item.icon"
          rounded="lg"
          :to="item.to"
        >
          <v-list-item-title class="font-weight-medium">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>

    <!-- Upgrade Box (Típico truco de marketing en templates gratis) -->
    <template #append>
      <div class="pa-4">
        <v-card class="pa-4" color="primary" rounded="lg">
          <div class="text-subtitle-2 font-weight-bold text-white mb-1">
            VuePro Premium
          </div>
          <div class="text-caption text-white mb-3 opacity-80">
            Obtén acceso a más componentes y soporte.
          </div>
          <v-btn
            block
            class="text-primary"
            color="white"
            size="small"
            variant="flat"
          >
            Mejorar Plan
          </v-btn>
        </v-card>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
/* Un toque sutil: línea lateral en el item activo */
.nav-item-active::before {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 24px;
  width: 4px;
  background-color: rgb(var(--v-theme-primary));
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  opacity: 1;
}
</style>
