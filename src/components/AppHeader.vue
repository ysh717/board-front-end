<template>
  <nav class="navbar bg-dark navbar-dark text-white font-weight-bold">
    <router-link to="/" class="navbar-brand">
      <img src="../assets/logo.png" alt="" width="30" height="30" class="align-top mr-2"/>사진게시판
    </router-link>
    <div>
      <button v-if="$store.state.userId === ''" @click="loginAlertDialog=true" class="btn btn-info btn-sm mr-2" >로그인</button>
      <router-link  v-if="$store.state.userId !== ''" to="/writeform" class="btn btn-info btn-sm mr-2">글쓰기</router-link>
      <button v-if="$store.state.userId !== ''" @click="handleLogout" class="btn btn-info btn-sm mr-2">로그아웃</button>
      <button v-if="$store.state.userId === ''" @click="joinAlertDialog=true" class="btn btn-info btn-sm mr-2" >회원가입</button>
    </div>
  </nav>
  <div>
    <LoginAlertDialog v-if="loginAlertDialog" @close="loginAlertDialog=false"/>
    <JoinAlertDialog v-if="joinAlertDialog" @close="joinAlertDialog=false"/>
  </div>
</template>

<script setup>
  import apiBoard from "@/apis/board";
  import apiAuth from "@/apis/auth";
  import {ref} from "vue";
  import {useRouter} from "vue-router";
  import LoginAlertDialog from "@/components/LoginAlertDialog.vue";
  import JoinAlertDialog from "@/components/JoinAlertDialog.vue";
  

  const router = useRouter();
  const loginAlertDialog = ref(false);
  const joinAlertDialog = ref(false);

  async function handleLogout(){
    await apiAuth.logout();
    router.push("/");
  }

</script>

<style scope>

</style>