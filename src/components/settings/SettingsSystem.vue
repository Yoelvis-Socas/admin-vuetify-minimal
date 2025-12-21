<script setup>
  import { useSettingsStore } from '@/stores/settings'
  import { useSnackbarStore } from '@/stores/snackbar'

  const settings = useSettingsStore()
  const snackbar = useSnackbarStore()
</script>

<template>
  <v-card class="h-100" title="Configuración del Sistema">
    <v-card-text>
      <!-- Notificaciones -->
      <label class="text-caption font-weight-bold mb-2 d-block text-uppercase">Notificaciones y Alertas</label>

      <div class="d-flex align-center mb-4">
        <v-slider
          v-model="settings.snackbarDuration"
          class="flex-grow-1 mr-"
          color="primary"
          hide-details
          :max="10000"
          :min="1000"
          :step="500"
        />
        <span class="font-weight-bold" style="width: 70px">{{ settings.snackbarDuration }}ms</span>
      </div>

      <v-switch
        v-model="settings.notificationsEnabled"
        class="mb-4"
        color="success"
        hide-details
        inset
        label="Habilitar sonidos de notificación"
      />

      <v-btn
        block
        color="info"
        prepend-icon="mdi-bell-ring"
        variant="tonal"
        @click="snackbar.showMessage('Esto es una notificación de prueba', 'info')"
      >
        Probar Notificación
      </v-btn>
    </v-card-text>
  </v-card>
</template>
