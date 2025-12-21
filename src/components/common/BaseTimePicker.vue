<template>
  <!-- MODO DIALOG -->
  <v-dialog
    v-if="displayMode === 'dialog'"
    v-model="isOpen"
    width="auto"
  >
    <template #activator="{ props }">
      <v-btn v-bind="props" :color="color" variant="tonal" class="flex-grow-1">
        <v-icon start icon="mdi-clock-outline" />
        {{ label }}
      </v-btn>
    </template>

    <v-card>
      <div class="d-flex justify-center pa-2">
        <v-time-picker
          :model-value="modelValue"
          @update:model-value="updateValue"
          format="24hr"
        />
      </div>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="text" @click="isOpen = false">Listo</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- MODO MENU -->
  <v-menu
    v-else
    v-model="isOpen"
    :close-on-content-click="false"
    location="bottom start"
  >
    <template #activator="{ props }">
      <v-text-field
        v-bind="props"
        :model-value="modelValue"
        :label="label"
        variant="outlined"
        density="compact"
        hide-details
        readonly
        append-inner-icon="mdi-clock-outline"
        class="cursor-pointer"
      />
    </template>

    <v-card>
      <div class="d-flex justify-center pa-2">
        <v-time-picker
          :model-value="modelValue"
          @update:model-value="updateValue"
          format="24hr"
        />
      </div>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="text" @click="isOpen = false">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '12:00' },
  label: { type: String, default: 'Hora' },
  displayMode: { type: String, default: 'menu' },
  color: { type: String, default: 'primary' }
})

const emit = defineEmits(['update:modelValue'])
const isOpen = ref(false)

const updateValue = (time) => {
  emit('update:modelValue', time)
}
</script>

<style scoped>
.cursor-pointer :deep(input) { cursor: pointer; }
</style>
