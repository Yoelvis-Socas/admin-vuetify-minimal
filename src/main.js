/**
 * main.js
 */
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins' // <--- Esto carga tu archivo plugins/index.js
import App from './App.vue'

// import 'unfonts.css' // (Opcional)

const app = createApp(App)

// app.use(pinia) <--- ¡BORRA ESTA LÍNEA! (Este era el error)

registerPlugins(app) // <--- Aquí ya se está cargando Pinia internamente

app.mount('#app')
