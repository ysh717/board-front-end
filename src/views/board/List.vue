<template>
    <div class="d-flex justify-content-center p-2" style="background-color: white; height: 60px;">
        <input class="col-11 mr-2" id="word" v-model="searchWord" style="border-radius: 30px; background-color: #e2e2e2;">
        <img class="btn" src="@/assets/search.png" @click="getBoardList" />
    </div>
    <div class="col-12 mt-5">
        <div class="row d-flex flex-row">
            <div v-for="board in battach.boards" :key="board.bno" class="col-md-3">
                <SubAComponent :prop1="board.bno" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import apiBoard from "@/apis/board";
    import {ref} from "vue";
    import SubAComponent from "@/components/SubAComponent.vue";
    
    //반응형 속성 선언
    const battach =ref(null);
    const searchWord = ref(null);
    

    //Rest API와 통신해서 페이지에 대한 정보(게시물 목록 + 페이저)를 page 속성에 저장
    async function getBoardList(){
        const result = await apiBoard.getBoardList(searchWord.value);
        battach.value = result;
    }
    getBoardList();

</script>



<style scope>

</style>