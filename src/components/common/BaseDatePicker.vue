<template>
  <!-- MODO DIALOG -->
  <v-dialog
    v-if="displayMode === 'dialog'"
    v-model="isOpen"
    width="auto"
  >
    <template #activator="{ props }">
      <v-btn v-bind="props" class="flex-grow-1" :color="color" variant="tonal">
        <v-icon icon="mdi-calendar" start />
        {{ label }}
      </v-btn>
    </template>

    <v-card>
      <v-date-picker
        color="primary"
        hide-header
        :model-value="modelValue"
        @update:model-value="updateValue"
      />
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
        append-inner-icon="mdi-calendar"
        class="cursor-pointer"
        density="compact"
        hide-details
        :label="label"
        :model-value="formattedDate"
        readonly
        variant="outlined"
      />
    </template>

    <v-card>
      <v-date-picker
        color="primary"
        hide-header
        :model-value="modelValue"
        @update:model-value="updateValue"
      />
    </v-card>
  </v-menu>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const props = defineProps({
    modelValue: { type: [Date, String, Number], default: () => new Date() },
    label: { type: String, default: 'Fecha' },
    displayMode: { type: String, default: 'menu' },
    color: { type: String, default: 'primary' },
  })

  const emit = defineEmits(['update:modelValue'])
  const isOpen = ref(false)

  const formattedDate = computed(() => {
    if (!props.modelValue) return ''
    return new Intl.DateTimeFormat('es-ES').format(new Date(props.modelValue))
  })

  function updateValue (date) {
    emit('update:modelValue', date)
    if (props.displayMode === 'menu') isOpen.value = false
  }
</script>

<style scoped>
.cursor-pointer :deep(input) { cursor: pointer; }
</style>
