<template>
  <v-dialog v-model="internalDialog" max-width="500px">
    <v-card class="rounded-lg">
      <v-card-title class="text-h6 pa-4 bg-primary text-white d-flex justify-space-between align-center">
        {{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}
        <v-btn density="compact" icon="mdi-close" variant="text" @click="close" />
      </v-card-title>

      <v-card-text class="pa-4 mt-2">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="localItem.name"
                density="compact"
                label="Nombre Completo"
                prepend-inner-icon="mdi-account"
                :rules="rules.required"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="localItem.email"
                density="compact"
                label="Correo Electrónico"
                prepend-inner-icon="mdi-email"
                :rules="[...rules.required, ...rules.email]"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="localItem.role"
                density="compact"
                :items="['Admin', 'Editor', 'Viewer']"
                label="Rol"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="localItem.status"
                density="compact"
                :items="['Active', 'Inactive']"
                label="Estado"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn color="grey-darken-1" variant="text" @click="close">Cancelar</v-btn>
        <v-btn color="primary" :loading="loading" variant="flat" @click="save">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'

  const props = defineProps({
    modelValue: Boolean, // Controla si se ve o no (v-model)
    user: Object, // El usuario a editar (o vacío)
    isEditing: Boolean, // Título del modal
  })

  const emit = defineEmits(['update:modelValue', 'save'])

  const form = ref(null)
  const valid = ref(false)
  const loading = ref(false)

  // Creamos una copia local para no mutar el prop directamente hasta guardar
  const localItem = ref({ ...props.user })

  // Sincronizar v-model con el padre
  const internalDialog = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val),
  })

  // Cuando cambia el usuario seleccionado desde el padre, actualizamos el local
  watch(() => props.user, newVal => {
    localItem.value = { ...newVal }
  })

  // Reglas de validación
  const rules = {
    required: [v => !!v || 'Campo requerido'],
    email: [v => /.+@.+\..+/.test(v) || 'Email inválido'],
  }

  function close () {
    internalDialog.value = false
  }

  async function save () {
    const { valid } = await form.value.validate()
    if (valid) {
      loading.value = true
      // Simulamos carga de API
      setTimeout(() => {
        emit('save', { ...localItem.value }) // Enviamos los datos limpios al padre
        loading.value = false
        close()
      }, 500)
    }
  }
</script>
