<template>
  <div>
    <AppHeader/>
    <div class="container-fluid vh-100 ">
      <div class="col-md-12" style="margin:0 auto;">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup>
  import AppHeader from "./components/AppHeader.vue";
  import {useStore} from "vuex";

  const store = useStore();
  store.dispatch("loadAuth");
</script>

