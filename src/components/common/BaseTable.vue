<script setup>
/**
 * BaseTable.vue
 * Componente reutilizable que estandariza el diseño de las tablas.
 * Soporta todos los slots y props de v-data-table mediante forwarding.
 */

  defineProps({
    title: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    // Recibimos headers e items obligatoriamente
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  })
</script>

<template>
  <v-card border class="h-100" elevation="0">
    <!-- Encabezado de la Tarjeta (Opcional) -->
    <v-card-item v-if="title || $slots['header-actions']" class="py-4 px-4 border-b">
      <div class="d-flex justify-space-between align-center">
        <v-card-title class="text-subtitle-1 font-weight-bold">
          {{ title }}
        </v-card-title>

        <!-- Slot para botones de acción en el header (ej: Ver todos) -->
        <div v-if="$slots['header-actions']">
          <slot name="header-actions" />
        </div>
      </div>
    </v-card-item>

    <!--
      v-data-table
      v-bind="$attrs" -> Pasa props no declarados (ej: show-select, density) directo a la tabla.
    -->
    <v-data-table
      class="bg-transparent"
      density="compact"
      :headers="headers"
      :items="items"
      :loading="loading"
      v-bind="$attrs"
    >
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>

      <!-- Estado de carga personalizado -->
      <template #loading>
        <v-skeleton-loader type="table-row@5" />
      </template>
    </v-data-table>
  </v-card>
</template>
