import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'


// Set the base URL for axios requests
axios.defaults.baseURL = 'http://localhost:8000/api/v1/';


createApp(App).mount('#app')
