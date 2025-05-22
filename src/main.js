/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { createVuetify } from 'vuetify'
import { store } from './store/store'
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

const app = createApp(App)
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    //
  },
})

registerPlugins(app)
app.use(vuetify)
app.use(store)
app.mount('#app')

