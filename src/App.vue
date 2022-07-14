<template>
  <div id="app">
    <div class="main">
      <Navbar />
      <!-- load form -->
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style src="./assets/scss/app.scss" lang="scss">
</style>