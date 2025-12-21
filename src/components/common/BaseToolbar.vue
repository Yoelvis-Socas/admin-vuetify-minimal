<template>
  <v-toolbar
    v-bind="$attrs"
    class="app-widget-toolbar"
    :class="{ 'text-white': hasBackground }"
    :color="computedColor"
    :image="image"
  >
    <!-- Slot para icono a la izquierda (ej. botón hamburguesa o icono representativo) -->
    <template v-if="$slots.prepend">
      <div class="ms-3 d-flex align-center">
        <slot name="prepend" />
      </div>
    </template>

    <v-toolbar-title class="font-weight-bold ml-2">
      {{ title }}
    </v-toolbar-title>

    <v-spacer />

    <!-- Slot para botones de acción a la derecha -->
    <template v-if="$slots.append">
      <div class="me-3 d-flex align-center">
        <slot name="append" />
      </div>
    </template>
  </v-toolbar>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: undefined,
    },
    color: {
      type: String,
      default: undefined, // Dejamos undefined para que tome el color por defecto de Vuetify si no se pasa nada
    },
  })

  // Lógica: Si hay imagen, NO asignamos color (para evitar conflictos visuales).
  // Si NO hay imagen, usamos el color pasado por prop o 'surface' por defecto.
  const computedColor = computed(() => {
    if (props.image) return undefined
    return props.color
  })

  // Lógica visual: Si hay imagen o un color específico, forzamos texto blanco
  // para mejorar contraste (asumiendo colores oscuros/vibrantes en dashboards).
  const hasBackground = computed(() => {
    return !!props.image || !!props.color
  })
</script>

<style scoped>
.app-widget-toolbar {
  /* Asegura que el toolbar no se vea plano si no tiene elevación */
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px 8px 0 0!important;
}

.app-widget-toolbar :deep(.v-responsive){
  border-radius: 8px 8px 0 0!important;
}
</style>
