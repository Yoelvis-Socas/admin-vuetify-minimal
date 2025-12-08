<script setup>
  import { ref, watch } from 'vue'
  import { useTheme } from 'vuetify'
  import { useSettingsStore } from '@/stores/settings'
  import { useSnackbarStore } from '@/stores/snackbar'

  const settings = useSettingsStore()
  const snackbar = useSnackbarStore()
  const theme = useTheme()

  // Referencias locales vinculadas al store
  const localPrimaryColor = ref(settings.primaryColor)
  const localSecondaryColor = ref(settings.secondaryColor)

  // Función que actualiza el tema de Vuetify en tiempo real
  function updateThemeColors () {
    const currentThemeName = theme.global.name.value
    const currentTheme = theme.global.current.value

    // Actualizamos Vuetify
    if (currentTheme) {
      // Nota Senior: Vuetify 3 permite modificar colores dinámicamente así:
      theme.themes.value[currentThemeName].colors.primary = localPrimaryColor.value
      theme.themes.value[currentThemeName].colors.secondary = localSecondaryColor.value
    }

    // Guardamos en store
    settings.primaryColor = localPrimaryColor.value
    settings.secondaryColor = localSecondaryColor.value

    snackbar.showMessage('Tema actualizado correctamente', 'success')
  }

// Watchers para cambios inmediatos (opcional, o usar botón guardar)
// En este caso usaremos un botón "Aplicar" para no spammear actualizaciones
</script>

<template>
  <v-container fluid>
    <div class="mb-6">
      <h2 class="text-h4 font-weight-bold">Configuración</h2>
      <p class="text-medium-emphasis">Personaliza la apariencia y comportamiento de tu dashboard.</p>
    </div>

    <v-row>
      <!-- Panel de Apariencia -->
      <v-col cols="12" md="8">
        <v-card class="mb-4" title="Apariencia y Tema">
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <label class="text-subtitle-2 font-weight-bold mb-2 d-block">Color Primario</label>
                <div class="d-flex align-center">
                  <v-menu :close-on-content-click="false">
                    <template #activator="{ props }">
                      <div
                        v-bind="props"
                        class="color-preview mr-3 cursor-pointer"
                        :style="{ backgroundColor: localPrimaryColor }"
                      />
                    </template>
                    <v-color-picker v-model="localPrimaryColor" elevation="0" mode="hex" />
                  </v-menu>
                  <v-text-field
                    v-model="localPrimaryColor"
                    density="compact"
                    hide-details
                    style="max-width: 150px;"
                    variant="outlined"
                  />
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <label class="text-subtitle-2 font-weight-bold mb-2 d-block">Color Secundario</label>
                <div class="d-flex align-center">
                  <v-menu :close-on-content-click="false">
                    <template #activator="{ props }">
                      <div
                        v-bind="props"
                        class="color-preview mr-3 cursor-pointer"
                        :style="{ backgroundColor: localSecondaryColor }"
                      />
                    </template>
                    <v-color-picker v-model="localSecondaryColor" elevation="0" mode="hex" />
                  </v-menu>
                  <v-text-field
                    v-model="localSecondaryColor"
                    density="compact"
                    hide-details
                    style="max-width: 150px;"
                    variant="outlined"
                  />
                </div>
              </v-col>
            </v-row>

            <v-alert
              border="start"
              border-color="info"
              class="mt-6"
              icon="mdi-palette"
              type="info"
              variant="tonal"
            >
              Los cambios de color afectan botones, barras de progreso y elementos activos.
            </v-alert>
          </v-card-text>

          <v-divider />

          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn color="primary" variant="flat" @click="updateThemeColors">
              Aplicar Cambios de Color
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Panel de Sistema -->
      <v-col cols="12" md="4">
        <v-card class="mb-4" title="Sistema">
          <v-card-text>
            <label class="text-subtitle-2 font-weight-bold mb-2 d-block">Duración de Alertas (ms)</label>
            <v-slider
              v-model="settings.snackbarDuration"
              color="primary"
              :max="10000"
              :min="1000"
              :step="500"
              thumb-label
            />
            <div class="text-caption text-medium-emphasis">
              Valor actual: {{ settings.snackbarDuration }}ms
            </div>

            <div class="mt-4">
              <v-btn block color="primary" variant="outlined" @click="snackbar.showMessage('¡Prueba de notificación!', 'info')">
                Probar Notificación
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.color-preview {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 2px solid rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.color-preview:hover {
  transform: scale(1.1);
}
</style>
