<template>
  <div id="app">
  {{ patients }}
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      patients: []
    };
  },
  mounted() {
    this.fetchPatients();
  },
  methods: {
    fetchPatients() {
      axios
        .get('/patient/')
        .then(response => {
          this.patients = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
