<script setup>
/**
 * BaseChart.vue
 * Wrapper para ApexCharts que maneja automáticamente el tema (Dark/Light)
 * y estandariza el contenedor (Card).
 */
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  const props = defineProps({
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    // Tipo de gráfico: 'line', 'area', 'bar', 'pie', 'donut', etc.
    type: { type: String, default: 'area' },
    height: { type: [Number, String], default: 350 },
    // Datos de las series
    series: { type: Array, required: true },
    // Opciones específicas que quiera sobreescribir el padre
    options: { type: Object, default: () => ({}) },
    color: { type: String, default: 'primary' },
  })

  const theme = useTheme()

  // Opciones Base "Clean"
  const defaultOptions = computed(() => {
    const isDark = theme.global.current.value.dark
    const themeColor = isDark ? '#f3f4f6' : '#111827'
    const gridColor = isDark ? '#374151' : '#e5e7eb'

    return {
      chart: {
        background: 'transparent',
        toolbar: { show: false }, // Ocultamos el menú feo de hamburguesa
        fontFamily: 'inherit',
      },
      theme: {
        mode: isDark ? 'dark' : 'light',
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      dataLabels: { enabled: false },
      grid: {
        borderColor: gridColor,
        strokeDashArray: 4, // Líneas punteadas elegantes
        xaxis: { lines: { show: false } },
      },
      xaxis: {
        labels: { style: { colors: themeColor } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: { style: { colors: themeColor } },
      },
      // Colores por defecto (puedes personalizar la paleta aquí)
      colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'],
      legend: {
        position: 'top',
        horizontalAlign: 'right',
      },
      ...props.options, // Mezclamos con las opciones que vengan del padre
    }
  })
</script>

<template>
  <v-card border class="h-100 chart-card d-flex flex-column" elevation="0">
    <!-- Header del Gráfico -->
    <v-card-item v-if="title" class="pb-0">
      <v-card-title class="text-subtitle-1 font-weight-bold">{{ title }}</v-card-title>
      <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>

      <!-- Slot para acciones (ej: Filtro de fechas) -->
      <template v-if="$slots.actions" #append>
        <slot name="actions" />
      </template>
    </v-card-item>

    <v-card-text class="flex-grow-1 d-flex align-center justify-center pt-4">
      <!-- El Gráfico en sí -->
      <apexchart
        :height="height"
        :options="defaultOptions"
        :series="series"
        :type="type"
        width="100%"
      />
    </v-card-text>
  </v-card>
</template>
<style lang="scss" scoped>
.chart-card{
  border: none!important;
}
</style>
