<template>
  <div>首页</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserInfoStore } from '@/stores/modules/userInfo'
let userInfoStore = useUserInfoStore()
onMounted(() => {
  userInfoStore.user()
})
</script>

<style></style>
