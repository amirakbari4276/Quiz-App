<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister" class="register-form">
      <input v-model="username" placeholder="Username" required class="form-input" />
      <input type="email" v-model="email" placeholder="Email" required class="form-input" />
      <input type="password" v-model="password" placeholder="Password" required class="form-input" />
      <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required class="form-input" />
      <button type="submit" :disabled="isLoading" class="submit-button">Register</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'; 

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions(['register']), // Map the Vuex register action

    async handleRegister() {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        this.isLoading = false;
        return;
      }

      try {
        await this.register({
          username: this.username,
          email: this.email,
          password: this.password,
        });

        this.username = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.$router.push('/login'); // Redirect to login page
      } catch (error) {
        this.errorMessage = error.message || 'Registration failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
