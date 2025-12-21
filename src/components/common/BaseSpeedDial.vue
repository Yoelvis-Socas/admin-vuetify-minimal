<script setup>
/**
 * BaseSpeedDial.vue
 * Botón flotante de acción rápida (FAB) que despliega un menú.
 * Soporta tooltips y configuración completa por props.
 */
  import { ref } from 'vue'

  const props = defineProps({
    // Ubicación: 'bottom right', 'top left', 'top center', etc.
    location: {
      type: String,
      default: 'bottom right',
    },
    // Icono principal cuando está cerrado
    icon: {
      type: String,
      default: 'mdi-plus',
    },
    // Icono cuando está abierto (opcional, Vuetify lo rota, pero podemos cambiarlo)
    activeIcon: {
      type: String,
      default: 'mdi-close',
    },
    // Color del botón principal
    color: {
      type: String,
      default: 'primary',
    },
    // Array de acciones: { icon, color, label, onClick: () => ... }
    actions: {
      type: Array,
      required: true,
    },
  })

  // Controlamos el estado para saber qué icono mostrar
  const fab = ref(false)
</script>

<template>
  <!--
    v-speed-dial necesita un activador.
    location: define dónde aparece el menú relativo al botón.
    transition: animación de entrada ('scale-transition' es más "pop" que 'fade').
  -->
  <v-speed-dial
    v-model="fab"
    :location="location"
    transition="scale-transition"
  >
    <!-- EL BOTÓN MAESTRO -->
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        class="main-fab"
        :color="color"
        elevation="4"
        icon
        size="large"
      >
        <!-- Animación de rotación suave al cambiar icono -->
        <v-icon class="fab-icon transition-transform" size="24">
          {{ fab ? activeIcon : icon }}
        </v-icon>
      </v-btn>
    </template>

    <!-- LOS BOTONES DE ACCIÓN (HIJOS) -->
    <!-- Iteramos sobre el array de acciones -->
    <v-btn
      v-for="(action, i) in actions"
      :key="i"
      border
      :color="action.color || 'surface'"
      elevation="2"
      icon
      size="medium"
      @click="action.onClick"
    >
      <v-icon>{{ action.icon }}</v-icon>

      <!-- TOOLTIP (Solo si existe label) -->
      <v-tooltip
        v-if="action.label"
        activator="parent"
        bg-color="surface-variant"
        location="start"
      >
        {{ action.label }}
      </v-tooltip>
    </v-btn>

  </v-speed-dial>
</template>

<style scoped>
/* Estilo para que el botón principal flote fijo en la pantalla */
.main-fab {
  /*
    Nota: Vuetify suele manejar la posición fixed con v-layout-item o v-fab,
    pero v-speed-dial a veces necesita ayuda si no está en un v-layout.
    Si ves que no se posiciona, puedes agregar style="position: fixed; bottom: 16px; right: 16px;" al componente padre.
  */
}

.transition-transform {
  transition: transform 0.2s ease-in-out;
}
</style>
