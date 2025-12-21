<script setup>
  import { computed, ref } from 'vue'
  import BaseCardRadioGroup from '@/components/common/BaseCardRadioGroup.vue' // <--- IMPORTAR
  import BaseStepper from '@/components/common/BaseStepper.vue'

  // --- ESTADO ---
  const step = ref(1)
  const shipping = ref(0)
  const loading = ref(false)
  const orderCompleted = ref(false)

  // Configuración del Stepper
  const steps = ['Revisar Orden', 'Método de Envío', 'Confirmación']

  // Datos de negocio (Productos)
  const products = [
    { name: 'Licencia VuePro Admin', price: 49, quantity: 1 },
    { name: 'Soporte Premium (1 año)', price: 120, quantity: 1 },
    { name: 'Pack de Iconos Exclusivos', price: 15, quantity: 2 },
  ]

  // Cálculos
  const subtotal = computed(() => products.reduce((acc, p) => acc + p.quantity * p.price, 0))
  const total = computed(() => subtotal.value + Number(shipping.value))

  // Métodos de envío simulados
  const shippingOptions = [
    { label: 'Envío Gratuito (10-15 días)', value: 0, price: ' Gratis' },
    { label: 'Envío Estándar (5-7 días)', value: 10, price: ' $10.00' },
    { label: 'Prioritario (2-3 días)', value: 15, price: ' $15.00' },
    { label: 'Express (Mañana)', value: 25, price: ' $25.00' },
    { label: 'VIP (hoy)', value: 50, price: ' $50.00' },
  ]

  function handleFinish () {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      orderCompleted.value = true
    }, 1500)
  }
</script>

<template>
  <!-- Vista de Éxito (Post-Submit) -->
  <v-card v-if="orderCompleted" border class="text-center pa-8" elevation="0">
    <v-avatar class="mb-4" color="success" size="64">
      <v-icon color="white" size="32">mdi-check</v-icon>
    </v-avatar>
    <h3 class="text-h5 font-weight-bold mb-2">¡Orden Confirmada!</h3>
    <p class="text-medium-emphasis mb-6">Hemos enviado el recibo a tu correo electrónico.</p>
    <v-btn color="primary" variant="outlined" @click="orderCompleted = false; step = 1">
      Nueva Orden
    </v-btn>
  </v-card>

  <!-- Stepper de Proceso -->
  <BaseStepper
    v-else
    v-model="step"
    finish-text="Pagar y Finalizar"
    :items="steps"
    :loading="loading"
    @finish="handleFinish"
  >
    <!-- PASO 1: Revisar Orden -->
    <template #content-1>
      <div class="py-4">
        <h3 class="text-subtitle-1 font-weight-bold mb-4">Resumen de productos</h3>
        <v-table class="border rounded-lg" density="comfortable">
          <thead>
            <tr class="bg-surface-variant">
              <th class="text-left font-weight-bold">Producto</th>
              <th class="text-center font-weight-bold">Cant.</th>
              <th class="text-right font-weight-bold">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, i) in products" :key="i">
              <td>{{ p.name }}</td>
              <td class="text-center">{{ p.quantity }}</td>
              <td class="text-right font-weight-medium">${{ p.price * p.quantity }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="text-right font-weight-bold pt-4" colspan="2">Subtotal:</td>
              <td class="text-right font-weight-bold pt-4 text-h6">${{ subtotal }}</td>
            </tr>
          </tfoot>
        </v-table>
      </div>
    </template>

    <!-- PASO 2: Envío -->
    <template #content-2>
      <div>
        <h3 class="text-subtitle-1 font-weight-bold mb-4">Selecciona método de envío</h3>
        <!--
          USO DEL NUEVO COMPONENTE
          Le decimos qué campos usar para el título ('label') y el precio ('price').
        -->
        <BaseCardRadioGroup
          v-model="shipping"
          color="primary"
          item-secondary="price"
          item-title="label"
          item-value="value"
          :items="shippingOptions"
        />
      </div>
    </template>

    <!-- PASO 3: Confirmar -->
    <template #content-3>
      <div class="py-4">
        <v-alert border="start" class="mb-4 text-body-2" type="info" variant="tonal">
          Por favor revisa que todos los datos sean correctos antes de confirmar.
        </v-alert>

        <v-card class="bg-surface-1" variant="outlined">
          <v-card-text>
            <div class="d-flex justify-space-between mb-2">
              <span class="fs-16 font-weight-bold">Subtotal</span>
              <span class="fs-16 fw-semibold">${{ subtotal }}</span>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span class="fs-16 font-weight-bold">Envío</span>
              <span class="fs-16 fw-semibold text-success">
                {{ shipping === 0 ? 'Gratis' : `$${shipping}` }}
              </span>
            </div>
            <v-divider class="my-3" />
            <div class="d-flex justify-space-between align-center">
              <span class="text-h6 font-weight-bold">Total a Pagar</span>
              <span class="text-h4 font-weight-bold text-primary">${{ total }}</span>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </template>

  </BaseStepper>
</template>
