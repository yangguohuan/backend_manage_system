<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>
<script lang="ts" setup>
defineProps({
  // 字符串前缀
  prefix: {
    type: String,
    default: '#icon-',
  },

  // svg 图标名称
  name: String,

  // 需要的颜色
  color: {
    type: String,
    default: '',
  },

  // 传入的大小，宽和高
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>
<style scoped></style>
