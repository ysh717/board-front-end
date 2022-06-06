<template>
    <div>
      <!-- <router-link :to="`/read?bno=${props.prop1}&hit=true`"><img :src="battach" class="col-12 mb-3" style="height:auto; max-height: 650px;"/></router-link> -->
      <img :src="battach" class="btn col-12 mb-3" @click="DetailView" style="height:auto; max-height: 650px;"/>
    </div>
      
</template>

<script setup>
  import {ref,defineProps,toRaw} from "vue";
  import apiBoard from "@/apis/board";
  import {useRouter} from "vue-router";
  import store from "@/store";

  const props = defineProps(["prop1"]);
  const battach = ref(null);
  const router = useRouter();

  async function getBoard(bno){
        const blob = await apiBoard.downloadBoardAttach(bno);
        if(blob != null){
            battach.value = URL.createObjectURL(blob);
        }
  }
  getBoard(props.prop1)

  function DetailView(){
    if(store.state.userId == ""){
      console.log(store.state.userId);
    } else {
      router.push(`/read?bno=${props.prop1}&hit=true`);
    }
  }

</script>

<style scoped>

  img{
    border-radius: 3rem;
  }
  
  img:hover {
    transform: scale(1.2);
    transition: transform 1s;
    filter: brightness(70%);
  }
</style>