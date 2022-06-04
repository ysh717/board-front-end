<template>
    <div>
      <router-link :to="`/read?bno=${props.prop1}&hit=true`"><img :src="battach" class="col-12" height="" style="border-radius:50px"/></router-link>
    </div>
      
</template>

<script setup>
  import {ref,defineProps,toRaw} from "vue";
  import apiBoard from "@/apis/board";

  const props = defineProps(["prop1"]);
  const battach = ref(null);

  async function getBoard(bno){
        const blob = await apiBoard.downloadBoardAttach(bno);
        if(blob != null){
            battach.value = URL.createObjectURL(blob);
        }
  }
  getBoard(props.prop1)

</script>

<style scoped>

</style>