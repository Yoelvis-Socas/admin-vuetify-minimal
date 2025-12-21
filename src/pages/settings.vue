<script setup>
  import SettingsInterface from '@/components/settings/SettingsInterface.vue'
  import SettingsSystem from '@/components/settings/SettingsSystem.vue'
  import SettingsTheme from '@/components/settings/SettingsTheme.vue'
</script>

<template>
  <v-container fluid>
    <!-- Encabezado de Sección -->
    <div class="mb-8">
      <div class="d-flex align-center">
        <v-icon class="mr-3 text-primary" icon="mdi-cog-outline" size="large" />
        <h2 class="text-h4 font-weight-bold">Configuración</h2>
      </div>
      <p class="text-medium-emphasis ml-10">
        Gestiona el comportamiento global y la estética de tu aplicación.
      </p>
    </div>

    <v-row>
      <v-col cols="12" lg="8" md="8">
        <SettingsTheme />
      </v-col>
      <v-col cols="12" lg="4" md="4">
        <SettingsSystem />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="8" md="8">
        <SettingsInterface />
      </v-col>
      <v-col cols="12" lg="4" md="4">
        <v-card class="bg-primary text-white" elevation="0">
          <!-- Tarjeta "Pro" (Upselling) -->
          <v-card-text>
            <div class="d-flex align-start">
              <v-icon class="mr-2" icon="mdi-star" />
              <div>
                <div class="text-h6 font-weight-bold mb-1">Versión PRO</div>
                <div class="text-caption text-white opacity-80 mb-4">
                  Desbloquea gestión de roles, logs de auditoría y backups automáticos.
                </div>
                <v-btn block color="white" size="small" variant="outlined">
                  Ver Planes
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
