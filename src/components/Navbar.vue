<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light-purple">
    <div class="container-fluid">
      <a class="navbar-brand user-select-none">Lavender Calculator</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav">
        <router-link class = "nav-link" to ="/">Home</router-link>
        <router-link class = "nav-link" to ="/about">About</router-link>
      </div>
        </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.bg-light-purple {
  background: #E6DFFF;
}
</style>
