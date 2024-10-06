<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

#app {
  text-align: center;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #74ebd5, #acb6e5);
  padding: 40px 20px;
  min-height: 100vh;
}

h1 {
  color: #ffffff;
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
