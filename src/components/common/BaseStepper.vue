<script setup>
/**
 * BaseStepper.vue
 * Componente de pasos reutilizable.
 * Separa la navegación del contenido.
 */
  import { computed } from 'vue'

  const props = defineProps({
    // El paso actual (v-model)
    modelValue: {
      type: Number,
      default: 1,
    },
    // Array de títulos de los pasos ['Paso 1', 'Paso 2', ...]
    items: {
      type: Array,
      required: true,
    },
    // Color principal
    color: {
      type: String,
      default: 'primary',
    },
    // Texto para botón "Finalizar"
    finishText: {
      type: String,
      default: 'Confirmar',
    },
    // Deshabilitar navegación
    loading: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['update:modelValue', 'finish'])

  // Proxy para v-model
  const currentStep = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val),
  })

  // Helpers de navegación
  const isFirst = computed(() => currentStep.value === 1)
  const isLast = computed(() => currentStep.value === props.items.length)

  function next () {
    if (isLast.value) {
      emit('finish')
    } else {
      currentStep.value++
    }
  }

  function prev () {
    if (!isFirst.value) {
      currentStep.value--
    }
  }
</script>

<template>
  <v-sheet class="rounded-lg border overflow-hidden" elevation="0">
    <v-stepper
      v-model="currentStep"
      bg-color="surface"
      class="elevation-0"
      :color="color"
      hide-actions
      :items="items"
    >
      <!--
        SLOT FORWARDING DINÁMICO
        Generamos un slot para cada paso: #content-1, #content-2, etc.
      -->
      <template
        v-for="(item, index) in items"
        :key="index"
        #[`item.${index+1}`]
      >
        <div class="pa-1">
          <slot :name="`content-${index + 1}`" />
        </div>
      </template>
    </v-stepper>

    <v-divider />

    <!-- ACCIONES PERSONALIZADAS (Footer) -->
    <div class="d-flex justify-space-between align-center pa-4 bg-surface">
      <v-btn
        color="medium-emphasis"
        :disabled="isFirst || loading"
        variant="text"
        @click="prev"
      >
        Atrás
      </v-btn>

      <v-btn
        class="px-6"
        :color="color"
        :loading="loading"
        variant="flat"
        @click="next"
      >
        {{ isLast ? finishText : 'Siguiente' }}
      </v-btn>
    </div>
  </v-sheet>
</template>

<style scoped>
/* Ajustes finos para limpiar estilos default de Vuetify que sobran */
:deep(.v-stepper-header) {
  box-shadow: none !important;
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

:deep(.v-stepper-window)  {
  height: 317px;
  overflow-y: auto;
}
</style>
