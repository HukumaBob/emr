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
        <label for="email" class="form-label">email</label>
        <input type="tel" class="form-control" id="email" v-model="email" required>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {   
          first_name: '',
          last_name: '',
          date_of_birth: '',
          email: ''
    };
  },
  methods: {
    submitForm() {
      // Perform form submission logic, e.g., calling API to register the patient
      // You can access the form data using this.firstName, this.lastName, etc.
    }
  }
};
</script>

<style>
/* Add custom styles if needed */
</style>
