import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';

// Set the base URL for axios requests
axios.defaults.baseURL = 'http://localhost:8000/api/v1/';


createApp(App).mount('#app')
