<script setup>
  import { useSettingsStore } from '@/stores/settings'

  const settings = useSettingsStore()
</script>

<template>
  <v-card class="h-100" title="Experiencia de Usuario">
    <v-card-text>
      <!-- Densidad de Pantalla -->
      <div class="mb-6">
        <label class="text-caption font-weight-bold mb-2 d-block text-uppercase">Densidad de Interfaz</label>
        <v-btn-toggle
          v-model="settings.density"
          class="w-100"
          color="primary"
          divided
          mandatory
          variant="outlined"
        >
          <v-btn class="flex-grow-1" value="default">Normal</v-btn>
          <v-btn class="flex-grow-1" value="comfortable">Cómoda</v-btn>
          <v-btn class="flex-grow-1" value="compact">Compacta</v-btn>
        </v-btn-toggle>
        <div class="text-caption text-medium-emphasis mt-2">
          Afecta el tamaño de inputs, listas y tablas.
        </div>
      </div>

      <v-divider class="mb-6" />

      <!-- Opciones de Navegación -->
      <div>
        <label class="text-caption font-weight-bold mb-2 d-block text-uppercase">Navegación</label>
        <v-switch
          v-model="settings.drawerMini"
          color="primary"
          hide-details
          inset
          label="Minimizar Menú Lateral (Mini Variant)"
        />
      </div>
    </v-card-text>
  </v-card>
</template>
