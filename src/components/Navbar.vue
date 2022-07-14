<template>
  <nav class="nav">
    <!-- hamburger check -->
    <input type="checkbox" id="navbar-toggle" class="toggle d-none" />
    <ul class="item item-top">
      <div class="item-list-wrapper">
        <li class="item-list">男裝</li>
        <li class="item-list">女裝</li>
        <li class="item-list">最新消息</li>
        <li class="item-list">客製商品</li>
        <li class="item-list">聯絡我們</li>
      </div>
      <div class="item-icon">
        <div class="image icon search"></div>
        <div class="image icon cart"></div>
        <div class="image icon mode toggle-mode"></div>
      </div>
    </ul>
    <div class="logo" for="logo"></div>
    <!-- hamburger -->
    <label for="navbar-toggle" class="navbar-toggle-label">
      <span class="hamburger"></span>
    </label>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped src="./../assets/scss/navbar.scss" lang="scss">
</style>