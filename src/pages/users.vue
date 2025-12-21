<script setup>
  import { ref } from 'vue'
  import BaseTable from '@/components/common/BaseTable.vue'
  import UserDialog from '@/components/users/UserDialog.vue'
  import { useSnackbarStore } from '@/stores/snackbar'

  const snackbar = useSnackbarStore()

  // --- ESTADO ---
  const showDialog = ref(false)
  const isEditing = ref(false)
  const selectedUser = ref({})
  const search = ref('') // Variable reactiva para el buscador

  const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Nombre', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Rol', key: 'role' },
    { title: 'Estado', key: 'status' },
    { title: 'Acciones', key: 'actions', sortable: false, width: '120px', align: 'end' },
  ]

  // IMPORTANTE: Hacemos items reactivo con ref() para que la tabla se actualice
  const items = ref([
    { id: 1, name: 'Juan Perez', email: 'juan@test.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Maria Lopez', email: 'maria@test.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Carlos Ruiz', email: 'carlos@test.com', role: 'Viewer', status: 'Inactive' },
    { id: 4, name: 'Ana Diaz', email: 'ana@test.com', role: 'Editor', status: 'Active' },
    { id: 5, name: 'Pedro Pascal', email: 'pedro@test.com', role: 'Viewer', status: 'Active' },
    { id: 6, name: 'Juan Perez', email: 'juan@test.com', role: 'Admin', status: 'Active' },
    { id: 7, name: 'Maria Lopez', email: 'maria@test.com', role: 'Editor', status: 'Active' },
    { id: 8, name: 'Carlos Ruiz', email: 'carlos@test.com', role: 'Viewer', status: 'Inactive' },
    { id: 9, name: 'Ana Diaz', email: 'ana@test.com', role: 'Editor', status: 'Active' },
    { id: 10, name: 'Pedro Pascal', email: 'pedro@test.com', role: 'Viewer', status: 'Active' },
    { id: 11, name: 'Juan Perez', email: 'juan@test.com', role: 'Admin', status: 'Active' },
    { id: 12, name: 'Maria Lopez', email: 'maria@test.com', role: 'Editor', status: 'Active' },
    { id: 13, name: 'Carlos Ruiz', email: 'carlos@test.com', role: 'Viewer', status: 'Inactive' },
    { id: 14, name: 'Ana Diaz', email: 'ana@test.com', role: 'Editor', status: 'Active' },
    { id: 15, name: 'Pedro Pascal', email: 'pedro@test.com', role: 'Viewer', status: 'Active' },
    { id: 16, name: 'Juan Perez', email: 'juan@test.com', role: 'Admin', status: 'Active' },
    { id: 17, name: 'Maria Lopez', email: 'maria@test.com', role: 'Editor', status: 'Active' },
    { id: 18, name: 'Carlos Ruiz', email: 'carlos@test.com', role: 'Viewer', status: 'Inactive' },
    { id: 19, name: 'Ana Diaz', email: 'ana@test.com', role: 'Editor', status: 'Active' },
    { id: 20, name: 'Pedro Pascal', email: 'pedro@test.com', role: 'Viewer', status: 'Active' },
    { id: 21, name: 'Juan Perez', email: 'juan@test.com', role: 'Admin', status: 'Active' },
    { id: 22, name: 'Maria Lopez', email: 'maria@test.com', role: 'Editor', status: 'Active' },
    { id: 23, name: 'Carlos Ruiz', email: 'carlos@test.com', role: 'Viewer', status: 'Inactive' },
    { id: 24, name: 'Ana Diaz', email: 'ana@test.com', role: 'Editor', status: 'Active' },
    { id: 25, name: 'Pedro Pascal', email: 'pedro@test.com', role: 'Viewer', status: 'Active' },
  ])

  // --- MÉTODOS ---
  function openCreate () {
    selectedUser.value = { name: '', email: '', role: 'Viewer', status: 'Active' }
    isEditing.value = false
    showDialog.value = true
  }

  function openEdit (item) {
    selectedUser.value = { ...item }
    isEditing.value = true
    showDialog.value = true
  }

  function handleSave (userSaved) {
    if (isEditing.value) {
      const index = items.value.findIndex(u => u.id === userSaved.id || u.email === userSaved.email)
      if (index !== -1) items.value[index] = userSaved
      snackbar.showMessage('Usuario actualizado', 'success')
    } else {
      // Simulamos ID
      userSaved.id = items.value.length + 1
      items.value.push(userSaved)
      snackbar.showMessage('Usuario creado', 'success')
    }
  }
</script>

<template>
  <v-container fluid>
    <!--
      USO DE BASE TABLE
      Pasamos la prop 'search' que BaseTable reenviará al v-data-table interno vía $attrs
    -->
    <BaseTable
      :headers="headers"
      :items="items"
      :search="search"
      title="Gestión de Usuarios"
    >

      <!--
        MAGIA AQUÍ: Slot header-actions
        Usamos este espacio para poner el Buscador Y el Botón.
        Usamos d-flex para alinearlos.
      -->
      <template #header-actions>
        <div class="d-flex align-center gap-2">
          <!-- Buscador -->
          <v-text-field
            v-model="search"
            class="mr-3"
            density="compact"
            hide-details
            placeholder="Buscar..."
            prepend-inner-icon="mdi-magnify"
            style="width: 250px;"
            variant="outlined"
          />

          <!-- Botón Nuevo -->
          <v-btn
            color="primary"
            height="40"
            prepend-icon="mdi-plus"
            size="small"
            variant="flat"
            @click="openCreate"
          >
            Nuevo Usuario
          </v-btn>
        </div>
      </template>

      <!-- Slot Personalizado: STATUS -->
      <template #item.status="{ item }">
        <v-chip
          class="text-uppercase font-weight-bold"
          :color="item.status === 'Active' ? 'success' : 'error'"
          label
          size="small"
        >
          {{ item.status }}
        </v-chip>
      </template>

      <!-- Slot Personalizado: ACCIONES -->
      <template #item.actions="{ item }">
        <div class="d-flex justify-end">
          <v-btn
            color="primary"
            icon="mdi-pencil"
            size="small"
            variant="text"
            @click="openEdit(item)"
          />
          <v-btn
            color="error"
            icon="mdi-delete"
            size="small"
            variant="text"
          />
        </div>
      </template>
    </BaseTable>

    <!-- Diálogo de Edición/Creación -->
    <UserDialog
      v-model="showDialog"
      :is-editing="isEditing"
      :user="selectedUser"
      @save="handleSave"
    />
  </v-container>
</template>
