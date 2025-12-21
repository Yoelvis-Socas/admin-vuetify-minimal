<template>
  <!--
    Heredamos atributos automáticamente en el v-card.
    Esto permite usar <BaseWidgetCard elevation="10"> desde fuera.
  -->
  <v-card class="d-flex flex-column h-100">

    <!-- Renderizado condicional del Toolbar -->
    <BaseToolbar
      v-if="showToolbar"
      :class="{'bg-primary': !headerImage && !headerColor}"
      :color="headerColor"
      :density="density"
      :image="headerImage"
      :title="title"
    >
      <!-- "Forwarding Slots": Pasamos el contenido de las ranuras de la Card a la Toolbar -->
      <template v-if="$slots.headerIcon" #prepend>
        <slot name="headerIcon" />
      </template>

      <template v-if="$slots.headerActions" #append>
        <slot name="headerActions" />
      </template>
    </BaseToolbar>

    <!-- Cuerpo de la tarjeta -->
    <v-card-text class="flex-grow-1 pa-0">
      <slot />
    </v-card-text>

    <!-- Pie de página de la tarjeta (opcional) -->
    <v-card-actions v-if="$slots.actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { computed } from 'vue'
  // Importación relativa. Asegúrate de que ambos archivos estén en la misma carpeta.
  import BaseToolbar from '@/components/common/BaseToolbar.vue'

  const props = defineProps({
    // Propiedades básicas
    title: {
      type: String,
      default: '',
    },
    // Configuración del Toolbar
    headerImage: {
      type: String,
      default: undefined,
    },
    headerColor: {
      type: String,
      default: undefined,
    },
    density: {
      type: String,
      default: 'default', // Opciones: 'default', 'comfortable', 'compact'
      validator: value => ['default', 'comfortable', 'compact'].includes(value),
    },
    // Opción para forzar ocultar el toolbar aunque tenga título
    hideToolbar: {
      type: Boolean,
      default: false,
    },
  })

  // Calculamos si debemos mostrar el toolbar.
  // Se muestra si NO está oculto explícitamente Y (tiene título O tiene imagen O tiene color).
  const showToolbar = computed(() => {
    if (props.hideToolbar) return false
    return !!props.title || !!props.headerImage || !!props.headerColor
  })
</script>
