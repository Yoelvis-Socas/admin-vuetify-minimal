<script setup>
  import { ref } from 'vue'
  import { useTheme } from 'vuetify'
  import { useSettingsStore } from '@/stores/settings'
  import { useSnackbarStore } from '@/stores/snackbar'

  const settings = useSettingsStore()
  const snackbar = useSnackbarStore()
  const theme = useTheme()

  const localPrimary = ref(settings.primaryColor)
  const localSecondary = ref(settings.secondaryColor)

  function applyTheme () {
    const currentTheme = theme.global.name.value

    // 1. Actualizar Vuetify
    theme.themes.value[currentTheme].colors.primary = localPrimary.value
    theme.themes.value[currentTheme].colors.secondary = localSecondary.value

    // 2. Actualizar Store
    settings.primaryColor = localPrimary.value
    settings.secondaryColor = localSecondary.value

    snackbar.showMessage('Paleta de colores actualizada', 'success')
  }

  // Función auxiliar para resetear a default
  function resetTheme () {
    localPrimary.value = '#4F46E5'
    localSecondary.value = '#64748B'
    applyTheme()
  }
</script>

<template>
  <v-card class="h-100" title="Personalización Visual">
    <v-card-text>
      <p class="text-medium-emphasis mb-4">Define la identidad de marca de tu panel.</p>

      <v-row>
        <!-- Color Primario -->
        <v-col cols="12" md="6">
          <label class="text-caption font-weight-bold mb-2 d-block text-uppercase">Color Primario</label>
          <div class="d-flex align-center">
            <v-menu :close-on-content-click="false" location="bottom start">
              <template #activator="{ props }">
                <div
                  v-bind="props"
                  class="color-preview mr-3 cursor-pointer elevation-1"
                  :style="{ backgroundColor: localPrimary }"
                />
              </template>
              <v-color-picker v-model="localPrimary" elevation="0" mode="hex" rounded="lg" />
            </v-menu>
            <v-text-field
              v-model="localPrimary"
              density="compact"
              hide-details
              variant="outlined"
            />
          </div>
        </v-col>

        <!-- Color Secundario -->
        <v-col cols="12" md="6">
          <label class="text-caption font-weight-bold mb-2 d-block text-uppercase">Color Secundario</label>
          <div class="d-flex align-center">
            <v-menu :close-on-content-click="false" location="bottom start">
              <template #activator="{ props }">
                <div
                  v-bind="props"
                  class="color-preview mr-3 cursor-pointer elevation-1"
                  :style="{ backgroundColor: localSecondary }"
                />
              </template>
              <v-color-picker v-model="localSecondary" elevation="0" mode="hex" rounded="lg" />
            </v-menu>
            <v-text-field
              v-model="localSecondary"
              density="compact"
              hide-details
              variant="outlined"
            />
          </div>
        </v-col>
      </v-row>

      <div class="d-flex justify-end mt-6">
        <v-btn class="mr-2" color="error" variant="text" @click="resetTheme">Restaurar</v-btn>
        <v-btn color="primary" variant="flat" @click="applyTheme">Guardar Cambios</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.color-preview {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 2px solid rgba(var(--v-border-color), 0.1);
  transition: transform 0.2s;
}
.color-preview:hover {
  transform: scale(1.05);
}
</style>
