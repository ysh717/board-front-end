<template>
    <ModalDialogTemplate style="width:400px">
        <template v-slot:header>
            로그인
        </template>

        <template v-slot:body>
            <div v-if="store.state.userId === ''">
                <div class="form-group">
                    <label class="form-label">User ID</label>
                    <input type="text" class="form-control" id="userId" v-model="user.id" />
                </div>
                <div class="form-group">
                    <label for="userPassword" class="col-form-label">User Password</label>
                    <input type="text" class="form-control" v-model="user.password" />
                </div>
                <button class="btn btn-info btn-sm" v-on:click="handleLogin">로그인</button>
            </div>
            <AlertDialog v-if="alertDialog" :message="alertDialogMessage" :loading="loading" @close="alertDialog=false"/>
        </template>

        <template v-slot:footer>
            <button class="btn btn-danger btn-sm" @click="$emit('close')">닫기</button>
        </template>
    </ModalDialogTemplate>
</template>

<script setup>
    import {reactive, ref} from "vue";
    import {useStore} from "vuex";
    import apiAuth from "@/apis/auth";
    import AlertDialog from "@/components/AlertDialog.vue"
    import ModalDialogTemplate from '@/components/ModalDialogTemlate.vue';
    import {useRouter} from "vue-router"

    console.log("로그인 페이지");

    const store = useStore();
    const router = useRouter();

    const loginAlertDialog = ref(false);
    const alertDialog = ref(false);
    const alertDialogMessage = ref("");
    const loading = ref(false);

    const user = reactive({
        id: "user",
        password: "12345"
    });

    async function handleLogin(){
        alertDialog.value = true;
        loading.value = true;


        const result = await apiAuth.login(user);
        if(result === "success"){
            console.log("로그인성공");
            loginAlertDialog.value = false;
            alertDialogMessage.value = "로그인 성공";
            router.push("/");
        } else if( result === "fail-401"){
            alertDialogMessage.value = "로그인 실패 : 아이디 또는 패스워드가 틀림";
        } else {
            alertDialogMessage.value = "로그인 실패 : 네트워크 에러";
        }
        loading.value = false;

    }

    async function handleLogout(){
        await apiAuth.logout();
    }
</script>

<style scope>

</style>