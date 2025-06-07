<template>
  <div class="app-container">
    <header class="flex justify-between">
      <div>
        <h1>@wyxos/vision Demo</h1>
        <div class="tabs">
          <router-link v-slot="{ isActive, navigate }" custom to="/form">
            <button :class="{ active: isActive }" @click="navigate">
              FormBuilder Demo
            </button>
          </router-link>
          <router-link v-slot="{ isActive, navigate }" custom to="/listing">
            <button :class="{ active: isActive }" @click="navigate">
              Listing Demo
            </button>
          </router-link>
        </div>
      </div>
      <div class="links">
        <a href="https://github.com/wyxos/vision/tree/main/docs" target="_blank">Documentation</a>
        <a href="https://github.com/wyxos" target="_blank">GitHub</a>
        <a href="https://wyxos.com" target="_blank">Wyxos.com</a>
      </div>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  margin-bottom: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 10px 15px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

button.active {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}

main {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.links {
  margin-top: 10px;
  display: flex;
  gap: 15px;
}

.links a {
  color: #4caf50;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.links a:hover {
  color: #2e7d32;
  text-decoration: underline;
}
</style>
