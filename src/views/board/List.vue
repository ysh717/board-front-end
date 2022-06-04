<template>
    <div class="col-12">
        <nav class="row navbar navbar-dark font-weight-bold">
            <h3>앨범게시판</h3>
            <div>
                <router-link to="/writeform" class="btn btn-info btn-sm">생성</router-link>
            </div>
        </nav>
        <div class="row d-flex flex-row">
            <div v-for="board in battach.boards" :key="board.bno" class="col-md-3">
                <SubAComponent :prop1="board.bno" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import apiBoard from "@/apis/board"
    import {ref, watch} from "vue";
    import {useRoute, useRouter} from "vue-router";
    import fileDownload from "js-file-download";
    import SubAComponent from "@/components/SubAComponent.vue";


    //반응형 속성 선언
    const boardImgs = ref(null);
    let items = ref(null);
    const battach =ref(null);
    const imgPath = ref(null);

    //라우팅시에 전달된 QueryString에서 pageNo를 일기
    const route = useRoute();
    const router = useRouter();


    //Rest API와 통신해서 페이지에 대한 정보(게시물 목록 + 페이저)를 page 속성에 저장
    async function getBoardList(){
        const result = await apiBoard.getBoardList();
        battach.value = result;
    }
    getBoardList()
</script>



<style scope>

</style>