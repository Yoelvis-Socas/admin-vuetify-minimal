<script setup>
/**
 * BaseCardRadioGroup.vue
 * Grupo de radio buttons estilizados como tarjetas seleccionables.
 */
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: {
      type: [String, Number, Object],
      default: null,
    },
    items: {
      type: Array,
      required: true,
    },
    // Nombre del campo para el valor (ej: 'id', 'value')
    itemValue: {
      type: String,
      default: 'value',
    },
    // Nombre del campo para el título principal (ej: 'label', 'name')
    itemTitle: {
      type: String,
      default: 'title',
    },
    // Nombre del campo para texto secundario a la derecha (ej: 'price')
    itemSecondary: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const internalValue = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val),
  })

  // Función para obtener el valor de un item dinámicamente
  const getValue = item => item[props.itemValue]
</script>

<template>
  <v-radio-group
    v-model="internalValue"
    class="base-card-radio"
    :color="color"
    hide-details
  >
    <v-card
      v-for="(item, i) in items"
      :key="i"
      border
      class="mb-3 px-2"
      :class="{
        'active-card': internalValue === getValue(item),
        [`border-${color}`]: internalValue === getValue(item)
      }"
      elevation="0"
      @click="internalValue = getValue(item)"
    >
      <v-radio class="w-100" :value="getValue(item)">
        <template #label>
          <div class="d-flex justify-space-between w-100 align-center py-0">
            <!-- SLOT: Permite personalizar el contenido completamente -->
            <slot :is-selected="internalValue === getValue(item)" :item="item" name="item">
              <p
                class="mb-0"
                :class="internalValue === getValue(item) ? 'text-high-emphasis font-weight-bold' : 'text-medium-emphasis'"
              >
                {{ item[itemTitle] }}
              </p>
              <p
                v-if="itemSecondary && item[itemSecondary]"
                class="font-weight-bold mb-0"
              >
                {{ item[itemSecondary] }}
              </p>
            </slot>
          </div>
        </template>
      </v-radio>
    </v-card>
  </v-radio-group>
</template>

<style lang="scss" scoped>
.active-card {
  border-width: 1px !important;
  background-color: rgba(var(--v-theme-primary), 0.05); /* Fondo sutil dinámico */
}

/* Override para asegurar que el borde tome el color del prop */
.border-primary { border-color: rgb(var(--v-theme-primary)) !important; }
.border-success { border-color: rgb(var(--v-theme-success)) !important; }
.border-secondary { border-color: rgb(var(--v-theme-secondary)) !important; }
.border-error { border-color: rgb(var(--v-theme-error)) !important; }

:deep(.v-label--clickable){
  min-width: 90%!important;
}
</style>
