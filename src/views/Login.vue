 <template>
  <div class="container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <input v-model="username" placeholder="Username" required class="login-input" />
        <input type="password" v-model="password" placeholder="Password" required class="login-input" />
        <button type="submit" :disabled="isLoading" class="login-button">Login</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>

      <p class="register-link">
        Don't have an account? 
        <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'; 
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(['login']), 

    async handleLogin() {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const success = await this.login({ username: this.username, password: this.password });
        if (success) {
          this.$router.push('/'); // Redirect to home on successful login
        }
      } catch (error) {
        this.errorMessage = error.message; // Display error message
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

