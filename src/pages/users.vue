<template>
  <v-container fluid>
    <v-card class="border" flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon class="me-2" icon="mdi-account-group" /> &nbsp;
        Gestión de Usuarios

        <v-spacer />

        <v-text-field
          v-model="search"
          density="compact"
          hide-details
          label="Buscar usuario"
          prepend-inner-icon="mdi-magnify"
          single-line
          style="max-width: 300px;"
          variant="outlined"
        />

        <v-btn
          class="ms-4"
          color="primary"
          prepend-icon="mdi-plus"
          variant="flat"
          @click="openCreate"
        >
          Nuevo Usuario
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-data-table
        v-model:search="search"
        :headers="headers"
        :items="items"
      >
        <!-- Personalizamos la columna de Estado -->
        <template #item.status="{ item }">
          <v-chip
            class="text-uppercase"
            :color="item.status === 'Active' ? 'success' : 'error'"
            label
            size="small"
          >
            {{ item.status }}
          </v-chip>
        </template>

        <!-- Personalizamos la columna de Acciones -->
        <template #item.actions="{ item }">
          <v-btn
            color="primary"
            icon="mdi-pencil"
            size="small"
            variant="text"
            @click="openEdit(item)"
          />
          <v-btn color="error" icon="mdi-delete" size="small" variant="text" />
        </template>
      </v-data-table>
    </v-card>
    <UserDialog
      v-model="showDialog"
      :is-editing="isEditing"
      :user="selectedUser"
      @save="handleSave"
    />
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import UserDialog from '@/components/users/UserDialog.vue'
  import { useSnackbarStore } from '@/stores/snackbar'

  const snackbar = useSnackbarStore()
  const showDialog = ref(false)
  const isEditing = ref(false)
  const selectedUser = ref({})

  const search = ref('')
  const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Nombre', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Rol', key: 'role' },
    { title: 'Estado', key: 'status' },
    { title: 'Acciones', key: 'actions', sortable: false, width: '120px', align: 'center' },
  ]

  const items = [
    { id: 1, name: 'Juan Perez', email: 'juan@test.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Maria Lopez', email: 'maria@test.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Carlos Ruiz', email: 'carlos@test.com', role: 'Viewer', status: 'Inactive' },
    { id: 4, name: 'Ana Diaz', email: 'ana@test.com', role: 'Editor', status: 'Active' },
    { id: 5, name: 'Pedro Pascal', email: 'pedro@test.com', role: 'Viewer', status: 'Active' },
  ]
  function openCreate () {
    selectedUser.value = { name: '', email: '', role: 'Viewer', status: 'Active' }
    isEditing.value = false
    showDialog.value = true
  }

  function openEdit (item) {
    selectedUser.value = { ...item } // Copia para evitar reactividad antes de guardar
    isEditing.value = true
    showDialog.value = true
  }

  function handleSave (userSaved) {
    if (isEditing.value) {
      // Buscar y actualizar en el array (simulado)
      const index = items.value.findIndex(u => u.email === selectedUser.value.email) // Usamos email o ID
      if (index !== -1) items.value[index] = userSaved
      snackbar.showMessage('Usuario actualizado', 'success')
    } else {
      items.value.push(userSaved)
      snackbar.showMessage('Usuario creado', 'success')
    }
  }
</script>
