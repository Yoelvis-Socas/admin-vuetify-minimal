<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    icon: {
      type: String,
      default: 'mdi-help-circle',
    },
    color: {
      type: String,
      default: 'primary',
    },
    trend: {
      type: String,
      default: '',
    },
    trendLabel: {
      type: String,
      default: 'vs mes anterior',
    },
  })

  // Lógica computada para el color de la tendencia
  // Esto hace que el template sea mucho más limpio de leer
  const trendColor = computed(() => {
    if (!props.trend) return ''
    if (props.trend.includes('+')) return 'text-success'
    if (props.trend.includes('-')) return 'text-error'
    return 'text-medium-emphasis'
  })
</script>

<template>
  <v-card border class="pa-4 h-100" elevation="0">
    <div class="d-flex justify-space-between align-start">
      <div>
        <!-- Título -->
        <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
          {{ title }}
        </div>

        <!-- Valor Principal -->
        <div class="text-h4 font-weight-bold text-high-emphasis">
          {{ value }}
        </div>

        <!-- Tendencia (Renderizado condicional si existe prop trend) -->
        <div v-if="trend" class="text-caption mt-2 font-weight-medium" :class="trendColor">
          {{ trend }}
          <span class="text-medium-emphasis">{{ trendLabel }}</span>
        </div>
      </div>

      <!-- Icono -->
      <v-avatar
        :color="color"
        rounded="lg"
        size="48"
        variant="tonal"
      >
        <v-icon size="24">{{ icon }}</v-icon>
      </v-avatar>
    </div>
  </v-card>
</template>
