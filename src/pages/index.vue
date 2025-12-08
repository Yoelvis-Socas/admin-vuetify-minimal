<script setup>
  import { ref } from 'vue'

  // Datos de ejemplo para las tarjetas
  const stats = [
    {
      title: 'Usuarios Totales',
      value: '1,254',
      icon: 'mdi-account-group',
      color: 'primary',
      trend: '+12%',
    },
    {
      title: 'Ingresos',
      value: '$34,000',
      icon: 'mdi-currency-usd',
      color: 'success',
      trend: '+5%',
    },
    {
      title: 'Órdenes',
      value: '854',
      icon: 'mdi-cart-outline',
      color: 'warning',
      trend: '-2%',
    },
    {
      title: 'Tickets',
      value: '12',
      icon: 'mdi-ticket-confirmation-outline',
      color: 'error',
      trend: '+1',
    },
  ]

  // Datos de ejemplo para la tabla
  const headers = [
    { title: 'Usuario', key: 'user' },
    { title: 'Rol', key: 'role' },
    { title: 'Estado', key: 'status' },
    { title: 'Acciones', key: 'actions', sortable: false, align: 'end' },
  ]

  const recentUsers = [
    { user: 'Ana García', role: 'Admin', status: 'Activo' },
    { user: 'Carlos Ruiz', role: 'Editor', status: 'Offline' },
    { user: 'María Lopez', role: 'Viewer', status: 'Activo' },
    { user: 'Jorge Vega', role: 'Editor', status: 'Pendiente' },
    { user: 'Lucía Díaz', role: 'Admin', status: 'Activo' },
  ]

  function getStatusColor (status) {
    if (status === 'Activo') return 'success'
    if (status === 'Offline') return 'secondary'
    if (status === 'Pendiente') return 'warning'
    return 'primary'
  }
</script>

<template>
  <div>
    <!-- Título de la página -->
    <div class="mb-6">
      <h2 class="text-h4 font-weight-bold">Dashboard</h2>
      <p class="text-medium-emphasis">Resumen general de la actividad.</p>
    </div>

    <!-- Tarjetas de Estadísticas -->
    <v-row class="mb-6">
      <v-col
        v-for="(stat, i) in stats"
        :key="i"
        cols="12"
        lg="3"
        sm="6"
      >
        <v-card class="pa-4" height="100%">
          <div class="d-flex justify-space-between align-start">
            <div>
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
                {{ stat.title }}
              </div>
              <div class="text-h4 font-weight-bold text-high-emphasis">
                {{ stat.value }}
              </div>
              <div class="text-caption mt-2 font-weight-medium" :class="stat.trend.includes('+') ? 'text-success' : 'text-error'">
                {{ stat.trend }} <span class="text-medium-emphasis">vs mes anterior</span>
              </div>
            </div>
            <v-avatar :color="stat.color" rounded="lg" size="48" variant="tonal">
              <v-icon size="24">{{ stat.icon }}</v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tabla de Usuarios Recientes -->
    <v-card title="Usuarios Recientes">
      <template #append>
        <v-btn color="primary" size="small" variant="text">Ver todos</v-btn>
      </template>

      <v-data-table
        class="bg-transparent"
        :headers="headers"
        item-value="user"
        :items="recentUsers"
      >
        <!-- Slot personalizado para el estado -->
        <template #item.status="{ item }">
          <v-chip
            class="font-weight-bold"
            :color="getStatusColor(item.status)"
            size="small"
            variant="flat"
          >
            {{ item.status }}
          </v-chip>
        </template>

        <!-- Slot personalizado para acciones -->
        <template #item.actions>
          <v-btn color="medium-emphasis" icon="mdi-pencil" size="small" variant="text" />
          <v-btn color="error" icon="mdi-delete" size="small" variant="text" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
