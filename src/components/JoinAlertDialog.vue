<template>
    <ModalDialogTemplate style="width:400px">
        <template v-slot:header>
            회원가입
        </template>

        <template v-slot:body>
            <div class="form-group">
                <label class="form-label">User ID</label>
                <input type="text" class="form-control" v-model="user.id"/>
            </div>
            <div class="form-group">
                <label class="form-label">User Name</label>
                <input type="text" class="form-control" v-model="user.name"/>
            </div>
            <div class="form-group">
                <label class="col-form-label">User Password</label>
                <input type="text" class="form-control" v-model="user.password"/>
            </div>
            <div class="form-group">
                <label class="col-form-label">User Role</label>
                <select class="form-control" name="mrole" v-model="user.role">
                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                <option value="ROLE_MANAGER">ROLE_MANAGER</option>
                <option value="ROLE_USER" selected>ROLE_USER</option>
                </select>
            </div>
            <div class="form-group">
                <label class="col-form-label">User Email</label>
                <input type="text" class="form-control" v-model="user.email"/>
            </div>
            <button class="btn btn-info btn-sm" v-on:click="handleJoin">가입</button>       
        </template>

        <template v-slot:footer>
            <button class="btn btn-danger btn-sm" @click="$emit('close')">닫기</button>
        </template>
        <AlertDialog v-if="alertDialog" :message="alertDialogMessage" :loading="loading" @close="alertDialog=false"/>
    </ModalDialogTemplate>
</template>

<script setup>
    import ModalDialogTemplate from '@/components/ModalDialogTemlate.vue';
    import {reactive, ref} from 'vue';
    import apiAuth from "@/apis/auth";
    import AlertDialog from "@/components/AlertDialog.vue";
    import {useRouter} from "vue-router";
    import {defineProps} from "vue";

    const router = useRouter();

    const alertDialog =ref(false);
    const alertDialogMessage = ref("");
    const loading = ref(false);
    const joinAlertDialog =ref(false);

    const user =reactive({
        id: "user",
        name: "사용자",
        password: "12345",
        role: "ROLE_USER",
        email: "user@mycompany.com"
    });

    async function handleJoin(){
        alertDialog.value = true;
        loading.value = true;

        const result = await apiAuth.join(user);
        console.log(result);
        if(result === "success"){
            console.log("성공");
            alertDialogMessage.value = "회원 가입 성공";
            router.push("/");
        } else if(result ==="duplicated"){
            console.log("중복");
            alertDialogMessage.value = "회원 가입 실패 : 아이디 중복";
        } else if(result === "fail"){
            console.log("실패");
            alertDialogMessage.value = "회원 가입 실패 : 서버측 오류 ";
        } else {
            console.log("실패2");
            alertDialogMessage.value = "회원 가입 실패 : 네트워크 오류";
        }

        loading.value = false;
    }
</script>

<style scope>
</style>