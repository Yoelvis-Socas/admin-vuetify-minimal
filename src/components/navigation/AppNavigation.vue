<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    drawer: {
      type: Boolean,
      required: true,
    },
    rail: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['update:drawer'])

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
    { type: 'divider' },
    {
      title: 'Configuración',
      icon: 'mdi-cog-outline',
      to: '/settings',
    },
  ]
</script>

<template>
  <v-navigation-drawer
    v-model="drawerModel"
    class="app-navigation"
    color="surface"
    elevation="0"
    :rail="rail"
    rail-width="75"
    width="260"
  >
    <!--
      Logo Area:
      Usamos :class condicional.
      Si es rail (mini), usamos 'px-2' y centramos.
      Si es normal, usamos 'px-6'.
    -->
    <div
      class="d-flex align-center py-5 transition-swing"
      :class="rail ? 'justify-center px-2' : 'px-6'"
    >
      <v-img
        alt="Logo"
        class="transition-swing"
        :class="rail ? '' : 'mr-3'"
        :max-width="rail ? 32 : 40"
        src="@/assets/logo.svg"
      />

      <!-- El texto solo se renderiza si NO estamos en modo rail -->
      <span
        v-if="!rail"
        class="text-h6 font-weight-bold text-primary text-truncate"
      >
        VueAdminMinimal
      </span>
    </div>

    <v-divider class="mb-2 border-opacity-50" />

    <v-list class="pa-2">
      <template v-for="(item, i) in menuItems" :key="i">

        <!-- Subheader: Se oculta en modo Rail -->
        <v-list-subheader
          v-if="item.type === 'subheader' && !rail"
          class="text-uppercase text-caption font-weight-bold text-medium-emphasis mt-4 mb-2"
        >
          {{ item.title }}
        </v-list-subheader>

        <v-divider v-else-if="item.type === 'divider'" class="my-2" />

        <v-list-item
          v-else-if="item.title"
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

    <!-- Footer: Se oculta en modo Rail -->
    <template v-if="!rail" #append>
      <div class="pa-4">
        <v-card class="pa-4" color="primary" rounded="lg">
          <div class="text-subtitle-2 font-weight-bold text-white mb-1">
            Premium
          </div>
          <v-btn
            block
            class="text-primary font-weight-bold mt-2"
            color="white"
            size="small"
            variant="flat"
          >
            Ver Planes
          </v-btn>
        </v-card>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
/* Transiciones suaves para los cambios de tamaño */
.transition-swing {
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.5, 1);
}

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
}
</style>
