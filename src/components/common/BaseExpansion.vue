<script setup>
/**
 * BaseExpansion.vue
 * Componente de acordeón moderno con transiciones de encabezado.
 */

  defineProps({
    // Array de objetos: {
    //   key: string (identificador único),
    //   title: string (columna izquierda),
    //   description: string (texto cuando está ABIERTO),
    //   value: string/any (texto cuando está CERRADO - el resumen),
    //   icon: string (opcional)
    // }
    items: {
      type: Array,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  })
</script>

<template>
  <v-expansion-panels
    class="base-expansion"
    :multiple="multiple"
    variant="accordion"
  >
    <v-expansion-panel
      v-for="(item, i) in items"
      :key="i"
      bg-color="surface"
      class="mb-2 border custom-panel"
      elevation="0"
      rounded="lg"
      :value="item.key"
    >
      <!-- ENCABEZADO CON LÓGICA INTELIGENTE -->
      <v-expansion-panel-title v-slot="{ expanded }">
        <v-row align="center" no-gutters>

          <!-- Columna 1: Título Estático (ej: "Trip Name") -->
          <v-col class="d-flex align-center font-weight-bold text-body-1" cols="12" sm="4">
            <v-icon v-if="item.icon" class="mr-2 text-primary" :icon="item.icon" size="small" />
            {{ item.title }}
          </v-col>

          <!-- Columna 2: Transición Resumen vs Descripción -->
          <v-col class="text-medium-emphasis text-body-2" cols="12" sm="8">
            <v-fade-transition leave-absolute>
              <!-- Caso A: Si está ABIERTO, mostramos la instrucción/descripción -->
              <span v-if="expanded" :key="'desc-' + i">
                {{ item.description }}
              </span>

              <!-- Caso B: Si está CERRADO, mostramos el valor/resumen -->
              <span v-else :key="'val-' + i" class="text-high-emphasis font-weight-medium">
                <!-- Si el valor está vacío, mostramos un placeholder sutil -->
                {{ item.value || 'Sin definir' }}
              </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-title>

      <!-- CUERPO DEL PANEL (CONTENIDO) -->
      <v-expansion-panel-text class="pt-2">
        <!--
          Slot Dinámico:
          El nombre del slot será el 'key' del item.
          Esto permite inyectar contenido específico para cada panel.
        -->
        <slot :name="item.key" />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped>
/* Ajustes finos para que se vea Pro */
.base-expansion :deep(.v-expansion-panel-title) {
  padding: 16px 24px;
}

/* Borde activo cuando el panel está abierto */
.custom-panel:deep(.v-expansion-panel--active) {
  border-color: rgb(var(--v-theme-primary)) !important;
  background-color: rgb(var(--v-theme-surface)) !important;
}

/* Transición suave para el borde */
.custom-panel {
  transition: border-color 0.2s ease;
}
</style>
