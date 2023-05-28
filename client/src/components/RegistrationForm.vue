<template>
  <div class="container">
    <h1>Registration Form</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="first_name" class="form-label">First Name</label>
        <input type="text" class="form-control" id="first_name" v-model="first_name" required>
      </div>
      <div class="mb-3">
        <label for="last_name" class="form-label">Last Name</label>
        <input type="text" class="form-control" id="last_name" v-model="last_name" required>
      </div>
      <div class="mb-3">
        <label for="date_of_birth" class="form-label">Date of Birth</label>
        <input type="date" class="form-control" id="date_of_birth" v-model="date_of_birth" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="tel" class="form-control" id="email" v-model="email" required>
      </div>
      <div class="mb-3">
        <label for="gender" class="form-label">Gender</label>
        <select class="form-select" id="gender" v-model="gender" required>
          <option value="">Select gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import PatientService from '@/api/PatientService';

export default {
  data() {
    return {
      // Your form data properties
      first_name: '',
      last_name: '',
      date_of_birth: '',
      email: '',
      gender: '' // Added gender property
    };
  },
  methods: {
    async submitForm() {
      // Create a patient object with the form data
      const patientData = {
        first_name: this.first_name,
        last_name: this.last_name,
        date_of_birth: this.date_of_birth,
        email: this.email,
        gender: this.gender // Include gender in patientData
      };
      console.log(patientData); // Log the form data
      try {
        // Call the createPatient method of the PatientService
        const createdPatient = await PatientService.createPatient(patientData);
        console.log('Patient created:', createdPatient);
        // Reset the form data after successful creation
        this.resetForm();
      } catch (error) {
        console.error('Error creating patient:', error);
        // Handle the error if necessary
      }
    },
    resetForm() {
      // Reset the form data
      this.first_name = '';
      this.last_name = '';
      this.date_of_birth = '';
      this.email = '';
      this.gender = ''; // Reset the gender field
    }
  }
};
</script>

<style>
/* Your component styles */
</style>
