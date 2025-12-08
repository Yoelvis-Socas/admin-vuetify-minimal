import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackbarStore = defineStore('snackbar', () => {
  const show = ref(false)
  const text = ref('')
  const color = ref('info')

  function showMessage (message, type = 'info') {
    text.value = message
    color.value = type
    show.value = true
  }

  return { show, text, color, showMessage }
})
