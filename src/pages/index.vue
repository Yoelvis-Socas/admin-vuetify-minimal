<script setup>
  import { computed, ref } from 'vue'
  import toolbarBg from '@/assets/toolbar.jpg'
  import BaseCarousel from '@/components/common/BaseCarousel.vue'
  import BaseChart from '@/components/common/BaseChart.vue'
  import BaseColorPicker from '@/components/common/BaseColorPicker.vue'
  import BaseDatePicker from '@/components/common/BaseDatePicker.vue'
  import BaseExpansion from '@/components/common/BaseExpansion.vue'
  import BaseTable from '@/components/common/BaseTable.vue'
  import BaseTimePicker from '@/components/common/BaseTimePicker.vue'
  import BaseWidgetCard from '@/components/common/BaseWidgetCard.vue'
  import StatCard from '@/components/common/StatCard.vue'
  import CheckoutWidget from '@/components/dashboard/CheckoutWidget.vue'

  // --- 1. DATOS DE ESTADÍSTICAS ---
  const stats = [
    { title: 'Usuarios', value: '1,254', icon: 'mdi-account-group', color: 'primary', trend: '+12%' },
    { title: 'Ingresos', value: '$34,000', icon: 'mdi-currency-usd', color: 'success', trend: '+5%' },
    { title: 'Órdenes', value: '854', icon: 'mdi-cart-outline', color: 'warning', trend: '-2%' },
    { title: 'Tickets', value: '12', icon: 'mdi-ticket-confirmation-outline', color: 'error', trend: '+1' },
  ]

  // --- 2. DATOS DE LA TABLA ---
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

  // --- 3. DATOS DE ACCIONES RÁPIDAS (EXPANSION) ---
  const quickActionsData = ref({
    maintenanceDate: null,
    announcement: '',
    serverRegion: 'US-East',
  })

  const revenueSeries = [
    {
      name: 'Ingresos',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'Gastos',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ]

  const revenueOptions = {
    xaxis: {
      categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    },
    // Podemos personalizar colores específicos si queremos
    colors: ['#4F46E5', '#EF4444'],
  }

  const chartOptions = {
    labels: ['Escritorio', 'Móvil', 'Tablet'],
    dataLabels: { enabled: false },
    legend: { position: 'bottom' },
    plotOptions: { pie: { donut: { size: '65%' } } },
    stroke: { show: false },
    tooltip: {
      // El z-index alto ayuda, pero el overflow del padre es lo vital
      style: { fontSize: '12px' },
      theme: 'dark',
    },
  }
  const chartSeries = [44, 55, 13]

  const regions = ['US-East', 'EU-West', 'Asia-Pacific', 'South-America']

  const actionPanels = computed(() => [
    {
      key: 'maintenance',
      title: 'Mantenimiento',
      description: 'Programar ventana de mantenimiento',
      value: quickActionsData.value.maintenanceDate || 'No programado',
      icon: 'mdi-calendar-clock',
    },
    {
      key: 'announcement',
      title: 'Anuncio Global',
      description: 'Enviar mensaje a todos los usuarios',
      value: quickActionsData.value.announcement ? 'Borrador guardado' : 'Sin mensaje',
      icon: 'mdi-bullhorn',
    },
    {
      key: 'server',
      title: 'Región del Servidor',
      description: 'Cambiar región activa',
      value: quickActionsData.value.serverRegion,
      icon: 'mdi-server-network',
    },
  ])

  // --- 4. DATOS DEL CARRUSEL (NUEVO) ---
  const carouselItems = [
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
      title: 'Campaña de Verano',
      subtitle: 'Lanzamiento oficial - 12k vistas',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
      title: 'Nuevo Servidor',
      subtitle: 'Infraestructura actualizada al 100%',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
      title: 'Equipo de Diseño',
      subtitle: 'Conoce a los nuevos integrantes',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
  ]

  // ESTADO REACTIVO PARA LOS PICKERS
  const pickerState = ref({
    color: '#7E57C2', // Un color inicial bonito
    date: new Date(),
    time: '14:30',
  })

  // Helper para formatear la fecha visualmente en el UI
  const formattedDate = computed(() => {
    return new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(pickerState.value.date)
  })
</script>

<template>
  <div>
    <!-- Encabezado -->
    <div class="mb-6">
      <h2 class="text-h4 font-weight-bold">Dashboard</h2>
      <p class="text-medium-emphasis">Componentes de la plantilla.</p>
    </div>

    <!-- SECCIÓN 1: Tarjetas de Estadísticas -->
    <v-row class="mb-6">
      <v-col
        v-for="(stat, i) in stats"
        :key="i"
        cols="12"
        lg="3"
        sm="6"
      >
        <StatCard v-bind="stat" />
      </v-col>
    </v-row>

    <!-- SECCIÓN 2: Grid Asimétrico (Carousel + Acciones) -->
    <v-row>
      <!-- Columna Izquierda: Carousel -->
      <v-col cols="12" lg="7" md="7">
        <!--
           INTEGRACIÓN DEL CARRUSEL
           Usamos un ciclo de 5 segundos y ocultamos el overlay si no es necesario
        -->
        <BaseCarousel
          :cycle-interval="20000"
          height="515"
          :items="carouselItems"
          progress-color="white"
          :vertical="true"
        />
      </v-col>
      <!-- Columna Derecha: Acciones Rápidas -->
      <v-col cols="12" lg="5" md="5">
        <!-- Aquí va el widget -->
        <CheckoutWidget />
      </v-col>
    </v-row>

    <!-- SECCIÓN 3: Tabla de Usuarios (Fila completa abajo) -->
    <v-row>
      <v-col cols="12">
        <BaseTable :headers="headers" :items="recentUsers" title="Usuarios Recientes">
          <template #header-actions>
            <v-btn color="primary" size="small" to="/users" variant="text">
              Ver todos
            </v-btn>
          </template>

          <template #item.status="{ item }">
            <v-chip class="font-weight-bold" :color="getStatusColor(item.status)" size="small" variant="flat">
              {{ item.status }}
            </v-chip>
          </template>

          <template #item.actions>
            <div class="d-flex justify-end">
              <v-btn color="medium-emphasis" icon="mdi-pencil" size="small" variant="text" />
              <v-btn color="error" icon="mdi-delete" size="small" variant="text" />
            </div>
          </template>
        </BaseTable>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <div class="text-subtitle-1 font-weight-bold mb-3 pl-1">Acciones Rápidas</div>

        <BaseExpansion :items="actionPanels">
          <!-- SLOT 1: Mantenimiento -->
          <template #maintenance>
            <v-text-field
              v-model="quickActionsData.maintenanceDate"
              class="mb-3"
              color="primary"
              density="compact"
              hide-details
              label="Fecha de ejecución"
              type="date"
              variant="outlined"
            />
            <v-btn block color="warning" size="small" variant="tonal">
              Programar
            </v-btn>
          </template>

          <!-- SLOT 2: Anuncio -->
          <template #announcement>
            <v-textarea
              v-model="quickActionsData.announcement"
              auto-grow
              class="mb-3"
              color="primary"
              hide-details
              label="Mensaje del sistema"
              rows="2"
              variant="outlined"
            />
            <v-btn block color="primary" size="small">
              Enviar Anuncio
            </v-btn>
          </template>

          <!-- SLOT 3: Servidor -->
          <template #server>
            <v-select
              v-model="quickActionsData.serverRegion"
              class="mb-3"
              density="compact"
              hide-details
              :items="regions"
              label="Región Principal"
              variant="outlined"
            />
            <div class="text-caption text-medium-emphasis mb-2">
              El cambio de región puede tardar hasta 5 minutos en propagarse.
            </div>
            <v-btn block color="secondary" size="small" variant="outlined">
              Actualizar Región
            </v-btn>
          </template>
        </BaseExpansion>

        <!-- Tarjeta Promo -->
        <v-card class="mt-4 bg-surface-variant" elevation="0" rounded="lg">
          <v-card-text>
            <div class="d-flex align-center mb-2">
              <v-icon class="mr-2" color="info">mdi-rocket-launch</v-icon>
              <span class="font-weight-bold">¿Necesitas ayuda?</span>
            </div>
            <p class="text-caption mb-3">Revisa nuestra documentación para aprender a configurar nuevos widgets.</p>
            <v-btn class="px-0" color="info" size="small" variant="text">Ir a docs</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <BaseWidgetCard
          class="chart-card-overflow"
          elevation="2"
          header-color="teal"
          :header-image="toolbarBg"
          title="Dispositivos"
        >
          <!-- Icono -->
          <template #headerIcon>
            <v-icon color="white">mdi-cellphone-link</v-icon>
          </template>

          <!-- Acciones -->
          <template #headerActions>
            <v-btn color="white" icon="mdi-dots-vertical" size="small" variant="text" />
          </template>

          <!-- Gráfico -->
          <BaseChart
            height="320"
            :options="chartOptions"
            :series="chartSeries"
            type="donut"
          />
        </BaseWidgetCard>
      </v-col>

      <v-col cols="12" md="4">
        <BaseWidgetCard
          class="chart-card-overflow"
          elevation="2"

          title="Pickers"
        >
          <!-- Icono -->
          <template #headerIcon>
            <v-icon color="white">mdi-gesture-tap-button</v-icon>
          </template>

          <!-- Acciones -->
          <template #headerActions>
            <v-btn color="white" icon="mdi-dots-vertical" size="small" variant="text" />
          </template>

          <div class="pa-4">
            <!-- FILA 1: BOTONES (Dialogs) -->
            <div class="d-flex ga-2">
              <!-- Al pasar display-mode="dialog", automáticamente se muestran como botones -->
              <BaseColorPicker
                v-model="pickerState.color"
                color="primary"
                display-mode="dialog"
                label="Color"
                pickerMode="hexa"
              />

              <BaseDatePicker
                v-model="pickerState.date"
                color="secondary"
                display-mode="dialog"
                label="Fecha"
              />

              <BaseTimePicker
                v-model="pickerState.time"
                color="info"
                display-mode="dialog"
                label="Hora"
              />
            </div>

            <v-divider class="my-4" />

            <!-- FILA 2: INPUTS (Menus) -->
            <div class="d-flex direction-row ga-3">
              <!-- Al pasar display-mode="menu", automáticamente se muestran como inputs -->
              <BaseColorPicker
                v-model="pickerState.color"
                display-mode="menu"
                label="Seleccionar Color"
              />

              <BaseDatePicker
                v-model="pickerState.date"
                display-mode="menu"
                label="Seleccionar Fecha"
              />

              <BaseTimePicker
                v-model="pickerState.time"
                display-mode="menu"
                label="Seleccionar Hora"
              />
            </div>

          </div>
        </BaseWidgetCard>
      </v-col>
    </v-row>

  </div>
</template>
<style scoped>
.chart-card-overflow {
  overflow: visible !important;
}

.chart-card-overflow :deep(.v-card-text) {
  overflow: visible !important;
}
</style>
