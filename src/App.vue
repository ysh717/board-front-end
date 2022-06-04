<template>
  <div>
    <AppHeader/>
    <div class="container-fluid vh-100 ">
      <div class="col-md-2"></div>
      <div class="col-md-8" style="margin:0 auto;">
        <router-view/>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script setup>
  import AppHeader from "./components/AppHeader.vue";
</script>

