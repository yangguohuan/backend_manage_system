<template>
  <div></div>
</template>

<script setup lang="ts">
import { useAclStore } from '@/stores/modules/acl'
import { onMounted } from 'vue'
const aclStore = useAclStore()

const getAcls = async () => {
  const data = await aclStore.getPermission()
  console.log(data)
}

onMounted(() => {
  getAcls()
})
</script>

<style scoped></style>
