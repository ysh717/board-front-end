<template>
    <ModalDialogTemplate style="width:400px">
        <template v-slot:header>
            알림
        </template>

        <template v-slot:body>
            <p>모든내용을 작성해주세요</p>
        </template>

        <template v-slot:footer>
            <button class="btn btn-info btn-sm" @click="$emit('confirm')">확인</button>
            <button class="btn btn-info btn-sm" @click="$emit('close')">닫기</button>
        </template>
    </ModalDialogTemplate>
</template>

<script setup>
    import ModalDialogTemplate from '@/components/ModalDialogTemlate.vue';
</script>

<style scope>
</style>