<template>
  <el-card>
    <p style="font-size: 36px; margin: 20px">{{ msg }}呀， {{ userStore.userInfo.nickname }}</p>
    <br />
    <p style="margin-left: 20px; margin-bottom: 20px">即刻后台管理平台</p>
  </el-card>

  <el-image
    src="http://127.0.0.1:8000/static/media/index.svg"
    style="width: 500px; margin: 0 auto; display: block; margin-top: 50px"
  >
  </el-image>
</template>

<script setup lang="ts">
import type { user } from '@/api/user/type'
import useUserStore from '@/stores/modules/user'
import { onMounted } from 'vue'
import getTime from '@/utils/time'

const userStore = useUserStore()

const msg = getTime()

const uid = JSON.parse(localStorage.getItem('TOKEN') as string) as number

const getUser = async () => {
  userStore.userInfo = (await userStore.getUser(uid)) as unknown as user
}

onMounted(() => {
  getUser()
})
</script>

<style></style>
