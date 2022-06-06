<template>
    <div class="col-2"></div>
    <div class="div1 mt-5 col-8" style="margin:0 auto;">
        <div v-if="board != null">
            <div class="d-flex col-12">
                <div class="ml-5 col-6">
                    <img class="col-12 mt-3" v-if="board.battachoname != null" :src="battach" style="max-height:650px"/>
                </div>
                <div class="col-6 mt-3" style="font-size:20px">
                    <p>게시물 번호: {{board.bno}}</p>
                    <p>제목: {{board.btitle}}</p>
                    <p>내용: {{board.bcontent}}</p>
                    <p>작성자: {{board.mid}}</p>
                    <p>게시날짜: {{new Date(board.bdate).toLocaleDateString()}}</p>
                    <p>조회수: {{board.bhitcount}}</p>
                    <p v-if="board.battachoname != null">
                        사진: {{board.battachoname}}
                        <button @click="downloadBattach" class="btn btn-info btn-sm ml-2">다운로드</button>
                    </p>
                </div>
            </div>
            <div class="d-flex justify-content-center mt-3 mb-3">
                <router-link :to="`/`" 
                    class="btn btn-info btn-sm mr-2">목록</router-link>
                <router-link v-if="board.mid == $store.state.userId" :to="`/updateform?bno=${bno}`" 
                    class="btn btn-success btn-sm mr-2">수정</router-link>
                <button v-if="board.mid == $store.state.userId" class="btn btn-danger btn-sm mr-2" @click="handleRemove">삭제</button>
            </div>
        </div>
    </div>
    <div class="col-2"></div>
</template>

<script setup>
    import {useRoute, useRouter} from "vue-router";
    import apiBoard from "@/apis/board";
    import {ref} from "vue";

    //npm install js-file-download
    import fileDownload from "js-file-download";

    const route = useRoute();
    const router = useRouter();

    const bno = route.query.bno;
    const hit = route.query.hit;
    const board = ref(null);
    const battach =ref(null);

    async function getBoard(){
        apiBoard.readBoard(bno, hit)
        .then((data) =>{
            board.value = data;
        });

        const blob = await apiBoard.downloadBoardAttach(bno);
        if(blob != null){
            battach.value = URL.createObjectURL(blob);
            console.log(battach.value)
        }
    }
    
    getBoard();

    async function downloadBattach(){
        const blob = await apiBoard.downloadBoardAttach(bno);
        if(blob != null){
            fileDownload(blob, board.value.battachoname);
        }
    }

    //게시물 삭제
    async function handleRemove(){
        const result = await apiBoard.deleteBoard(bno);
        if(result ==="success"){
            router.push(`/`);
        }
    }

</script>

<style scope>
    .div1{
        border: solid 2px;
        border-radius: 2rem;
    }  
</style>