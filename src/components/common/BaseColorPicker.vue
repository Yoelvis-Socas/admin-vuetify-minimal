<template>
  <!-- CASO 1: MODO DIALOG (Modal centrado) -->
  <v-dialog
    v-if="displayMode === 'dialog'"
    v-model="isOpen"
    width="auto"
  >
    <template #activator="{ props }">
      <!-- Activador Botón -->
      <v-btn v-bind="props" class="flex-grow-1" :color="color" variant="tonal">
        <v-icon icon="mdi-palette" start />
        {{ label }}
      </v-btn>
    </template>

    <v-card min-width="300">
      <v-color-picker
        elevation="0"
        :mode="pickerMode"
        :model-value="modelValue"
        @update:model-value="updateValue"
      />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="text" @click="isOpen = false">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- CASO 2: MODO MENU (Pop-up en campo) -->
  <v-menu
    v-else
    v-model="isOpen"
    :close-on-content-click="false"
    location="bottom start"
    min-width="300"
  >
    <template #activator="{ props }">
      <!-- Activador Campo de Texto (Field) -->
      <v-text-field
        v-bind="props"
        class="cursor-pointer"
        density="compact"
        hide-details
        :label="label"
        :model-value="modelValue"
        readonly
        variant="outlined"
      >
        <template #prepend-inner>
          <v-avatar class="border" :color="modelValue" size="24" />
        </template>
      </v-text-field>
    </template>

    <v-card min-width="300">
      <v-color-picker
        elevation="0"
        :mode="pickerMode"
        :model-value="modelValue"
        @update:model-value="updateValue"
      />
    </v-card>
  </v-menu>
</template>

<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    modelValue: { type: String, default: '#000000' },
    label: { type: String, default: 'Color' },
    displayMode: { type: String, default: 'menu' }, // 'dialog' o 'menu'
    color: { type: String, default: 'primary' },
    pickerMode: { type: String, default: 'hexa' },
  })

  const emit = defineEmits(['update:modelValue'])
  const isOpen = ref(false)

  function updateValue (val) {
    emit('update:modelValue', val)
  }
</script>

<style scoped>
.cursor-pointer :deep(input) { cursor: pointer; }
.border { border: 1px solid rgba(0,0,0,0.2) !important; }
</style>
