<template>
  <div>
    <p class="test">测试</p>
    <svgIcon name="phone"></svgIcon>
  </div>
</template>

<script setup lang="ts">
import request from './utils/request'
import { onMounted } from 'vue'

onMounted(() => {
  request({
    url: 'user_list',
    method: 'get',
  }).then((res) => {
    console.log(res)
  })
})
</script>

<style scoped lang="scss">
.test {
  color: $color;
}
</style>
