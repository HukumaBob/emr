<template>
  <div>
    <h1>List of Patients</h1>
    <table class="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="patient in patients" :key="patient.id">
          <td>{{ patient.first_name }}</td>
          <td>{{ patient.middle_name }}</td>
          <td>{{ patient.last_name }}</td>
          <td>{{ patient.date_of_birth }}</td>
        </tr>
      </tbody>
    </table>
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
