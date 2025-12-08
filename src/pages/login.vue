<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import { useSnackbarStore } from '@/stores/snackbar'

  const auth = useAuthStore()
  const snackbar = useSnackbarStore()
  const router = useRouter()

  const form = ref(false)
  const email = ref('admin@test.com')
  const password = ref('admin')
  const loading = ref(false)
  const showPassword = ref(false)

  // Reglas de validación (Best practice: validaciones claras)
  const rules = {
    required: v => !!v || 'Este campo es requerido',
    email: v => /.+@.+\..+/.test(v) || 'El correo debe ser válido',
    min: v => v.length >= 5 || 'Mínimo 5 caracteres',
  }

  async function handleLogin () {
    if (!form.value) return // Si el formulario no es válido, no hacemos nada

    loading.value = true
    try {
      await auth.login(email.value, password.value)
      snackbar.showMessage('¡Bienvenido de nuevo!', 'success')
      router.push('/')
    } catch (error) {
      snackbar.showMessage(error, 'error')
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <v-row class="fill-height" no-gutters>
    <!-- Columna Izquierda: Branding (Visible solo en md y superior) -->
    <v-col class="d-none d-md-flex bg-primary align-center justify-center position-relative overflow-hidden" cols="12" md="6">
      <!-- Decoración de fondo -->
      <div class="decorative-circle circle-1" />
      <div class="decorative-circle circle-2" />

      <div class="text-center position-relative z-index-1 pa-10">
        <v-img class="mx-auto mb-6 bg-white rounded-circle pa-2" src="@/assets/logo.svg" width="80" />
        <h1 class="text-h3 font-weight-bold text-white mb-2">VuePro Admin</h1>
        <p class="text-white text-opacity-80 text-h6 font-weight-regular">
          La plantilla perfecta para iniciar tu próximo proyecto SaaS con Vuetify 3.
        </p>
      </div>
    </v-col>

    <!-- Columna Derecha: Formulario -->
    <v-col class="d-flex align-center justify-center bg-surface" cols="12" md="6">
      <v-container style="max-width: 450px;">
        <div class="mb-8">
          <h2 class="text-h4 font-weight-bold text-primary mb-2">Iniciar Sesión</h2>
          <p class="text-medium-emphasis text-body-1">Ingresa tus credenciales para acceder</p>
        </div>

        <v-form v-model="form" @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            class="mb-4"
            color="primary"
            label="Correo Electrónico"
            prepend-inner-icon="mdi-email-outline"
            :rules="[rules.required, rules.email]"
            variant="outlined"
          />

          <v-text-field
            v-model="password"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            class="mb-2"
            color="primary"
            label="Contraseña"
            prepend-inner-icon="mdi-lock-outline"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            variant="outlined"
            @click:append-inner="showPassword = !showPassword"
          />

          <div class="d-flex justify-space-between align-center mb-6">
            <v-checkbox color="primary" density="compact" hide-details label="Recordarme" />
            <a class="text-primary text-decoration-none text-body-2 font-weight-bold" href="#">¿Olvidaste tu contraseña?</a>
          </div>

          <v-btn
            block
            class="mb-4"
            color="primary"
            :disabled="!form"
            :loading="loading"
            size="large"
            type="submit"
          >
            Entrar
          </v-btn>

          <!-- Botón Social (Fake - Solo visual) -->
          <v-btn
            block
            color="secondary"
            prepend-icon="mdi-google"
            variant="outlined"
          >
            Entrar con Google
          </v-btn>
        </v-form>

        <div class="text-center mt-8">
          <span class="text-medium-emphasis">¿No tienes cuenta? </span>
          <a class="text-primary font-weight-bold text-decoration-none" href="#">Regístrate gratis</a>
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>

<style scoped>
.z-index-1 {
  z-index: 1;
}

/* Círculos decorativos abstractos */
.decorative-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}
.circle-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  left: -100px;
}
.circle-2 {
  width: 300px;
  height: 300px;
  bottom: -50px;
  right: -50px;
}
</style>
