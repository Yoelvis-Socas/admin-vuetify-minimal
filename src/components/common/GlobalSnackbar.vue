<script setup>
  import { storeToRefs } from 'pinia'
  import { useSettingsStore } from '@/stores/settings'
  import { useSnackbarStore } from '@/stores/snackbar'

  const snackbarStore = useSnackbarStore()
  const settingsStore = useSettingsStore()

  // Usamos storeToRefs para mantener reactividad sin romperla
  const { show, text, color } = storeToRefs(snackbarStore)
</script>

<template>
  <v-snackbar
    v-model="show"
    :color="color"
    elevation="4"
    location="top right"
    rounded="lg"
    :timeout="settingsStore.snackbarDuration"
    variant="flat"
  >
    <div class="d-flex align-center">
      <!-- Icono dinámico según el tipo de mensaje -->
      <v-icon v-if="color === 'success'" class="mr-2" icon="mdi-check-circle" />
      <v-icon v-else-if="color === 'error'" class="mr-2" icon="mdi-alert-circle" />
      <v-icon v-else class="mr-2" icon="mdi-information" />

      <span class="font-weight-medium">{{ text }}</span>
    </div>

    <template #actions>
      <v-btn
        icon="mdi-close"
        size="small"
        variant="text"
        @click="show = false"
      />
    </template>
  </v-snackbar>
</template>
