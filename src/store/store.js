import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    isAuthenticated: false,
    users: [],
    loggedInUser: null, 
  },
  mutations: {
    setAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setLoggedInUser(state, username) {
      state.loggedInUser = username;
    },
    addUser(state, user) {
      state.users.push(user);
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/users');
        response.data.forEach(user => {
          commit('addUser', user);
        });
      } catch (error) {
        console.error("Error fetching users:", error); 
      }
    },
    async login({ commit, dispatch, state }, { username, password }) {
      try {
        if (state.users.length === 0) {
          await dispatch('fetchUsers');
        }

        const user = state.users.find(u => u.username === username && u.password === password);
        if (user) {
          commit('setAuthenticated', true);
          commit('setLoggedInUser', username); // Store the logged-in user
          const date = new Date().toLocaleString();
          const newLogin = {
            username: username,
            login_time: date,
          };
          await axios.post('http://localhost:3000/login', newLogin);
          return true;
        } else {
          throw new Error('Invalid username or password');
        }
      } catch (error) {
        console.error("Login failed:", error); 
        throw new Error('Login failed. Please check your username and password.');
      }
    },
    async logout({ commit, state }) {
      try {
        const username = state.loggedInUser; // Use the loggedInUser stored in state
        if (username) {
          const date = new Date().toLocaleString();
          const newLogout = {
            username: username,
            logout_time: date,
          };
          await axios.post('http://localhost:3000/logout', newLogout);
          commit('setAuthenticated', false);
          commit('setLoggedInUser', null); // Clear the loggedInUser
        } else {
          console.error('Error: No user is logged in.'); 
        }
      } catch (error) {
        console.error("Logout failed:", error); 
      }
    },
    async register({ commit, state }, user) {
      try {
        const existingUser = state.users.find(u => u.username === user.username || u.email === user.email);
        if (existingUser) {
          throw new Error('User already exists');
        } else {
          await axios.post('http://localhost:3000/users', user);
          commit('addUser', user);
        }
      } catch (error) {
        console.error("Registration error:", error); 
        throw new Error('Registration failed. Please try again.');
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    users(state) {
      return state.users;
    },
  },
});

export default store;
